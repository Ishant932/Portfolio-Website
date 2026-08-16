import type { Metadata } from "next";
import { Sora, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const themeInit = `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'dark') document.documentElement.classList.add('dark');
  } catch(e) {}
})();
`;

export const metadata: Metadata = {
  title: "Ishant Goyal | Full Stack Developer · Software Developer · AI Specialist",
  description:
    "Portfolio of Ishant Goyal — Full Stack Developer, Software Developer, and AI Specialist from Jaipur, Rajasthan. Building scalable web platforms and AI-powered digital experiences with 15+ production projects.",
  keywords: [
    "Ishant Goyal",
    "Full Stack Developer",
    "AI Specialist",
    "Software Developer",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "Supabase",
    "AWS",
    "Portfolio",
    "Jaipur",
    "MERN",
  ],
  authors: [{ name: "Ishant Goyal" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Ishant Goyal | Full Stack Developer & AI Specialist",
    description: "Building extraordinary digital experiences with code, creativity & AI.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body suppressHydrationWarning className="bg-base custom-cursor min-h-full text-main antialiased">
        {children}
      </body>
    </html>
  );
}
