import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { z } from "zod";

const complaintSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    location: z.string().optional(),
    imageUrl: z.string().optional(), // For MVP, simple string or empty
});

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // If citizen, return own complaints. If official, return all (or assigned).
    // For MVP: Official sees all, Citizen sees own.

    const whereClause = session.user.role === 'CITIZEN'
        ? { userId: session.user.id }
        : {}; // Officials see all

    try {
        const complaints = await prisma.complaint.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { name: true } } }
        });
        return NextResponse.json(complaints);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching complaints" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { title, description, location, imageUrl } = complaintSchema.parse(body);

        const newComplaint = await prisma.complaint.create({
            data: {
                title,
                description,
                location,
                imageUrl,
                userId: session.user.id,
                status: "PENDING",
            },
        });

        return NextResponse.json(newComplaint, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating complaint" }, { status: 500 });
    }
}
