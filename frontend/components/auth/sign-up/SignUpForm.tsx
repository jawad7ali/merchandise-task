'use client'
import React, { useState } from "react";
import Link from "next/link";
import { Form, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import InputField from "@/components/input/Input";
import useCustomHook from './actionHandler';
import { User } from "@/types/user.type";

const SignUpForm = () => {

  const action = useCustomHook();
  const router = useRouter()

  const [form] = Form.useForm();

  const onFinish = async (values: User) => {    
    const body: User = {
      "username": values.username,
      "password": values.password,
      "fullName": values.fullName
    }
    const filteredBody = Object.entries(body)
      .reduce((acc: any, [key, value]) => {
        if (typeof value !== 'undefined' && value !== null) {
          acc[key] = value;
        }
        return acc;
      }, {});
    const response = await action.signup(filteredBody);
    if (response) {
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  };

    return (
        <Form
        name="normal_login "
        className="login-form flex justify-center items-center rounded-2xl border-4 flex-col mt-8 bg-blue-50"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
        style={{width:'400px',height:"400px"}}
      >
      
        <h1 className="text-2xl m-3 font-bold">Register</h1>

        <InputField
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please input your Valid Full Name!",
              pattern: new RegExp("^[a-zA-Z ]*$")
            },
            {
              min: 3,
              message: "Full Name must be at least 3 characters"
            }
          ]}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Full Name"
          width="w-64"
          type="text"
        />
        <InputField
          name="username"
          rules={[
            {
              required: true, message: "Please input your Username!"
            },
            {
              min: 3,
              message: "Username must be at least 3 characters"
            }
          ]}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          type="text"
          width="w-64"
        />
     
        <InputField
          name="password"
          rules={[
            {
              required: true, message: "Please input your Password!"
            },
            {
              min: 6,
              message: "Password must be at least 6 characters"
            }
          ]}
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
          width="w-64"
          type="password"
        />
        <Form.Item>
        <Button
            htmlType="submit"
            className="login-form-button me-3"
        >
            Register
        </Button> Or <Link href="login">Login Now!</Link>
        </Form.Item>
    </Form>
  );
};

export default SignUpForm;