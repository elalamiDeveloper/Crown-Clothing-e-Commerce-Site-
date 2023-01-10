import './categories-list.styles.scss';
import CategoryItem from '../category-item/category-item.component';

const CategoriesList = ({ categories }) => {
  const categoriesListHTML = categories.map((category) => (
    <CategoryItem key={category.id} category={category} />
  ));

  return (
    <ul className="categories-container container">{categoriesListHTML}</ul>
  );
};

export default CategoriesList;
