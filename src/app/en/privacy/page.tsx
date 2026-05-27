import type { Metadata } from "next";
import Link from "next/link";
import { LanguageToggle } from "@/components/LanguageToggle";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cryptobrief.app";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "CryptoBrief privacy policy. Information about third-party ads, analytics, and affiliate programs.",
  alternates: {
    canonical: `${SITE_URL}/en/privacy`,
    languages: {
      "ja": `${SITE_URL}/privacy`,
      "en": `${SITE_URL}/en/privacy`,
      "x-default": `${SITE_URL}/privacy`,
    },
  },
};

export default function PrivacyPageEn() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/en" className="flex items-baseline gap-1.5">
            <span className="text-blue-700 font-black text-lg tracking-tight">Crypto</span>
            <span className="text-slate-900 font-black text-lg tracking-tight">Brief</span>
            <span className="text-slate-400 font-bold text-xs tracking-wider ml-0.5">JP</span>
          </Link>
          <div className="ml-auto">
            <LanguageToggle current="en" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 prose prose-slate
        prose-headings:text-slate-900
        prose-h1:text-2xl prose-h1:font-black
        prose-h2:text-xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-3
        prose-p:text-slate-700 prose-p:leading-7
        prose-a:text-blue-700">
        <h1>Privacy Policy</h1>
        <p>CryptoBrief (&quot;we&quot;, &quot;us&quot;) takes the privacy of our users seriously and handles information according to the following policies.</p>

        <h2>1. Third-party advertising</h2>
        <p>This site uses Google AdSense for ad serving. Google and other third-party vendors may use cookies to serve ads based on a user&apos;s prior visits to this and other websites.</p>
        <p>To opt out of personalized advertising, visit <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google&apos;s Ads Settings</a> or <a href="https://www.aboutads.info/" target="_blank" rel="noopener">www.aboutads.info</a>.</p>

        <h2>2. Analytics</h2>
        <p>We may use analytics tools such as Vercel Analytics and Google Analytics to understand site usage. These tools use cookies but do not collect personally identifiable information.</p>

        <h2>3. Affiliate programs</h2>
        <p>This site participates in affiliate programs (A8.net, Amazon Associates, etc.) and may earn referral fees when users sign up for services through links in our articles.</p>

        <h2>4. Disclaimer</h2>
        <p>Information published on this site is based on data and reporting available at the time of writing. While we do our best to ensure accuracy and completeness, we make no warranties. Investment decisions are your own responsibility.</p>

        <h2>5. Copyright</h2>
        <p>Articles on this site are originally written commentary based on public information and reporting. Source attribution is provided in each article. Republication of our content without permission is prohibited.</p>

        <h2>6. Contact</h2>
        <p>For inquiries, please contact the site operator directly.</p>

        <p className="text-sm text-slate-500 mt-10">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </main>

      <footer className="border-t border-slate-200 mt-12">
        <div className="max-w-3xl mx-auto px-4 py-8 text-xs text-slate-500">
          <Link href="/en" className="hover:underline">← Back to home</Link>
        </div>
      </footer>
    </div>
  );
}
