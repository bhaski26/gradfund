import { useState } from "react";
import { Link } from "react-router-dom";

import { Eye, EyeOff } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { loginSchema } from "@/schemas/loginSchema";
import type { LoginFormData } from "@/schemas/loginSchema";

import { useLogin } from "@/hooks/useLogin";

export default function LoginForm() {

    const [showPassword, setShowPassword] =
        useState(false);

    const {
        signIn,
        loading,
        error,
    } = useLogin();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(
        data: LoginFormData,
    ) {

        await signIn(data);

    }

        return (
        <div className="w-full max-w-md">

            <div className="rounded-3xl border bg-white shadow-xl p-8">

                {/* Header */}

                <div className="text-center mb-8">

                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white text-2xl font-bold">
                        G
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Sign in to continue managing your finances.
                    </p>

                </div>

                {/* Error */}

                {error && (

                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

                        {error}

                    </div>

                )}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >

                    {/* Email */}

                    <div>

                        <Label htmlFor="email">
                            Email
                        </Label>

                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="mt-2 h-11"
                            {...register("email")}
                        />

                        {errors.email && (

                            <p className="mt-2 text-sm text-red-500">

                                {errors.email.message}

                            </p>

                        )}

                    </div>

                    {/* Password */}

                    <div>

                        <Label htmlFor="password">
                            Password
                        </Label>

                        <div className="relative mt-2">

                            <Input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="••••••••"
                                className="h-11 pr-12"
                                {...register("password")}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
                            >

                                {showPassword ? (

                                    <EyeOff size={18} />

                                ) : (

                                    <Eye size={18} />

                                )}

                            </button>

                        </div>

                        {errors.password && (

                            <p className="mt-2 text-sm text-red-500">

                                {errors.password.message}

                            </p>

                        )}

                    </div>

                    {/* Submit */}

                    <Button
                        type="submit"
                        className="h-11 w-full"
                        disabled={loading}
                    >

                        {loading
                            ? "Signing In..."
                            : "Sign In"}

                    </Button>

                </form>

                {/* Footer */}

                <div className="mt-8 text-center text-sm text-slate-500">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="font-semibold text-slate-900 hover:underline"
                    >

                        Create Account

                    </Link>

                </div>

            </div>

        </div>
    );
}