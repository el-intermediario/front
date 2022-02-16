import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from "../../components/BreadCrumb";
import FontAwesome from "../../components/uiStyle/FontAwesome";
import { useLocation } from "react-router";
import { Link, useParams } from "react-router-dom";
import BannerSection from "../../components/BannerSection";
import parse from "html-react-parser";
import {
	EmailShareButton,
	FacebookShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	TwitterIcon,
	FacebookIcon,
	WhatsappIcon
  } from "react-share";

// images
import banner2 from "../../doc/img/bg/sidebar-1.png";
import api from "../../utils/api";
import RelatedTabs from '../../components/RelatedTabs';
import TrendingArticles from '../../components/TrendingArticles';
import './style.scss';
import Moment from 'react-moment';
import MostView from '../../components/MostView';

const ArticlePage = () => {
  const state = useLocation();
	let { path } = useParams();
	//const url = this.props.routeParams.page;
	const [data, setData] = useState(null);
	const [articlesRelated, setArticlesRelated] = useState([]);

  useEffect(() => {
		fetchData();
	}, [state]);

  const fetchData = async () => {
    try {
      const response = await api.article.get({id: path, by: 'slug'},
        { headers: { 'Content-Type': 'application/json' } }
      );
        
      if (response) {
        setData(response.data);
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

	return (
		<Fragment>
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
						<div className="col-md-6 col-lg-8 page-content">
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
								<img src={data && `${api.space}${data.image}`} alt="thumb" />
								<div className="padding20 white_bg">
									<div className="space-20" />
										{data && parse(data.body)}
									<div className="space-40" />
									<div className="share-buttons">
										<TwitterShareButton title={data && data.title} url={window.location.href}>
											<TwitterIcon size={48}/>
										</TwitterShareButton>
										<FacebookShareButton quote={data && data.title} url={window.location.href}>
											<FacebookIcon size={48} />
										</FacebookShareButton>
										<WhatsappShareButton title={data && data.title} url={window.location.href}>
											<WhatsappIcon size={48} />
										</WhatsappShareButton>
									</div>
								</div>
							</div>
							<div className="space-30" />
							{/* <PostOnePagination className="next_prv_single padding20 shadow6 next_prv_single3" /> */}
						</div>
						<div className="col-md-6 col-lg-4 page-sidebar">
							{articlesRelated.length > 0 ? (
								<RelatedTabs data={articlesRelated} />
							) : null}
							<div className="banner2 mb30">
								<Link to="/">
									<img src={banner2} alt="thumb" />
								</Link>
							</div>
							{/* <TrendingArticles currentId={data ? data.id : null} /> */}
							<MostView title="Mas vistas" />
							{/* <NewsLetter /> */}
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