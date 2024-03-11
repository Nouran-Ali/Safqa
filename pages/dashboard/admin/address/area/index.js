import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { usePageSize } from "../../../../../comps/Dashboard/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { Space } from "antd";
import { BtnEdit, BtnNewDelete, BtnShow, BtnTables, MagicLinkIcon } from "../../../../../comps/Buttons";
import SafqaTable from "../../../../../comps/common/SafqaTable";
import { deleteArea, getArea, getAreas } from "../../../../../store/slices/areaSlice";
import AddIcon from "@mui/icons-material/Add";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import TableStyles from "../../../../../styles/Dashboard/Tables.module.css";
import AdminAddressNav from "../../../../../comps/admin/address/AdminAddressNav";


const Area = () => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const dispatch = useDispatch();

    const tableRef = useRef()

    const { SelectPageSize, pageSize } = usePageSize(5);

    const { areas, isLoading, deleteLoading, success, api_errors } = useSelector(state => state.area);

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
            title: t("dashboard.city"),
            dataIndex: language == 'en' ? ['city', 'name_en'] : ['city', 'name_ar'],
            key: ['city', 'name_en'],
        },
        {
            title: language == 'en' ? 'Actions' : 'أجراءات',
            dataIndex: '',
            key: 'x',
            render: (_, area) =>
                <Space>
                    {/* <BtnShow href={`../../dashboard/admin/address/area/${area.id}`} /> */}
                    <BtnEdit href={`/dashboard/admin/address/area/update/${area.id}`} />
                    <BtnNewDelete
                        title={area[language == 'en' ? "name_en" : "name_ar"]}
                        item={area}
                        handleDelete={deleteArea}
                        isLoading={deleteLoading}
                        success={success}
                        error={api_errors}
                    />
                </Space>
        },
    ]

    useEffect(() => {
        dispatch(getAreas());
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12  mb-5">
            <div className={styles.container}>
                <AdminAddressNav />

                <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
                    <div className={`rounded-2 ${language == "en" && "me-4"} ${TableStyles.info}`}>
                        <MagicLinkIcon
                            url="/dashboard/admin/address/area/create"
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
                                getItems={getArea}
                                data={areas}
                                columns={columns}
                                filename="areas"
                                tableRef={tableRef}
                            />
                            <SelectPageSize />
                        </div>

                        <div className="w-100 mt-2" ref={tableRef}>
                            <SafqaTable
                                dataSource={areas}
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

export default Area;
