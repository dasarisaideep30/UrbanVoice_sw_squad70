"use client";

import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Complaint {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
}

export default function HistoryPage() {
    const { data: session } = useSession();
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchComplaints() {
            try {
                const res = await fetch("/api/complaints");
                if (res.ok) {
                    const data = await res.json();
                    setComplaints(data);
                }
            } catch (error) {
                console.error("Failed to fetch history", error);
            } finally {
                setLoading(false);
            }
        }
        fetchComplaints();
    }, []);

    return (
        <div className="min-h-screen bg-background pb-20">
            <Navbar />
            <main className="container mx-auto px-4 pt-24 max-w-4xl">
                <h1 className="text-3xl font-black tracking-tighter mb-8">My Complaints History</h1>

                {loading ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : complaints.length === 0 ? (
                    <div className="text-center p-12 border border-dashed rounded-2xl bg-card/50">
                        <p className="text-muted-foreground mb-4">No complaints found.</p>
                        <Link href="/complaints/new">
                            <Button>Raise a Complaint</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {complaints.map((complaint) => (
                            <div key={complaint.id} className="p-6 rounded-xl border bg-card flex flex-col md:flex-row gap-4 justify-between items-start md:items-center hover:border-primary/50 transition-colors">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${complaint.status === 'RESOLVED' ? 'bg-green-500/20 text-green-500' :
                                                complaint.status === 'IN_PROGRESS' ? 'bg-orange-500/20 text-orange-500' :
                                                    'bg-blue-500/20 text-blue-500'
                                            }`}>
                                            {complaint.status}
                                        </span>
                                        <span className="text-xs text-muted-foreground">{new Date(complaint.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">{complaint.title}</h3>
                                    <p className="text-muted-foreground text-sm line-clamp-1">{complaint.description}</p>
                                </div>

                                {/* 
                  Future enhancement: Link to details page 
                  <Link href={`/complaints/${complaint.id}`}>
                    <Button variant="ghost" size="sm">View Details <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </Link>
                */}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
