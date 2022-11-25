const ship = (length) => {
  let health = length;

  const hp = () => health;

  const hit = () => {
    health -= 1;
  };

  const isSunk = () => health === 0;

  return { hp, hit, isSunk };
};

export default ship;
