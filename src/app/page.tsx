import type { Metadata } from "next";

import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      de: "/",
      en: "/en",
      "x-default": "/",
    },
  },
};

export default function Page() {
  return <HomePage locale="de" />;
}