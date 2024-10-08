export default function groceriesList() {
  const groceries = [
    { name: 'Apples', quantity: 10 },
    { name: 'Tomatos', quantity: 10 },
    { name: 'Pasta', quantity: 1 },
    { name: 'Rice', quantity: 1 },
    { name: 'Banana', quantity: 5 },
  ];
  const groceriesMap = groceries.reduce((map, { name, quantity }) => {
    map.set(name, quantity);
    return map;
  }, new Map());

  return groceriesMap;
}
