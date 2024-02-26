'use client'
import React, { useEffect } from "react";
import { Form, Button } from "antd";
import InputField from "@/components/input/Input";
import useCustomHook from './actionHandler';
import { ItemFormProps } from "@/types/type";
import { Item } from "@/types/item.type";


const ItemForm = ({setOpen, editData}: ItemFormProps) => {

  const action = useCustomHook();

  const [form] = Form.useForm();

  const onFinish = async (values: Item) => {    
    const body: Item = {
      "name": values.name,
      "price": values.price,
    }
    const filteredBody = Object.entries(body)
      .reduce((acc: any, [key, value]) => {
        if (typeof value !== 'undefined' && value !== null) {
          acc[key] = value;
        }
        return acc;
      }, {});
      let response;
      if (editData.id) {
        response = await  action.updateItem(editData.id, filteredBody);
      } else{
        response = await action.createItem(filteredBody);
      }
      if (response) {
        setOpen(false);
      }
    };
  
    useEffect(() => {
        form.setFieldsValue({
            name: editData.name,
            price: editData.price
        });
    }, [editData]);
    
    return (
        <Form
            name="editItem "
            className="flex justify-left items-left border-4 flex-col mt-8"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
            style={{height:"auto", padding: "20px"}}
        >
      
        <h1 className="text-2xl m-3 font-bold"> {editData.id ? 'Edit Item' : 'Add Item'}</h1>

        <InputField
          name="name"
          rules={[{ required: true, message: "Please input your Valid Item Name!" }]}
          placeholder="Item Name"
          width="w-64"
          type="text"
        />
        <InputField
          name="price"
          rules={[
            {
              required: true,
              message: "Please input your Price!"
            }
          ]}
          placeholder="Price"
          type="number"
          width="w-64"
        />
      
        <Form.Item>
        <Button
            htmlType="submit"
            className="me-3"
            type="primary"
        >
            {editData.id ? 'Update' : 'Add'}
        </Button>
        </Form.Item>
    </Form>
  );
};

export default ItemForm;