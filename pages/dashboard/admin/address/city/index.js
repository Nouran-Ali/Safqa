import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import TableStyles from "../../../../../styles/Dashboard/Tables.module.css";
import { usePageSize } from "../../../../../comps/Dashboard/Inputs";
import { BtnEdit, BtnNewDelete, BtnShow, BtnTables, MagicLinkIcon } from "../../../../../comps/Buttons";
import SafqaTable from "../../../../../comps/common/SafqaTable";
import { deleteCity, getCities } from "../../../../../store/slices/citySlice";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Space } from "antd";
import AddIcon from "@mui/icons-material/Add";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import AdminAddressNav from "../../../../../comps/admin/address/AdminAddressNav";
import { useEffect } from "react";

const City = () => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const dispatch = useDispatch();

    const tableRef = useRef()

    const { SelectPageSize, pageSize } = usePageSize(5);

    const { cities, isLoading, deleteLoading, success, api_errors } = useSelector(state => state.city);

    const columns = [
        {
            title: t("dashboard.name_En"),
            dataIndex: 'name_en',
            key: 'name_en',
        },
        {
            title: t("dashboard.name_Ar"),
            dataIndex: 'name_ar',
            key: 'name_ar',
        },
        {
            title: t("dashboard.country"),
            dataIndex: language == 'en' ? ['country', 'name_en'] : ['country', 'name_ar'],
            key: ['country', 'name_en'],
        },
        {
            title: language == 'en' ? 'Actions' : 'أجراءات',
            dataIndex: '',
            key: 'x',
            render: (_, city) =>
                <Space>
                    {/* <BtnShow href={`../../dashboard/admin/address/city/${city.id}`} /> */}
                    <BtnEdit href={`/dashboard/admin/address/city/update/${city.id}`} />
                    <BtnNewDelete
                        title={city[language == 'en' ? "name_en" : "name_ar"]}
                        item={city}
                        handleDelete={deleteCity}
                        isLoading={deleteLoading}
                        success={success}
                        error={api_errors}
                    />
                </Space>
        },
    ]

    useEffect(() => {
        dispatch(getCities());
    }, [dispatch])

    return (

        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12  mb-5">
            <div className={styles.container}>

                <AdminAddressNav />

                
                <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
                    <div className={`rounded-2 ${language == "en" && "me-4"} ${TableStyles.info}`}>
                        <MagicLinkIcon
                            url="/dashboard/admin/address/city/create"
                            style={TableStyles.bgBlue}
                            icon={<AddIcon />}
                            name={t("dashboard.create_new")}
                        />
                        {/* <MagicLinkIcon
                            url="/dashboard"
                            style={TableStyles.bgBlue}
                            icon={<VerticalAlignBottomIcon />}
                            name={t("dashboard.import")}
                        /> */}

                        <br />
                        <div className={`safqa-scroll-x d-flex ${language == "ar" && "me-2"}`}>
                            <BtnTables
                                getItems={getCities}
                                data={cities}
                                columns={columns}
                                filename="cities"
                                tableRef={tableRef}
                            />
                            <SelectPageSize />
                        </div>

                        <div className="w-100 mt-2" ref={tableRef}>
                            <SafqaTable
                                dataSource={cities}
                                columns={columns}
                                loading={isLoading}
                                pageSize={pageSize}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default City;
