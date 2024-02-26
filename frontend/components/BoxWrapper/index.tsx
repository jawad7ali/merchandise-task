import { BoxWrapperProps } from "@/types/type";

export const BoxWrapper = (props: BoxWrapperProps) => {
  const {
    id,
    className,
    children,
    boxShadow,
    borderLeft="0",
    ...rest
  } = props;

  return (
    <div
      className={`${className} ${boxShadow? "box-hover-wrapper": "box-wrapper"}`}
      style={{borderLeft: borderLeft}}
      {...rest}
    >
      {children}
    </div>
  );
};