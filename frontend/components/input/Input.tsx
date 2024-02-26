'use client'
import React from "react";
import { Form, Input } from "antd";
import { InputFieldProps } from "@/types/type";

export default function InputField({
  type, 
  onChange, 
  name, 
  id, 
  placeholder, 
  rules, 
  prefix, 
  width, 
  disabled = false, 
}: InputFieldProps) {
  return (
    <Form.Item
        className={width ? width : "w-full"}
        name={name}
        rules={rules}
      >
        <Input
          disabled={disabled}
          prefix={prefix}
          id={id}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
        />
      </Form.Item>
  )
}
