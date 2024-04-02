import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";
import { login } from "../../redux/authSlice";
import { Input, Button } from "../index";
import { useState } from "react";
import Logo from "../../assets/Logo.png";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const handleSignup = async (data) => {
        setError("");
        try {
            const responce = await authService.createAccount(data);
            if (responce) {
                const currentUser = await authService.currentUser();
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
                    Sign up to create account
                </h2>
                <p>
                    Already have an account?&nbsp;
                    <Link
                        to={`/login`}
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Login
                    </Link>
                </p>
                {error && (
                    <p className="mt-8 text-red-700 text-center">{error}</p>
                )}
                <form onSubmit={handleSubmit(handleSignup)}>
                    <div className="space-y-5">
                        <Input
                            label="Name: "
                            placeholder="Enter your Name"
                            type="text"
                            {...register("name", {
                                required: true,
                            })}
                        />
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
                            paceholder="Enter your Password"
                            type="password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="Submit" classname="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
