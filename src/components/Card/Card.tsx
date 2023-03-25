import styles from "./card.module.css";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};
