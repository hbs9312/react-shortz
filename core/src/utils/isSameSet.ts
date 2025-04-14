export function isSameSet<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size !== b.size) return false;

  for (const val of a) {
    if (!b.has(val)) return false;
  }

  return true;
}
