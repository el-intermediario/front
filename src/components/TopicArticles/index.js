import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import "./styles.scss";

const TopicArticles = ({ dark, topic }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles()
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await api.article.getArticles(`?tags=${topic}&limit=4`,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data) {
        setArticles(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const bg = {
    backgroundImage: `url("./images/blocks/${topic}.jpg")`,
    backgroundSize: `100%`,
    marginTop: '20px',
    marginBottom: '20px',
    minHeight: '300px'
  };

  if (articles.length === 0) {
    return <></>
  }

  return (
    <div className={`row row-topic topic-${topic}`} style={bg}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="heading white mt20">
              <h2 className="widget-title">{topic.toUpperCase()}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {articles.map(item => (
            <div className="col-3">
              <div className="single_post" style={{backgroundImage: `url(${api.space}${item.image})`}}>
                <Link to={`/articulo/${item.slug}`}>
                  <div className="single_post_text">
                    <div className="field-title">
                      <Link to={`/articulo/${item.slug}`}>{item.title}</Link>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="space-30" />
      </div>    
    </div>
  );
};

export default TopicArticles;