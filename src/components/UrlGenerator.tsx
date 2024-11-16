"use client";
import { useState } from "react";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "../../src/app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../src/app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function UrlGenerator() {
  const [formData, setFormData] = useState({
    recipientAddress: "0x277C0dd35520dB4aaDDB45d4690aB79353D3368b",
    amount: "1",
    chainId: "8453",
  });

  const [generatedUrl, setGeneratedUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      recipientAddress: formData.recipientAddress,
      amount: formData.amount,
      chainId: formData.chainId,
    });

    setGeneratedUrl(`${baseUrl}?${params.toString()}`);
  };

  return (
    <div className={`container ${geistSans.variable} ${geistMono.variable}`}>
      <div className="wrapper">
        <h1 className={`title ${geistSans.className}`}>
          Payment Frame Generator
        </h1>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="form-group">
            <div className="form-group">
              <label className="label">Recipient Address</label>
              <input
                type="text"
                value={formData.recipientAddress}
                onChange={(e) =>
                  setFormData({ ...formData, recipientAddress: e.target.value })
                }
                className="input"
                placeholder="0x..."
              />
            </div>

            <div className="form-group">
              <label className="label">Amount (USDC)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="input"
                placeholder="1.0"
              />
            </div>

            <div className="form-group">
              <label className="label">Network</label>
              <select
                value={formData.chainId}
                onChange={(e) =>
                  setFormData({ ...formData, chainId: e.target.value })
                }
                className="select"
              >
                <option value="8453">Base</option>
                <option value="1">Ethereum</option>
                <option value="137">Polygon</option>
              </select>
            </div>

            <button type="submit" className="submit-button">
              Generate Frame URL
            </button>
          </form>

          {generatedUrl && (
            <div className="url-container">
              <label className="label">Generated URL</label>
              <div className="url-group">
                <input readOnly value={generatedUrl} className="input" />
                <button
                  onClick={() => navigator.clipboard.writeText(generatedUrl)}
                  className="copy-button"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="powered-by">
          Or{" "}
          <a href="/receipt" rel="noopener noreferrer">
            Generate a Frame Receipt
          </a>{" "}
          for your transaction
        </div>
        <div className="powered-by">
          Powered by{" "}
          <a
            href="https://messagekit.ephemerahq.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            MessageKit
          </a>
        </div>
      </div>
    </div>
  );
}
