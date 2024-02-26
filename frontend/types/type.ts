import { ReactNode } from "react";
import { Item } from "./item.type";


export type ItemTableProps = {
    setOpenDrawer: (value: boolean) => void;
    setOpenDeleteModal: (value: boolean) => void;
    setEditData: (value: any) => void;
    setDeleteId: (value: any) => void;
    items: any;
}

export interface DetailDrawerProps {
    open?: boolean;
    setOpen?: any;
    children?: ReactNode | ReactNode[];
    rest?: any;
    editData?: any;  
}

export type ItemFormProps = {
    setOpen: (value: boolean) => void;
    editData: Item;
};

export type LoginProps = {
    username: string;
    password: string;
}

export interface BoxWrapperProps {
    id?: any
    className?: string
    children?: ReactNode
    boxShadow?: any
    borderLeft?: string
    rest?: any
}

export interface ButtonProps {
    type?: any,
    title: string,
    onClick?: (event: any) => void,
    className?: string,
    disabled?: boolean,
    htmlType?: any,
    loading?: boolean,
    size?: any,
    danger?: boolean
}

export interface CardProps {
    isModalOpen: boolean,
    title: string,
    handleOk: () => void,
    handleCancel: () => void,
    children: any,
    isServiceSuccess?: {
      status: string,
      message: string,
    },
}
  
export interface InputFieldProps {
    type:any,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string
    textarea?:boolean
    id?:string
    placeholder?:string
    rules?: any,
    prefix?: any,
    width?:string
    disabled?: boolean
    value?: string
}
  

export interface CommonModalProps {
    isModalOpen: boolean,
    title: string,
    handleOk: () => void,
    handleCancel: () => void,
    children: any,
}
  
export interface PageHeaderProps {
    title: React.ReactNode
    actions?: boolean
    children?: React.ReactNode
    bordered?: boolean
}

export interface InputProps {
    type: any,
    showIcon?: boolean,
    closable?: boolean,
    message: string,
}