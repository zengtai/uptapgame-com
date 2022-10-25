import ListItem from "./ListItem";

export default function List({ items, option }) {
  return (
    <ul className={`list`}>
      {items.map((i) => (
        <ListItem key={i.slug} item={i} option={option} />
      ))}
    </ul>
  );
}
