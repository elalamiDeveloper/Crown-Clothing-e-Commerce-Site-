import './category-item.styles.scss';

const CategoryItem = ({ category: { id, title, imageUrl } }) => (
  <li className="category-container">
    <div className="category-container_img">
      <img src={imageUrl} alt={`Background img of ${title}`} />
    </div>
    <div className="category-container_body">
      <h2>{title}</h2>
      <p>Shop now</p>
    </div>
  </li>
);

export default CategoryItem;
