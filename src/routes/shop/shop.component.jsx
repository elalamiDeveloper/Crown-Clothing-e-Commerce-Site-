import SHOP_DATA from '../../shop-data.json';

const Shop = () => {
  console.log(SHOP_DATA);
  return (
    <div>
      {SHOP_DATA.map((product) => (
        <h2>{product.name}</h2>
      ))}
    </div>
  );
};

export default Shop;
