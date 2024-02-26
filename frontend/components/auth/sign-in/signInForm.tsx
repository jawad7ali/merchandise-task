'use client'
import React, { useState } from "react";
import Link from "next/link";
import { Form, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import InputField from "@/components/input/Input";
import { signIn } from "next-auth/react";
import { LoginProps } from "@/types/type";

const SignInForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [form] = Form.useForm();
  const onFinish = async (values: LoginProps) => {    

    const result = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    })
    console.log(result,'result')
    if (result?.error) {
      setError("Invalid email or password")
    } else {
      setError("")
      router.push('/items')
    }

  };

  return (
    <Form
        name="normal_login"
        className="login-form flex justify-center items-center rounded-2xl border-4 flex-col mt-8 bg-blue-50"
        onFinish={onFinish}
        form={form}
        style={{width:'400px',height:"400px"}}
    >
        <h1 className="text-2xl m-3 font-bold">Login</h1>
        {
          error && <p className="text-red-500">{error}</p>
      }
        <InputField
          name="username"
          rules={[{ required: true, message: "Please input your Valid Username!" }]}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          width="w-64"
          type="text"
        />
        
        <InputField
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
          width="w-64"
          type="password"
        />

        <Form.Item>
          <Button
            htmlType="submit"
            className="login-form-button me-4"
          >
            Log in
          </Button>
          Or <Link href="/register">register now!</Link>
        </Form.Item>
      </Form>
  );
};

export default SignInForm;