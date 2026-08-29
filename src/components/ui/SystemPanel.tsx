import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "../../lib/utils";

type SystemPanelBaseProps = {
  children?: ReactNode;
  className?: string;
  interactive?: boolean;
  active?: boolean;
  shell?: boolean;
};

type SystemPanelAsDiv = SystemPanelBaseProps &
  HTMLAttributes<HTMLDivElement> & { as?: "div" };

type SystemPanelAsButton = SystemPanelBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as: "button" };

type SystemPanelAsAnchor = SystemPanelBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

export type SystemPanelProps =
  | SystemPanelAsDiv
  | SystemPanelAsButton
  | SystemPanelAsAnchor;

export function SystemPanel({
  as,
  children,
  className,
  interactive = false,
  active = false,
  shell = false,
  ...props
}: SystemPanelProps) {
  const Comp = (as ?? "div") as ElementType;

  const panel = (
    <Comp
      className={cn(
        "system-panel",
        interactive && "system-panel--interactive",
        active && "system-panel--active",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );

  if (!shell) return panel;

  return <div className="system-panel--shell w-full">{panel}</div>;
}

/** @deprecated Use SystemPanel — kept for gradual migration */
export const GlassPanel = SystemPanel;
export type GlassPanelProps = SystemPanelProps;
