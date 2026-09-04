"use client";

import { useRef, useState } from "react";
import { devices } from "@/data/devices";

const CUSTOM_DEVICE = "Eigenes Gerät";

const categories = Array.from(
  new Set(devices.map((device) => device.category))
);

type Mode = "estimate" | "exact";
type NumericInput = number | "";

type EnergyCalculatorProps = {
  initialDevice?: string;
  controlledMode?: Mode;
  onModeChange?: (mode: Mode) => void;
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

function parseNumericInput(value: string): NumericInput {
  if (value === "") {
    return "";
  }

  return nonNegative(Number(value));
}

function numericValue(value: NumericInput) {
  return value === "" ? 0 : value;
}

function LeafIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 4C12 4 6 8 5 16c4.5.6 8.2-.7 11-3.5C18.2 10.3 19.4 7.4 20 4Z" />
      <path d="M5 20c2.3-5.2 5.8-9 11-11.5" />
    </svg>
  );
}

function CalculatorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8" />
      <path d="M8 11h2" />
      <path d="M12 11h2" />
      <path d="M16 11h1" />
      <path d="M8 15h2" />
      <path d="M12 15h2" />
      <path d="M16 15h1" />
      <path d="M8 18h2" />
      <path d="M12 18h5" />
    </svg>
  );
}

