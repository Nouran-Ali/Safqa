import socialMediaStyles from "../../../../styles/Dashboard/SocialMedia.module.css";
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
import { deletePaymentMethod, getPaymentMethods } from "../../../../store/slices/paymentMethodSlice";
import { CheckCircleOutlined } from "@mui/icons-material";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { getAdminCommissions } from "../../../../store/slices/adminCommissionSlice";


const AdminCommissions = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const dispatch = useDispatch()

    const tableRef = useRef()

    const { SelectPageSize, pageSize } = usePageSize(5);

    const { adminCommissions, isLoading, deleteLoading, urlFile, success, api_errors } = useSelector(state => state.adminCommission);

    const columns = [
      {
        title: t('dashboard.safqa_commission'),
        dataIndex: 'safqa_commission',
        key: 'safqa_commission',
        render: (_, commission) => <>{commission.safqa_commission} %</>,
      },
      {
        title: t('dashboard.payment_commission'),
        dataIndex: 'payment_commission',
        key: 'payment_commission',
        render: (_, commission) => <>{commission.payment_commission} %</>,
      },
      {
        title: language == 'en' ? 'Actions' : 'إجراءات',
        dataIndex: '',
        key: 'x',
        render: (_, commission) => (
          <Space>
            <BtnEdit
              href={`/dashboard/admin/commissions/update/${commission.id}`}
            />
            {/* <BtnNewDelete
              title={paymentMethod[language == 'en' ? 'name_en' : 'name_ar']}
              item={paymentMethod}
              handleDelete={deletePaymentMethod}
              isLoading={deleteLoading}
              success={success}
              error={api_errors}
            /> */}
          </Space>
        ),
      },
    ];

    useEffect(() => {
        dispatch(getAdminCommissions());
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12  mb-5">
            <div className={styles.container}>
                <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
                    <div className={`rounded-2 ${language == "en" && "me-4"} ${TableStyles.info}`}>
                        {/* <MagicLinkIcon
                            url="/dashboard/admin/paymentMethod/create"
                            style={TableStyles.bgBlue}
                            icon={<AddIcon />}
                            name={t("dashboard.create_new")}
                        /> */}
                        {/* <MagicLinkIcon
                            url="/dashboard"
                            style={TableStyles.bgBlue}
                            icon={<VerticalAlignBottomIcon />}
                            name={t("dashboard.import")}
                        /> */}

                        <br />
                        <div className={`safqa-scroll-x d-flex ${language == "ar" && "me-2"}`}>
                            <BtnTables
                                getItems={getAdminCommissions}
                                data={adminCommissions}
                                columns={columns}
                                filename="adminCommissions"
                                tableRef={tableRef}
                            />
                            <SelectPageSize />
                        </div>

                        <div className="w-100 mt-2" ref={tableRef}>
                            <SafqaTable
                                dataSource={adminCommissions}
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

export default AdminCommissions;
