"use client";

import { useSession } from "next-auth/react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Clock, CheckCircle2, AlertCircle, FileText, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Complaint {
    id: string;
    title: string;
    status: string;
    createdAt: string;
}

export default function Dashboard() {
    const { data: session } = useSession();
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0 });

    useEffect(() => {
        async function fetchComplaints() {
            try {
                const res = await fetch("/api/complaints");
                if (res.ok) {
                    const data = await res.json();
                    setComplaints(data);

                    // Calculate stats
                    const resolved = data.filter((c: any) => c.status === "RESOLVED").length;
                    const pending = data.filter((c: any) => c.status !== "RESOLVED").length;
                    setStats({ total: data.length, resolved, pending });
                }
            } catch (error) {
                console.error("Failed to fetch complaints", error);
            }
        }
        fetchComplaints();
    }, []);

    return (
        <div className="min-h-screen bg-background pb-20">
            <Navbar />

            <main className="container mx-auto px-4 pt-24">
                {/* Welcome Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter mb-2">
                            Hello, <span className="text-vibe-gradient">{session?.user?.name || "Citizen"}</span>
                        </h1>
                        <p className="text-muted-foreground font-medium">Here's what's happening in your city.</p>
                    </div>

                    <Link href="/complaints/new">
                        <Button size="lg" className="rounded-full font-bold bg-[#1DB954] hover:bg-[#1ed760] text-black shadow-lg shadow-green-500/20 hover:scale-105 transition-transform">
                            <Plus className="mr-2 h-5 w-5" /> Raise Complaint
                        </Button>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: "Total Submitted", value: stats.total, icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" },
                        { label: "In Progress", value: stats.pending, icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
                        { label: "Resolved", value: stats.resolved, icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
                    ].map((stat, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-card border border-border/50 hover:border-border transition-colors group">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-full ${stat.bg}`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <span className={`text-4xl font-bold ${stat.color}`}>{stat.value}</span>
                            </div>
                            <h3 className="text-muted-foreground font-medium">{stat.label}</h3>
                        </div>
                    ))}
                </div>

                {/* Recent Activity */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Recent Complaints</h2>
                    <Link href="/complaints/history" className="text-sm font-bold text-primary hover:underline">
                        View All
                    </Link>
                </div>

                <div className="grid gap-4">
                    {complaints.length === 0 ? (
                        <div className="p-10 rounded-3xl border border-dashed border-white/20 bg-white/5 text-center">
                            <div className="inline-flex p-4 rounded-full bg-white/5 mb-4">
                                <AlertCircle className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">No active complaints yet</h3>
                            <p className="text-muted-foreground mb-6">You haven't reported any issues yet. Be the first to improve your area!</p>
                            <Link href="/complaints/new">
                                <Button variant="outline" className="rounded-full border-primary/50 text-primary hover:bg-primary/10">
                                    Raise your first complaint
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {complaints.slice(0, 5).map((complaint) => (
                                <div key={complaint.id} className="p-4 rounded-xl border bg-card flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold">{complaint.title}</h3>
                                        <p className="text-sm text-muted-foreground">{new Date(complaint.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${complaint.status === 'RESOLVED' ? 'bg-green-500/20 text-green-500' :
                                            complaint.status === 'IN_PROGRESS' ? 'bg-orange-500/20 text-orange-500' :
                                                'bg-blue-500/20 text-blue-500'
                                        }`}>
                                        {complaint.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
