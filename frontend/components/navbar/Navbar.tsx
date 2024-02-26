'use client'

import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu, Layout } from 'antd';
import { RiUser3Line, RiUser4Fill } from 'react-icons/ri';
import { useRouter } from 'next/navigation'

const items: MenuProps['items'] = [
  {
    label: 'Logout',
    key: '/api/auth/signout',
    icon: <RiUser3Line />,
  },
];


  
export default function Navbar() {
  const router = useRouter()

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key)
  };

  return (<Menu onClick={onClick} theme="light" items={items} mode="horizontal" />);
}
