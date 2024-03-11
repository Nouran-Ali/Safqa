import styles from "../../../../styles/Dashboard/dashboard.module.css";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { usePageSize } from "../../../../comps/Dashboard/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { Space } from "antd";
import { BtnEdit, BtnNewDelete, BtnTables, MagicLinkIcon } from "../../../../comps/Buttons";
import TableStyles from "../../../../styles/Dashboard/Tables.module.css";
import AddIcon from "@mui/icons-material/Add";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import SafqaTable from "../../../../comps/common/SafqaTable";
import { deleteBank, getBanks } from "../../../../store/slices/bankSlice";
import { CheckCircleOutlined } from "@mui/icons-material";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const AdminBank = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const dispatch = useDispatch()

    const tableRef = useRef()

    const { SelectPageSize, pageSize } = usePageSize(5);

    const { banks, isLoading, deleteLoading, success, api_errors } = useSelector(state => state.bank);

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
            key: 'country_id',
        },
        {
            title: t("dashboard.is_active"),
            dataIndex: "is_active",
            key: 'is_active',
            render: (_, bank) => bank.is_active ?
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
            onFilter: (value, bank) => bank.is_active === value,
        },
        {
            title: language == 'en' ? 'Actions' : 'إجراءات',
            dataIndex: '',
            key: 'x',
            render: (_, bank) =>
                <Space>
                    <BtnEdit href={`/dashboard/admin/bank/update/${bank.id}`} />
                    <BtnNewDelete
                        title={bank.name}
                        item={bank}
                        handleDelete={deleteBank}
                        isLoading={deleteLoading}
                        success={success}
                        error={api_errors}
                    />
                </Space>
        },
    ]

    useEffect(() => {
        dispatch(getBanks());
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12  mb-5">
            <div className={styles.container}>
                <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
                    <div className={`rounded-2 ${language == "en" && "me-4"} ${TableStyles.info}`}>
                        <MagicLinkIcon
                            url="/dashboard/admin/bank/create"
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
                                getItems={getBanks}
                                data={banks}
                                columns={columns}
                                filename="banks"
                                tableRef={tableRef}
                            />
                            <SelectPageSize />
                        </div>

                        <div className="w-100 mt-2" ref={tableRef}>
                            <SafqaTable
                                dataSource={banks}
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

export default AdminBank;
