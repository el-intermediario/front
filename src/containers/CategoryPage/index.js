import React, { Fragment, useEffect, useState } from 'react';
import BreadCrumb from "../../components/BreadCrumb";
import BusinessNews from "../../components/BusinessNews";
import FontAwesome from "../../components/uiStyle/FontAwesome";
import { Link } from "react-router-dom";
import WidgetTab from "../../components/WidgetTab";
import WidgetTrendingNews from "../../components/WidgetTrendingNews";
import NewsLetter from "../../components/NewsLetter";
import FollowUs from "../../components/FollowUs";
import { useHistory, useParams } from 'react-router-dom';

import banner2 from "../../doc/img/bg/sidebar-1.png";
import BannerSection from "../../components/BannerSection";
import api from '../../utils/api';
import CategoryArticles from '../../components/CategoryArticles';

const CategoryPage = ({location}) => {
  const [articles, setArticles] = useState([]);
  const category = location.pathname.split('/').pop().replaceAll('-', ' ');
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  useEffect(() => {
    fetchArticles();
  }, [location.pathname]);

  const fetchArticles = async () => {
    const limit = 15,
          page = 0,
          category = location.pathname.replace('/categoria', 'category').replaceAll('-', '_');
    try {
      const response = await api.article.getArticles({ query: `?limit=${limit}&page=${page}&category=${category}` },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data) {
        setArticles(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <BreadCrumb title={categoryName} />
      <div className="archives padding-top-30">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-8">
              <div className="businerss_news">
                <div className="row">
                  <div className="col-12 align-self-center">
                    <div className="categories_title">
                      <h5>{categoryName}</h5>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <CategoryArticles headerHide={true} articles={articles} />
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-12">
                    <div className="cpagination">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <li className="page-item">
                            <Link className="page-link" to="/" aria-label="Previous">
                              <span aria-hidden="true"><FontAwesome
                                name="caret-left" /></span>
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="/">1</Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="/">..</Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="/">5</Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="/" aria-label="Next">
                              <span aria-hidden="true"><FontAwesome
                                name="caret-right" /></span>
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="banner2 mb30">
                <Link to="/">
                  <img src={banner2} alt="thumb" />
                </Link>
              </div>
              {/* <WidgetTab /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="space-70" />
      <BannerSection />
    </Fragment>
  );
};

export default CategoryPage;