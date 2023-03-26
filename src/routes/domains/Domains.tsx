import * as Dialog from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";

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
  // {
  //   id: 2,
  //   name: "example.net",
  //   price: 12.99,
  //   isAvailable: true,
  // },
  // {
  //   id: 3,
  //   name: "example.org",
  //   price: 12.99,
  //   isAvailable: true,
  // },
  // {
  //   id: 4,
  //   name: "example.info",
  //   price: 12.99,
  //   isAvailable: false,
  // },
  // {
  //   id: 5,
  //   name: "example.biz",
  //   price: 12.99,
  //   isAvailable: true,
  // },
  // {
  //   id: 6,
  //   name: "example.us",
  //   price: 12.99,
  //   isAvailable: false,
  // },
];

// export async function loader({ request }) {
//   const url = new URL(request.url);
//   const q = url.searchParams.get("q");
//   const domains = await getContacts(q);
//   return { contacts };
// }

export const Domains = () => {
  return (
    <section className={styles.domainNames}>
      <Search />

      <ul className={styles.domainNameList}>
        {fakeData.map((domainName) => (
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
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button className={styles.buyButton}>
                    <Wallet />
                    <span>Register</span>
                  </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Overlay className={styles.DialogOverlay} />
                  <Dialog.Content className={styles.DialogContent}>
                    <Dialog.Title className={styles.DialogTitle}>
                      Domain Name Registrered
                    </Dialog.Title>
                    <Dialog.Description className={styles.DialogDescription}>
                      <strong>Expiration date:</strong>
                      <p>
                        {new Date(
                          new Date().setFullYear(new Date().getFullYear() + 1)
                        ).toLocaleDateString()}
                      </p>
                    </Dialog.Description>
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
