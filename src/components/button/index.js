import React from 'react';
import { Button } from 'antd';

const Index = ({ children, type, colorType, ...props }) => {
    return <Button {...props} htmlType={type} type={colorType}>{children}</Button>;
}

export default Index;