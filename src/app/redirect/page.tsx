export default function Redirect() {
  return (
    <html>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.onload = function() {
                const urlParams = new URLSearchParams(window.location.search);
                const target = urlParams.get('target');
                
                if (target) {
                  // Attempt to open Ethereum URL
                  window.location.href = target;
                  
                  // Fallback for mobile - redirect to a wallet after a short delay
                  setTimeout(function() {
                    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                      window.location.href = "https://apps.apple.com/us/app/metamask/id1438144202";
                    } else if (navigator.userAgent.match(/Android/i)) {
                      window.location.href = "https://play.google.com/store/apps/details?id=io.metamask";
                    }
                  }, 1000);
                }
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
