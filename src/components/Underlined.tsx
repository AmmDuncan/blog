import { ReactNode } from 'react';

export function Underlined({ children }: { children: ReactNode }) {
  return (
    <span className="relative isolate">
      {children}
      <img
        src="/assets/underline.svg"
        alt="underline"
        className="absolute -bottom-[18px] -z-10 w-1/2 max-w-[180px]"
      />
    </span>
  );
}
