import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import TableStyles from "../../../../../styles/Dashboard/Tables.module.css";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
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
import NavAdminContacts from "../../../../../comps/Dashboard/Setting/NavAdminContacts";
import { deleteContactPhone, getContactPhones } from "../../../../../store/slices/contactPhoneSlice";

const AdminContactPhones = () => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    
    const dispatch = useDispatch()

    const tableRef = useRef()

    const { SelectPageSize, pageSize } = usePageSize(5);

    const { contact_phones, isLoading, deleteLoading, success, api_errors } = useSelector(state => state.contactPhone);

    const columns = [
        {
            title: t("dashboard.type"),
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: t("dashboard.number"),
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: language == 'en' ? 'Actions' : 'أجراءات',
            dataIndex: '',
            key: 'x',
            render: (_, contact) =>
                <Space>
                    <BtnEdit href={`/dashboard/admin/contact/phones/update/${contact.id}`} />
                    <BtnNewDelete
                        title={contact.number}
                        item={contact}
                        handleDelete={deleteContactPhone}
                        isLoading={deleteLoading}
                        success={success}
                        error={api_errors}
                    />
                </Space>
        },
    ]

    useEffect(() => {
        dispatch(getContactPhones())
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12  mb-5">
            <div className={styles.container}>
                <NavAdminContacts />
                <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
                    <div className={`rounded-2 ${language == "en" && "me-4"} ${TableStyles.info}`}>
                        <MagicLinkIcon
                            url="/dashboard/admin/contact/phones/create"
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
                                getItems={getContactPhones}
                                data={contact_phones}
                                columns={columns}
                                filename="contact_phones"
                                tableRef={tableRef}
                            />
                            <SelectPageSize />
                        </div>
                        <div className="w-100 mt-2" ref={tableRef}>
                            <SafqaTable
                                dataSource={contact_phones}
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

export default AdminContactPhones;
