import { NextResponse } from "next/server";
import { getPlatformSnapshot } from "@/lib/platform-service";

export const runtime = "nodejs";

export async function GET() {
    const snapshot = await getPlatformSnapshot();
    const latest = snapshot.syncJobs[0] ?? null;
    return NextResponse.json({
        jobs: snapshot.syncJobs,
        latest,
        lastSyncAt: snapshot.dashboard.lastSyncAt,
    });
}