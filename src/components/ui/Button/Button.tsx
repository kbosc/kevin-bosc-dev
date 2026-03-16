import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'link';
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { children, variant = 'primary', className, ...rest } = props;

  const combinedClassName = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  // Render as <a> tag for links (e.g. download CV, mailto)
  if (props.as === 'link') {
    const { as: _, ...linkProps } = rest as ButtonAsLink;
    return (
      <a className={combinedClassName} {...linkProps}>
        {children}
      </a>
    );
  }

  // Default: render as <button>
  const { as: _, ...buttonProps } = rest as ButtonAsButton;
  return (
    <button className={combinedClassName} {...buttonProps}>
      {children}
    </button>
  );
}

