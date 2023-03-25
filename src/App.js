import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";

import logo from "./logo.svg";
import "./App.css";

const CLIENT_ID =
  "BDQ6I0LSfL5xNw6y5b5vXWwn-g5rlAQvwZMCLhy5ZqV2dW731MaNNsQL-T7-TgZ5PeqK73okS3Z7ExHTtT4bpNo";

function App() {
  const [web3auth, setWeb3auth] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId: CLIENT_ID, // Get your Client ID from Web3Auth Dashboard
          chainConfig: {
            chainNamespace: "eip155",
            chainId: "0x1", // Please use 0x5 for Goerli Testnet
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
        // if (web3auth.provider) {
        //   setProvider(web3auth.provider);
        // }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    // const web3authProvider = await web3auth.connect();
    // setProvider(web3authProvider);
    console.log("Logged in Successfully!");
  };

  function uiConsole(...args) {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;
