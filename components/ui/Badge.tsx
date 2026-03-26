import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
  href?: string;
  className?: string;
}

export default function Badge({ children, variant = 'default', href, className }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
    secondary: 'bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-400',
  };

  const classes = cn(
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
    variants[variant],
    href && 'hover:bg-gray-200 dark:hover:bg-gray-700',
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
}
