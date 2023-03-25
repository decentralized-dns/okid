import { ReactComponent as ArrowRight } from "../../icons/arrow-right.svg";

import styles from "./search.module.css";

export const Search = () => {
  return (
    <fieldset className={styles.fieldSet}>
      <input
        id="q"
        aria-label="Search domain names"
        placeholder="Search for a domain name"
        type="search"
        name="q"
        autoFocus={true}
        className={styles.searchInput}
      />
      <button className={styles.searchButton}>
        <ArrowRight />
      </button>
    </fieldset>
  );
};
