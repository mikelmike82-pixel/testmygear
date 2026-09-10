type ClassValue = string | number | null | boolean | undefined | ClassValue[];

function collect(value: ClassValue, out: string[]) {
  if (!value) return;
  if (Array.isArray(value)) {
    for (const v of value) collect(v, out);
    return;
  }
  out.push(String(value));
}

/** Joins conditional class names together, skipping falsy values. */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) collect(input, out);
  return out.join(" ");
}
