import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DeviceDetailPage from "@/components/DeviceDetailPage";
import { devices } from "@/data/devices";
import { getLocalizedDeviceSlug } from "@/i18n/devices";

type DevicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return devices.map((device) => ({
    slug: device.slug,
  }));
}

export async function generateMetadata({
  params,
}: DevicePageProps): Promise<Metadata> {
  const { slug } = await params;

  const device = devices.find(
    (item) => item.slug === slug
  );

  if (!device) {
    return {};
  }

  const englishSlug =
    getLocalizedDeviceSlug(device, "en");

  return {
    title: `${device.name} Stromkosten berechnen`,

    description: device.description,

    alternates: {
      canonical: `/geraete/${device.slug}`,
      languages: {
        de: `/geraete/${device.slug}`,
        en: `/en/devices/${englishSlug}`,
        "x-default": `/geraete/${device.slug}`,
      },
    },
  };
}

export default async function DevicePage({
  params,
}: DevicePageProps) {
  const { slug } = await params;

  const device = devices.find(
    (item) => item.slug === slug
  );

  if (!device) {
    notFound();
  }

  return (
    <DeviceDetailPage
      device={device}
      locale="de"
    />
  );
}