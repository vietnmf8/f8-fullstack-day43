import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginMutation, useMeQuery } from "@/services/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/schemas/loginSchema";

function Login() {
    const navigate = useNavigate();
    const { isSuccess } = useMeQuery();
    const [login, response] = useLoginMutation();

    useEffect(() => {
        if (isSuccess) navigate("/");
    }, [isSuccess, navigate]);

    useEffect(() => {
        if (response.isSuccess) {
            /* Lưu thêm refresh_token vào localStorage */
            const { access_token, refresh_token } = response.data;
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("refreshToken", refresh_token);
            navigate("/");
        }
    }, [response, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const handleLogin = (credentials) => {
        login(credentials);
    };

    /* JSX */
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(handleLogin)}>
                <Input {...register("email")} />
                {errors.email && (
                    <p className="error">{errors.email.message}</p>
                )}
                <br />
                <Input type="password" {...register("password")} />
                {errors.password && (
                    <p className="error">{errors.password.message}</p>
                )}
                <Button>Login</Button>
            </form>
        </div>
    );
}

export default Login;
