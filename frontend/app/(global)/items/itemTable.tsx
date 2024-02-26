'use client'
import { BoxWrapper } from '@/components/BoxWrapper';
import ButtonComp from '@/components/buttons/button';
import { CommonTable } from '@/components/table/commonTable';
import { ItemTableProps } from '@/types/type';

const ItemTable = (props: ItemTableProps) => {

    const { setOpenDrawer, setOpenDeleteModal, setEditData, setDeleteId, items } = props;

    const columns = [
    {
      key: 'no',
      dataIndex: 'id',
      title: 'No',
      render: (_: any, data: any) => <span>{data.id} </span>
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
      render: (_: any, data: any) => <span className='capitalize'>{data.name}</span>
    },
    {
      key: 'price',
      dataIndex: 'price',
      title: 'Price',
    },
    {
      key: 'action',
      dataIndex: '',
      title: 'Actions',
      width: '15%',
        render: (_: any, data: any) => <>
            
            <ButtonComp
                type="default"
                size='small'
                onClick={() => {
                    setOpenDrawer(true)
                    setEditData(data)
                }} title='Edit' /> | <ButtonComp
                danger={true}
                size='small'
                onClick={() => {
                    setOpenDeleteModal(true)
                    setDeleteId(data.id)
                    setEditData({})
                }} title='Delete' />
        </>
    },


    ];


  return (
    <BoxWrapper className='table-wrapper'>
      <CommonTable columns={columns} tableData={items} pagination />
    </BoxWrapper>
  )
}

export default ItemTable
