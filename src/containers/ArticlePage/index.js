import React, { Fragment, useState, useEffect, lazy, Suspense } from 'react';
import { useLocation } from "react-router";
import { Link, useParams } from "react-router-dom";
import BannerSection from "../../components/BannerSection";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TwitterIcon,
  FacebookIcon,
  WhatsappIcon
} from "react-share";

// images
import api from "../../utils/api";
import './style.scss';
import Moment from 'react-moment';
import { Editor, EditorState, convertFromRaw, Draft } from 'draft-js';
import CustomBlock from '../Admin/FormArticlePage/plugins/CustomBlock';
import { Helmet } from "react-helmet";
import Sidebar from '../../components/Sidebar';
const RelatedTabs = lazy(() => import('../../components/RelatedTabs'));
const MostView = lazy(() => import('../../components/MostView'));
const BreadCrumb = lazy(() => import('../../components/BreadCrumb'));

const ArticlePage = () => {
  const state = useLocation();
  let { path } = useParams();
  const [data, setData] = useState(null);
  const [articlesRelated, setArticlesRelated] = useState([]);
  const [bodyData, setBodyData] = useState(null);

  let editorState;
  if (bodyData) {
    const contentState = convertFromRaw(JSON.parse(bodyData));
    editorState = EditorState.createWithContent(contentState);
  }

  useEffect(() => {
    fetchData();
  }, [state]);

  const fetchData = async () => {
    try {
      const response = await api.article.get({ id: path, by: 'slug' },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response) {
        setData(response.data);
        setBodyData(response.data.bodyData);
        // Get Related articles by tags.
        try {
          const arrayTags = [];
          response.data.tags.reduce((acc, tag) => arrayTags.push(tag.name), []);
          const dataModel = {
            filter: `?limit=5&page=0&tags=${arrayTags.join(',')}`,
            id: response.data.id
          }
          const responseTags = await api.article.getArticlesRelated(dataModel,
            { headers: { 'Content-Type': 'application/json' } }
          );

          if (responseTags) {
            setArticlesRelated(responseTags.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const mediaBlockRenderer = (block) => {
    if (block.getType() === 'atomic') {
      return {
        component: CustomBlock,
        editable: false,
        props: { data: null },
      };
    }

    return null;
  };

  return (
    <Fragment>
      <Helmet>
        {data && <title>{data.title} | Intermediario</title>}
        <link rel="canonical" href={`https://intermediario.sanjua.com/${data && data.slug}`} />
        {data && <meta name="description" content={data.dropline} />}
      </Helmet>
      <div className="archives post post1 page-article">
        <BreadCrumb className="shadow5 padding-top-10" title={data && data.title} />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 page-content">
              <div className="shadow6">
                <div className="padding20 white_bg">
                  <div className="row field-copete-date">
                    <div className="col-8 field-copete">{data && data.copete}</div>
                    <div className="col-4 field-date">{data && <Moment format="dddd D, MMMM YYYY" locale="es" unix>{data.created}</Moment>}</div>
                  </div>
                  <div className="single_post_heading">
                    <div className="space-10" />
                    <h1 className="field-title">{data && data.title}</h1>
                    <div className="space-10" />
                    <p className="field-dropline">{data && data.dropline}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-20" />
          <div className="row">
            <div className="col-md-6 col-lg-1 page-share">
              <div className="share-buttons">
                <TwitterShareButton title={data && data.title} url={window.location.href}>
                  <TwitterIcon size={48} />
                </TwitterShareButton>
                <FacebookShareButton quote={data && data.title} url={window.location.href}>
                  <FacebookIcon size={48} />
                </FacebookShareButton>
                <WhatsappShareButton title={data && data.title} url={window.location.href}>
                  <WhatsappIcon size={48} />
                </WhatsappShareButton>
              </div>
            </div>
            <div className="col-md-6 col-lg-7 page-content">
              <div className="shadow6">
                {/* <div className="padding20 white_bg">
									<div className="row">
										<div className="col-lg-6 align-self-center">
											<div className="author">
												<div className="author_img">
													<div className="author_img_wrap">
														<img src={author2} alt="big2" />
													</div>
												</div>
												<Link to="/">Shuvas Chandra</Link>
												<ul>
													<li><Link to="/">March 26, 2020</Link></li>
													<li>Updated 1:58 p.m. ET</li>
												</ul>
											</div>
										</div>
										<div className="col-lg-6 align-self-center">
											<div className="author_social inline text-right">
												<ul>
													<li><Link to="#"><FontAwesome name="twitter" /></Link></li>
													<li><Link to="#"><FontAwesome name="facebook-f" /></Link></li>
													<li><Link to="#"><FontAwesome name="youtube-play" /></Link></li>
													<li><Link to="#"><FontAwesome name="instagram" /></Link></li>
												</ul>
											</div>
										</div>
									</div>
								</div> */}
                <img
                  rel="preload"
                  as="image"
                  src={data && `${api.space}${data.image}`}
                  alt={data && data.title}
                  width="730px"
                  height="410px"
                />
                <div className="padding20 white_bg">
                  <div className="space-20" />
                  {bodyData &&
                    <Editor
                      editorState={editorState}
                      blockRendererFn={mediaBlockRenderer}
                      readOnly={true}
                      stripPastedStyles={true}
                    />
                  }
                  <div className="space-40" />
                </div>
              </div>
              <div className="space-30" />
              {/* <PostOnePagination className="next_prv_single padding20 shadow6 next_prv_single3" /> */}
            </div>
            <div className="col-md-6 col-lg-4 page-sidebar">
              <Sidebar category={data && data.category.initial.split('/')[1]} mostView articlesRelated />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="space-60" />
			<OurBlogSection />
			<div className="space-60" />
			<BlogComment />
			<div className="space-100" /> */}
      <BannerSection />
    </Fragment>
  )
};

export default ArticlePage;