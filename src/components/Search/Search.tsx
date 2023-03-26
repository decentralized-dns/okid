import { Form } from "react-router-dom";
import { ReactComponent as ArrowRight } from "../../icons/arrow-right.svg";

import styles from "./search.module.css";

export const Search = () => {
  return (
    <Form
      className={styles.fieldSet}
      id="search-form"
      role="search"
      action="/domains"
    >
      <input
        id="q"
        aria-label="Search domain names"
        placeholder="Search for a domain name"
        type="search"
        name="q"
        autoFocus={true}
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        <ArrowRight />
      </button>
    </Form>
  );
};
