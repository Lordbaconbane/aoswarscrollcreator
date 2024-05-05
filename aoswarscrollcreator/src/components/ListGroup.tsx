function ListGroup() {
  const items = ["Order", "Chaos", "Death", "Destruction"];

  return (
    <>
      <h1>Grand Allegiance</h1>
      <ul className="list-group">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
