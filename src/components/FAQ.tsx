export interface QA {
  q: string;
  a: string;
}

export default function FAQ({ items }: { items: QA[] }) {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Frequently asked questions</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.q}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4"
          >
            <p className="font-medium text-[var(--color-ink)]">{item.q}</p>
            <p className="mt-1.5 text-sm text-[var(--color-ink-soft)] leading-relaxed">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
