// ヒーロー背景の雪。サーバーで描画しても値が揃うように、乱数ではなく決まった式で配置する。
const FLAKES = Array.from({ length: 36 }, (_, k) => {
  const size = 2 + ((k * 7) % 5);
  return {
    left: `${(k * 37) % 100}%`,
    size: `${size}px`,
    duration: `${9 + ((k * 13) % 10)}s`,
    delay: `${-((k * 11) % 17)}s`,
    opacity: 0.35 + ((k * 3) % 6) / 10,
  };
});

export function Snowfall() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {FLAKES.map((f, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: 固定の装飾要素
          key={i}
          className="flake"
          style={{
            left: f.left,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animationDuration: f.duration,
            animationDelay: f.delay,
          }}
        />
      ))}
    </div>
  );
}
