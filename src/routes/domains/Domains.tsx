import { Search } from "../../components/Search";
import styles from "./domains.module.css";

const fakeData = [
  {
    id: 1,
    name: "example.com",
    price: 12.99,
    isAvailable: true,
  },
  {
    id: 2,
    name: "example.net",
    price: 12.99,
    isAvailable: true,
  },
  {
    id: 3,
    name: "example.org",
    price: 12.99,
    isAvailable: true,
  },
  {
    id: 4,
    name: "example.info",
    price: 12.99,
    isAvailable: false,
  },
  {
    id: 5,
    name: "example.biz",
    price: 12.99,
    isAvailable: true,
  },
  {
    id: 6,
    name: "example.us",
    price: 12.99,
    isAvailable: false,
  },
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
            <h2>{domainName.name}</h2>
            <p>
              <strong>Price:</strong> ${domainName.price}
            </p>
            <p>
              <strong>Availability:</strong>{" "}
              {domainName.isAvailable ? "Available" : "Unavailable"}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};
