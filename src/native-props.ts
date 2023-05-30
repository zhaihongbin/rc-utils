/**
 * 关于className和style的处理
 */

import {
  cloneElement,
  type AriaAttributes,
  type CSSProperties,
  type ReactElement,
} from "react";
import classNames from "classnames";

export type NativeProps<S extends string = never> = {
  className?: string;
  style?: CSSProperties & Partial<Record<S, string>>;
} & AriaAttributes;

export function withNativeProps<P extends NativeProps>(
  props: P,
  element: ReactElement
) {
  const p = { ...element.props };

  if (props.className) {
    p.className = classNames(p.className, props.className);
  }

  if (props.style) {
    p.style = {
      ...p.style,
      ...props.style,
    };
  }

  for (const key in props) {
    if (!props[key]) continue;
    if (key.startsWith("data-") || key.startsWith("aria-")) {
      p[key] = props[key];
    }
  }

  return cloneElement(element, p);
}
