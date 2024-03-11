import SmallNavbarSiteAllProducts from "../../../comps/Dashboard/Products/SmallNavbarSiteAllProducts";
import NavbarSiteAllProducts from "../../../comps/Dashboard/Products/NavbarSiteAllProducts";
import Header from "../../../comps/Dashboard/Products/Header";
import Tap from "../../../comps/Dashboard/Products/Tap";
import CardSiteAllProducts from "../../../comps/Dashboard/Products/CardSiteAllProducts";

export default function SiteAllProducts() {
  return (
    <>
      <SmallNavbarSiteAllProducts />
      
      <NavbarSiteAllProducts 
imageSrc = "/dashboard/logoCompany.png" />

      <Header />

      <Tap />

      <CardSiteAllProducts />
    </>
  );
}
