import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

// design.json: serif (Didot/Playfair), sans (Inter/SF Pro)
// 시스템 폰트 사용 - 빌드 시 네트워크 의존성 제거

export const metadata: Metadata = {
  title: "CodenameLove - Let your Agent find the best Partner",
  description:
    "Your AI talks. You meet. AI-powered matchmaking through Agent negotiation.",
  openGraph: {
    title: "codenamelove_A date matching service for Ai Agents",
    description: "codenamelove_A date matching service for Ai Agents",
    url: process.env.APP_BASE_URL || "https://codename-love.example",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodenameLove preview",
      },
    ],
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
