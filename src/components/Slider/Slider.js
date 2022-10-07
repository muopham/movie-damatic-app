import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Slider.module.scss";
import Button from "../Button/Button";
import tmdbApi, { movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

const cx = classNames.bind(styles);

const Slider = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovie(response.results.slice(1, 9));
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, []);

  return (
    <div className={cx("slider")}>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {movie.map((item, index) => (
          <SwiperSlide key={index}>
            <SliderItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const SliderItem = (props) => {
  const item = props.item;

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );
  const year = item.release_date.split("-")[0];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("img")}>
        <img src={background} alt={item.title} />
      </div>
      <div className={cx("content")}>
        <h2 className={cx("name")}>{item.title}</h2>
        <div className={cx("overview")}>{item.overview}</div>
        <div className={cx("button")}>
          <Button primary icon="bx bxs-right-arrow">
            Watch
          </Button>
          <Button icon="bx bx-plus-medical" className={cx("button-second")}>
            My list
          </Button>
        </div>
        <div className={cx("description")}>
          <span className={cx("primary")}>IMDb</span>
          <span className={cx("outline")}>U/A</span>
          <span className={cx("outline")}>4K</span>
          <div className={cx("year")}>{year}</div>
        </div>
      </div>
    </div>
  );
};
export default Slider;
