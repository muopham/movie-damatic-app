import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Helmet.module.scss";

const cx = classNames.bind(styles);

const Helmet = (props) => {
  document.title = props.title;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div className={cx("helmet")}>{props.children}</div>;
};

Helmet.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Helmet;
