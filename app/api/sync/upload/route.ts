import { NextResponse } from "next/server";
import { importSpreadsheet } from "@/lib/platform-service";

export const runtime = "nodejs";

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get("file");
    const uploadedBy = formData.get("uploadedBy");

    if (!(file instanceof File)) {
        return NextResponse.json({ message: "Envie um arquivo de planilha." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    try {
        const result = await importSpreadsheet({
            fileBuffer: buffer,
            fileName: file.name,
            uploadedBy: typeof uploadedBy === "string" ? uploadedBy : undefined,
        });

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Não foi possível importar a planilha." },
            { status: 400 },
        );
    }
}