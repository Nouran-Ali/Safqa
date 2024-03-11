import NavSmallSite from "../../../comps/Dashboard/Products/NavSmallSite";
import Card from "../../../comps/Dashboard/Products/Card";
import TotalPriceToSite from "../../../comps/Dashboard/Products/TotalPriceToSite";

export default function Site() {

  return (
      <div className="container">
        <NavSmallSite />

        <Card />

        {/* <TotalPriceToSite /> */}
    </div>
  );
}
