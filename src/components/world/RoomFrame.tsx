import type { ReactNode } from "react";

type RoomFrameProps = {
  children: ReactNode;
  title: string;
  isActive: boolean;
};

export function RoomFrame({ children, title, isActive }: RoomFrameProps) {
  return (
    <section
      data-room-frame
      data-active={isActive ? "true" : "false"}
      aria-label={title}
      aria-hidden={!isActive}
      tabIndex={isActive ? -1 : -1}
      className="absolute inset-0 h-full w-full overflow-y-auto overflow-x-hidden overscroll-contain [overflow-anchor:none] [-webkit-overflow-scrolling:touch]"
      style={{ scrollbarGutter: "stable" }}
    >
      <div className="relative z-10 flex min-h-full w-full flex-col">{children}</div>
    </section>
  );
}
