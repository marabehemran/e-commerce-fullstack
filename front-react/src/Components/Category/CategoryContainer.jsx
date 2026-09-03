import SubTitle from "../Utility/SubTitle";
import CategoryCard from "../Category/CategoryCard";

function CategoryContainer({ categories }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-6">
      <SubTitle title="التصنيفات" pathText="/allcategory" />

      <div className="my-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            CategoryImage={category.image}
            CategoryName={category.name}
          />
        ))}
      </div>
    </div>
  );
}
export default CategoryContainer;
