"use client";

import { useEffect, useState } from "react";

const PLACES = [
  "群馬",
  "栃木",
  "越後湯沢",
  "軽井沢",
  "八ヶ岳",
  "山梨",
  "関東周辺",
];

/** 見出しの上で、地名が順に切り替わる */
export function RotatingPlace() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setI((n) => (n + 1) % PLACES.length), 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <span key={i} className="swap text-navy-950">
      {PLACES[i]}
    </span>
  );
}
