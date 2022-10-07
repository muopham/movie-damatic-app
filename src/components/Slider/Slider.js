import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./Slider.module.scss";
import Button from "../Button/Button";

import { Modal, ModalHeader, ModalBody } from "reactstrap";
import tmdbApi, { movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { addMovie } from "../../redux/movieSlice";
import { useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      <ToastContainer />
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

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const dispatch = useDispatch();

  // add movie to mys list
  const handleAddMovie = (item) => {
    const movie = {
      category: "movie",
      id: item.id,
      img: item.poster_path || item.backdrop_path,
      name: item.name || item.title,
    };
    dispatch(addMovie(movie));
    toast.success("Add success", {
      icon: "🚀",
    });
  };

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
          <Button primary icon="bx bxs-right-arrow" onClick={toggle}>
            Watch
          </Button>
          <Button
            icon="bx bx-plus-medical"
            className={cx("button-second")}
            onClick={() => handleAddMovie(item)}
          >
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

      <ModalVideo modal={modal} toggle={toggle} item={item} />
    </div>
  );
};

const ModalVideo = (props) => {
  const { modal, toggle, item } = props;
  const iframeRef = useRef(null);
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const getVideo = async () => {
      const movie = "movie";
      try {
        const response = await tmdbApi.getVideos(movie, item.id);
        setVideo(response.results[0]);
      } catch {
        console.log("error");
      }
    };
    getVideo();
  }, [modal, toggle, item]);

  return (
    <Modal isOpen={modal} toggle={toggle} fullscreen="lg" size="lg" {...props}>
      <ModalHeader toggle={toggle}>Trailer</ModalHeader>
      <ModalBody>
        <iframe
          src={`https://www.youtube.com/embed/${video.key}`}
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalBody>
    </Modal>
  );
};

export default Slider;
