"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/navbar";
import { Loader2 } from "lucide-react";

function LoginFormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const registered = searchParams.get("registered");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-background">
            <Navbar />

            {/* Left: Visuals */}
            <div className="hidden md:flex flex-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 max-w-lg text-white">
                    <h2 className="text-5xl font-black tracking-tighter mb-6">
                        Welcome <br /> Back.
                    </h2>
                    <p className="text-xl font-medium opacity-90 leading-relaxed">
                        "The world changes when we change our perspective."
                    </p>
                </div>
            </div>

            {/* Right: Form */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12 pt-24 md:pt-0">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold tracking-tight">Log in</h1>
                        <p className="text-muted-foreground mt-2">
                            Enter your credentials to access your dashboard.
                        </p>
                    </div>

                    {registered && (
                        <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-sm rounded-md font-medium">
                            Account created successfully! Please log in.
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md font-medium">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm font-medium text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-bold bg-[#1DB954] hover:bg-[#1ed760] text-black"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Log In"}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-semibold text-primary hover:underline underline-offset-4"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <LoginFormContent />
        </Suspense>
    );
}
