import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import RPC from "../web3RPC";

interface AuthContextProps {
  login: () => void;
  logout: () => void;
  provider: SafeEventEmitterProvider | null;
  getUserInfo: () => Promise<any>;
  getChainId: () => Promise<string | undefined>;
  getAccounts: () => Promise<any>;
  getBalance: () => Promise<string | undefined>;
  sendTransaction: () => Promise<void>;
  signMessage: () => Promise<string | undefined>;
  getPrivateKey: () => Promise<void>;
}

const CLIENT_ID =
  "BDQ6I0LSfL5xNw6y5b5vXWwn-g5rlAQvwZMCLhy5ZqV2dW731MaNNsQL-T7-TgZ5PeqK73okS3Z7ExHTtT4bpNo";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId: CLIENT_ID,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x41", // okc testnet, has to be hex code
            rpcTarget: "https://exchaintestrpc.okex.org/",
            displayName: "OKC Testnet",
            blockExplorer: "",
            ticker: "OKT",
            tickerName: "OKC",
          },
          uiConfig: {
            theme: "dark",
            loginMethodsOrder: ["github", "google"],
            defaultLanguage: "en",
            appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // Your App Logo Here
          },
        });

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

  const getUserInfo = useCallback(async () => {
    if (!web3auth) {
      console.error("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    return user;
  }, [web3auth]);

  const login = useCallback(async () => {
    if (!web3auth) {
      console.error("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  }, [web3auth]);

  const logout = useCallback(async () => {
    if (!web3auth) {
      console.error("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  }, [web3auth]);

  const getChainId = useCallback(async () => {
    if (!provider) {
      console.error("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    return chainId;
  }, [provider]);

  const getAccounts = useCallback(async () => {
    if (!provider) {
      console.error("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    console.log("rpc:", rpc);
    const address = await rpc.getAccounts();
    return address;
  }, [provider]);

  const getBalance = useCallback(async () => {
    if (!provider) {
      console.error("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    return balance;
  }, [provider]);

  const sendTransaction = useCallback(async () => {
    if (!provider) {
      console.error("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    return receipt;
  }, [provider]);

  const signMessage = useCallback(async () => {
    if (!provider) {
      console.error("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    return signedMessage;
  }, [provider]);

  const getPrivateKey = useCallback(async () => {
    if (!provider) {
      console.error("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    return privateKey;
  }, [provider]);

  return (
    <AuthContext.Provider
      value={{
        provider,
        login,
        logout,
        getUserInfo,
        getChainId,
        getAccounts,
        getBalance,
        sendTransaction,
        signMessage,
        getPrivateKey,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useCount must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
