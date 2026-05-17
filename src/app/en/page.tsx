import type { Metadata } from "next";
import { LocaleHome } from "@/components/LocaleHome";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cryptobrief.app";

export const metadata: Metadata = {
  title: "CryptoBrief — Crypto, finance, and prediction market news",
  description:
    "Independent news media covering cryptocurrency, finance, and prediction markets including Polymarket. English edition.",
  alternates: {
    canonical: `${SITE_URL}/en`,
    languages: {
      "ja": `${SITE_URL}/`,
      "en": `${SITE_URL}/en`,
      "x-default": `${SITE_URL}/`,
    },
  },
};

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function HomeEn({ searchParams }: Props) {
  const { category } = await searchParams;
  return <LocaleHome locale="en" category={category ?? "all"} />;
}
