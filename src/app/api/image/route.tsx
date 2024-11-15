import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import fs from "fs";
import { join } from "path";

export interface Network {
  networkId: string;
  networkName: string;
  networkLogo: string;
  amount: number;
  tokenName: string;
  recipientAddress: string;
}

const interFontPath = join(process.cwd(), "./src/app/fonts/GeistVF.woff");
const interFontData = fs.readFileSync(interFontPath);

const interSemiboldFontPath = join(
  process.cwd(),
  "./src/app/fonts/GeistMonoVF.woff"
);
const interSemiboldFontData = fs.readFileSync(interSemiboldFontPath);

export async function GET(req: NextRequest) {
  try {
    const networkLogo = req.nextUrl.searchParams.get("networkLogo");
    const amount = req.nextUrl.searchParams.get("amount");
    const networkName = req.nextUrl.searchParams.get("networkName");
    const tokenName = req.nextUrl.searchParams.get("tokenName");
    const recipientAddress = req.nextUrl.searchParams.get("recipientAddress");

    const toComponent =
      "To: " +
      recipientAddress?.slice(0, 4) +
      "..." +
      recipientAddress?.slice(-4);

    if (
      !networkName ||
      !networkLogo ||
      !amount ||
      !tokenName ||
      !recipientAddress
    ) {
      return new ImageResponse(
        (
          <div
            style={{
              alignItems: "center",
              background: "black",
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
              height: "100%",
              justifyContent: "center",
              textAlign: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: 60,
                fontStyle: "normal",
                letterSpacing: "-0.025em",
                lineHeight: 1.4,
                marginTop: 30,
                padding: "0 120px",
                whiteSpace: "pre-wrap",
              }}
            >
              {`Invalid network!`}
            </div>
          </div>
        ),
        {
          width: 500,
          height: 500,
          fonts: [
            {
              data: interFontData,
              name: "Inter-SemiBold.ttf",
              style: "normal",
              weight: 400,
            },
          ],
        }
      );
    }
    // ... existing code ...
    return new ImageResponse(
      (
        <div
          style={{
            alignItems: "center",
            background: "white",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            height: "100%",
            width: "100%",
            padding: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
              }}
            >
              <img
                src={networkLogo}
                style={{
                  borderRadius: "25px",
                  width: "40px",
                }}
              />
              <div style={{ fontSize: "20px" }}>{networkName}</div>
            </div>
            <div style={{ fontSize: "48px", display: "flex" }}>
              Pay
              <div
                style={{
                  fontFamily: "Inter-SemiBold",
                  display: "flex",
                  marginLeft: "8px",
                }}
              >
                {amount} {tokenName}
              </div>
            </div>
            <div style={{ fontSize: "30px" }}>{toComponent}</div>
          </div>
        </div>
      ),
      {
        width: 955,
        height: 500,
        fonts: [
          {
            data: interFontData,
            name: "Inter-Regular",
          },
          {
            data: interSemiboldFontData,
            name: "Inter-SemiBold",
          },
        ],
      }
    );
  } catch (error) {
    console.error("Error generating image response:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
