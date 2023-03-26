/* eslint-disable */
import * as Dialog from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Search } from "../../components/Search";
import { ReactComponent as Cancel } from "../../icons/cancel.svg";
import { ReactComponent as Check } from "../../icons/check.svg";
import { ReactComponent as Wallet } from "../../icons/wallet.svg";

import styles from "./domains.module.css";

const fakeData = [
  {
    id: 1,
    name: "hackathon.okid",
    price: 12.99,
    isAvailable: true,
  },
  {
    id: 2,
    name: "web3.okid",
    price: 12.99,
    isAvailable: true,
  },
  {
    id: 3,
    name: "awesome.okid",
    price: 12.99,
    isAvailable: true,
  },
  {
    id: 3,
    name: "okidteam.okid",
    price: 12.99,
    isAvailable: true,
  },
  {
    id: 4,
    name: "reactjs.okid",
    price: 12.99,
    isAvailable: false,
  },
  {
    id: 5,
    name: "okx.okid",
    price: 12.99,
    isAvailable: true,
  },
];

// export async function loader({ request }) {
//   const url = new URL(request.url);
//   const q = url.searchParams.get("q");
//   const domains = await getContacts(q);
//   return { contacts };
// }

export const Domains = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q");
  const isSearch = Boolean(location.search);
  const domains = isSearch ? [fakeData[0]] : fakeData;
  const [open, setOpen] = useState(false);

  const viewDomainClick = (domainName: any) => {
    setOpen(false);
    navigate(`/domains/${domainName.name}`);
  };

  return (
    <section className={styles.domainNames}>
      <Search />

      <ul className={styles.domainNameList}>
        {domains.map((domainName) => (
          <li key={domainName.id} className={styles.domainNameListItem}>
            <Tooltip.Provider delayDuration={300}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <span
                    className={styles.domainNameIcon}
                    style={{
                      color: domainName.isAvailable
                        ? "var(--clr-success)"
                        : "var(--clr-light-shade)",
                      border: `2px solid ${
                        domainName.isAvailable
                          ? "var(--clr-success)"
                          : "var(--clr-light-shade)"
                      }`,
                    }}
                  >
                    {domainName.isAvailable ? <Check /> : <Cancel />}
                  </span>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className={styles.TooltipContent}
                    sideOffset={5}
                    collisionPadding={5}
                  >
                    {domainName.isAvailable
                      ? "Congratulations! This domain name is available."
                      : `Current domain registration expires on 12/31/2021.`}
                    <Tooltip.Arrow className={styles.TooltipArrow} />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>

            <h2 className={styles.domainName}>{domainName.name}</h2>

            {domainName.isAvailable && (
              <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger asChild>
                  <button className={styles.buyButton}>
                    <Wallet />
                    <span>{isSearch ? "Register" : "Renew"}</span>
                  </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Overlay className={styles.DialogOverlay} />
                  <Dialog.Content className={styles.DialogContent}>
                    <Dialog.Title className={styles.DialogTitle}>
                      Domain Name {isSearch ? "Registrered" : "Renewed"}
                    </Dialog.Title>
                    <Dialog.Description className={styles.DialogDescription}>
                      <strong>Expiration date:</strong>
                      <p>
                        {new Date(
                          new Date().setFullYear(new Date().getFullYear() + 1)
                        ).toLocaleDateString()}
                      </p>
                    </Dialog.Description>
                    {isSearch && (
                      <Dialog.Close className={styles.dialogButton}>
                        <button
                          className={styles.buttonSecondary}
                          onClick={() => viewDomainClick(domainName)}
                        >
                          Your Domains
                        </button>
                      </Dialog.Close>
                    )}
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
