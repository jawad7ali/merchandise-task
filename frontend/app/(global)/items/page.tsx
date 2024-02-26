'use client'
import { useEffect, useState, useCallback } from 'react';
import { Col, Row } from "antd";
import ItemTable from "./itemTable";
import FormDrawer from "./FormDrawer";
import { PageHeader } from "@/components/PageHeader";
import ButtonComp from "@/components/buttons/button";
import useCustomHook from '@/components/pages/items/actionHandler';
import { Item } from '@/types/item.type';
import CommonModal from '@/components/modal/commonModal';

const Items = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [items , setItems] = useState<Item[]>([]);
  const [editData, setEditData] = useState({});
  const [deleteId, setDeleteId] = useState(0);
  const action = useCustomHook();

  const handleDelete = async () => {
      setOpenDeleteModal(false)
      await action.deleteItem(deleteId);
      await handleItems()
  }

  const handleItems = async () => {
    const response: Item[] = await action.getItems();
    setItems(response)
    return response
  }

  useEffect(() => {
      !openDrawer && handleItems()
  }, [openDrawer]);

  return (
    <>
      <PageHeader title="Items" bordered={true} />
      <div style={{ marginBottom: 20, textAlign: 'right' }}>
          <ButtonComp
            className="align-right"
            type="primary"
            title="Add Item"
            onClick={() => {
              setOpenDrawer(true)
              setEditData({})
            }}
          />  
      </div>
      <Row gutter={[20, 30]}>
        <Col xs={24}>
          <ItemTable
              setOpenDrawer={setOpenDrawer}
              setEditData={setEditData}
              setDeleteId={setDeleteId}
              setOpenDeleteModal={setOpenDeleteModal}
              items={items}
          />
        </Col>
      </Row>

      {openDrawer && <FormDrawer
            open={openDrawer}
            setOpen={setOpenDrawer}
            editData={editData}
      />}

      <CommonModal
        isModalOpen={openDeleteModal}
        title='Confirm'
        handleCancel={() => {
            setOpenDeleteModal(false)
        }}
        handleOk={() => {
            handleDelete()
        }}
        children='Are you sure you want to delete this record?'
    />
    </>
  )
}

export default Items