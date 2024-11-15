import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const url = `${process.env.NEXT_PUBLIC_URL}`;

  const txLink = searchParams.get("txLink");
  const networkLogo = searchParams.get("networkLogo");
  const amount = searchParams.get("amount");
  const networkName = searchParams.get("networkName");
  const tokenName = searchParams.get("tokenName");
  const image = `${url}/api/receipt?networkLogo=${networkLogo}&amount=${amount}&networkName=${networkName}&tokenName=${tokenName}`;

  if (!txLink) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  // Convert JSX to HTML string
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta property="og:title" content="Ethereum Payment" />
        <meta property="fc:frame" content="vNext" />
        <meta property="of:version" content="vNext" />
        <meta property="of:accepts:xmtp" content="vNext" />
        <meta property="of:image" content="${image}" />
        <meta property="og:image" content="${image}" />
        <meta property="fc:frame:image" content="${image}" />
        <meta property="fc:frame:ratio" content="1.91:1" />
        <meta property="fc:frame:button:1" content="View Transaction" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="${txLink}" />
      </head>
      <body></body>
    </html>
  `;

  // Return HTML response
  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}
