import { useEffect, useState } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import type { Insight } from "../schemas/insight.ts";

export const App = () => {
  const [insights, setInsights] = useState<Insight[]>([]);

  const fetchInsights = () => {
    fetch(`/api/insights`)
      .then((res) => res.json())
      .then((data) =>
        setInsights(
          data.map((
            item: {
              id: number;
              brand: number;
              createdAt: string;
              text: string;
            },
          ) => ({
            id: item.id,
            brandId: item.brand,
            date: new Date(item.createdAt),
            text: item.text,
          })),
        )
      );
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <main className={styles.main}>
      <Header onAdd={fetchInsights} />
      <Insights className={styles.insights} insights={insights} />
    </main>
  );
};
