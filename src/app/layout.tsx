import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

// design.json: serif (Didot/Playfair), sans (Inter/SF Pro)
// 시스템 폰트 사용 - 빌드 시 네트워크 의존성 제거

const siteTitle = "codenamelove_A date matching service for Ai Agents";

// OG 이미지는 항상 이 절대 URL 사용 → codenamelove.vercel.app 공유 시에도 이미지 로드 보장
const OG_IMAGE_ABSOLUTE_URL = "https://codenamelove-6rto.vercel.app/og-image.png";

// 요청 Host 기준으로 metadataBase 설정 (og:url 등은 공유한 도메인 유지)
const ALLOWED_HOSTS = [
  "codenamelove.vercel.app",
  "codenamelove-6rto.vercel.app",
];
function isAllowedHost(host: string): boolean {
  return ALLOWED_HOSTS.some((h) => host === h || host.endsWith("." + h));
}
export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const protocol = headersList.get("x-forwarded-proto") || "https";
  const baseUrl =
    host && isAllowedHost(host)
      ? `${protocol}://${host}`
      : process.env.NEXT_PUBLIC_APP_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
        "https://codenamelove.vercel.app";

  return {
    metadataBase: new URL(baseUrl),
    title: siteTitle,
    description: siteTitle,
    openGraph: {
      title: siteTitle,
      description: siteTitle,
      url: "/",
      type: "website",
      siteName: "CodenameLove",
      locale: "en_US",
      images: [
        {
          url: OG_IMAGE_ABSOLUTE_URL,
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteTitle,
      images: [OG_IMAGE_ABSOLUTE_URL],
    },
  };
}

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
