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
        <h1 className={styles.heading}>Decentralized Domain Name Services</h1>
        <p className={styles.description}>
          Secure. Interoperable. Catalytic. Unleashing Business Potential with
          the One-Stop Decentralized Identity Solution - DDNS
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
        title="Fast onboard"
        description="Seamless onboarding experience for both web2 and web3 users with
          mainstream auth integration."
        icon={<Flash className={styles.cardIcon} />}
      />

      <Card
        title="One for all"
        description="A single, secure identity across web3 with control over privacy and
          data sharing."
        icon={<Connect className={styles.cardIcon} />}
      />

      <Card
        title="XYZ"
        description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam"
        bg={<img src={circuitBoard} alt="" />}
        className={styles.largeCard}
      />
    </section>
  );
}
