import { Input, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import { Space, Typography } from 'antd';
import { Controller } from 'react-hook-form'
import styles from "../styles/Dashboard/Inputs.module.css";


const { Text, Link } = Typography;


export const SafqaInput = ({
    label,
    name,
    control,
    error,
    required,
    ...inputProps
}) => {
    const [t, i18n] = useTranslation();

    return (
        <>
            {
                label && (
                    <label
                        htmlFor={label}
                    >
                        <Text
                            type={error ? "danger" : "default"}
                            className={`form-label ${styles.label}`}
                        >
                            {label}
                            {
                                !required &&
                                <span className="ms-2 me-2 opacity-75">{t("dashboard.optional")}</span>
                            }
                        </Text>
                    </label>
                )
            }

            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Input
                        {...field}
                        {...inputProps}
                        id={label}
                        status={error && "error"}
                        className={`rounded-2 form-control shadow-none`}
                    />
                )}
            />

            {error &&
                <Text type="danger">{error}</Text>
            }
        </>
    );
};


export const SafqaRadio = ({
    label,
    items,
    error,
    control,
    name,
    ...inputProps
}) => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <>
            {
                label && (
                    <label
                        htmlFor={label}
                    >
                        <Text
                            type={error && "danger"}
                            className={`form-label ${styles.label}`}
                        >
                            {label}
                        </Text>
                    </label>
                )
            }

            {/* <div className="d-flex "> */}

            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Radio.Group
                        {...field}
                        {...inputProps}
                        status={error && "error"}
                        id={label}
                        className={`rounded-2 shadow-none ${styles.radio}`}
                    >
                        {
                            items?.length > 0 &&
                            items.map(item =>
                                <Radio
                                    key={item.id}
                                    value={item.id}
                                >{item.name}</Radio>
                            )
                        }
                    </Radio.Group>
                )}
            />

            {/* 

                <div className={`form-check form-check-inline ${language == "en" ? "me-5" : "ms-5"} ${styles.radio}`}>
                    {
                        items?.length > 0 &&
                        items.map(item => (
                            <div className={`form-check form-check-inline ${language == "en" ? "me-5" : "ms-3"} ${styles.radio}`}>
                                <input
                                    {...register(name)}
                                    className="form-check-input shadow-none"
                                    type="radio"
                                    id={item.id}
                                    value={item.id}
                                    defaultChecked={defaultValue === item.id}
                                />
                                <label className="form-check-label" htmlFor={item.id}>
                                    {item.name}
                                </label>
                            </div>
                        ))
                    }

                </div> */}
            {/* </div> */}
            {error && <span className="text-danger fs-6">{error}</span>}
        </>
    );
};
