import { NextResponse } from "next/server";
import { getPlatformSnapshot } from "@/lib/platform-service";

export const runtime = "nodejs";

export async function GET() {
    const snapshot = await getPlatformSnapshot();
    return NextResponse.json({
        purchases: snapshot.purchases,
        purchaseSuggestions: snapshot.purchaseSuggestions,
        purchaseHistory: snapshot.dashboard.purchaseHistory,
    });
}