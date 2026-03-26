import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary';
  href?: string;
  className?: string;
}

export default function Badge({ children, variant = 'default', href, className }: BadgeProps) {
  const variants = {
    default: 'bg-white/10 text-gray-300 hover:bg-white/20',
    primary: 'bg-violet-500/20 text-violet-300 hover:bg-violet-500/30',
  };

  const classes = cn(
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
    variants[variant],
    href && 'hover:opacity-80',
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
