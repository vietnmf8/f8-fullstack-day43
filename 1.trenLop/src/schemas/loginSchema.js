import * as z from "zod";

/* 1. Đặt schema (luật chơi) */
const loginSchema = z.object({
    email: z.email("Email không đúng định dạng").min(1, "Vui lòng nhập email"),
    password: z
        .string("Vui lòng nhập mật khẩu")
        .min(8 /* Mặc định hiển thị lỗi hỗ trợ tiếng việt */)
        .max(20, "Vui lòng không nhập quá 20 ký tự"),
});

export default loginSchema;
