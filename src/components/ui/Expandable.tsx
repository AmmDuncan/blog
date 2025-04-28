import { cn } from '@/libs';

export function Expandable({
  children,
  direction = 'vertical',
  expanded,
}: {
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal';
  expanded?: boolean;
}) {
  return (
    <div
      className={cn([
        'grid transition-all',
        {
          ...(direction === 'vertical' && {
            'grid-rows-[1fr]': expanded,
            'grid-rows-[0fr]': !expanded,
          }),
          ...(direction === 'horizontal' && {
            'grid-cols-[1fr]': expanded,
            'grid-cols-[0fr]': !expanded,
          }),
        },
      ])}
    >
      <div
        className={cn([
          {
            'min-h-[0] overflow-y-hidden': direction === 'vertical',
            'min-w-[0] overflow-x-hidden': direction === 'horizontal',
          },
        ])}
      >
        {children}
      </div>
    </div>
  );
}
