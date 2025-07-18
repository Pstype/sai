import React from 'react';
import { cn } from '@/lib/utils';

const H1 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h1 ref={ref} className={cn('text-4xl font-extrabold tracking-tight lg:text-5xl', className)} {...props} />
));
H1.displayName = 'H1';

const H2 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn('text-3xl font-semibold tracking-tight', className)} {...props} />
));
H2.displayName = 'H2';

const H3 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-2xl font-semibold tracking-tight', className)} {...props} />
));
H3.displayName = 'H3';

const H4 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h4 ref={ref} className={cn('text-xl font-semibold tracking-tight', className)} {...props} />
));
H4.displayName = 'H4';

const P = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />
));
P.displayName = 'P';

const Small = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, ...props }, ref) => (
  <small ref={ref} className={cn('text-sm font-medium leading-none', className)} {...props} />
));
Small.displayName = 'Small';

const Lead = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-xl text-muted-foreground', className)} {...props} />
));
Lead.displayName = 'Lead';

export { H1, H2, H3, H4, P, Small, Lead };
