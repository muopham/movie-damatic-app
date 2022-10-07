import React from "react";
import classNames from "classnames/bind";
import styles from "./MyList.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet";
import apiConfig from "../../api/apiConfig";

const cx = classNames.bind(styles);

const MyList = () => {
  const movies = useSelector((state) => state.movie.movies);

  return (
    <Helmet title="My List">
      <div className={cx("wrapper")}>
        <div className={cx("title")}>My List</div>
        {movies && (
          <Row lg="6" md="4" xs="2">
            {movies.map((item, index) => (
              <Col key={index}>
                <div className={cx("content")}>
                  <div className={cx("content__img")}>
                    <Link to={"/" + item.category + "/" + item.id}>
                      <img
                        src={apiConfig.w500Image(item.img)}
                        alt="img-movie"
                      />
                    </Link>
                  </div>
                  <span className="content__name">{item.name}</span>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Helmet>
  );
};

export default MyList;
