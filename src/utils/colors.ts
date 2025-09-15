const colors = [
  'black',
  'grey',
  'light-violet',
  'violet',
  'blue',
  'light-blue',
  'yellow',
  'orange',
  'green',
  'light-green',
  'light-red',
  'red',
  'white',
];

export const getRandomColor = () => {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};
