import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "Missing URL" }, { status: 400 });
    }

    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: response.status });
    }

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(Buffer.from(arrayBuffer), {
      headers: { "Content-Type": contentType },
    });
  } catch {
    return NextResponse.json({ error: "Server error"}, { status: 500 });
  }
}