import { NextResponse } from "next/server";
import { createTransfer, getPlatformSnapshot } from "@/lib/platform-service";

export const runtime = "nodejs";

export async function GET() {
    const snapshot = await getPlatformSnapshot();
    return NextResponse.json(snapshot.transfers);
}

export async function POST(request: Request) {
    const body = (await request.json()) as {
        fromUnitId?: string;
        toUnitId?: string;
        medicineId?: string;
        quantity?: number;
        requestedBy?: string;
    };

    if (!body.fromUnitId || !body.toUnitId || !body.medicineId || !body.quantity || body.quantity <= 0) {
        return NextResponse.json({ message: "Payload de transferência inválido." }, { status: 400 });
    }

    try {
        const transfer = await createTransfer({
            fromUnitId: body.fromUnitId,
            toUnitId: body.toUnitId,
            medicineId: body.medicineId,
            quantity: body.quantity,
            requestedBy: body.requestedBy,
        });

        return NextResponse.json(transfer, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Não foi possível criar a transferência." },
            { status: 400 },
        );
    }
}