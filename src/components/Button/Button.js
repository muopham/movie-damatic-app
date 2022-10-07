import React from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);
const Button = (props) => {
  const {
    primary = false,
    second = false,
    onClick,
    children,
    className,
    icon,
  } = props;

  const classes = cx("wrapper", {
    [className]: className,
    primary,
    second,
  });
  return (
    <button className={classes} onClick={onClick ? () => onClick() : null}>
      {children}
      {icon && <i className={icon}></i>}
    </button>
  );
};

export default Button;
