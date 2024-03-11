import { useState, useEffect } from "react";
import styles from "../../../styles/Dashboard/Create.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { MagicBtn } from "../../Buttons";
import { MagicInput, SafqaAutoComplete, SafqaInput, SafqaLabel } from "../Inputs";
import {
  setCurrencyId,
  setLanguage,
  addInvoiceItem,
  deleteInvoiceItemByName,
  editInvoiceItemNameByIndex,
  editInvoiceItemPriceByIndex,
  editInvoiceItemQuantityByIndex,
  ResetSuccess
} from "../../../store/slices/invoiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFieldArray } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const InvoiceItemsComponent = ({ register, setValue, errors, api_errors, defaultValues, inputs, control }) => {
  const { theme } = useTheme();
  const router = useRouter()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "prductItems",
  });
  const dispatch = useDispatch()
  const [count, setCount] = useState(0);
  const { totalInvoiceItems, isLoading, success, prductItems } = useSelector((state) => state.invoice);

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/invoices")
  }, [success, dispatch, router]);

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 safqa-scroll-x ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.invoice_items")}</p>
        <hr />

        <div className={`d-flex ${styles.labels_width}`}>
          <div className={`${styles.w_25} ${styles.w_50} px-4 mt-3`}>
            <SafqaLabel label={t("dashboard.product_name")} />
          </div>

          <div className={`${styles.w_25} ${styles.w_50} px-4 mt-3`}>
            <SafqaLabel label={t("dashboard.unit_price")} />
          </div>

          <div className={`${styles.w_16} ${styles.w_50} px-4 mt-3`}>
            <SafqaLabel label={t("dashboard.quantity")} />
          </div>

          <div className={`${styles.w_16} ${styles.w_50} px-4 mt-3 ${styles.total}`}>
            <SafqaLabel label={t("dashboard.total")} />
          </div>
        </div>

        <InvoiceItems
          setValue={setValue}
          register={register}
          control={control}
          fields={fields}
          errors={errors}
          api_errors={api_errors}
          remove={remove}
          defaultValues={defaultValues}
          inputs={inputs}
        />

        <CreateNewItem append={append} inputs={inputs} defaultValues={defaultValues} />

      </div>
      <MagicBtn isLoading={isLoading} label={t("dashboard.create")} disabled={false} />
    </div>
  );
};


const CreateNewItem = ({ append, inputs, defaultValues }) => {
  const { prductItems } = inputs;
  const { active_countries } = useSelector(state=>state.country) 
  const { currency_id } = inputs;

  const calcTotal = (items) => {
    let total = 0;
    items.map((item) => (total += item.product_price * item.product_quantity));
    return total;
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(price * count);
  }, [count, price]);


  const handleAddItem = () => {
    append({
      product_name: "",
      product_price: 0,
      product_quantity: 0
    })
  };

  const [t, i18n] = useTranslation();

  return (
    <div className={`d-flex mt-3 ${styles.row_width}`} >
      {/* product name */}
      <div className={` ${styles.w_25} ${styles.w_50} px-4`}>
      </div>
      {/* product price */}

      <div className={`${styles.w_25} ${styles.w_50} px-4`}>
      </div>
      {/* product count */}

      <div className={`${styles.w_16} ${styles.w_50} px-4`}>
      </div>

      {/* total */}
      <div className={`${styles.w_16} ${styles.w_50} px-4 ${styles.total}`}>

        <input
          type="text"
          className="form-control border-0 shadow-none"
          value={`${calcTotal(prductItems)} (${currency_id ? active_countries?.find(c=>c.id == currency_id)?.short_currency : "$"}) `}
          disabled
        />
      </div>

      <div className={`${styles.w_16} ${styles.w_50} px-4`}>
        <button
          type="button"
          onClick={handleAddItem}
          className={`btn px-4 ${styles.btncreate}`}
        >
          {/* {t("dashboard.create")} */}
          <AddIcon />
        </button>
      </div>
    </div>
  );
};

const InvoiceItems = ({ fields, control, register, errors, api_errors, remove, defaultValues, inputs, setValue }) => {
  const dispatch = useDispatch();
  const { product_name, product_quantity, product_price } = defaultValues
  const { prductItems } = inputs;
  const { products } = useSelector(state => state.product)

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return fields.map(
    ({ id }, index) => (
      <div key={id} className={`d-flex mt-3 ${styles.row_width}`}>
        <div className={`${styles.w_25} ${styles.w_50} px-4`}>
          <SafqaAutoComplete
            type="text"
            required
            control={control}
            name={`prductItems[${index}].product_name`}
            defaultValue={product_name}
            options={products?.map(option => {
              option = {
                value: language == 'en' ? option.name_en : option.name_ar,
                ...option,
              }
              return option
            })}
            onSelect={(data) => products.map(option => {
              if (option.name_en == data || option.name_ar == data) {
                return (
                  setValue(`prductItems[${index}].product_price`, option.price),
                  setValue(`prductItems[${index}].product_quantity`, option.quantity)
                )
              }
            })}
            error={errors?.prductItems?.[index]?.product_name?.message || api_errors?.[`product_name.${index}`]}
            placeholder="iphone"
          />
        </div>

        <div className={`${styles.w_25} ${styles.w_50} px-4`}>
          <SafqaInput
            type="number"
            required
            register={register}
            name={`prductItems[${index}].product_price`}
            defaultValue={product_price}
            error={errors?.prductItems?.[index]?.product_price?.message || api_errors?.[`product_price.${index}`]}
          />
        </div>

        <div className={`${styles.w_16} ${styles.w_50} px-4`}>
          <SafqaInput
            type="number"
            required
            register={register}
            name={`prductItems[${index}].product_quantity`}
            defaultValue={product_quantity}
            error={errors?.prductItems?.[index]?.product_quantity?.message || api_errors?.[`product_quantity.${index}`]}
          />
        </div>

        <div className={`${styles.w_16} ${styles.w_50} px-4 ${styles.total}`}>
          <input
            className="form-control border-0 shadow-none"
            type="text"
            value={(prductItems[index]?.product_quantity * prductItems[index]?.product_price) || 0}
            disabled
          />
        </div>

        {
          prductItems.length > 1 &&
          <div className={`${styles.w_16} ${styles.w_50} px-4`}>
            <button
              onClick={() => remove(index)}
              type="button"
              className={`btn border-0 px-2 ${language == "en" ? "ms-3" : "me-3"} ${styles.delete}`}
            >
              <DeleteIcon />
            </button>
          </div>
        }
      </div>
    )
  );
};

export default InvoiceItemsComponent;
