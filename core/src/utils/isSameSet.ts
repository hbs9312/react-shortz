/**
 * 두 개의 Set을 비교하여 순서와 관계없이 같은지 확인
 * @param a - 비교할 Set
 * @param b - 비교할 Set
 * @returns 같으면 true, 다르면 false
 */
export function isSameSet<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size !== b.size) return false;

  for (const val of a) {
    if (!b.has(val)) return false;
  }

  return true;
}
