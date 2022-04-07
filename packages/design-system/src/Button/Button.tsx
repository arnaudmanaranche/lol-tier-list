import Link from "next/link";
import type { ReactElement, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => unknown;
  href?: string;
  to?: string;
}

export const Button = ({
  children,
  onClick,
  href,
  to,
}: ButtonProps): ReactElement => {
  const className =
    "flex items-center justify-center p-4 text-center text-black rounded font-body bg-primary hover:bg-primaryDark";

  if (href) {
    return (
      <Link href={href}>
        <a className={className} target="_blank" rel="noreferrer noopener">
          {children}
        </a>
      </Link>
    );
  } else if (to) {
    return (
      <Link href={to} prefetch={false}>
        <a className={className}>{children}</a>
      </Link>
    );
  } else {
    return (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    );
  }
};
