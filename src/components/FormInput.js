//@flow
import React from 'react';
import { get, omit } from "lodash";
import { Input, Typography } from 'antd';

const { Text } = Typography;

const FormInput = ({
    field, // { name, value, onChange, onBlur }
    classes,
    iconName,
    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    return (
        <div>
            <Input
                {...field}
                {...omit(props, ['hideLabel', 'defaultHidden'])}
                label={!props.hideLabel ? props.label : null}
                value={field.value || ''}
                onChange={evt => {
                    setFieldValue(field.name, evt.target.value);
                }}
            />
            {get(touched, field.name) && get(errors, field.name) && (
                <div className="mb-3"><Text type="danger">{get(errors, field.name)}</Text></div>
            )}
        </div>
    )
};

export default FormInput;