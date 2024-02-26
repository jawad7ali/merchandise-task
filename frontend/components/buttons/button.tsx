'use client'
import React from "react";
import { Button, Form, Input } from "antd";
import { ButtonProps } from "@/types/type";

export default function ButtonComp({
    className,
    onClick,
    type = 'primary',
    title, 
    disabled = false, 
    htmlType = 'button', 
    loading = false,
    size = 'default',
    danger = false
}: ButtonProps) {
    
    return (
        <Button 
            type={type}
            className={className}
            onClick={onClick}
            disabled={disabled}
            htmlType={htmlType}
            loading={loading}
            size={size}
            danger={danger}
        >
            {title}
        </Button>
  )
}
