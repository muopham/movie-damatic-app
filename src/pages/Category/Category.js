import React from "react";
import { useParams } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./Category.module.scss";

import { category as cate } from "../../api/tmdbApi";
import Helmet from "../../components/Helmet/Helmet";
import MovieGrid from "../../components/MovieGrid/MovieGrid";

const cx = classNames.bind(styles);

const Category = () => {
  const { category } = useParams();

  return (
    <Helmet title="Category">
      <div className={cx("wrapper")}>
        <div className={cx("title")}>
          {category === cate.movie ? "Movies" : "Tv show"}
        </div>
        <MovieGrid category={category} />
      </div>
    </Helmet>
  );
};

export default Category;
