import React, { FC } from "react";
import { Typography } from 'antd';
import { PageHeaderProps } from "@/types/type";



export const PageHeader: FC<PageHeaderProps> = ({ title, actions=false, children, bordered  }) => actions ?  (
  <div className={` ${bordered? 'bordered': ''}`}>
    <Typography.Title level={3}>
      {title}
    </Typography.Title>
    <div >
      {children}
    </div>
  </div>
) : (
  <div className={` ${bordered? 'bordered': ''}`}>
    <Typography.Title level={3}>
      {title}
    </Typography.Title>
  </div>
)
