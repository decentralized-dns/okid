import { Outlet } from "react-router-dom";

import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";
import { AuthProvider } from "../../contexts/AuthContext";
import styles from "./root.module.css";

export const Root = () => {
  return (
    <AuthProvider>
      <div className={styles.container}>
        <div className={styles.app}>
          <Header />

          <main className={styles.main}>
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </AuthProvider>
  );
};

function Footer() {
  return (
    <footer className={styles.footer}>
      <Logo hasText={false} size="s" />
      <small>
        © {new Date().getFullYear()} OkID team. All Rights Reserved.
      </small>
    </footer>
  );
}
