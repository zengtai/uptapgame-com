import ListItem from "./ListItem";

export default function List({ items, className }) {
  return (
    <ul className={`list ` + className}>
      {items.map((i) => (
        <ListItem key={i.id} item={i} />
      ))}
    </ul>
  );
}
