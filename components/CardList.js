import CardItem from "./CardItem";

export default function CardList({ items }) {
  return (
    <ul>
      {items.map((i) => (
        <CardItem item={i} key={i.slug} />
      ))}
    </ul>
  );
}
