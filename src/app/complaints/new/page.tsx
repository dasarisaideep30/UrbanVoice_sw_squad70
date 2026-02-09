"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, MapPin, Truck, Zap, Droplets, Construction, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CATEGORIES = [
    { id: "roads", label: "Roads & Potholes", icon: Construction, color: "text-orange-500", bg: "bg-orange-500/10" },
    { id: "garbage", label: "Garbage Collection", icon: Truck, color: "text-green-500", bg: "bg-green-500/10" },
    { id: "water", label: "Water Leakage", icon: Droplets, color: "text-blue-500", bg: "bg-blue-500/10" },
    { id: "electricity", label: "Street Lights", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
];

export default function NewComplaint() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [locating, setLocating] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                setLocating(false);
            },
            (error) => {
                alert("Unable to retrieve your location");
                setLocating(false);
            }
        );
    };

    const handlePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategory) return;

        setLoading(true);
        try {
            const res = await fetch("/api/complaints", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    description,
                    location: location || "Location not provided",
                    imageUrl: imagePreview || "",
                }),
            });

            if (res.ok) {
                router.push("/dashboard");
                router.refresh();
            } else {
                console.error("Failed to submit");
            }
        } catch (error) {
            console.error("Error submitting:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <Navbar />

            <main className="container mx-auto px-4 pt-24 max-w-2xl">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-black tracking-tighter mb-2">Raise a Complaint</h1>
                    <p className="text-muted-foreground">Let's fix your city together. Start by choosing a category.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* 1. Category Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {CATEGORIES.map((cat) => (
                            <div
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 hover:scale-[1.02] ${selectedCategory === cat.id
                                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                                        : "border-border/50 bg-card hover:border-primary/50"
                                    }`}
                            >
                                <div className={`p-3 rounded-full ${cat.bg}`}>
                                    <cat.icon className={`h-8 w-8 ${cat.color}`} />
                                </div>
                                <span className="font-bold">{cat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* 2. Details */}
                    <div className={`space-y-6 transition-all duration-500 ${selectedCategory ? "opacity-100 translate-y-0" : "opacity-50 translate-y-4 pointer-events-none blur-[2px]"}`}>
                        <div className="space-y-2">
                            <Label>Complaint Title</Label>
                            <Input
                                placeholder="e.g., Deep pothole on Main Street"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <textarea
                                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Describe the issue in detail..."
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="space-y-4">
                            {/* Location Display */}
                            {location && (
                                <div className="flex items-center gap-2 text-sm text-green-500 font-medium p-3 bg-green-500/10 rounded-md border border-green-500/20">
                                    <MapPin className="h-4 w-4" /> Location: {location}
                                </div>
                            )}

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-border">
                                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                    <button
                                        type="button"
                                        onClick={removePhoto}
                                        className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-24 flex flex-col gap-2 border-dashed border-2 hover:bg-accent/50"
                                    onClick={handlePhotoClick}
                                >
                                    <Camera className="h-6 w-6 text-muted-foreground" />
                                    <span className="text-xs font-medium">
                                        {imagePreview ? "Change Photo" : "Add Photo"}
                                    </span>
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-24 flex flex-col gap-2 border-dashed border-2 hover:bg-accent/50"
                                    onClick={handleLocation}
                                    disabled={locating}
                                >
                                    {locating ? <Loader2 className="h-6 w-6 animate-spin text-primary" /> : <MapPin className="h-6 w-6 text-muted-foreground" />}
                                    <span className="text-xs font-medium">
                                        {locating ? "Locating..." : (location ? "Update Location" : "Add Location")}
                                    </span>
                                </Button>
                            </div>
                        </div>

                        <Button type="submit" size="lg" className="w-full text-lg h-14 rounded-full font-bold bg-[#1DB954] hover:bg-[#1ed760] text-black shadow-lg shadow-green-500/20" disabled={loading}>
                            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Complaint"}
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
