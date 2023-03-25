import { ReactComponent as AppLogo } from "../../assets/logo.svg";

import styles from "./logo.module.css";

type LogoProps = {
  hasText?: boolean;
  size?: "s" | "l";
};

export const Logo = ({ hasText = true, size = "l" }: LogoProps) => {
  return (
    <a href="/" className={styles.logo}>
      <AppLogo
        style={{ width: size === "l" ? "var(--space-16x)" : "var(--space-8x)" }}
      />
      {hasText && <h1>DNS</h1>}
    </a>
  );
};
