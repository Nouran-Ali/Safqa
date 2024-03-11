import LoadingSpinner from '../../LoadingSpinner';
import { Modal, Button, Space, Tag } from 'antd';
import {
  SafqaInput,
  SafqaRadioInput,
  SafqaSelectCommissionType,
  SafqaTextArea,
} from '../Inputs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createProductLinkSchema } from '../../../lib/validations/en/productLinkSchema';
import styles from '../../../styles/Buttons.module.css';
import { MagicBtn, MagicBtnCreateLink } from '../../Buttons';
import {
  createProductLink,
  ResetSuccess,
} from '../../../store/slices/productLinkSlice';
import { createProductLinkSchemaAr } from '../../../lib/validations/ar/productLinkSchemaAr';
import { useRouter } from 'next/router';
import { Tooltip } from 'antd';

const CreateProductLink = ({ selectedRowKeys, selectedRows }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { theme } = useTheme();
  const router = useRouter();
  const { productLinkInfo, isLoading, api_errors, success } = useSelector(
    (state) => state.productLink
  );

  const defaultValues = productLinkInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      language == 'en' ? createProductLinkSchema : createProductLinkSchemaAr
    ),
    defaultValues,
  });

  const showModal = () => {
    selectedRows?.length > 0 && setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    setValue('products', selectedRowKeys);
  }, [selectedRowKeys, setValue]);

  useEffect(() => {
    success &&
      dispatch(ResetSuccess()) &&
      router.push('/dashboard/products/urls');
  }, [dispatch, router, success]);

  const onSubmit = (data) => {
    dispatch(createProductLink(data));
  };

  return (
    <>
      <Tooltip
        placement={language == 'en' ? 'right' : 'left'}
        title={t('dashboard.create_link_note')}
      >
        <button
          type="button"
          className={`btn ${language == 'en' ? 'me-3' : 'ms-3'} mt-3 ${
            theme == 'dark' ? 'btn-dark-box' : styles.BtnTables
          }`}
          onClick={showModal}
        >
          {isLoading ? <LoadingSpinner /> : t('dashboard.create_link')}
        </button>
      </Tooltip>
      <form>
        <Modal
          title="Create Product Link"
          open={open}
          onOk={handleSubmit(onSubmit)}
          onCancel={handleCancel}
          okText={t('dashboard.create')}
          className={theme == 'dark' ? 'dark-ant-modal' : ''}
        >
          <div className="row mb-3 px-3">
            <p
              className={`fw-bold ${
                theme == 'dark' ? 'text-white' : 'text-dark'
              }`}
            >
              Products
            </p>
            <Space size={[0, 6]} wrap>
              {selectedRows?.map((product) => (
                <Tag key={product.id} className="fs-6 rounded">
                  {language == 'en' ? product.name_en : product.name_ar}
                </Tag>
              ))}
            </Space>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 px-4 ">
              <SafqaInput
                label={t('dashboard.name_En')}
                className="bg-grey"
                name="name_en"
                type="text"
                register={register}
                error={errors.name_en?.message || api_errors?.name_en}
                required
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 px-4 ">
              <SafqaInput
                label={t('dashboard.name_Ar')}
                className="bg-grey"
                name="name_ar"
                type="text"
                register={register}
                error={errors.name_ar?.message || api_errors?.name_ar}
                required
              />
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 px-4 mt-3">
              <SafqaSelectCommissionType
                select_label
                required
                register={register}
                error={
                  errors.commission_type?.message || api_errors?.commission_type
                }
                className="bg-grey"
              />
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 px-4 mt-3">
              <SafqaRadioInput
                label={t('dashboard.is_active')}
                items={[
                  { id: 1, name: t('dashboard.yes') },
                  { id: 0, name: t('dashboard.no') },
                ]}
                name="is_active"
                register={register}
                defaultValue={defaultValues.is_active}
                error={errors?.is_active?.message}
              />
            </div>

            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 px-4 mt-3">
              <SafqaTextArea
                className="bg-grey"
                label={t('dashboard.terms_conditions')}
                name="Terms_and_conditions"
                register={register}
                error={
                  errors.Terms_and_conditions?.message ||
                  api_errors?.Terms_and_conditions
                }
              />
            </div>
          </div>
        </Modal>
      </form>
    </>
  );
};

export default CreateProductLink;
