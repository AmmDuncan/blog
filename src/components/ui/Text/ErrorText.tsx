import { Text } from '@/components';
import { cn } from '@/libs';

type Props = Readonly<{
  error?: string | { message: string } | boolean;
  className?: string;
}>;

export function ErrorText({ error, className }: Props) {
  return error && typeof error !== 'boolean' ? (
    <Text variant="span" className={cn('text-error mt-1', className)}>
      {typeof error === 'string' ? error : error?.message}
    </Text>
  ) : null;
}
