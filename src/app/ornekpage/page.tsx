import type { Metadata } from "next";
import SampleHome from "@/components/sample/SampleHome";

export const metadata: Metadata = {
  title: "Melis'ime..",
  description: "Haziran'da başlayan o masal.",
};

export default function OrnekPage() {
  return <SampleHome />;
}
