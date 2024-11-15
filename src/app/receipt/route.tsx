export default async function Receipt({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams; // Await the promise

  const txLink = resolvedSearchParams.txLink as string;
  const networkLogo = resolvedSearchParams.networkLogo as string;
  const amount = resolvedSearchParams.amount as string;
  const networkName = resolvedSearchParams.networkName as string;
  const tokenName = resolvedSearchParams.tokenName as string;

  const image = `${process.env.NEXT_PUBLIC_URL}/api/image?s=1&networkLogo=${networkLogo}&amount=${amount}&networkName=${networkName}&tokenName=${tokenName}`;

  if (!txLink || !networkLogo || !amount || !networkName || !tokenName) {
    return <div>Error: Missing required parameters</div>;
  }

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta property="og:title" content="Ethereum Payment" />
        <meta property="fc:frame" content="vNext" />
        <meta property="of:version" content="vNext" />
        <meta property="of:accepts:xmtp" content="vNext" />
        <meta property="of:image" content={image} />
        <meta property="og:image" content={image} />
        <meta property="fc:frame:image" content={image} />
        <meta property="fc:frame:ratio" content="1.91:1" />

        <meta property="fc:frame:button:1" content={`View Transaction`} />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content={txLink} />
      </head>
      <body>{/*sdds*/}</body>
    </html>
  );
}
