import { Logo } from "../Logo";
import styles from "./header.module.css";

type HeaderProps = {
  authenticateUser: () => void;
};

export const Header = ({ authenticateUser }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <Logo />
      <button className={styles.button} onClick={authenticateUser}>
        Sign In
      </button>
    </header>
  );
};
