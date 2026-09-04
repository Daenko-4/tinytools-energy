"use client";

import { useState } from "react";
import { devices } from "@/data/devices";

const CUSTOM_DEVICE = "Eigenes Gerät";

const categories = Array.from(
  new Set(devices.map((device) => device.category))
);

type Mode = "estimate" | "exact";

type EnergyCalculatorProps = {
  initialDevice?: string;
};

function formatEuro(value: number) {
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatKwh(value: number) {
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

function nonNegative(value: number) {
  return Math.max(0, value);
}

export default function EnergyCalculator({
  initialDevice = "Wasserkocher",
}: EnergyCalculatorProps) {
  const initialDeviceData =
    devices.find((item) => item.name === initialDevice) ??
    devices[0];

  const initialWatts =
    initialDeviceData.watts ?? 0;

  const initialMinutes =
    initialDeviceData.typicalMinutes ?? 0;

  const initialUses =
    initialDeviceData.typicalUsesPerWeek ?? 1;

  const initialEstimatedKwh =
    initialDeviceData.kwhPerUse ?? 0;

  const initialMeasuredKwh =
    initialDeviceData.calculationType === "consumption"
      ? initialDeviceData.kwhPerUse ?? 0
      : (initialWatts / 1000) * (initialMinutes / 60);

  const [mode, setMode] = useState<Mode>("estimate");

  const [device, setDevice] = useState(initialDeviceData.name);
  const [customDeviceName, setCustomDeviceName] = useState("");

  const [price, setPrice] = useState(0.35);
  const [watts, setWatts] = useState(initialWatts);
  const [minutesPerUse, setMinutesPerUse] =
    useState(initialMinutes);
  const [usesPerWeek, setUsesPerWeek] =
    useState(initialUses);

  const [estimatedKwhPerUse, setEstimatedKwhPerUse] =
    useState(initialEstimatedKwh);

  const [measuredKwhPerUse, setMeasuredKwhPerUse] =
    useState(Number(initialMeasuredKwh.toFixed(3)));

  const selectedDevice = devices.find(
    (item) => item.name === device
  );

  const isCustomDevice = device === CUSTOM_DEVICE;

  const isPowerDevice =
    isCustomDevice ||
    selectedDevice?.calculationType === "power";

  const isConsumptionDevice =
    !isCustomDevice &&
    selectedDevice?.calculationType === "consumption";

  const displayDeviceName =
    isCustomDevice && customDeviceName.trim()
      ? customDeviceName.trim()
      : device;

  function loadDeviceDefaults(name: string) {
    if (name === CUSTOM_DEVICE) {
      setCustomDeviceName("");
      setWatts(0);
      setMinutesPerUse(0);
      setUsesPerWeek(1);
      setEstimatedKwhPerUse(0);
      setMeasuredKwhPerUse(0);
      return;
    }

    const selected = devices.find(
      (item) => item.name === name
    );

    if (!selected) {
      return;
    }

    setWatts(selected.watts ?? 0);
    setMinutesPerUse(selected.typicalMinutes ?? 0);
    setUsesPerWeek(selected.typicalUsesPerWeek ?? 1);
    setEstimatedKwhPerUse(selected.kwhPerUse ?? 0);

    if (selected.calculationType === "consumption") {
      setMeasuredKwhPerUse(selected.kwhPerUse ?? 0);
    } else {
      const estimatedConsumption =
        ((selected.watts ?? 0) / 1000) *
        ((selected.typicalMinutes ?? 0) / 60);

      setMeasuredKwhPerUse(
        Number(estimatedConsumption.toFixed(3))
      );
    }
  }

  function handleDeviceChange(name: string) {
    setDevice(name);
    loadDeviceDefaults(name);
  }

  function handleReset() {
    setPrice(0.35);
    loadDeviceDefaults(device);
  }

  const calculatedPowerKwhPerUse =
    (watts / 1000) * (minutesPerUse / 60);

  const estimateKwhPerUse = isConsumptionDevice
    ? estimatedKwhPerUse
    : calculatedPowerKwhPerUse;

  const actualKwhPerUse =
    mode === "estimate"
      ? estimateKwhPerUse
      : measuredKwhPerUse;

  const hasValidPrice = price > 0;
  const hasValidUses = usesPerWeek > 0;

  const hasValidConsumption =
    mode === "exact"
      ? measuredKwhPerUse > 0
      : isConsumptionDevice
        ? estimatedKwhPerUse > 0
        : watts > 0 && minutesPerUse > 0;

  const calculationIsValid =
    hasValidPrice &&
    hasValidUses &&
    hasValidConsumption;

  const yearlyKwh = calculationIsValid
    ? actualKwhPerUse * usesPerWeek * 52
    : 0;

  const yearlyCost = yearlyKwh * price;
  const monthlyCost = yearlyCost / 12;
  const weeklyCost = yearlyCost / 52;
  const costPerUse = actualKwhPerUse * price;

  const warnings: string[] = [];

  if (price > 1) {
    warnings.push(
      "Der Strompreis ist ungewöhnlich hoch. Prüfe bitte deine Eingabe."
    );
  }

  if (usesPerWeek > 168) {
    warnings.push(
      "Mehr als 168 Nutzungen pro Woche wirken ungewöhnlich. Prüfe bitte deine Eingabe."
    );
  }

  if (
    mode === "estimate" &&
    isPowerDevice &&
    watts > 10000
  ) {
    warnings.push(
      "Eine Leistung über 10.000 W ist für ein typisches Haushaltsgerät ungewöhnlich."
    );
  }

  if (
    mode === "estimate" &&
    isPowerDevice &&
    minutesPerUse > 1440
  ) {
    warnings.push(
      "Die angegebene Nutzungsdauer liegt über 24 Stunden pro Nutzung."
    );
  }

  if (
    mode === "exact" &&
    measuredKwhPerUse > 50
  ) {
    warnings.push(
      "Mehr als 50 kWh pro Nutzung ist für ein typisches Haushaltsgerät ungewöhnlich."
    );
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
      {/* Gerät */}
      <div className="mb-8">
        <label className="mb-2 block font-medium text-slate-700">
          Gerät
        </label>

        <select
          value={device}
          onChange={(event) =>
            handleDeviceChange(event.target.value)
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
        >
          {categories.map((category) => (
            <optgroup key={category} label={category}>
              {devices
                .filter(
                  (item) => item.category === category
                )
                .map((item) => (
                  <option
                    key={item.name}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
            </optgroup>
          ))}

          <optgroup label="Andere">
            <option value={CUSTOM_DEVICE}>
              Eigenes Gerät
            </option>
          </optgroup>
        </select>
      </div>

      {/* Eigenes Gerät */}
      {isCustomDevice && (
        <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <label className="mb-2 block font-medium text-slate-700">
            Name des Geräts
          </label>

          <input
            type="text"
            value={customDeviceName}
            onChange={(event) =>
              setCustomDeviceName(event.target.value)
            }
            placeholder="z. B. Ventilator"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
          />

          <p className="mt-2 text-sm text-slate-600">
            Optional – der Name erscheint später in deinem Ergebnis.
          </p>
        </div>
      )}

      {/* Modus */}
      <div className="mb-8">
        <p className="mb-2 font-medium text-slate-700">
          Wie möchtest du rechnen?
        </p>

        <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setMode("estimate")}
            className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
              mode === "estimate"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            ⚡ Schnell schätzen
          </button>

          <button
            type="button"
            onClick={() => setMode("exact")}
            className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
              mode === "exact"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            🎯 Genau berechnen
          </button>
        </div>

        <p className="mt-3 text-sm text-slate-500">
          {mode === "estimate"
            ? "TinyTools verwendet Orientierungswerte, die du an deine Nutzung anpassen kannst."
            : "Nutze einen gemessenen oder anderweitig bekannten Verbrauch in kWh pro Nutzung."}
        </p>
      </div>

      {/* Eingaben */}
      <div className="grid gap-6 sm:grid-cols-2">
        {mode === "estimate" && isPowerDevice && (
          <>
            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Leistung
              </label>

              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={watts}
                  onChange={(event) =>
                    setWatts(
                      nonNegative(
                        Number(event.target.value)
                      )
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-14"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  W
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {isCustomDevice
                  ? "Die Wattzahl findest du häufig auf dem Typenschild."
                  : "Orientierungswert – prüfe wenn möglich die Angabe auf deinem Gerät."}
              </p>
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Minuten pro Nutzung
              </label>

              <input
                type="number"
                min="0"
                step="1"
                value={minutesPerUse}
                onChange={(event) =>
                  setMinutesPerUse(
                    nonNegative(
                      Number(event.target.value)
                    )
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />

              <p className="mt-1 text-sm text-slate-500">
                {isCustomDevice
                  ? "Trage die ungefähre Laufzeit pro Nutzung ein."
                  : "Vorgeschlagener Startwert – bitte an deine Nutzung anpassen."}
              </p>
            </div>
          </>
        )}

        {mode === "estimate" && isConsumptionDevice && (
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Verbrauch pro Nutzung
            </label>

            <div className="relative">
              <input
                type="number"
                min="0"
                step="0.01"
                value={estimatedKwhPerUse}
                onChange={(event) =>
                  setEstimatedKwhPerUse(
                    nonNegative(
                      Number(event.target.value)
                    )
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-16"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                kWh
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Orientierungswert – passe ihn an, wenn du einen besseren
              Wert für dein Gerät oder Programm kennst.
            </p>
          </div>
        )}

        {mode === "exact" && (
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Tatsächlicher Verbrauch pro Nutzung
            </label>

            <div className="relative">
              <input
                type="number"
                min="0"
                step="0.01"
                value={measuredKwhPerUse}
                onChange={(event) =>
                  setMeasuredKwhPerUse(
                    nonNegative(
                      Number(event.target.value)
                    )
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-16"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                kWh
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Zum Beispiel ein Wert aus einem Strommessgerät oder einer
              Herstellerangabe.
            </p>
          </div>
        )}

        {/* Strompreis */}
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Strompreis
          </label>

          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(event) =>
                setPrice(
                  nonNegative(
                    Number(event.target.value)
                  )
                )
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-16"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              €/kWh
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Deinen Arbeitspreis findest du auf deiner Stromrechnung.
          </p>
        </div>

        {/* Nutzungen */}
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Nutzungen pro Woche
          </label>

          <input
            type="number"
            min="0"
            step="0.1"
            value={usesPerWeek}
            onChange={(event) =>
              setUsesPerWeek(
                nonNegative(
                  Number(event.target.value)
                )
              )
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
          />

          <p className="mt-1 text-sm text-slate-500">
            Auch Dezimalwerte sind möglich, zum Beispiel 0,5 für etwa
            jede zweite Woche.
          </p>
        </div>
      </div>

      {/* Eingabehinweis */}
      {!calculationIsValid && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="font-semibold text-slate-900">
            Noch fehlen Angaben
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            Gib für alle benötigten Felder einen Wert größer als 0 ein,
            damit TinyTools deine Stromkosten berechnen kann.
          </p>
        </div>
      )}

      {/* Warnungen */}
      {warnings.length > 0 && (
        <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-4">
          <p className="font-semibold text-slate-900">
            🔎 Bitte kurz prüfen
          </p>

          <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-600">
            {warnings.map((warning) => (
              <li key={warning}>• {warning}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Ergebnis */}
      <div className="mt-8 rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
        {calculationIsValid ? (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium text-slate-300">
                {displayDeviceName} kostet dich
              </p>

              <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-200">
                {mode === "estimate"
                  ? "Schätzung"
                  : "Eigener Verbrauchswert"}
              </span>
            </div>

            <div className="mt-3">
              <span className="text-4xl font-bold sm:text-5xl">
                {formatEuro(yearlyCost)} €
              </span>

              <span className="ml-2 text-slate-300">
                pro Jahr
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Pro Nutzung
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {formatEuro(costPerUse)} €
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Pro Woche
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {formatEuro(weeklyCost)} €
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Pro Monat
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {formatEuro(monthlyCost)} €
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Verbrauch/Jahr
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {formatKwh(yearlyKwh)} kWh
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-slate-300">
              Dein Ergebnis
            </p>

            <p className="mt-3 text-2xl font-bold">
              Bereit, sobald deine Angaben vollständig sind.
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              TinyTools zeigt dir dann Kosten pro Nutzung, Woche,
              Monat und Jahr.
            </p>
          </>
        )}
      </div>

      {/* Spartipp */}
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="font-semibold text-slate-900">
          💡 Spartipp
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {isCustomDevice
            ? "Prüfe die Leistungs- oder Verbrauchsangabe auf dem Typenschild, in der Bedienungsanleitung oder mit einem Strommessgerät."
            : selectedDevice?.tip ??
              "Vergleiche deinen tatsächlichen Verbrauch mit dem geschätzten Wert."}
        </p>
      </div>

      {/* Genauigkeit */}
      <div className="mt-6 rounded-xl bg-slate-50 p-4">
        <p className="text-sm leading-6 text-slate-500">
          {mode === "estimate"
            ? isConsumptionDevice
              ? "Die Berechnung nutzt einen anpassbaren Orientierungswert für den Verbrauch pro Nutzung. Der tatsächliche Verbrauch kann je nach Gerät, Programm und Nutzung abweichen."
              : "Die Berechnung nutzt Leistung × Nutzungsdauer als Näherung. Bei Geräten, deren Leistungsaufnahme während des Betriebs schwankt, kann der tatsächliche Verbrauch abweichen."
            : "Die Berechnung verwendet den von dir angegebenen Verbrauch pro Nutzung. Die Genauigkeit hängt davon ab, wie zuverlässig dieser Wert ermittelt wurde."}
        </p>
      </div>

      {/* Feedback */}
      <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5 sm:p-6">
        <p className="font-semibold text-slate-900">
          💬 Hat dir TinyTools geholfen?
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Fehlt dir ein Gerät, war etwas unklar oder hast du eine Idee,
          wie TinyTools besser werden kann? Kurzes Feedback hilft uns sehr.
        </p>

        {/* HIER DEINE E-MAIL-ADRESSE EINTRAGEN */}
        <a
          href="mailto:dan.florian@gmx.at?subject=Feedback%20zu%20TinyTools%20Energy"
          className="mt-4 inline-flex items-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Feedback senden →
        </a>

        <p className="mt-3 text-xs leading-5 text-slate-500">
          Der Button öffnet dein E-Mail-Programm. TinyTools speichert dabei
          keine Daten und verwendet weiterhin kein Tracking.
        </p>
      </div>

      {/* Reset */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
        >
          Werte zurücksetzen
        </button>
      </div>
    </section>
  );
}