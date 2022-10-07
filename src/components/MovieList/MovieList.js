import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./MovieList.module.scss";

import tmdbApi, { category } from "../../api/tmdbApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import MovieItem from "../MovieItem/MovieItem";

const cx = classNames.bind(styles);

const MovieList = (props) => {
  const { type, id, option } = props;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      let response = null;
      const params = {};

      if (type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(type, { params });
            break;
          case category.tv:
            response = await tmdbApi.getTvList(type, { params });
            break;
          default:
            response = await tmdbApi.getTrending(
              props.category,
              { params },
              option
            );
        }
      } else {
        response = await tmdbApi.similar(category, id);
      }
      setMovies(response.results);
    };
    getMovies();
  }, [type, id, props.category, option]);

  return (
    <div className={cx("movie__list")}>
      <Swiper
        grabCursor={true}
        freeMode={true}
        modules={[FreeMode]}
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 10,
          },

          480: {
            slidesPerView: 5,
            spaceBetween: 10,
          },

          860: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
        }}
        className="mySwiper"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index} className={cx("movie__swiper")}>
            <MovieItem category={props.category} data={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  type: PropTypes.string,
  category: PropTypes.string,
  id: PropTypes.number,
};

export default MovieList;
