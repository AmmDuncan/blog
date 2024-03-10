import React from 'react';

import { cn } from '@/libs';

type PossibleTextElements =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'label';
type Props = {
  children: React.ReactNode;
  as?: PossibleTextElements;
  weight?:
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black';
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  asVariant?: boolean;
  className?: string;
  family?: 'serif' | 'sans';
} & React.ComponentProps<PossibleTextElements>;

export const Text = React.memo((props: Props) => {
  const {
    as = 'div',
    variant = 'p',
    weight,
    asVariant = false,
    className = '',
    children,
    family = 'sans',
    ...rest
  } = props;

  const computedFontWeight = React.useMemo(() => {
    if (!weight)
      return variant.includes('h') // if it's a heading text
        ? 'semibold'
        : 'normal';
    return weight;
  }, [weight, variant]);

  const fontWeights: Record<Exclude<Props['weight'], undefined>, string> = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black',
  };

  const fontFamily: Record<'serif' | 'sans', string> = {
    sans: 'font-sans',
    serif: 'font-serif',
  };

  const variantClasses: Record<Exclude<Props['variant'], undefined>, string> = {
    h1: 'text-[36px] md:text-[44px] leading-[1.2]',
    h2: 'text-[32px] leading-[48px]',
    h3: 'text-[24px] leading-[32px]',
    h4: 'text-[20px] leading-[28px]',
    h5: 'text-lg',
    h6: 'text-base',
    p: 'text-base',
    span: 'text-sm',
  };

  const classNames = cn([
    className,
    { [variantClasses[variant]]: !!variant },
    { [fontWeights[computedFontWeight]]: !!computedFontWeight },
    { [fontFamily[family]]: !!family },
    { ['tracking-tight']: variant.startsWith('h') && family === 'sans' },
    { ['tracking-wide']: variant.startsWith('h') && family === 'sans' },
  ]);

  const evaluatedElement = asVariant ? variant : as;

  return React.createElement(
    evaluatedElement,
    { className: classNames, ...rest },
    children
  );
});

Text.displayName = 'Text';
