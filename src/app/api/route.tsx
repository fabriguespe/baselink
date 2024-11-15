import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: "https://metamask.io",
    },
  });
}
