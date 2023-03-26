import { useAuth } from "../../contexts/AuthContext";
import { Logo } from "../Logo";
import styles from "./header.module.css";

export const Header = () => {
  const { provider, login, logout } = useAuth();

  return (
    <header className={styles.header}>
      <Logo />
      {provider ? (
        <button className={styles.button} onClick={logout}>
          Sign Out
        </button>
      ) : (
        <button className={styles.button} onClick={login}>
          Sign In
        </button>
      )}
    </header>
  );
};
