import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/auth";
import { login } from "../../redux/authSlice";
import Logo from "../../assets/Logo.png";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const handleLogin = async (data) => {
        setError("");
        try {
            const responce = await authService.userLogin(data);
            if (responce) {
                const currentUser = await authService.currentUser();
                console.log(
                    "🚀 ~ file: Login.jsx:24 ~ handleLogin ~ currentUser:",
                    currentUser
                );
                if (currentUser) dispatch(login(currentUser));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div className="flex w-full justify-center items-center">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <span className="inline-block w-full max-w-[100px]">
                    <img src={Logo} alt="" width={"100%"} />
                </span>
                <h2 className="text-center text-2xl font-bold">
                    Sign in to your account
                </h2>
                <p>
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to={`/sign-up`}
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && (
                    <p className="mt-8 text-red-700 text-center">{error}</p>
                )}
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="space-y-5">
                        <Input
                            label="Email: "
                            placeholder="Enter your Email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                                            value
                                        ) || "Email address must be valid",
                                },
                            })}
                        />
                        <Input
                            label="Password: "
                            paceholder="Enter your password"
                            type="password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="Submit" classname="w-full">
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
