const ship = (length, ID) => {
  const _ID = ID;

  let health = length;

  const hp = () => health;
  const getID = () => _ID;

  const hit = () => {
    health -= 1;
  };

  const isSunk = () => health === 0;

  return {
    getID, hp, hit, isSunk,
  };
};

export default ship;
