import HeaderBanner from "../../Components/Home/HeaderBanner";
import HomeGategories from "../../Components/Home/HomeGategories";
import CardProductsCountainer from "../../Components/Products/CardProductsCountainer";
import BrandFeature from "../../Components/Brand/BrandFeature";
function HomePage() {
  return (
    <div className="text-center">
      <HeaderBanner />
      <HomeGategories />
      <CardProductsCountainer
        title="الاكثر مبيعا"
        btnTitle="عرض الكل"
        pathText="/products"
      />
      <BrandFeature title="اشهر الماركات" btnTitle="عرض الكل" />
    </div>
  );
}

export default HomePage;
