export default function Home() {
  const ethereumUrl =
    "ethereum:0xe9791cb9Db1eF92Ed0670B31ab9a9453AA7BFb4c@base?value=1000000&uint256=1&token=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

  return (
    <html>
      <head>
        {/* ... existing meta tags ... */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.onload = function() {
                // Attempt to open Ethereum URL
                window.location.href = "${ethereumUrl}";
                
                // Fallback for mobile - redirect to a wallet after a short delay
                setTimeout(function() {
                  // You can customize these URLs based on platform
                  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                    window.location.href = "https://apps.apple.com/us/app/metamask/id1438144202";
                  } else if (navigator.userAgent.match(/Android/i)) {
                    window.location.href = "https://play.google.com/store/apps/details?id=io.metamask";
                  }
                }, 1000);
              }
            `,
          }}
        />
      </head>
      <body>
        <div>Redirecting to payment...</div>
      </body>
    </html>
  );
}
