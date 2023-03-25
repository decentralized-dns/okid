import { Outlet } from "react-router-dom";

import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";
import styles from "./root.module.css";

export const Root = () => {
  return (
    <div className={styles.container}>
      <div className={styles.app}>
        <Header />

        <main className={styles.main}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

function Footer() {
  return (
    <footer className={styles.footer}>
      <Logo hasText={false} size="s" />
      <small>
        © {new Date().getFullYear()} DDNS team. All Rights Reserved.
      </small>
    </footer>
  );
}
