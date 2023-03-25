import styles from "./avatarList.module.css";

type AvatarProps = {
  name: string;
  imageSrc: string;
  githubUrl: string;
};

const members = [
  {
    id: "1",
    name: "Rui Chen",
    imageSrc: "https://avatars.githubusercontent.com/u/1580956?v=4",
    githubUrl: "https://github.com/chenrui333",
  },
  {
    id: "2",
    name: "Shiyun Lu",
    imageSrc: "https://avatars.githubusercontent.com/u/13009238?v=4",
    githubUrl: "https://github.com/lushiyun",
  },
  {
    id: "3",
    name: "Rachel Ma",
    imageSrc: "https://avatars.githubusercontent.com/u/38232201?v=4",
    githubUrl: "https://github.com/LanmingMa",
  },
  {
    id: "4",
    name: "Yanbang",
    imageSrc: "https://avatars.githubusercontent.com/u/111951846?v=4",
    githubUrl: "https://github.com/metacompany-x",
  },
];

export const AvatarList = () => {
  return (
    <ul className={styles.avatarList}>
      {members.map((member) => (
        <li key={member.id} className={styles.avatarItem}>
          <Avatar
            name={member.name}
            imageSrc={member.imageSrc}
            githubUrl={member.githubUrl}
          />
        </li>
      ))}
    </ul>
  );
};

function Avatar({ name, imageSrc, githubUrl }: AvatarProps) {
  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.avatar}
    >
      <img src={imageSrc} alt={`${name}`} className="avatar" />
    </a>
  );
}
