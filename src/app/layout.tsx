import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SiteProtection } from "@/components/portfolio/site-protection";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Obasiochie Vincent Chimaobi | AI Evaluation, Prompt Engineering & Web Development",
  description:
    "Professional portfolio of OBASIOCHIE VINCENT CHIMAOBI — AI Evaluation and Data Annotation Specialist based in Abuja, Nigeria. Focused on AI response evaluation, prompt engineering, data annotation, generative AI workflows, web development, and security-informed analysis.",
  keywords: [
    "Obasiochie Vincent Chimaobi",
    "AI Evaluation Specialist",
    "Prompt Engineering",
    "Data Annotation",
    "LLM Quality",
    "Hallucination Detection",
    "Generative AI Workflows",
    "Web Development",
    "Security Research",
    "Afrik-Vine Tech LTD",
    "Abuja Nigeria",
  ],
  authors: [{ name: "Obasiochie Vincent Chimaobi" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Obasiochie Vincent Chimaobi | AI Evaluation & Prompt Engineering",
    description:
      "AI Evaluation, Prompt Engineering, Web Development, and Security-Informed Digital Solutions. Personal portfolio of Obasiochie Vincent Chimaobi.",
    siteName: "Obasiochie Vincent Chimaobi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Obasiochie Vincent Chimaobi | AI Evaluation & Prompt Engineering",
    description:
      "AI Evaluation, Prompt Engineering, Web Development, and Security-Informed Digital Solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster position="bottom-right" theme="dark" richColors closeButton />
        <SiteProtection />
      </body>
    </html>
  );
}
