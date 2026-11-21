// ヒーロー背景の雪。サーバーで描画しても値が揃うように、乱数ではなく決まった式で配置する。
const FLAKES = Array.from({ length: 48 }, (_, i) => {
  const left = (i * 37) % 100;
  const size = 2 + ((i * 7) % 4);
  const duration = 9 + ((i * 13) % 10);
  const delay = -((i * 11) % 18);
  const drift = ((i % 5) - 2) * 18;
  const opacity = 0.35 + ((i * 3) % 6) / 10;
  return { left, size, duration, delay, drift, opacity };
});

export function Snowfall() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {FLAKES.map((f, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: 固定の装飾要素
          key={i}
          className="snowflake"
          style={
            {
              left: `${f.left}%`,
              width: `${f.size}px`,
              height: `${f.size}px`,
              opacity: f.opacity,
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`,
              "--drift": `${f.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
