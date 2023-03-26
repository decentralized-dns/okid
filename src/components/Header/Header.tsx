import { useAuth } from "../../contexts/AuthContext";
import { Logo } from "../Logo";
import { AccountInfo } from "./AccountInfo";
import styles from "./header.module.css";

export const Header = () => {
  const { provider, login } = useAuth();

  return (
    <header className={styles.header}>
      <Logo />
      {provider ? (
        <AccountInfo />
      ) : (
        <button className={styles.button} onClick={login}>
          Sign In
        </button>
      )}
    </header>
  );
};
