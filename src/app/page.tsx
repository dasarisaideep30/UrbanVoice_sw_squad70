"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { ArrowRight, CheckCircle2, Megaphone, Activity, Users } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black selection:bg-primary selection:text-black overflow-x-hidden">
      <Navbar />

      {/* 
          ARTISTIC BACKGROUND LAYER 
          - Fixed position to cover whole page
          - Floating animation
          - Dark overlay for text readability
      */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 animate-float scale-110">
          <img
            src="/hero-people.png"
            alt="Background"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        {/* Gradient Overlay for Vibe + Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
      </div>

      {/* Content Layer - Relative to sit on top of background */}
      <div className="relative z-10">

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-4 pt-32 pb-16 md:pt-48 md:pb-32 text-center">
          {/* Abstract Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-vibe-gradient opacity-20 blur-[120px] rounded-full pointer-events-none" />

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 text-white max-w-5xl leading-[0.9] drop-shadow-2xl">
            Your Voice <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1DB954] to-[#1ED760]">
              Shapes Your City.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-10 font-medium drop-shadow-lg">
            A transparent, real-time grievance redressal platform.
            Report issues, track progress, and see the impact in your community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link href="/complaints/new">
              <Button size="lg" className="w-full md:w-auto rounded-full font-bold text-base h-12 px-8 bg-[#1DB954] hover:bg-[#1ed760] text-black hover:scale-105 transition-transform shadow-xl shadow-green-500/20">
                Raise a Complaint <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" size="lg" className="w-full md:w-auto rounded-full font-bold text-base h-12 px-8 border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md shadow-lg">
                How it Works
              </Button>
            </Link>
          </div>
        </section>

        {/* Stats Section - Glassmorphism */}
        <section className="py-12 border-y border-white/10 bg-black/40 backdrop-blur-md">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Citizens", value: "10,000+", icon: Users },
              { label: "Issues Resolved", value: "8,540", icon: CheckCircle2 },
              { label: "Avg Resolution", value: "2 Days", icon: Activity },
              { label: "Impact Score", value: "98%", icon: Megaphone },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <stat.icon className="h-8 w-8 text-[#1DB954] mb-3 drop-shadow-glow" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-md">{stat.value}</div>
                <div className="text-sm font-medium text-white/70 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid - Transparent Cards */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Report Instantly",
                  desc: "Snap a photo, add location, and submit in seconds.",
                  gradient: "from-purple-500/50 to-indigo-500/50"
                },
                {
                  title: "Track Real-time",
                  desc: "Get live updates as officials work on your grievance.",
                  gradient: "from-pink-500/50 to-rose-500/50"
                },
                {
                  title: "Drive Change",
                  desc: "See your complaints turn into resolved city improvements.",
                  gradient: "from-amber-400/50 to-orange-500/50"
                },
              ].map((card, i) => (
                <div key={i} className="group relative p-8 rounded-3xl bg-black/40 border border-white/10 hover:border-white/30 transition-all overflow-hidden backdrop-blur-md hover:-translate-y-2 duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
                  <p className="text-white/70 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-white/10 text-center text-white/50 text-sm bg-black/80 backdrop-blur-xl">
          <p>© 2026 UrbanVoice. Built for a better tomorrow.</p>
        </footer>
      </div>
    </main>
  );
}
