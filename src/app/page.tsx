import { parseUnits } from "viem";

export default function Home() {
  const localurl = "https://10bd-96-30-76-11.ngrok-free.app";
  const url = process.env.NEXT_PUBLIC_URL || localurl;

  //Params
  const params = {
    recipientAddress: "0xc93B8e62b3c60f6D222491201B92909089A9faD3",
    tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913", //usdc
    chainId: 8453,
    amount: 1,
  };

  const amountUint256 = parseUnits(params.amount.toString(), 6);

  const ethereumUrl = `ethereum:${params.tokenAddress}@${params.chainId}/transfer?address=${params.recipientAddress}&uint256=${amountUint256}`;
  const redirectUrl = `${url}/redirect?target=${encodeURIComponent(
    ethereumUrl
  )}`;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta property="og:title" content="Ethereum Payment" />
        <meta property="fc:frame" content="vNext" />
        <meta property="of:version" content="vNext" />
        <meta property="of:accepts:xmtp" content="vNext" />
        <meta property="of:image" content={`${url}/social.png`} />
        <meta property="og:image" content={`${url}/social.png`} />
        <meta property="fc:frame:image" content={`${url}/social.png`} />
        <meta property="fc:frame:button:1" content={`Make Payment`} />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content={redirectUrl} />
      </head>
      <body>{/* Empty body as per Frames spec */}</body>
    </html>
  );
}
