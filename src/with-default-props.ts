import { filterObjectUndefinedValue } from "./filter-obj-undefined-value";

export function mergeProps(...items: Record<string, unknown>[]) {
  const ret = { ...items[0] };
  for (let i = 1; i < items.length; i++) {
    Object.assign(ret, filterObjectUndefinedValue(items[i]));
  }
  return ret;
}
