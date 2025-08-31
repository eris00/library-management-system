export const makeOptions = (arr) => {
  const options = arr.map(el => (
    {
      value: el.id,
      label: el.name
    }
  ))
  return options;
}