import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { CommonModalProps } from '@/types/type';

export default function CommonModal({
  children,
  title,
  isModalOpen,
  handleOk,
  handleCancel,
}: CommonModalProps
) {

  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};