import httpRequest from "@/utils/httpRequest";

const baseQuery = async (args) => {
    const isObject = typeof args === "object";

    /* Kiểm tra nếu arg là object hay là chuỗi */
    const config = {
        url: isObject ? args.url : args,
        method: isObject ? args.method : "GET",
    };

    /* Kiểm tra xem args có body, headers gửi đi không, nếu có thì thêm vào config */
    if (isObject) {
        if (args.body) config.data = args.body;
        if (args.headers) config.headers = args.headers;
        if (args.params) config.params = args.params;
    }

    try {
        const response = await httpRequest(config);
        /* 
            response:  response từ API trả về:
            {
                status:...
                data: {
                    items:...
                    pagination:...
                }
            }
        */

        return { data: response.data };
    } catch (error) {
        return {
            error: {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            },
        };
    }
};

export default baseQuery;
