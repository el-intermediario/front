import React, { useState, useEffect } from 'react';
import BannerSection from "../../components/BannerSection";
import { Alert, Table } from "reactstrap";
import FollowUs from "../../components/FollowUs";
import api from "../../utils/api";
import { Link, useLocation } from "react-router-dom";

const ArticlesPage = () => {
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchArticles(search);
  }, [search]);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const fetchArticles = async (search = null) => {
    try {
      const filter = search ? `?search=${search}` : '';
      const response = await api.article.getArticlesSearch(filter,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response) {
        setArticles(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="contact_form padding-bottom">
        <div className="container">
          <div className="space-50" />
          <div className="row">
            <div className="col-lg-8">
              <div className="cotact_form">
                <div>
                  <div className="col-12">
                    <h3>Ultimas notas!</h3>
                  </div>
                  { location.state &&
                    <Alert color={location.state.type}>
                      {location.state.message}
                    </Alert>
                  }
                  <div className="row filters">
                    <div className="col-lg-12">
                      <input name="search" value={search} onChange={e => setSearch(e.target.value)}
                        type="text"
                        placeholder="Buscar" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="about_posts_tab">
                      <Table hover size="sm">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Titulo</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {articles.map((article, i) => (
                            <tr key={i}>
                              <th scope="row">{i+1}</th>
                              <td>
                                <Link to={`/articulo/${article.slug}`} className="text-muted">{article.title}</Link>
                              </td>
                              <td>
                                <Link to={`/admin/article/${article.id}/edit`}>Editar</Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <FollowUs title="Redes Sociales" />
            </div>
          </div>
        </div>
      </div>
      <BannerSection />
    </>
  );
}

export default ArticlesPage;