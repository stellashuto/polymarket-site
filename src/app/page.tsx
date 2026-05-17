import { LocaleHome } from "@/components/LocaleHome";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { category } = await searchParams;
  return <LocaleHome locale="ja" category={category ?? "all"} />;
}
