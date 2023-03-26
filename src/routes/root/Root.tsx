import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";

import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";
import styles from "./root.module.css";

const CLIENT_ID = process.env.WEB3AUTH_CLIENT_ID || "";

export const Root = () => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId: CLIENT_ID, // Get your Client ID from Web3Auth Dashboard
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "65", // okc testnet
            rpcTarget: "https://exchaintestrpc.okex.org/",
            displayName: "OKC Testnet",
            blockExplorer: "",
            ticker: "OKT",
            tickerName: "OKC",
          },
        });

        // const openloginAdapter = new OpenloginAdapter({
        //   loginSettings: {
        //     mfaLevel: "default",
        //   },
        //   adapterSettings: {
        //     whiteLabel: {
        //       name: "Your app Name",
        //       logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
        //       logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
        //       defaultLanguage: "en",
        //       dark: true, // whether to enable dark mode. defaultValue: false
        //     },
        //   },
        // });
        // web3auth.configureAdapter(openloginAdapter);

        // // plugins and adapters are optional and can be added as per your requirement
        // // read more about plugins here: https://web3auth.io/docs/sdk/web/plugins/

        // // adding torus wallet connector plugin

        // const torusPlugin = new TorusWalletConnectorPlugin({
        //   torusWalletOpts: {},
        //   walletInitOptions: {
        //     whiteLabel: {
        //       theme: { isDark: true, colors: { primary: "#00a8ff" } },
        //       logoDark: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
        //       logoLight: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
        //     },
        //     useWalletConnect: true,
        //     enableLogging: true,
        //   },
        // });
        // setTorusPlugin(torusPlugin);
        // await web3auth.addPlugin(torusPlugin);

        // // read more about adapters here: https://web3auth.io/docs/sdk/web/adapters/

        // // adding wallet connect v1 adapter
        // // const walletConnectV1Adapter = new WalletConnectV1Adapter({
        // //   adapterSettings: {
        // //     bridge: "https://bridge.walletconnect.org",
        // //   },
        // //   clientId,
        // // });

        // // web3auth.configureAdapter(walletConnectV1Adapter);

        // // adding wallet connect v2 adapter
        // const defaultWcSettings = await getWalletConnectV2Settings(
        //   "eip155",
        //   [1, 137, 5],
        //   "04309ed1007e77d1f119b85205bb779d"
        // );
        // const walletConnectV2Adapter = new WalletConnectV2Adapter({
        //   adapterSettings: { ...defaultWcSettings.adapterSettings },
        //   loginSettings: { ...defaultWcSettings.loginSettings },
        // });

        // web3auth.configureAdapter(walletConnectV2Adapter);

        // // adding metamask adapter
        // const metamaskAdapter = new MetamaskAdapter({
        //   clientId,
        //   sessionTime: 3600, // 1 hour in seconds
        //   web3AuthNetwork: "cyan",
        //   chainConfig: {
        //     chainNamespace: CHAIN_NAMESPACES.EIP155,
        //     chainId: "0x1",
        //     rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
        //   },
        // });
        // // we can change the above settings using this function
        // metamaskAdapter.setAdapterSettings({
        //   sessionTime: 86400, // 1 day in seconds
        //   chainConfig: {
        //     chainNamespace: CHAIN_NAMESPACES.EIP155,
        //     chainId: "0x1",
        //     rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
        //   },
        //   web3AuthNetwork: "cyan",
        // });

        // // it will add/update  the metamask adapter in to web3auth class
        // web3auth.configureAdapter(metamaskAdapter);

        // const torusWalletAdapter = new TorusWalletAdapter({
        //   clientId,
        // });

        // // it will add/update  the torus-evm adapter in to web3auth class
        // web3auth.configureAdapter(torusWalletAdapter);

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    uiConsole("Logged in Successfully!");
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    const idToken = await web3auth.authenticateUser();
    uiConsole(idToken);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getUserInfo = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    uiConsole(user);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const logout = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  // const showWCM = async () => {
  //   if (!torusPlugin) {
  //     uiConsole("torus plugin not initialized yet");
  //     return;
  //   }
  //   torusPlugin.showWalletConnectScanner();
  //   uiConsole();
  // };

  // const initiateTopUp = async () => {
  //   if (!torusPlugin) {
  //     uiConsole("torus plugin not initialized yet");
  //     return;
  //   }
  //   torusPlugin.initiateTopup("moonpay", {
  //     selectedAddress: "0x8cFa648eBfD5736127BbaBd1d3cAe221B45AB9AF",
  //     selectedCurrency: "USD",
  //     fiatValue: 100,
  //     selectedCryptoCurrency: "ETH",
  //     chainNetwork: "mainnet",
  //   });
  // };

  // const getChainId = async () => {
  //   if (!provider) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new RPC(provider);
  //   const chainId = await rpc.getChainId();
  //   uiConsole(chainId);
  // };

  // const addChain = async () => {
  //   if (!provider) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   const newChain = {
  //     chainId: "0x5",
  //     displayName: "Goerli",
  //     chainNamespace: CHAIN_NAMESPACES.EIP155,
  //     tickerName: "Goerli",
  //     ticker: "ETH",
  //     decimals: 18,
  //     rpcTarget: "https://rpc.ankr.com/eth_goerli",
  //     blockExplorer: "https://goerli.etherscan.io",
  //   };
  //   await web3auth?.addChain(newChain);
  //   uiConsole("New Chain Added");
  // };

  // const switchChain = async () => {
  //   if (!provider) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   await web3auth?.switchChain({ chainId: "0x5" });
  //   uiConsole("Chain Switched");
  // };

  // const getAccounts = async () => {
  //   if (!provider) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new RPC(provider);
  //   const address = await rpc.getAccounts();
  //   uiConsole(address);
  // };

  // const getBalance = async () => {
  //   if (!provider) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new RPC(provider);
  //   const balance = await rpc.getBalance();
  //   uiConsole(balance);
  // };

  // const sendTransaction = async () => {
  //   if (!provider) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new RPC(provider);
  //   const receipt = await rpc.sendTransaction();
  //   uiConsole(receipt);
  // };

  // const signMessage = async () => {
  //   if (!provider) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new RPC(provider);
  //   const signedMessage = await rpc.signMessage();
  //   uiConsole(signedMessage);
  // };

  // const getPrivateKey = async () => {
  //   if (!provider) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new RPC(provider);
  //   const privateKey = await rpc.getPrivateKey();
  //   uiConsole(privateKey);
  // };

  // const changeNetwork = async () => {
  //   if (!provider) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new RPC(provider);
  //   const privateKey = await rpc.getPrivateKey();
  //   uiConsole(privateKey);
  // };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.app}>
        <Header authenticateUser={authenticateUser} />

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
