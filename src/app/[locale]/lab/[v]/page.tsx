import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { localeFor } from "@/lib/page";
import { LabA } from "@/lab/LabA";
import { LabB } from "@/lab/LabB";
import { LabC } from "@/lab/LabC";

/** Design explorations — not indexed, not in the sitemap. */
export const dynamicParams = false;
export const generateStaticParams = () => ["a", "b", "c"].map((v) => ({ v }));
export const metadata: Metadata = { title: "Laboratorio — 24SHOOTS", robots: { index: false, follow: false } };

const views = { a: LabA, b: LabB, c: LabC } as const;

export default async function Lab({ params }: { params: Promise<{ locale: string; v: string }> }) {
  await localeFor(params, "es");
  const View = views[(await params).v as keyof typeof views];
  if (!View) notFound();
  return <View />;
}
