import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import TableStyles from "../../../../../styles/Dashboard/Tables.module.css";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { usePageSize } from "../../../../../comps/Dashboard/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { Space } from "antd";
import { BtnEdit, BtnNewDelete, BtnShow, BtnTables, MagicLinkIcon } from "../../../../../comps/Buttons";
import SafqaTable from "../../../../../comps/common/SafqaTable";
import { deleteCountry, getCountries } from "../../../../../store/slices/countrySlice";
import AddIcon from "@mui/icons-material/Add";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import AdminAddressNav from "../../../../../comps/admin/address/AdminAddressNav";
import { CheckCircleOutlined } from "@mui/icons-material";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const Country = () => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const dispatch = useDispatch();

    const tableRef = useRef()

    const { SelectPageSize, pageSize } = usePageSize(5);

    const { countries, imageUrl, isLoading, deleteLoading, success, api_errors } = useSelector(state => state.country);

    const columns = [
        {
            title: t("dashboard.flag"),
            dataIndex: 'flag',
            key: 'flag',
            render: (flag) => <img height={"50px"} src={`${imageUrl}/${flag}`} />
        },
        {
            title: t("dashboard.name"),
            dataIndex: language == 'en' ? 'name_en' : 'name_ar',
            key: 'name_en',
        },
        {
            title: t("dashboard.code"),
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: t("select.Nationality"),
            dataIndex: language == 'en' ? 'nationality_en' : 'nationality_ar',
            key: 'nationality_en',
        },
        {
            title: t("dashboard.currency"),
            dataIndex: "currency",
            key: 'currency',
        },
        {
            title: t("dashboard.is_active"),
            dataIndex: "country_active",
            key: 'country_active',
            render: (country_active) => country_active ?
                <CheckCircleOutlined className="text-success fs-5" /> :
                <CloseCircleOutlined className="text-danger fs-5" />,
            filters: [
                {
                    text: 'Active',
                    value: 1,
                },
                {
                    text: 'Inactive',
                    value: 0,
                },
            ],
            onFilter: (value, country_active) => country_active === value,
        },
        {
            title: language == 'en' ? 'Actions' : 'أجراءات',
            dataIndex: '',
            key: 'x',
            render: (_, country) =>
                <Space>
                    <BtnShow href={`/dashboard/admin/address/country/${country.id}`} />
                    <BtnEdit href={`/dashboard/admin/address/country/update/${country.id}`} />
                    <BtnNewDelete
                        title={country[language == 'en' ? "name_en" : "name_ar"]}
                        item={country}
                        handleDelete={deleteCountry}
                        isLoading={deleteLoading}
                        success={success}
                        error={api_errors}
                    />
                </Space>
        },
    ]

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch])

    return (

        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12  mb-5">
            <div className={styles.container}>

                <AdminAddressNav />

                <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
                    <div className={`rounded-2 ${language == "en" && "me-4"} ${TableStyles.info}`}>
                        <MagicLinkIcon
                            url="/dashboard/admin/address/country/create"
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
                                getItems={getCountries}
                                data={countries}
                                columns={columns}
                                filename="countries"
                                tableRef={tableRef}
                            />
                            <SelectPageSize />
                        </div>

                        <div className="w-100 mt-2" ref={tableRef}>
                            <SafqaTable
                                dataSource={countries}
                                columns={columns}
                                loading={isLoading}
                                pageSize={pageSize}
                            />
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Country;
