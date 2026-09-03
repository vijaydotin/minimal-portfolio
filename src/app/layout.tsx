import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vijay — Developer & Designer",
  description:
    "Personal portfolio of Vijay Pandey, a developer and designer creating thoughtful digital experiences.",
  keywords: [
    "Vijay Pandey",
    "developer",
    "designer",
    "portfolio",
    "web development",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Vijay Pandey", url: "https://github.com/vijaydotin" }],
  creator: "Vijay Pandey",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Vijay — Developer & Designer",
    description:
      "Personal portfolio of Vijay Pandey, a developer and designer creating thoughtful digital experiences.",
    siteName: "Vijay Pandey Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vijay — Developer & Designer",
    description:
      "Personal portfolio of Vijay Pandey, a developer and designer creating thoughtful digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vijay Pandey",
    url: "https://github.com/vijaydotin",
    jobTitle: "Software Developer",
    knowsAbout: [
      "Web Development",
      "Cyber Security",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
    ],
    sameAs: [
      "https://github.com/vijaydotin",
      "https://www.linkedin.com/in/vijay-pandey-3bb8583a9",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
