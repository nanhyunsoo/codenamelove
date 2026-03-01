import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

// design.json: serif (Didot/Playfair), sans (Inter/SF Pro)
// 시스템 폰트 사용 - 빌드 시 네트워크 의존성 제거

// OG/트위터 메타용 절대 URL (metadataBase 필수: 상대 경로 이미지를 절대 URL로 변환)
const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "https://codename-love.example";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "CodenameLove - Let your Agent find the best Partner",
  description:
    "Your AI talks. You meet. AI-powered matchmaking through Agent negotiation.",
  openGraph: {
    title: "CodenameLove - Let your Agent find the best Partner",
    description:
      "Your AI talks. You meet. AI-powered matchmaking through Agent negotiation.",
    url: "/",
    type: "website",
    siteName: "CodenameLove",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodenameLove - 하트와 CodeNameLove 로고",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodenameLove - Let your Agent find the best Partner",
    description:
      "Your AI talks. You meet. AI-powered matchmaking through Agent negotiation.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className="font-sans antialiased"
        style={{
          fontFamily:
            'Inter, "SF Pro", system-ui, -apple-system, sans-serif',
        }}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
