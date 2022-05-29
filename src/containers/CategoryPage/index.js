import React, { Fragment, useEffect, useState } from 'react';
import BreadCrumb from "../../components/BreadCrumb";
import { Link } from "react-router-dom";
import banner2 from "../../doc/img/bg/sidebar-1.png";
import BannerSection from "../../components/BannerSection";
import api from '../../utils/api';
import CategoryArticles from '../../components/CategoryArticles';
import Sidebar from '../../components/Sidebar';
import { Helmet } from 'react-helmet';

const CategoryPage = ({location}) => {
  const [articles, setArticles] = useState([]);
  const category = location.pathname.split('/').pop().replaceAll('-', ' ');
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const [categoryParent, setCategoryParent] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, [location.pathname]);

  const fetchArticles = async () => {
    const pathCategory = location.pathname.replace('/categoria', 'category').replaceAll('-', '_');
    setCategoryParent(pathCategory.split('/')[1]);

    const limit = 15,
          page = 0,
          category = pathCategory;
    try {
      const params = `?limit=${limit}&page=${page}&category=${category}`;
      const response = await api.article.getArticles(params,
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
      <Helmet>
        {categoryName && <title>{categoryName && categoryName} | Intermediario</title>}
        <link rel="canonical" href={`https://elintermediario.com.ar/${location.pathname}`} />
      </Helmet>
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
                    <CategoryArticles articles={articles} />
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
              <Sidebar category={categoryParent} mostView />
              {/* <div className="banner2 mb30">
                <Link to="/">
                  <img src={banner2} alt="thumb" />
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="space-40" />
    </Fragment>
  );
};

export default CategoryPage;