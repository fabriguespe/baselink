import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const url = `${process.env.NEXT_PUBLIC_URL}`;

  const txLink = searchParams.get("txLink") as string;
  const networkLogo = searchParams.get("networkLogo") as string;
  const amount = searchParams.get("amount") as string;
  const networkName = searchParams.get("networkName") as string;
  const tokenName = searchParams.get("tokenName") as string;

  if (!txLink || !networkLogo || !amount || !networkName || !tokenName) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  const image = `${url}/api/image?s=1&networkLogo=${networkLogo}&amount=${amount}&networkName=${networkName}&tokenName=${tokenName}`;

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
