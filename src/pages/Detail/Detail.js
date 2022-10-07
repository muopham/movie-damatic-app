import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Detail.module.scss";

import Helmet from "../../components/Helmet/Helmet";
import apiConfig from "../../api/apiConfig";
import Button from "../../components/Button/Button";
import tmdbApi from "../../api/tmdbApi";
import VideoList from "./VideoList";

const cx = classNames.bind(styles);

const Detail = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);

  // get detail movie
  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {item && (
        <Helmet title={item.title || item.name}>
          <div className={cx("wrapper")}>
            <DetailItem item={item} />
            <div className={cx("detail-content")}>
              <div className={cx("detail__container")}>
                <div className={cx("detail__title")}>CAST AND CREW INFO</div>
                <CastList id={item.id} category={category} />
              </div>
              <div className={cx("detail__container")}>
                <div className={cx("detail__title")}>Trailer</div>
                <div className={cx("detail__video")}>
                  <VideoList id={item.id} category={category} />
                </div>
              </div>
            </div>
          </div>
        </Helmet>
      )}
    </>
  );
};

const DetailItem = (props) => {
  const item = props.item;

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );
  const cardImg = apiConfig.w500Image(
    item.poster_path ? item.poster_path : item.backdrop_path
  );

  const year = item.release_date ? item.release_date : item.first_air_date;

  return (
    <div className={cx("detail-item")}>
      <div className={cx("img")}>
        <img src={background} alt={item.title} />
      </div>
      <div className={cx("content")}>
        <div className={cx("card-img")}>
          <img src={cardImg} alt={item.title} />
        </div>
        <div className={cx("content__right")}>
          <h2 className={cx("name")}>{item.title || item.name}</h2>
          <div className={cx("overview")}>{item.overview || "Updating.."}</div>
          <div className={cx("genres")}>
            <p className={cx("genres__title")}>Genres:</p>
            {item.genres.map((i, index) => (
              <span key={index}>{i.name}, </span>
            ))}
          </div>
          <div className={cx("genres")}>
            <p className={cx("genres__title")}>Language:</p>
            {item.spoken_languages.map((i, index) => (
              <span key={index}>{i.name}, </span>
            ))}
          </div>
          <div className={cx("button")}>
            <Button primary icon="bx bxs-right-arrow">
              Watch
            </Button>
            <Button icon="bx bx-plus-medical" className={cx("button-second")}>
              My list
            </Button>
          </div>
          <div className={cx("description")}>
            <div className={cx("primary")}>IMDb</div>
            <div className={cx("outline")}>U/A</div>
            <div className={cx("outline")}>4K</div>
            <div className={cx("year")}>{year.split("-")[0]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CastList = (props) => {
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      const response = await tmdbApi.credits(props.category, props.id);
      setCasts(response.cast.slice(0, 6));
    };
    getCredits();
  }, [props.category, props.id]);

  return (
    <div className={cx("casts")}>
      {casts.map((item, index) => (
        <div key={index} className={cx("casts__item")}>
          <div className={cx("casts__item__img")}>
            <img
              src={`${apiConfig.w500Image(item?.profile_path)}`}
              alt={item?.name}
            />
          </div>
          <p className={cx("casts__item__name")}>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Detail;
