import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { localeFor } from "@/lib/page";
import { LabA } from "@/lab/LabA";
import { LabB } from "@/lab/LabB";
import { LabC } from "@/lab/LabC";
import { ProtoA } from "@/lab/proto/ProtoA";
import { ProtoD } from "@/lab/proto/ProtoD";
import { ProtoE } from "@/lab/proto/ProtoE";
import { protoCases, protoFrames } from "@/lab/proto/data";

/**
 * Design explorations — not indexed, not in the sitemap.
 * a · d · d12 · e = prototypes of the directions under comparison (docs/research/PROTOTYPES-A-D-E.md).
 * v1-a · v1-b · v1-c = the earlier explorations, kept unchanged under new keys.
 */
export const dynamicParams = false;
export const generateStaticParams = () => ["a", "d", "d12", "e", "v1-a", "v1-b", "v1-c"].map((v) => ({ v }));
export const metadata: Metadata = { title: "Laboratorio — 24SHOOTS", robots: { index: false, follow: false } };

const legacy = { "v1-a": LabA, "v1-b": LabB, "v1-c": LabC } as const;

export default async function Lab({ params }: { params: Promise<{ locale: string; v: string }> }) {
  await localeFor(params, "es");
  const { v } = await params;
  if (v === "a") return <ProtoA frames={protoFrames()} cases={protoCases()} />;
  if (v === "d") return <ProtoD frames={protoFrames("(min-width: 768px) 64vw, 100vw")} />;
  if (v === "d12") return <ProtoD frames={protoFrames("(min-width: 768px) 64vw, 100vw").filter((f) => f.n % 2 === 0)} id="d12" />;
  if (v === "e") return <ProtoE frames={protoFrames("(min-width: 768px) 64vw, 100vw")} cases={protoCases()} />;
  const View = legacy[v as keyof typeof legacy];
  if (!View) notFound();
  return <View />;
}
