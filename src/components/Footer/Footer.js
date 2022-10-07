import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

import { Row, Col } from "reactstrap";

const cx = classNames.bind(styles);

const Footer = () => {
  const navigation = [
    {
      display: "Home",
      path: "/",
    },
    {
      display: "FAQ",
      path: "/",
    },
    {
      display: "Investor Relations",
      path: "/",
    },
    {
      display: "Jobs",
      path: "/",
    },
    {
      display: "About Us",
      path: "/",
    },
    {
      display: "Help Centre",
      path: "/",
    },
  ];
  const legal = [
    {
      display: "Privacy Policy",
      path: "/",
    },
    {
      display: "Terms of Service",
      path: "/",
    },
    {
      display: "Cookie Preferences",
      path: "/",
    },
    {
      display: "Corporate Information",
      path: "/",
    },
  ];

  return (
    <div className={cx("footer")}>
      <Row lg="5" md="3" xs="1">
        <Col>
          <select className={cx("select")}>
            <option>English</option>
            <option>VietNam</option>
          </select>
        </Col>
        <Col>
          <p className={cx("title")}>navigation</p>
          {navigation.map((item, index) => (
            <Link to={item.path} key={index}>
              <li className={cx("item")}>{item.display}</li>
            </Link>
          ))}
        </Col>
        <Col>
          <p className={cx("title")}>legal</p>
          {legal.map((item, index) => (
            <Link to={item.path} key={index}>
              <li className={cx("item")}>{item.display}</li>
            </Link>
          ))}
        </Col>
        <Col>
          <p className={cx("title")}>talk to us</p>
          <li className={cx("item")}>support@ercom.com</li>
          <li className={cx("item")}>+66 2399 1145</li>
        </Col>
        <Col>
          <p className={cx("title")}>follow us</p>
          <div className={cx("icon")}>
            <i className="bx bxl-facebook"></i>
          </div>
          <div className={cx("icon")}>
            <i className="bx bxl-linkedin"></i>
          </div>
          <div className={cx("icon")}>
            <i className="bx bxl-twitter"></i>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
