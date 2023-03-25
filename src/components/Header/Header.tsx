import { Logo } from "../Logo";
import styles from "./header.module.css";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <button className={styles.button} onClick={() => console.log("sign in")}>
        Sign In
      </button>
    </header>
  );
};
