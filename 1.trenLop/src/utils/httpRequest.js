// 1. import axios
import axios from "axios";

// 2. Cấu hình instance chứa các config
const httpRequest = axios.create({
    baseURL: "https://api01.f8team.dev/api",
});

axios.interceptors.response.use((response) => {
    return response.data;
});

httpRequest.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
});

/* 1. Biến: Có đang refresh hay không? */
let isRefreshing = false;
/* 4. Những request đang đợi */
let queueJobs = [];

/* 2. Hàm thực hiện refresh token */
async function sendRefreshToken(config, refreshToken) {
    /* Request đầu tiên được lọt vào đây 
    => đổi trạng thái có đang refresh
*/
    isRefreshing = true;
    const response = await axios.post(`${config.baseURL}/auth/refresh-token`, {
        refresh_token: refreshToken,
    });
    const { access_token, refresh_token } = response.data;
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);
}

httpRequest.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (error.status === 401 && refreshToken) {
            const original = error.config;

            try {
                /* Nếu có một ông đang refresh
                    =>
                Nếu chưa refresh thì gọi APi refresh
                */
                if (isRefreshing) {
                    // Những ông request sau ông đầu tiên sẽ lọt vào đây
                    // Đưa ông nào vào một mảng
                    // Chờ khi nào ông đầu tiên gọi xong, rồi gọi tất cả các ông trong mảng
                    // Vấn đề nếu xử lý logic ở đây mà không CHỜ sendRefreshToken(), khi đưa các ông này vào mảng xong => sẽ bị chạy xuống return await httpRequest(original) => gọi request lỗi mà không chờ sendRefreshToken() vì nó không lọt vào else
                    // Cau hỏi: Xử lý logic ở đây mà không để lao xuống dòng return...
                    // Nếu return thì sao?
                    // Thì nó sẽ lọt vào .then hoặc .catch ở một component nào đó
                    // ? Vậy cái gì có thể giữ chân, chờ được
                    // * Chính là một Promise ở trạng thái pending, nó sẽ luôn chờ đến khi nào được resolve hoặc reject

                    await new Promise((resolve, reject) => {
                        queueJobs.push({ resolve, reject });
                    });
                } else {
                    // 3. Gửi request refresh
                    await sendRefreshToken(original, refreshToken);
                    // sau khi lấy token mới, các request lỗi đang đợi sẽ gọi lại với token mới đã dược lưu trong localStorage
                    // Giải phóng chỗ đang tắc => lao xuống return.. để gọi lại request
                    queueJobs.forEach((job) => job.resolve());
                }

                // Gọi lại cục config bị lỗi (Retry gọi lại)
                return await httpRequest(original);
            } catch (error) {
                // Vậy nếu sendRefreshToken thất bại
                // Vẫn phải giải phóng chỗ tắc để nó lao xống return Promise reject
                // reject() không “lọt vào catch của interceptor”.
                // nó ném lỗi ra ngoài component đang gọi nó
                // reject những Promise fetch API lỗi đang chờ
                queueJobs.forEach((job) => job.reject());

                // Khi refresh token thất bại => đá sang login
                // reject request 401 đầu tiên
                return Promise.reject(error);
            }
        }
    },
);

export default httpRequest;
