import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "../../lib/utils";

type GlassPanelBaseProps = {
  children?: ReactNode;
  className?: string;
  interactive?: boolean;
  active?: boolean;
};

type GlassPanelAsDiv = GlassPanelBaseProps &
  HTMLAttributes<HTMLDivElement> & { as?: "div" };

type GlassPanelAsButton = GlassPanelBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as: "button" };

type GlassPanelAsAnchor = GlassPanelBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

export type GlassPanelProps =
  | GlassPanelAsDiv
  | GlassPanelAsButton
  | GlassPanelAsAnchor;

export function GlassPanel({
  as,
  children,
  className,
  interactive = false,
  active = false,
  ...props
}: GlassPanelProps) {
  const Comp = (as ?? "div") as ElementType;

  return (
    <Comp
      className={cn(
        "glass-panel",
        interactive && "glass-panel--interactive",
        active && "glass-panel--active",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
