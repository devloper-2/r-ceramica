import { ReactNode } from "react";

interface ExploreContentProps {
  children: ReactNode;
}

export default function ExploreContent({
  children,
}: ExploreContentProps) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-24">
      <div className="max-w-[1720px] mx-auto w-full">
        <div className="max-w-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}