import { InputProps } from '@/types/type';
import { Alert, Space } from 'antd';
  
export default function BreadCrumb({ type, showIcon =true, closable =true, message }: InputProps) {
    
    return (
        <Space direction="vertical" style={{ width: '100%', paddingBottom: '10px' }}>
            <Alert message={message} type={type} showIcon={showIcon} closable={closable} />
        </Space>
    )
    
}