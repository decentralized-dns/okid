import * as Popover from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ReactComponent as User } from "../../icons/user.svg";

import styles from "./accountInfo.module.css";

export const AccountInfo = () => {
  const { getUserInfo, getAccounts, getPrivateKey, logout } = useAuth();
  const [userImage, setUserImage] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<any>(null);
  const [privateKey, setPrivateKey] = useState<any>(null);

  useEffect(() => {
    const handleUserInfo = async () => {
      const userInfo = await getUserInfo();
      setUserImage(userInfo?.profileImage as string);

      const accountsInfo = await getAccounts();
      setAccounts(accountsInfo);

      const privateKeyInfo = await getPrivateKey();
      setPrivateKey(privateKeyInfo);
    };
    handleUserInfo();
  }, [getUserInfo, getAccounts, getPrivateKey]);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        {userImage ? (
          <div className={styles.profileImageContainer}>
            <img src={userImage} alt="User" className={styles.avatar} />
          </div>
        ) : (
          <button className={styles.IconButton} aria-label="User information">
            <User />
          </button>
        )}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={styles.PopoverContent}
          sideOffset={5}
          collisionPadding={5}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <strong>Account</strong>
            <p>{accounts}</p>

            <strong>Private Key</strong>
            <p>{privateKey}</p>

            <Link
              to={`/domains/${crypto.randomUUID()}`}
              className={styles.buttonSecondary}
              style={{ marginTop: "var(--space-gap)" }}
            >
              Your Domains
            </Link>

            <button onClick={logout} className={styles.buttonSecondary}>
              Sign Out
            </button>
          </div>
          <Popover.Arrow className={styles.PopoverArrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
