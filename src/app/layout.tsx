import type { Metadata } from "next";
import { Sora, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const themeInit = `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'dark') document.documentElement.classList.add('dark');
  } catch(e) {}
})();
`;

const siteUrl = "https://ishant.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ishant Goyal | Full Stack Developer · Software Developer · AI Specialist",
    template: "%s | Ishant Goyal",
  },
  description:
    "Portfolio of Ishant Goyal — Full Stack Developer, Software Developer, and AI Specialist from Jaipur, India. Building scalable web platforms, payment flows, and AI-powered multi-agent systems trusted by 75,000+ users.",
  keywords: [
    "Ishant Goyal",
    "Full Stack Developer",
    "Software Developer",
    "AI Specialist",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "MERN Stack",
    "Supabase",
    "AWS Cloud",
    "AI Agent Developer",
    "Freelance Developer India",
    "Portfolio",
    "Jaipur",
    "Rajasthan",
    "Hire Full Stack Developer",
  ],
  authors: [{ name: "Ishant Goyal", url: siteUrl }],
  creator: "Ishant Goyal",
  publisher: "Ishant Goyal",
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "profile",
    firstName: "Ishant",
    lastName: "Goyal",
    username: "ishantgoyal932",
    url: siteUrl,
    siteName: "Ishant Goyal — Portfolio",
    title: "Ishant Goyal | Full Stack Developer · Software Developer · AI Specialist",
    description:
      "Building scalable full-stack ecosystems & AI-powered digital experiences — from payment flows and admin dashboards to multi-agent automation, trusted by platforms serving 75,000+ users.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Ishant Goyal — Full Stack Developer, Software Developer, AI Specialist, portrait photo",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ishant Goyal | Full Stack Developer · Software Developer · AI Specialist",
    description:
      "Scalable full-stack ecosystems & AI-powered digital experiences — trusted by platforms serving 75,000+ users.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Ishant Goyal | Full Stack Developer · Software Developer · AI Specialist",
  url: siteUrl,
  inLanguage: "en-IN",
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${siteUrl}/images/ishant-photo.png`,
    width: 1254,
    height: 1254,
  },
  mainEntity: {
    "@type": "Person",
    name: "Ishant Goyal",
    url: siteUrl,
    image: `${siteUrl}/images/ishant-photo.png`,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ishant Goyal — Portfolio",
  url: siteUrl,
  inLanguage: "en-IN",
  publisher: {
    "@type": "Organization",
    name: "Ishant Goyal",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo-512.png`,
      width: 512,
      height: 512,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ishant Goyal",
  givenName: "Ishant",
  familyName: "Goyal",
  alternateName: "IG",
  url: siteUrl,
  image: {
    "@type": "ImageObject",
    url: `${siteUrl}/images/ishant-photo.png`,
    width: 1254,
    height: 1254,
    caption: "Ishant Goyal — Full Stack Developer, Software Developer, AI Specialist",
  },
  jobTitle: "Full Stack Developer / Software Developer / AI Specialist",
  worksFor: {
    "@type": "Organization",
    name: "Dream Mantra",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    addressCountry: "IN",
  },
  email: "mailto:ishantgoyal932@gmail.com",
  telephone: "+916367010131",
  sameAs: [
    "https://www.linkedin.com/in/ishant-goyal-740b31290",
    "https://github.com/Ishant932",
    "https://leetcode.com/u/Ishant__goyal/",
    "https://www.instagram.com/ishantgoyal932/",
  ],
  knowsAbout: [
    "Full Stack Development",
    "MERN Stack",
    "React",
    "Next.js",
    "Node.js",
    "AI Agents",
    "Machine Learning",
    "Supabase",
    "AWS",
    "Payment Gateways",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body suppressHydrationWarning className="bg-base custom-cursor min-h-full text-main antialiased">
        {children}
      </body>
    </html>
  );
}
