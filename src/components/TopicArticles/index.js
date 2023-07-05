import React, { useState, useEffect } from 'react';
import { useWindowSize } from 'react-hanger';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import "./styles.scss";
import ArticleSimple from '../theme-1/ArticleSimple';

const TopicArticles = ({ dark, data }) => {
  const { width } = useWindowSize();
  const [articles, setArticles] = useState([]);
  const topicName = data.id.split('_');
  const image = data.children[0].children[0].data.image && data.children[0].children[0].data.image.url;
  const [isMobile, setIsMobile] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth);
    }, false);
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await api.article.getArticles(`?tags=${topicName[1]}&limit=4`,
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
    backgroundImage: image ? `url("${api.space}f_auto,c_fill,g_faces,${width < 640 ? 'h_360,w_640' : 'h_320,w_1400'}/v${image}")` : `url("./default/bg.jpg")`,
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    marginBottom: '20px',
    minHeight: '300px',
  };

  if (articles.length === 0) {
    return <></>
  }

  return (
    <div className={`row row-topic topic-${topicName[1]}`} style={bg}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="heading white mt20">
              <h2 className="widget-title">{topicName[1].toUpperCase()}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {articles.map((item, k) => (
            <div className={`${isMobile < 1200 ? 'col-12' : 'col-3 mb-4'}`} key={k}>
              {isMobile < 1200 ? (<ArticleSimple article={item} />) : (
                <div className="single_post" style={{ backgroundImage: `url(${api.space}f_auto,c_fill,g_face,h_280,w_280/v${item.image.url})` }}>
                  <div className="single_post_text">
                    <div className="field-title">
                      <Link to={`/articulo/${item.slug}`}>{item.title}</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="space-30" />
      </div>
    </div >
  );
};

export default TopicArticles;