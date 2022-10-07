import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./MovieGrid.module.scss";
import useDebounce from "../../hooks/useDebounce";

import { Row, Col, Spinner } from "reactstrap";
import MovieItem from "../MovieItem/MovieItem";
import Button from "../Button/Button";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";

const cx = classNames.bind(styles);

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  //   debounce search
  const [keyWordSearch, setKeyWordSearch] = useState("");
  const debounce = useDebounce(keyWordSearch, 500);

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      let response = null;
      if (keyWordSearch === "") {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.popular, {
              params,
            });
            setLoading(false);
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
            setLoading(false);
        }
      } else {
        const params = {
          query: keyWordSearch,
        };
        response = await tmdbApi.search(props.category, { params });
        setLoading(false);
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category, debounce]);

  //   load more
  const loadMore = async () => {
    setLoading(true);
    let response = null;
    if (keyWordSearch === "") {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          setLoading(false);
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
          setLoading(false);
      }
    } else {
      const params = {
        page: page + 1,
        query: keyWordSearch,
      };
      response = await tmdbApi.search(props.category, { params });
      setLoading(false);
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };
  return (
    <>
      <div className={cx("search")}>
        <input
          type="text"
          placeholder="Search"
          value={keyWordSearch}
          onChange={(e) => {
            setKeyWordSearch(e.target.value);
          }}
        />
        <div className={cx("search__btn")}>
          <i className={cx("bx bx-search")}></i>
        </div>
      </div>

      <Row lg="6" md="4" xs="2">
        {items.map((item, index) => (
          <Col key={index}>
            <MovieItem category={props.category} data={item} />
          </Col>
        ))}
      </Row>
      {page < totalPage ? (
        <div className={cx("load-more")}>
          {loading ? (
            <Spinner color="info">Loading...</Spinner>
          ) : (
            <Button primary icon="bx bx-chevron-down" onClick={loadMore}>
              Load more
            </Button>
          )}
        </div>
      ) : null}
    </>
  );
};

export default MovieGrid;
