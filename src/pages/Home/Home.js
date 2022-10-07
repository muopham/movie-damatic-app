import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import Slider from "../../components/Slider/Slider";
import Helmet from "../../components/Helmet/Helmet";
import Button from "../../components/Button/Button";
import MovieList from "../../components/MovieList/MovieList";
import { category, movieType, tvType } from "../../api/tmdbApi";

const cx = classNames.bind(styles);

const Home = () => {
  const [option, setOption] = useState("all");
  return (
    <Helmet title="Dramatic">
      <Slider />
      <div className={cx("wrapper")}>
        <div className={cx("content")}>
          <div className={cx("title")}>
            <h2>Trending Movies</h2>
            <select
              onChange={(e) => {
                setOption(e.target.value);
              }}
            >
              <option value="all">all</option>
              <option value="movie">movie</option>
              <option value="tv">tv</option>
            </select>
          </div>
          <MovieList category={category.trending} option={option} />
        </div>

        {/* movie */}
        <div className={cx("content")}>
          <div className={cx("title")}>
            <h2>now playing Movies</h2>
            <Link to="/movie">
              <Button second>Show more</Button>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.now_playing} />
        </div>

        <div className={cx("content")}>
          <div className={cx("title")}>
            <h2>Top rated Movies</h2>
            <Link to="/movie">
              <Button second>Show more</Button>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>

        <div className={cx("content")}>
          <div className={cx("title")}>
            <h2>Upcoming Movies</h2>
            <Link to="/movie">
              <Button second>Show more</Button>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.upcoming} />
        </div>

        {/* tv show */}
        <div className={cx("content")}>
          <div className={cx("title")}>
            <h2>TV Shows Airing Today</h2>
            <Link to="/tv">
              <Button second>Show more</Button>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.airing_today} />
        </div>
        <div className={cx("content")}>
          <div className={cx("title")}>
            <h2>Top Rated TV Shows</h2>
            <Link to="/tv">
              <Button second>Show more</Button>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated} />
        </div>
        <div className={cx("content")}>
          <div className={cx("title")}>
            <h2>Currently Airing TV Shows</h2>
            <Link to="/tv">
              <Button second>Show more</Button>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.on_the_air} />
        </div>
      </div>
    </Helmet>
  );
};

export default Home;
