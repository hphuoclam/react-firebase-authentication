//@flow
import React, { useState } from 'react';
import { Input, Typography } from 'antd';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

// const FormFileInput = ({
//   field, // { name, value, onChange, onBlur }
//   classes,
//   iconName,
//   form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
//   inputChange,
//   ...props
// }) => {
//   const defaultValue = "";

//   return (
//     <Input
//       type="file"
//       {...field}
//       {...props}
//       value={defaultValue || ''}
//       onChange={evt => {
//         setFieldValue(field.name, props.type === 'file' ? evt.target.files[0] : evt.target.value);
//         defaultValue = evt.target.value;
//         inputChange && inputChange(evt.target);
//       }}
//     />
//   )
// };

class FormFileInput extends React.Component {
  state = {
    fileList: [],
  };

  componentWillUpdate(nextProps, nextState) {
    const { fileList } = this.state;
    const { field, form: { setFieldValue } } = this.props;
    if (nextState !== fileList) {
      setFieldValue(field.name, fileList);
    }
  }

  render() {
    const { fileList } = this.state;
    const { field, form: { setFieldValue }, selectLimit, placeholder } = this.props;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => {
          const newFileList = [...state.fileList, file];
          return {
            fileList: newFileList,
          };
        });
        return false;
      },
      fileList,
    };

    return (
      <div className="mb-3">
        <Upload {...props}>
          {selectLimit > fileList.length && < Button > <UploadOutlined /> {placeholder || "Select File"}</Button>}
        </Upload>
      </div >
    );
  }
}

export default FormFileInput;