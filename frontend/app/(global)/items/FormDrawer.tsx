import { ReactNode } from 'react';
import { Drawer, Row, Col } from 'antd';
import ItemForm from '@/components/pages/items/itemForm';
import { DetailDrawerProps } from '@/types/type';

const FormDrawer = (props: DetailDrawerProps) => {
  const { open, setOpen, children, editData, ...rest } = props;

  return (
    <Drawer
      title="Edit Item"
      width={700}
      headerStyle={{ display: 'none' }}
      placement="right"
      onClose={() => setOpen(false)}
      open={open}
      {...rest}
    >
      <Row>
        <Col xs={24}>
          <ItemForm setOpen={setOpen} editData={editData} />
        </Col>
      </Row>
    </Drawer>
  );
};

export default FormDrawer;