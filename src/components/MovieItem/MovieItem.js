import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./MovieItem.module.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { addMovie } from "../../redux/movieSlice";

const cx = classNames.bind(styles);

const MovieItem = (props) => {
  const { data } = props;
  const dispatch = useDispatch();

  const [active, setActive] = useState(false);

  let cate = null;
  if (props.category !== "trending") {
    switch (props.category) {
      case category.movie:
        cate = "movie";
        break;
      case category.tv:
        cate = "tv";
        break;
      default:
        cate = "movie";
    }
  } else {
    cate = "movie";
  }

  const link = "/" + category[cate] + "/" + data.id;
  const bg = apiConfig.w500Image(data.poster_path || data.backdrop_path);
  const point = data.vote_average;

  // add movie to mys list
  const handleAddMovie = (item) => {
    const movie = {
      category: cate,
      id: item.id,
      img: item.poster_path || item.backdrop_path,
      name: item.name || item.title,
    };
    dispatch(addMovie(movie));
    setActive(true);
  };
  return (
    <div className={cx("item")}>
      <Link to={link}>
        <div className={cx("img")}>
          <img src={bg} alt={data.title} />
        </div>
      </Link>
      <div className={cx("description")}>
        <p>{data.title || data.name}</p>
        <div className={cx("info")}>
          <div>
            <span className={cx("info__tag")}>IMDb</span>
            <span className={cx("info__vote")}>
              {point.toString().slice(0, 3)}
            </span>
          </div>
          <i
            className={cx("bx bxs-heart", `${active ? "active" : ""}`)}
            onClick={() => {
              handleAddMovie(data);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
