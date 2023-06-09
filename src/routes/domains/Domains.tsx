/* eslint-disable */
import * as Dialog from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Search } from "../../components/Search";
import { ReactComponent as Cancel } from "../../icons/cancel.svg";
import { ReactComponent as Check } from "../../icons/check.svg";
import { ReactComponent as Wallet } from "../../icons/wallet.svg";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import Web3 from 'web3';
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

  // Smart contract interaction prepare
  const {provider, getAccounts} = useAuth();
  const web3 = new Web3(provider as any);
  const contractABIJson = require('../../contracts/Okid.json');
  const contractAddressJson = require('../../contracts/contract-address.json');
  const contractABI = contractABIJson.abi;
  const contractAddress = contractAddressJson.Okid;

  const viewDomainClick = (domainName: any) => {
    setOpen(false);
    navigate(`/domains/${domainName.name}`);
  };

  async function handleRegister() {
    // This function will be executed when the button is clicked
    console.log('Button clicked!');
    console.log('contractABI', contractABI);
    console.log('contractAddress',contractAddress);
    const account = await getAccounts()
    console.log(account)
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    // let contract = new ethers.Contract(contractAddress, contractABI, signer);
    // await contract.registerDomain("hackathon.okid", { value: ethers.utils.parseEther("0.07")});
    console.log("contract", contract)
    // test below
    await contract.methods.registerDomain("abc.eth").call()
    await contract.methods.getContractOwner().call()
    await contract.methods.getDomainOwner("abc.eth").call()
  }

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
                  <button className={styles.buyButton} onClick={handleRegister}>
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
