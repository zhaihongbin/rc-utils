export function attachPropertiesToComponent<
  C,
  P extends Record<string, unknown>
>(component: C, properties: P): C & P {
  const ret = component as any;
  for (const key in properties) {
    if (properties[key]) {
      ret[key] = properties[key];
    }
  }
  return ret;
}
