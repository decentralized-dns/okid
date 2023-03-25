import styles from "./card.module.css";

type CardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  bg?: React.ReactNode;
  className?: string;
};

export const Card = ({
  title,
  description,
  icon,
  bg,
  className,
}: CardProps) => {
  const content = (
    <>
      {icon && <div className={styles.iconContainer}>{icon}</div>}
      {bg && <div className={styles.bgContainer}>{bg}</div>}
      <h3 className={styles.title}>{title}</h3>
      <p>{description}</p>
    </>
  );

  return <div className={`${styles.card} ${className}`}>{content}</div>;
};
