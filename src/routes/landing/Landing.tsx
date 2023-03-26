import { Search } from "../../components/Search";
import { AvatarList } from "../../components/AvatarList";
import { Card } from "../../components/Card";
import { ReactComponent as OkxLogo } from "../../assets/okx-logo.svg";
import { ReactComponent as Flash } from "../../icons/flash.svg";
import { ReactComponent as Connect } from "../../icons/connect.svg";
import circuitBoard from "../../assets/circuit-board.svg";

import styles from "./landing.module.css";

export const Landing = () => {
  return (
    <>
      <Hero />
      <Banner />
      <FeatureCards />
    </>
  );
};

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.title}>
        <h1 className={styles.heading}>OkID</h1>
        <p className={styles.description}>
          Secure. Interoperable. Catalytic.
          Enterprises DID management platform built on account abstraction.
        </p>
        <Search />
      </div>

      <div className={styles.teamIntro}>
        <h3>DDNS Team</h3>
        <span className={styles.teamIntroDivider} />
        <AvatarList />
      </div>
    </section>
  );
}

function Banner() {
  return (
    <section className={styles.banner}>
      <div className={`${styles.scrollElement} ${styles.primary}`}>
        <BannerElement />
      </div>
      <div className={`${styles.scrollElement} ${styles.secondary}`}>
        <BannerElement />
      </div>
    </section>
  );
}

function BannerElement() {
  return (
    <>
      <OkxLogo className={styles.bannerLogo} />
      <h1 className={styles.bannerText}>Web3 Hackathon 2023</h1>
    </>
  );
}

function FeatureCards() {
  return (
    <section className={styles.featureCards}>
      <Card
        title="One-Click Web3 domain Host"
        description="Enables users to easily register Web3 Domains."
        icon={<Flash className={styles.cardIcon} />}
      />

      <Card
        title="Wallet-Less Web3 authentication"
        description="Securely access Web3 applications without traditional cryptocurrency wallet."
        icon={<Connect className={styles.cardIcon} />}
      />

      <Card
        title="One-Stop Enterprise DID Solution"
        description="Enterprises DID management platform that provides web3 domain hosting and account abstraction."
        bg={<img src={circuitBoard} alt="" />}
        className={styles.largeCard}
      />
    </section>
  );
}
