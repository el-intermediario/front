import { ShareButtons } from './../../components/ShareButtons/ShareButtons';
import React, { Fragment, useState, useEffect, lazy } from 'react';
import { useLocation } from "react-router";
import { Link, useParams } from "react-router-dom";

// images
import api from "../../utils/api";
import './style.scss';
import './editor.scss';
import Moment from 'react-moment';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import CustomBlock from '../Admin/FormArticlePage/plugins/CustomBlock';
import { Helmet } from "react-helmet";
import Sidebar from '../../components/Sidebar';
import { useSelector } from 'react-redux';
const BreadCrumb = lazy(() => import('../../components/BreadCrumb'));

const ArticlePage = () => {
  const state = useLocation();
  let { path } = useParams();
  const { user } = useSelector(state => state.user);
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

      if (response.data) {
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
        <link rel="canonical" href={`https://elintermediario.com.ar/${data && data.slug}`} />
        {data && <meta name="description" content={data.dropline} />}
        {data && <meta property="og:title" content={data.title} />}
        {data && <meta property="og:site_name" content="El Intermediario" />}
        {data && <meta property="og:url" content={`https://elintermediario.com.ar/${data && data.slug}`} />}
        {data && <meta property="og:description" content={data.dropline} />}
        {data && data.image && <meta property="og:image" content={`${api.space}f_auto,c_fill,g_faces,h_630,w_1200/v${data.image.url}`} />}
        {data && <meta property="og:type" content="article" />}
        {data && <meta property="og:locale" content="es_ES" />}
        {data && <meta property="og:image:width" content="1200" />}
        {data && <meta property="og:image:heiht" content="630" />}

        {data && <meta property="twitter:card" content="summary_large_image" />}
        {data && <meta property="twitter:site" content="elintermediario" />}
        {data && <meta property="twitter:title" content={data.title} />}
        {data && <meta property="twitter:description" content={data.dropline} />}
        {data && <meta property="twitter:creator" content="elintermediario" />}
        {data && <meta name="twitter:image" content={`${api.space}f_auto,c_fill,g_faces,h_630,w_1200/v${data.image.url}`} />}
      </Helmet>
      <div className="archives post post1 page-article">
        <BreadCrumb className="shadow5 padding-top-10" title={data && data.title} />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 page-content">
              <div className="shadow6">
                <div className="padding20 white_bg">
                  <div className="row field-copete-date">
                    <div className="col-8 field-copete">
                      <div className="col-2 field-copete">
                        {user && user.role === 'admin' && data ? (
                          <Link to={`/admin/article/${data.id}/edit`}>
                            Editar
                          </Link>
                        ) : null}
                      </div>
                      {data && data.copete}
                    </div>
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
              <ShareButtons data={data}  />
            </div>
            <div className="col-md-6 col-lg-7 page-content">
              <div className="shadow6">
                {data && data.image ? (
                  <img
                    rel="preload"
                    as="image"
                    src={data && `${api.space}f_auto,c_fill,g_face,h_360,q_84,w_730/v${data.image.url}`}
                    alt={data && data.title}
                  />
                ) : null}
                <div className="padding20 white_bg">
                  <div className="space-20" />
                    {bodyData &&
                      <Editor
                        toolbarHidden={true}
                        editorState={editorState}
                        blockRendererFn={mediaBlockRenderer}
                        editorClassName="editor-textarea article-editor-draftjs"
                        readOnly={true}
                      />
                    }
                  <div className="space-20" />
                  {data?.source && <div className="row">Fuente: ${data.source}</div>}
                </div>
              </div>
              <div className="space-30" />
              {/* <PostOnePagination className="next_prv_single padding20 shadow6 next_prv_single3" /> */}
            </div>
            <div className="col-md-6 col-lg-4 page-sidebar">
              <Sidebar category={data && data.category && data.category.initial.split('/')[1]} mostView articlesRelated={articlesRelated} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
};

export default ArticlePage;