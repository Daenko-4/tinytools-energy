import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DeviceDetailPage from "@/components/DeviceDetailPage";
import { devices } from "@/data/devices";
import {
  findDeviceByLocalizedSlug,
  getLocalizedDevice,
} from "@/i18n/devices";

type EnglishDevicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return devices.map((device) => ({
    slug: getLocalizedDevice(
      device,
      "en"
    ).slug,
  }));
}

export async function generateMetadata({
  params,
}: EnglishDevicePageProps): Promise<Metadata> {
  const { slug } = await params;

  const device =
    findDeviceByLocalizedSlug(
      devices,
      slug,
      "en"
    );

  if (!device) {
    return {};
  }

  const localizedDevice =
    getLocalizedDevice(device, "en");

  return {
    title: `${localizedDevice.name} electricity cost calculator`,

    description:
      localizedDevice.description,

    alternates: {
      canonical: `/en/devices/${localizedDevice.slug}`,
      languages: {
        de: `/geraete/${device.slug}`,
        en: `/en/devices/${localizedDevice.slug}`,
        "x-default": `/geraete/${device.slug}`,
      },
    },
  };
}

export default async function EnglishDevicePage({
  params,
}: EnglishDevicePageProps) {
  const { slug } = await params;

  const device =
    findDeviceByLocalizedSlug(
      devices,
      slug,
      "en"
    );

  if (!device) {
    notFound();
  }

  return (
    <DeviceDetailPage
      device={device}
      locale="en"
    />
  );
}