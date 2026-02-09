"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/navbar";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function SignupPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                router.push("/login?registered=true");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Registration failed");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-background">
            <Navbar />

            {/* Left: Visuals */}
            <div className="hidden md:flex flex-1 bg-vibe-gradient relative items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
                <div className="relative z-10 max-w-lg text-white">
                    <h2 className="text-5xl font-black tracking-tighter mb-6">
                        Join the <br /> Movement.
                    </h2>
                    <p className="text-xl font-medium opacity-90 leading-relaxed">
                        "Change happens when ordinary people come together to demand extraordinary things."
                    </p>
                </div>
            </div>

            {/* Right: Form */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12 pt-24 md:pt-0">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
                        <p className="text-muted-foreground mt-2">
                            Enter your details to start making a difference.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md font-medium">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="Jane Doe"
                                {...register("name")}
                                className={errors.name ? "border-destructive" : ""}
                            />
                            {errors.name && (
                                <p className="text-xs text-destructive">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="jane@example.com"
                                {...register("email")}
                                className={errors.email ? "border-destructive" : ""}
                            />
                            {errors.email && (
                                <p className="text-xs text-destructive">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                                className={errors.password ? "border-destructive" : ""}
                            />
                            {errors.password && (
                                <p className="text-xs text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-bold bg-[#1DB954] hover:bg-[#1ed760] text-black"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating account..." : "Sign Up"}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-primary hover:underline underline-offset-4"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
