import type { Metadata } from "next";

import DevicesPage from "@/components/DevicesPage";

export const metadata: Metadata = {
  title: "Electricity consumption of household devices",

  description:
    "Explore common household devices and calculate their electricity costs, from kitchen and laundry appliances to office and entertainment devices.",

  alternates: {
    canonical: "/en/devices",
    languages: {
      de: "/geraete",
      en: "/en/devices",
      "x-default": "/geraete",
    },
  },
};

export default function EnglishDevicesPage() {
  return <DevicesPage locale="en" />;
}