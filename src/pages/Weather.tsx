import { useState, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import useLocalStorage from "@/hooks/useLocalStorage";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { WEATHER_STRINGS } from "@/constants/weatherStrings";
import { buildWeatherUrl } from "@/constants/api";

interface City {
  city: string;
  lat: string;
  lng: string;
}

interface WeatherData {
  current_weather: {
    temperature: number;
    windspeed: number;
  };
}

interface StoredCity {
  name: string;
  weather: WeatherData;
}

export default function Weather() {
  const { t, i18n } = useTranslation();
  const [cities, setCities] = useState<City[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [loading, setLoading] = useState(false);

  const [lastTwo, setLastTwo] = useLocalStorage<StoredCity[]>(
    "lastTwoCities",
    []
  );

  const isRTL = i18n.language === "fa";

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    fetch(WEATHER_STRINGS.weatherFetchCities)
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error(WEATHER_STRINGS.weatherFailedFetchCities, err));
  }, []);

  const filteredCities = useMemo(() => {
    if (!search.trim()) return [];
    return cities
      .filter((c) => c.city.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 20);
  }, [search, cities]);

  const fetchWeather = async (city: City) => {
    const lat = parseFloat(city.lat);
    const lon = parseFloat(city.lng);
    try {
      const res = await fetch(buildWeatherUrl({ lat, lon }));
    return (await res.json()) as WeatherData;
    } catch (err) {
      console.error(err);
      console.log(WEATHER_STRINGS.weatherFailedFetchWeather)
      return null;
    }
  };

  const saveToLastTwo = (name: string, weather: WeatherData) => {
    setLastTwo((prev) => {
      const filtered = prev.filter((item) => item.name !== name);
      const updated = [{ name, weather }, ...filtered];
      return updated.slice(0, 2);
    });
  };

  const handleCitySelect = async (city: City) => {
    setLoading(true);
    if (selectedCity && weather) saveToLastTwo(selectedCity.city, weather);
    setSelectedCity(city);
    setSearch(city.city);
    const data = await fetchWeather(city);
    if (data) setWeather(data);
    setHighlightedIndex(-1);
    setLoading(false);
  };

  useEffect(() => {
    if (listRef.current && highlightedIndex >= 0) {
      const el = listRef.current.children[highlightedIndex] as HTMLElement;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  return (
    <div className="p-8 flex flex-col md:flex-row gap-4 dark:text-white min-h-screen">
      <div className={`flex-1 flex flex-col gap-4 order-${isRTL ? 2 : 1}`}>
        <h2 className="text-xl font-bold">{t("weather.searchTitle")}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (highlightedIndex >= 0 && filteredCities[highlightedIndex]) {
              handleCitySelect(filteredCities[highlightedIndex]);
            } else {
              const found = cities.find(
                (c) => c.city.toLowerCase() === search.toLowerCase()
              );
              if (found) handleCitySelect(found);
            }
          }}
        >
          <div className="relative mt-2">
            <input
              ref={inputRef}
              type="text"
              placeholder={t("weather.enterCity")}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHighlightedIndex(-1);
              }}
              onKeyDown={(e) => {
                if (!filteredCities.length) return;

                if (e.key === WEATHER_STRINGS.weatherArrowDown) {
                  e.preventDefault();
                  setHighlightedIndex((prev) =>
                    prev < filteredCities.length - 1 ? prev + 1 : 0
                  );
                } else if (e.key === WEATHER_STRINGS.weatherArrowUp) {
                  e.preventDefault();
                  setHighlightedIndex((prev) =>
                    prev > 0 ? prev - 1 : filteredCities.length - 1
                  );
                } else if (e.key === WEATHER_STRINGS.weatherEnter) {
                  e.preventDefault();
                  if (highlightedIndex >= 0) {
                    handleCitySelect(filteredCities[highlightedIndex]);
                  }
                }
              }}
              className={cn(
                "block w-full rounded-2xl border border-neutral-500 dark:border-gray-400",
                "bg-transparent py-4 pl-6 pr-20 text-base text-neutral-900 dark:text-white",
                "placeholder:text-neutral-500 dark:placeholder:text-gray-400",
                "ring-4 ring-transparent transition",
                "focus:border-neutral-950 focus:dark:border-white",
                "focus:outline-none focus:ring-neutral-950/5"
              )}
            />
            <div className="absolute inset-y-1 right-1 flex justify-end">
              <button
                type="submit"
                className="flex aspect-square h-full items-center justify-center 
                   rounded-xl bg-neutral-950 text-white transition 
                   hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                <svg viewBox="0 0 16 6" aria-hidden="true" className="w-4">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 3 10 .5v2H0v1h10v2L16 3Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>

        {filteredCities.length > 0 && (
          <ul
            ref={listRef}
            className="border max-h-64 overflow-y-auto overflow-x-hidden rounded bg-white dark:bg-gray-700"
          >
          {filteredCities.map((city, index) => (
            <motion.li
              key={city.city}
              className={cn(
                "p-2 cursor-pointer rounded overflow-hidden", 
                isRTL ? "text-right" : "text-left")}
              onClick={() => handleCitySelect(city)}
              onMouseEnter={() => setHighlightedIndex(index)}
              animate={{
              scale: index === highlightedIndex ? 1.02 : 1,
              x: index === highlightedIndex ? (isRTL ? 2 : -2) : 0, 
              backgroundColor:
              index === highlightedIndex
                ? "#E0E7FF"
                : "transparent",}}
              transition={{ type: "spring", stiffness: 300 }}>
              {city.city}
            </motion.li>
          ))}
          </ul>
        )}
        <div className="mt-4">
           <AnimatePresence>
              {loading && (
                <motion.div
                  layout
                  className="border p-4 rounded bg-gray-200 dark:bg-gray-700 shadow overflow-hidden relative h-32"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                  <div className="relative w-full h-full overflow-hidden rounded-lg">
                    <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r
                      from-gray-300 via-gray-200 to-gray-300
                      dark:from-gray-600 dark:via-gray-500 dark:to-gray-600
                      animate-skeleton-shimmer" />
                  </div>
                </motion.div>)}
           </AnimatePresence>
              {!loading && selectedCity && weather?.current_weather && (
                <motion.div
                  layout
                  className="border p-4 rounded bg-white dark:bg-gray-700 shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}>
                    <h3 className="font-bold text-lg">
                      {t("weather.weatherFor", { city: selectedCity.city })}
                    </h3>
                    <p>
                      {t("weather.temperature")}: {weather.current_weather.temperature}°C
                    </p>
                    <p>
                      {t("weather.windSpeed")}: {weather.current_weather.windspeed} km/h
                    </p>
                </motion.div>
              )}
        </div>
      </div>
      <div className={`flex flex-col gap-4 flex-1 order-${isRTL ? 1 : 2}`}>
        {lastTwo.map((item, index) => (
          <motion.div
            key={item.name + index}
            layout
            className="border p-4 rounded bg-white dark:bg-gray-700 shadow"
            initial={{ opacity: 0, x: isRTL ? 20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3 className="font-bold mb-1">
              {t("weather.lastSearch")} #{index + 1}
            </h3>
            <p className="font-semibold">{item.name}</p>
            <p>
              {t("weather.temperature")}: {item.weather.current_weather.temperature}°C
            </p>
            <p>
              {t("weather.windSpeed")}: {item.weather.current_weather.windspeed} km/h
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
