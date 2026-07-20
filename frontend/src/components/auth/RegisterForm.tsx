import { useState } from "react";
import { Link } from "react-router-dom";

import { Eye, EyeOff } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { registerSchema } from "@/schemas/registerSchema";
import type { RegisterFormData } from "@/schemas/registerSchema";

import { useRegister } from "@/hooks/useRegister";

export default function RegisterForm() {

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

    const {
        signUp,
        loading,
        error,
    } = useRegister();

 const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(
        data: RegisterFormData,
    ) {
        await signUp({
            full_name: data.fullName,
            email: data.email,
            password: data.password,
        });
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
                        Create Account
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Start managing your finances today.
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

                    <div>
                        <Label htmlFor="fullName">
                            Full Name
                        </Label>

                        <Input
                            id="fullName"
                            placeholder="Your Full Name"
                            className="mt-2 h-11"
                            {...register("fullName")}
                        />

                        {errors.fullName && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>

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
    
                    <div>
                        <Label htmlFor="confirmPassword">
                            Confirm Password
                        </Label>

                        <div className="relative mt-2">
                            <Input
                                id="confirmPassword"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="••••••••"
                                className="h-11 pr-12"
                                {...register("confirmPassword")}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>

                        {errors.confirmPassword && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.confirmPassword.message}
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
                            ? "Creating Account..."
                            : "Create Account"}

                    </Button>

                </form>

                {/* Footer */}

                <div className="mt-8 text-center text-sm text-slate-500">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="font-semibold text-slate-900 hover:underline"
                    >

                        Sign In

                    </Link>

                </div>

            </div>

        </div>
    );
}