import type { Metadata } from "next";
import { Manrope, Poppins } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.myhireroads.com"),
  
  title: {
    default: "Career Services in Florida | MyHireRoads",
    template: "%s | My Hire Roads",
  },
  description:
    "Professional resume writing, LinkedIn profile optimization, interview coaching and career transition support for professionals pursuing opportunities in Florida.",
    verification: {
    google: "Md0_ExRpfdAACUyUHIX6nRjBE-CQnEuTwlg7_nujnbE",
  },
  keywords: [
    "career services Florida",
    "resume writing Florida",
    "professional resume writing",
    "LinkedIn profile optimization",
    "interview coaching Florida",
    "career transition coaching",
    "salary negotiation coaching",
    "ATS resume writing",
    "career coach Florida",
    "job search strategy",
    "executive career services",
    "career counseling Florida",
    "resume writer near me",
    "career coaching for executives",
    "Katherine Fasanella",
    "MyHireRoads",
    "career services Orlando",
    "career services Tampa",
    "career services Miami",
  ],
  authors: [{ name: "Katherine Fasanella" }],
  creator: "My Hire Roads",
  alternates: {
    canonical: "https://www.myhireroads.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.myhireroads.com",
    siteName: "My Hire Roads",
    title: "My Hire Roads | Strategic Career Services in Florida",
    description:
      "Strategic resume writing, LinkedIn optimization, interview coaching, and salary negotiation for professionals ready to advance their careers. Serving Florida and the US.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "My Hire Roads — Strategic Career Services in Florida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Hire Roads | Strategic Career Services in Florida",
    description:
      "Strategic resume writing, LinkedIn optimization, interview coaching, and salary negotiation for professionals ready to advance.",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.myhireroads.com/#organization",
      name: "My Hire Roads",
      alternateName: "MyHireRoads",
      url: "https://www.myhireroads.com",
      description:
        "My Hire Roads helps professionals position themselves for better career opportunities through strategic resume writing, LinkedIn optimization, interview coaching, career transition support, and salary negotiation.",
      founder: {
        "@type": "Person",
        "@id": "https://www.myhireroads.com/#founder",
        name: "Katherine Fasanella",
      },
      areaServed: [
        {
          "@type": "State",
          name: "Florida",
        },
        {
          "@type": "Country",
          name: "United States",
        },
      ],
      knowsAbout: [
        "Resume Writing",
        "LinkedIn Profile Optimization",
        "Interview Coaching",
        "Career Transition Support",
        "Salary Negotiation",
      ],
    },
    {
      "@type": "Service",
      "@id": "https://www.myhireroads.com/#resume-writing",
      name: "Professional Resume Writing",
      serviceType: "Resume Writing",
      provider: {
        "@id": "https://www.myhireroads.com/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      url: "https://www.myhireroads.com",
    },
    {
      "@type": "Service",
      "@id": "https://www.myhireroads.com/#linkedin-optimization",
      name: "LinkedIn Profile Optimization",
      serviceType: "LinkedIn Profile Optimization",
      provider: {
        "@id": "https://www.myhireroads.com/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      url: "https://www.myhireroads.com",
    },
    {
      "@type": "Service",
      "@id": "https://www.myhireroads.com/#interview-coaching",
      name: "Interview Coaching",
      serviceType: "Interview Coaching",
      provider: {
        "@id": "https://www.myhireroads.com/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      url: "https://www.myhireroads.com",
    },
    {
      "@type": "Service",
      "@id": "https://www.myhireroads.com/#career-transition",
      name: "Career Transition Support",
      serviceType: "Career Transition Coaching",
      provider: {
        "@id": "https://www.myhireroads.com/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      url: "https://www.myhireroads.com",
    },
    {
      "@type": "Service",
      "@id": "https://www.myhireroads.com/#salary-negotiation",
      name: "Salary Negotiation Coaching",
      serviceType: "Salary Negotiation",
      provider: {
        "@id": "https://www.myhireroads.com/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      url: "https://www.myhireroads.com",
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.myhireroads.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Why am I applying for jobs but not getting interviews?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your experience may be strong, but your resume isn't telling the right story. Missing keywords, unclear achievements, or poor alignment with job requirements can hold you back. We help position your experience to get noticed.",
          },
        },
        {
          "@type": "Question",
          name: "Are your resumes ATS-friendly and optimized for recruiters?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every resume is professionally written with ATS-compatible formatting, targeted keywords, and measurable accomplishments to help you stand out to both recruiting systems and hiring managers.",
          },
        },
        {
          "@type": "Question",
          name: "How long does the MyHireRoads program last?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our complete career services program runs for six weeks, with personalized support covering your resume, LinkedIn profile, and interview preparation.",
          },
        },
        {
          "@type": "Question",
          name: "Can I purchase resume writing, LinkedIn optimization, or interview coaching separately?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer individual services based on your needs. During your discovery call, we'll help you determine the right fit for your career goals.",
          },
        },
        {
          "@type": "Question",
          name: "Can you help me change careers or transition into a new industry?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We've helped professionals successfully navigate career transitions by identifying transferable skills and positioning their experience for opportunities in new industries.",
          },
        },
        {
          "@type": "Question",
          name: "Do you work with clients outside Florida?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "MyHireRoads serves professionals across the United States through virtual consultations and coaching, with scheduling options for different time zones.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${poppins.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ fontFamily: "var(--font-manrope), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
