import { notification } from "antd";
import { CloseCircleFilled, InfoCircleFilled, WarningFilled, CheckCircleOutlined } from "@ant-design/icons";

interface NotificationProps {
  title: any;
  description: any;
  type: any;
}
export const Notifications: any = (props: NotificationProps) => {
  const { type, title, description } = props;

  const typeObj: any = {
    success: <CheckCircleOutlined className="text-success-color" />,
    warning: <WarningFilled className="text-warning-color" />,
    info: <InfoCircleFilled className="accommodation-btn-info" />,
    error: <CloseCircleFilled className="text-error-color" />
  }
  notification.open({
    message: (
      <h3 className="text-semibold text-primary-color text-base ml-3 my-0">{title}</h3>
    ),
    description: (
      <span className="text-sm text-normal text-secondary-color mt-0">{description}</span>
    ),
    duration: 5,
    icon: typeObj[type],
  });
};
