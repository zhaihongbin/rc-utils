export function filterObjectUndefinedValue(target: unknown) {
  if (target === undefined || target === null) return {};
  return Object.entries(target).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, Object.create(null));
}
