import React, { useEffect, useState, ChangeEvent, JSX } from "react";

type Rates = {
  [key: string]: number;
};

const currencies = [
  "EUR",
  "USD",
  "GBP",
  "JPY",
  "CHF",
  "AUD",
  "CAD",
  "RUB",
  "SEK",
  "NOK",
  "DKK",
  "PLN",
  "CZK",
  "HUF",
  "TRY",
];


const currencyNames: { [key: string]: string } = {
  EUR: "Euro (Euroområdet, inkl. Spanien, Frankrike, Tyskland, Italien, Nederländerna m.fl.)",
  USD: "Amerikansk dollar (USA)",
  GBP: "Brittiskt pund (Storbritannien)",
  JPY: "Japansk yen (Japan)",
  CHF: "Schweizisk franc (Schweiz)",
  AUD: "Australisk dollar (Australien)",
  CAD: "Kanadensisk dollar (Kanada)",
  RUB: "Rysk rubel (Ryssland)",
  SEK: "Svensk krona (Sverige)",
  NOK: "Norsk krona (Norge)",
  DKK: "Dansk krona (Danmark)",
  PLN: "Polsk zloty (Polen)",
  CZK: "Tjeckisk koruna (Tjeckien)",
  HUF: "Ungersk forint (Ungern)",
  TRY: "Turkisk lira (Turkiet)",
};


export default function CurrencyConverter(): JSX.Element {
  const [rates, setRates] = useState<Rates>({});
  const [amountSEK, setAmountSEK] = useState<string>("0");
  const [targetCurrency, setTargetCurrency] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRates() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/SEK");
        if (!res.ok) throw new Error("Något gick fel vid hämtning av valutakurser.");
        const data = await res.json();
        setRates(data.rates);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Ett okänt fel inträffade.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchRates();
  }, []);

  function handleAmountChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val === "" || /^[0-9\b.]+$/.test(val)) {
      setAmountSEK(val);
    }
  }

  function handleCurrencyChange(e: ChangeEvent<HTMLSelectElement>) {
    setTargetCurrency(e.target.value);
  }

  useEffect(() => {
    const amountNum = Number(amountSEK);
    if (!isNaN(amountNum) && rates[targetCurrency]) {
      setConvertedAmount(amountNum * rates[targetCurrency]);
    } else {
      setConvertedAmount(null);
    }
  }, [amountSEK, targetCurrency, rates]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md font-sans">
      <h2 className="text-2xl font-semibold mb-6 text-center">Valutaomvandlare SEK → {targetCurrency}</h2>

      {loading && <p className="text-center text-gray-500">Laddar valutakurser...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="mb-4">
            <label htmlFor="amountSEK" className="block mb-2 font-medium">
              Belopp i SEK:
            </label>
            <input
              id="amountSEK"
              type="text"
              value={amountSEK}
              onChange={handleAmountChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Skriv in belopp i SEK"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="currency" className="block mb-2 font-medium">
              Välj valuta:
            </label>
            <select
              id="currency"
              value={targetCurrency}
              onChange={handleCurrencyChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>

          <h3 className="text-xl font-semibold text-center">
            Omvandlat belopp:{" "}
            <span className="text-blue-600">
              {convertedAmount !== null ? convertedAmount.toFixed(2) : "---"} {targetCurrency}
            </span>
          </h3>

          <p className="text-center text-gray-600 mt-2">
            {currencyNames[targetCurrency] || ""}
          </p>
        </>
      )}
    </div>
  );
}
