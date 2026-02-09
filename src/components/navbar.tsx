"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const { data: session } = useSession();

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/20 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tighter hover:opacity-90 transition-opacity">
                    Urban<span className="text-primary">Voice</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        About
                    </Link>
                    <Link href="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        How it Works
                    </Link>
                    <Link href="/stories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Stories
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </button>

                    {session ? (
                        <>
                            <Link href={session.user.role === 'OFFICIAL' ? "/admin" : "/dashboard"}>
                                <Button variant="ghost" className="font-semibold">
                                    Dashboard
                                </Button>
                            </Link>
                            <Button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 px-6"
                            >
                                Log out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" className="font-semibold">
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button className="rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 px-6">
                                    Sign up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
