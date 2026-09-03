import BrandCard from "./BrandCard";
import SubTitle from "../Utility/SubTitle";

function BrandContainer({ brands }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-6">
      <SubTitle title="كل الماركات" />

      <div className="my-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {brands.map((brand) => (
          <BrandCard
            key={brand._id}
            BrandImage={brand.image}
            BrandName={brand.name}
          />
        ))}
      </div>
    </div>
  );
}

export default BrandContainer;