export default function EnergyCalculator({
  initialDevice = "Wasserkocher",
  controlledMode,
  onModeChange,
}: EnergyCalculatorProps) {
  const initialDeviceData =
    devices.find((item) => item.name === initialDevice) ??
    devices[0];

  const initialWatts = initialDeviceData.watts ?? 0;
  const initialMinutes = initialDeviceData.typicalMinutes ?? 0;
  const initialUses = initialDeviceData.typicalUsesPerWeek ?? 1;
  const initialEstimatedKwh = initialDeviceData.kwhPerUse ?? 0;

  const initialMeasuredKwh =
    initialDeviceData.calculationType === "consumption"
      ? initialDeviceData.kwhPerUse ?? 0
      : (initialWatts / 1000) * (initialMinutes / 60);

  const [internalMode, setInternalMode] =
    useState<Mode>("estimate");

  const mode = controlledMode ?? internalMode;

  function changeMode(newMode: Mode) {
    setInternalMode(newMode);
    onModeChange?.(newMode);
  }

  const [device, setDevice] = useState(initialDeviceData.name);
  const [customDeviceName, setCustomDeviceName] = useState("");

  const [price, setPrice] = useState<NumericInput>(0.35);
  const [watts, setWatts] = useState<NumericInput>(initialWatts);
  const [minutesPerUse, setMinutesPerUse] =
    useState<NumericInput>(initialMinutes);
  const [usesPerWeek, setUsesPerWeek] =
    useState<NumericInput>(initialUses);

  const [estimatedKwhPerUse, setEstimatedKwhPerUse] =
    useState<NumericInput>(initialEstimatedKwh);

  const [measuredKwhPerUse, setMeasuredKwhPerUse] =
    useState<NumericInput>(Number(initialMeasuredKwh.toFixed(3)));

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

    window.requestAnimationFrame(() => {
      document.getElementById("rechner")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  const resultRef = useRef<HTMLDivElement>(null);

  function scrollToResultAfterLastField() {
    if (window.innerWidth >= 640) {
      return;
    }

    window.setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 120);
  }

  function handleCalculatorFieldFocus() {
    if (window.innerWidth < 640) {
      return;
    }

    window.setTimeout(() => {
      const resultElement = resultRef.current;

      if (!resultElement) {
        return;
      }

      const resultRect = resultElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const resultIsAlreadyVisible =
        resultRect.top < viewportHeight * 0.82 &&
        resultRect.bottom > 96;

      if (resultIsAlreadyVisible) {
        return;
      }

      const resultTargetPosition = viewportHeight * 0.58;

      window.scrollBy({
        top: resultRect.top - resultTargetPosition,
        behavior: "smooth",
      });
    }, 80);
  }


  const priceValue = numericValue(price);
  const wattsValue = numericValue(watts);
  const minutesPerUseValue = numericValue(minutesPerUse);
  const usesPerWeekValue = numericValue(usesPerWeek);
  const estimatedKwhPerUseValue = numericValue(estimatedKwhPerUse);
  const measuredKwhPerUseValue = numericValue(measuredKwhPerUse);

  const calculatedPowerKwhPerUse =
    (wattsValue / 1000) * (minutesPerUseValue / 60);

  const estimateKwhPerUse = isConsumptionDevice
    ? estimatedKwhPerUseValue
    : calculatedPowerKwhPerUse;

  const actualKwhPerUse =
    mode === "estimate"
      ? estimateKwhPerUse
      : measuredKwhPerUseValue;

  const hasValidPrice = priceValue > 0;
  const hasValidUses = usesPerWeekValue > 0;

  const hasValidConsumption =
    mode === "exact"
      ? measuredKwhPerUseValue > 0
      : isConsumptionDevice
        ? estimatedKwhPerUseValue > 0
        : wattsValue > 0 && minutesPerUseValue > 0;

  const calculationIsValid =
    hasValidPrice &&
    hasValidUses &&
    hasValidConsumption;

  const yearlyKwh = calculationIsValid
    ? actualKwhPerUse * usesPerWeekValue * 52
    : 0;

  const yearlyCost = yearlyKwh * priceValue;
  const monthlyCost = yearlyCost / 12;
  const weeklyCost = yearlyCost / 52;
  const costPerUse = actualKwhPerUse * priceValue;

  const warnings: string[] = [];

  if (priceValue > 1) {
    warnings.push(
      "Der Strompreis ist ungewöhnlich hoch. Prüfe bitte deine Eingabe."
    );
  }

  if (usesPerWeekValue > 168) {
    warnings.push(
      "Mehr als 168 Nutzungen pro Woche wirken ungewöhnlich. Prüfe bitte deine Eingabe."
    );
  }

  if (
    mode === "estimate" &&
    isPowerDevice &&
    wattsValue > 10000
  ) {
    warnings.push(
      "Eine Leistung über 10.000 W ist für ein typisches Haushaltsgerät ungewöhnlich."
    );
  }

  if (
    mode === "estimate" &&
    isPowerDevice &&
    minutesPerUseValue > 1440
  ) {
    warnings.push(
      "Die angegebene Nutzungsdauer liegt über 24 Stunden pro Nutzung."
    );
  }

  if (
    mode === "exact" &&
    measuredKwhPerUseValue > 50
  ) {
    warnings.push(
      "Mehr als 50 kWh pro Nutzung ist für ein typisches Haushaltsgerät ungewöhnlich."
    );
  }

  const fieldClassName =
    "w-full rounded-xl border border-slate-200 bg-[#fbfcfb] px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-400 focus:bg-white focus:ring-4 focus:ring-green-100";

  return (
    <section className="rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.25)] sm:p-8">
      {/* Modus */}
      <div className="mb-8">
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-50 p-1.5">
          <button
            type="button"
            onClick={() => changeMode("estimate")}
            className={`relative flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold transition ${
              mode === "estimate"
                ? "bg-green-50 text-green-800 shadow-sm"
                : "text-slate-500 hover:bg-white/60 hover:text-slate-900"
            }`}
          >
            <LeafIcon />
            <span>Gerät auswählen</span>

          </button>

          <button
            type="button"
            onClick={() => changeMode("exact")}
            className={`relative flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold transition ${
              mode === "exact"
                ? "bg-green-50 text-green-800 shadow-sm"
                : "text-slate-500 hover:bg-white/60 hover:text-slate-900"
            }`}
          >
            <CalculatorIcon />
            <span>Eigene Werte</span>

          </button>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          {mode === "estimate"
            ? "TinyTools verwendet Orientierungswerte, die du an deine Nutzung anpassen kannst."
            : "Nutze einen gemessenen oder anderweitig bekannten Verbrauch in kWh pro Nutzung."}
        </p>
      </div>

      {/* Gerät */}
      <div className="mb-8">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Gerät
        </label>

        <select
          value={device}
          onChange={(event) =>
            handleDeviceChange(event.target.value)
          }
          className={fieldClassName}
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
        <div className="mb-8 rounded-2xl border border-green-100 bg-green-50/70 p-5">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Name des Geräts
          </label>

          <input
            type="text"
            value={customDeviceName}
            onChange={(event) =>
              setCustomDeviceName(event.target.value)
            }
            placeholder="z. B. Ventilator"
            className={fieldClassName}
          />

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Optional – der Name erscheint später in deinem Ergebnis.
          </p>
        </div>
      )}

      {/* Eingaben */}
      <div className="grid gap-6 sm:grid-cols-2">
        {mode === "estimate" && isPowerDevice && (
          <>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Leistung
              </label>

              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={watts}
                  onFocus={handleCalculatorFieldFocus}
                  onChange={(event) =>
                    setWatts(parseNumericInput(event.target.value))
                  }
                  className={`${fieldClassName} pr-14`}
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                  W
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {isCustomDevice
                  ? "Die Wattzahl findest du häufig auf dem Typenschild."
                  : "Orientierungswert – prüfe wenn möglich die Angabe auf deinem Gerät."}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Minuten pro Nutzung
              </label>

              <input
                type="number"
                min="0"
                step="1"
                value={minutesPerUse}
                onFocus={handleCalculatorFieldFocus}
                onChange={(event) =>
                  setMinutesPerUse(parseNumericInput(event.target.value))
                }
                className={fieldClassName}
              />

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {isCustomDevice
                  ? "Trage die ungefähre Laufzeit pro Nutzung ein."
                  : "Vorgeschlagener Startwert – bitte an deine Nutzung anpassen."}
              </p>
            </div>
          </>
        )}

        {mode === "estimate" && isConsumptionDevice && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Verbrauch pro Nutzung
            </label>

            <div className="relative">
              <input
                type="number"
                min="0"
                step="0.01"
                value={estimatedKwhPerUse}
                onFocus={handleCalculatorFieldFocus}
                onChange={(event) =>
                  setEstimatedKwhPerUse(
                    parseNumericInput(event.target.value)
                  )
                }
                className={`${fieldClassName} pr-16`}
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                kWh
              </span>
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Orientierungswert – passe ihn an, wenn du einen besseren
              Wert für dein Gerät oder Programm kennst.
            </p>
          </div>
        )}

        {mode === "exact" && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Tatsächlicher Verbrauch pro Nutzung
            </label>

            <div className="relative">
              <input
                type="number"
                min="0"
                step="0.01"
                value={measuredKwhPerUse}
                onFocus={handleCalculatorFieldFocus}
                onChange={(event) =>
                  setMeasuredKwhPerUse(
                    parseNumericInput(event.target.value)
                  )
                }
                className={`${fieldClassName} pr-16`}
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                kWh
              </span>
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Zum Beispiel ein Wert aus einem Strommessgerät oder einer
              Herstellerangabe.
            </p>
          </div>
        )}

        {/* Strompreis */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Strompreis
          </label>

          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
                onFocus={handleCalculatorFieldFocus}
              onChange={(event) =>
                setPrice(parseNumericInput(event.target.value))
              }
              className={`${fieldClassName} pr-16`}
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
              €/kWh
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Deinen Arbeitspreis findest du auf deiner Stromrechnung.
          </p>
        </div>

        {/* Nutzungen */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Nutzungen pro Woche
          </label>

          <input
            type="number"
            min="0"
            step="0.1"
            value={usesPerWeek}
            onFocus={handleCalculatorFieldFocus}
            onBlur={scrollToResultAfterLastField}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.currentTarget.blur();
              }
            }}
            onChange={(event) =>
              setUsesPerWeek(parseNumericInput(event.target.value))
            }
            className={fieldClassName}
          />

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Auch Dezimalwerte sind möglich, zum Beispiel 0,5 für etwa
            jede zweite Woche.
          </p>
        </div>
      </div>

      {/* Eingabehinweis */}
      {!calculationIsValid && (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
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
        <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-4">
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
      <div
        ref={resultRef}
        className="mt-8 rounded-2xl bg-gradient-to-br from-green-950 via-green-900 to-emerald-950 p-6 text-white shadow-lg shadow-green-950/10 sm:p-8"
      >
        {calculationIsValid ? (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium text-green-100/80">
                {displayDeviceName} kostet dich
              </p>

              <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-semibold text-green-50">
                {mode === "estimate"
                  ? "Schätzung"
                  : "Eigener Verbrauchswert"}
              </span>
            </div>

            <div className="mt-3">
              <span className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                {formatEuro(yearlyCost)} €
              </span>

              <span className="ml-2 text-green-100/80">
                pro Jahr
              </span>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-green-100/75">
                  Pro Nutzung
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {formatEuro(costPerUse)} €
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-green-100/75">
                  Pro Woche
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {formatEuro(weeklyCost)} €
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-green-100/75">
                  Pro Monat
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {formatEuro(monthlyCost)} €
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-green-100/75">
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
            <p className="text-sm font-medium text-green-100/80">
              Dein Ergebnis
            </p>

            <p className="mt-3 text-2xl font-bold">
              Bereit, sobald deine Angaben vollständig sind.
            </p>

            <p className="mt-2 text-sm leading-6 text-green-100/80">
              TinyTools zeigt dir dann Kosten pro Nutzung, Woche,
              Monat und Jahr.
            </p>
          </>
        )}
      </div>

      {/* Spartipp */}
      <div className="mt-6 rounded-2xl border border-amber-200/80 bg-amber-50 p-5">
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
      <div className="mt-6 rounded-2xl border border-slate-100 bg-[#f7faf7] p-4">
        <p className="text-sm leading-6 text-slate-500">
          {mode === "estimate"
            ? isConsumptionDevice
              ? "Die Berechnung nutzt einen anpassbaren Orientierungswert für den Verbrauch pro Nutzung. Der tatsächliche Verbrauch kann je nach Gerät, Programm und Nutzung abweichen."
              : "Die Berechnung nutzt Leistung × Nutzungsdauer als Näherung. Bei Geräten, deren Leistungsaufnahme während des Betriebs schwankt, kann der tatsächliche Verbrauch abweichen."
            : "Die Berechnung verwendet den von dir angegebenen Verbrauch pro Nutzung. Die Genauigkeit hängt davon ab, wie zuverlässig dieser Wert ermittelt wurde."}
        </p>
      </div>

      {/* Feedback */}
      <div className="mt-6 rounded-2xl border border-green-200 bg-green-50/80 p-5 sm:p-6">
        <p className="font-semibold text-slate-900">
          💬 Hat dir TinyTools geholfen?
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Fehlt dir ein Gerät, war etwas unklar oder hast du eine Idee,
          wie TinyTools besser werden kann? Kurzes Feedback hilft uns sehr.
        </p>

        <a
          href="mailto:DAN.FLORIAN@GMX.AT?subject=Feedback%20zu%20TinyTools%20Energy"
          className="mt-4 inline-flex items-center rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 hover:shadow-md"
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
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
        >
          Werte zurücksetzen
        </button>
      </div>
    </section>
  );
}