import { useEffect, useMemo, useSyncExternalStore } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCurrencyRates } from "../redux/currency/operations";
import useMedia from "../hooks/useMedia";

import s from "./Currency.module.css";

const BASE_KEY = "currencyTrendBaseline";
const BASELINE_EVENT = "currency-baseline";
const imageTab = "/img/currency-graph.svg";

const subscribeBaseline = (callback) => {
  window.addEventListener(BASELINE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(BASELINE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};

const getBaselineSnapshot = () => {
  try {
    return localStorage.getItem(BASE_KEY) || "";
  } catch {
    return "";
  }
};

const getBaselineServerSnapshot = () => "";

const Currency = () => {
  const dispatch = useDispatch();

  const rates = useSelector((state) => state.currency.rates);
  const isLoading = useSelector((state) => state.currency.isLoading);

  const { isDesktop } = useMedia();

  const baselineStr = useSyncExternalStore(
    subscribeBaseline,
    getBaselineSnapshot,
    getBaselineServerSnapshot
  );

  const baseline = useMemo(() => {
    if (!baselineStr) return null;
    try {
      return JSON.parse(baselineStr);
    } catch {
      return null;
    }
  }, [baselineStr]);

  useEffect(() => {
    dispatch(fetchCurrencyRates());
  }, [dispatch]);

  useEffect(() => {
    if (!rates || rates.length === 0) return;

    const usd = rates.find((r) => r.currencyCodeA === 840);
    const eur = rates.find((r) => r.currencyCodeA === 978);
    if (!usd || !eur) return;

    const now = Date.now();
    const DAY = 24 * 60 * 60 * 1000;

    const isStale =
      !baseline?.timestamp || now - Number(baseline.timestamp) > DAY;
    if (!isStale) return;

    const snapshot = {
      timestamp: now,
      rates: {
        USD: { rateBuy: usd.rateBuy, rateSell: usd.rateSell },
        EUR: { rateBuy: eur.rateBuy, rateSell: eur.rateSell },
      },
    };

    try {
      localStorage.setItem(BASE_KEY, JSON.stringify(snapshot));
      window.dispatchEvent(new Event(BASELINE_EVENT));
    } catch {
      // ignore storage failures
    }
  }, [rates, baseline]);

  const trend = (code, key, current) => {
    const base = baseline?.rates?.[code]?.[key];
    if (typeof base !== "number") return 0;

    const diff = current - base;
    const eps = 0.0001;

    if (diff > eps) return 1;
    if (diff < -eps) return -1;
    return 0;
  };

  const usd = rates.find((r) => r.currencyCodeA === 840);
  const eur = rates.find((r) => r.currencyCodeA === 978);

  const rateBuyDollar = usd?.rateBuy?.toFixed(2);
  const rateSellDollar = usd?.rateSell?.toFixed(2);
  const rateBuyEuro = eur?.rateBuy?.toFixed(2);
  const rateSellEuro = eur?.rateSell?.toFixed(2);

  const usdBuyTrend = trend("USD", "rateBuy", Number(rateBuyDollar));
  const usdSellTrend = trend("USD", "rateSell", Number(rateSellDollar));
  const eurBuyTrend = trend("EUR", "rateBuy", Number(rateBuyEuro));
  const eurSellTrend = trend("EUR", "rateSell", Number(rateSellEuro));

  if (isLoading) return <div className={s.currency_wrapper}>Loading...</div>;

  return (
    <div className={s.currency_wrapper}>
      <div className={s.currency_table}>
        <ul className={s.currency_table_head}>
          <li className={s.currency_item}>Currency</li>
          <li className={s.currency_item}>Purchase</li>
          <li className={s.currency_item}>Sale</li>
        </ul>

        <ul className={s.table_body}>
          <li className={s.currency_tr}>
            <p
              className={`${
                usdBuyTrend > 0 ? s.trendUp : usdBuyTrend < 0 ? s.trendDown : ""
              }`}
            >
              USD
            </p>
            <p
              className={`${
                usdBuyTrend > 0 ? s.trendUp : usdBuyTrend < 0 ? s.trendDown : ""
              }`}
            >
              {rateBuyDollar}
            </p>
            <p
              className={`${
                usdSellTrend > 0
                  ? s.trendUp
                  : usdSellTrend < 0
                    ? s.trendDown
                    : ""
              }`}
            >
              {rateSellDollar}
            </p>
          </li>

          <li className={s.currency_tr}>
            <p
              className={`${
                eurBuyTrend > 0 ? s.trendUp : eurBuyTrend < 0 ? s.trendDown : ""
              }`}
            >
              EUR
            </p>
            <p
              className={`${
                eurBuyTrend > 0 ? s.trendUp : eurBuyTrend < 0 ? s.trendDown : ""
              }`}
            >
              {rateBuyEuro}
            </p>
            <p
              className={`${
                eurSellTrend > 0
                  ? s.trendUp
                  : eurSellTrend < 0
                    ? s.trendDown
                    : ""
              }`}
            >
              {rateSellEuro}
            </p>
          </li>
        </ul>
      </div>

      {isDesktop ? (
        <div className={s.diagram}>
          <p className={s.lowerNumber}>{rateBuyDollar}</p>
          <p className={s.higherNumber}>{rateBuyEuro}</p>
          <img src={imageTab} alt="" />
        </div>
      ) : (
        <img src={imageTab} alt="" />
      )}
    </div>
  );
};

export default Currency;
