import { ReactComponent as ArrorRight } from "../../icons/arrow-right.svg";

import styles from "./search.module.css";

export const Search = () => {
  return (
    <fieldset className={styles.fieldSet}>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search for a domain name"
        autoFocus={true}
        className={styles.searchInput}
      />
      <button className={styles.searchButton}>
        <ArrorRight />
      </button>
    </fieldset>
  );
};
