import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InvoiceDesignComp from "../../../comps/Dashboard/InvoiceDesign";
import { getPayInvoice } from "../../../store/slices/payInvoiceSlice";
import LoadingPage from '../../../comps/LoadingPage'
import ErrorPage from '../../../comps/AlertError'
import { getCountries } from "../../../store/slices/countrySlice";
import { getPaymentType } from "../../../store/slices/paymentInfoSlice";


const InvoiceDesign = () => {
  const { payInvoice, isLoading, api_errors, success } = useSelector((state) => state.payInvoice);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch(getCountries())
    dispatch(getPaymentType());
  }, [dispatch])

  useEffect(() => {
    id && dispatch(getPayInvoice(id))
  }, [dispatch, id])


  return (
    <div>
      {
        !payInvoice && isLoading && <div className="container vh-100"><LoadingPage /></div>
      }
      {
        !payInvoice && api_errors && <ErrorPage />
      }
      {
        payInvoice && <InvoiceDesignComp payInvoice={payInvoice} />
      }
    </div>
  );
};

export default InvoiceDesign;

InvoiceDesign.getLayout = function getLayout(page) {
  return page
}