'use client'
import React, { useState } from 'react'
import { Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/Navbar';
import BreadCrumb from '@/components/breadCrumbs/breadCrumb';
import { SessionProvider, signOut } from 'next-auth/react';

const { Header, Content } = Layout;
const ProvidersWrapperLayout = ({ children }: any) => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (
    <>
      <SessionProvider session={null}>
      <Layout>
        <Header style={{ background: colorBgContainer }}>
          <div className="demo-logo" />
          <Layout className='float-right clear-right'>
            <Navbar />
          </Layout>
          
        </Header>
          <Layout style={{ padding: '0 24px 24px' }}>
            <BreadCrumb />
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </SessionProvider>
    </>
  )
}

export default ProvidersWrapperLayout