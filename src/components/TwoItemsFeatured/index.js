import React, { Fragment, useEffect, useState } from 'react';
import { useWindowSize } from 'react-hanger';
import { Link } from "react-router-dom";
import LazyImage from '../LazyImage';
import './style.scss';
import OneArticle from '../theme-1/OneArticle';

const TwoItemsFeatured = ({ className, dark, data }) => {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth);
    }, false);
  });

  return (
    <div className={`TwoItemsFeatured mix_area ${className ? className : ''}`}>
      <div className="row">
        <div className="column column-1 col-6">
          <div className="single_mix_carousel nav_style3">
            {data[0].children.map((item, i) => (<Fragment key={i}>
              {isMobile < 1200 ? (<OneArticle article={item.data} />) : (
                <div className="single_post post_type6 post_type9">
                  <div className="post_img gradient1">
                    <div className="img_wrap">
                      <Link className="play_btn" to={`/articulo/${item.data.slug}`}>
                        <LazyImage
                          src={`f_auto,c_fill,g_face,h_${width < 426 ? 240 : 400},w_${width < 426 ? 425 : 600}/v${item.data.image.url}`}
                          width={width < 426 ? 425 : 600}
                          height={width < 426 ? 240 : 400}
                          alt={item.data.title}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="single_post_text">
                    <div className="field-copete">{item.data.copete}</div>
                    <h4><Link to={`/articulo/${item.data.slug}`}>{item.data.title}</Link></h4>
                  </div>
                </div>
              )}
            </Fragment>))}
          </div>
        </div>
        <div className="column column-2 col-6">
          <div className="single_mix_carousel nav_style3">
            {data[1].children.map((item, i) => (<Fragment key={`${i}-two`}>
              {isMobile < 1200 ? (<OneArticle article={item.data} />) : (
                <div className="single_post post_type6 post_type9">
                  <div className="post_img gradient1">
                    <div className="img_wrap">
                      <Link className="play_btn" to={`/articulo/${item.data.slug}`}>
                        <LazyImage
                          src={`f_auto,c_fill,g_face,h_${width < 640 ? 240 : 400},w_${width < 426 ? 425 : 600}/v${item.data.image.url}`}
                          width={width < 426 ? 425 : 600}
                          height={width < 426 ? 240 : 400}
                          alt={item.data.title}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="single_post_text">
                    <div className="field-copete">{item.data.copete}</div>
                    <h4><Link to={`/articulo/${item.data.slug}`}>{item.data.title}</Link></h4>
                  </div>
                </div>
              )}
            </Fragment>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="space-15" /> */}
    </div>
  );
};

export default TwoItemsFeatured;