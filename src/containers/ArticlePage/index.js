import React, { Fragment, useState, useEffect } from 'react';
import BreadCrumb from "../../components/BreadCrumb";
import FontAwesome from "../../components/uiStyle/FontAwesome";
import { useLocation } from "react-router";
import { Link, useParams } from "react-router-dom";
import WidgetTab from "../../components/WidgetTab";
import WidgetTrendingNews from "../../components/WidgetTrendingNews";
import NewsLetter from "../../components/NewsLetter";
import MostShareWidget from "../../components/MostShareWidget";
import FollowUs from "../../components/FollowUs";
import BannerSection from "../../components/BannerSection";
import PostOnePagination from "../../components/PostOnePagination";
import parse from "html-react-parser";

// images
import banner2 from "../../doc/img/bg/sidebar-1.png";
import big2 from '../../doc/img/blog/big2.jpg';
import author2 from '../../doc/img/author/author2.png';
import big1 from '../../doc/img/blog/big1.jpg';
import smail1 from '../../doc/img/blog/smail1.jpg';
import single_post1 from '../../doc/img/blog/single_post1.jpg';
import OurBlogSection from "../../components/OurBlogSection";
import BlogComment from "../../components/BlogComment";
import api from "../../utils/api";
import RelatedTabs from '../../components/RelatedTabs';
import TrendingArticles from '../../components/TrendingArticles';

const ArticlePage = () => {
  const state = useLocation();
	let { path } = useParams();
	//const url = this.props.routeParams.page;
	const [data, setData] = useState(null);
	useEffect(() => {
		fetchData();
	}, []);

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
      }
    } catch (error) {
      console.log(error);
    }
  }

	return (
		<Fragment>
			<div className="archives post post1">
				<BreadCrumb className="shadow5 padding-top-30" title={data && data.title} />
				<span className="space-30" />
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-lg-8">
							<div className="shadow6">
								<div className="padding20 white_bg">
									<div className="row">
										<div className="col-12">
											<div className="page_comments">
												<ul className="inline">
													<li className="page_category">{data && data.copete}</li>
													{/* <li><FontAwesome name="comment" />563</li> */}
													{/* <li><FontAwesome name="fire" />536</li> */}
												</ul>
											</div>
										</div>
									</div>
									<div className="space-30" />
									<div className="single_post_heading">
										<h1>{data && data.title}</h1>
										<div className="space-10" />
										<p>{data && data.dropline}</p>
									</div>
									{/* <div className="row">
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
									</div> */}
								</div>
								<img src={data && data.image} alt="thumb" />
								<div className="padding20 white_bg">
									<div className="space-20" />
										{data && parse(data.body)}
									<div className="space-40" />
									<div className="points">
										<ul>
											<li>Should more of us wear face masks?</li>
											<li>Why some countries wear face masks and others don’t</li>
											<li>Coronavirus: Are homemade face masks safe?</li>
										</ul>
									</div>
									<div className="space-40" />
								</div>
								{/*VIDEO POST START*/}
								<div className="video_img">
									<img src={big1} alt="big1" />
									<Link to="/" className="video_img_icon play_btn"> <FontAwesome name="play" /></Link>
									<p className="video_img_text img_desc">I just had a baby - now I’m going to
										the frontline.</p>
								</div>
								{/*VIDEO POST END*/}
								<div className="padding20 white_bg">
									<div className="space-40" />
									<p>Masks may also help lower the risk of individuals catching the virus through
										the droplets from another person’s sneeze or a cough - and people can be
										taught how put masks on and take them off correctly, they argue.
										<br />
										<br />On Thursday New York mayor Bill de Blasio urged all New Yorkers to
										cover their faces when outside and near others, but not to use
										surgical masks, which are in short supply.
										<br />
										<br />Meanwhile, residents in Laredo, Texas will now face a $1,000
										(£816) fine if they fail to cover their noses and mouths
										while outside, after city officials issued an emergency
										ordinance to its approximately 250,000 residents this week.
									</p>
									<div className="space-40" />
									<div className="row">
										<div className="col-12">
											<div className="qhote quote_type3 padding30 text-center">
												<p>I must explain to you how all this mistake idea denouncing
													pleasure and praising pain was born and I will give you a
													complete account of the system, and expound the actual teachings
													of the great explorer of the truth, the master-builder of human
													happiness. .</p>
												<div className="author">
													<div className="author_img">
														<div className="author_img_wrap">
															<img src={author2} alt="author2" />
														</div>
													</div>
													<Link to="/">Shuvas Chandra</Link>
													<ul>
														<li>Founder at Seative Digital</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									<div className="space-40" />
									<p>The next day I came back to my team and said, This is what I just heard, we
										have to get ready, he said. We knew that it wasn’t going to be long before
										we were going to have to deal with it.
										<br />
										<br />Mr. Hogan has also leaned on his wife, Yumi Hogan, a Korean
										immigrant, who was also at the governor’s convention, which included
										a dinner at the Korean ambassador’s home. As the first Korean first
										lady in American history, Ms. Hogan has become something of an icon
										in South Korea. I just grabbed my wife and said, Look, you speak
										Korean. You know the president. You know the first lady. You know
										the ambassador. Let’s talk to them in Korean, and tell them we need
										their help. Companies in South Korea said would tests.</p>
									<div className="space-40" />
								</div>
								<img src={big2} alt="big2" />
								<div className="padding20 white_bg">
									<div className="space-40" />
									<p>In global terms the US has the most Covid-19 cases - more than 245,000.
										And on Thursday the US authorities said more than 1,000 had died in the
										past 24 hours - the highest daily toll so far in the world.
										<br />
										<br />Hospitals and morgues in New York are struggling to cope with
										the pandemic, and New York Governor Andrew Cuomo has warned that
										New York risks running out of ventilators for patients in six
										days.</p>
									<div className="space-40" />
									<div className="tags">
										<ul className="inline">
                      {data && data.tags.map((tag, t) => {
											  return <li key={t}><Link to="#">{tag.name}</Link></li>
                      })}
										</ul>
									</div>
								</div>
							</div>
							<div className="space-30" />
							<PostOnePagination className="next_prv_single padding20 shadow6 next_prv_single3" />
						</div>
						<div className="col-md-6 col-lg-4">
							<RelatedTabs tags={data ? data.tags : null} currentId={data ? data.id : null} />
							<FollowUs title="Follow Us" />
							<div className="banner2 mb30">
								<Link to="/">
									<img src={banner2} alt="thumb" />
								</Link>
							</div>
							<TrendingArticles currentId={data ? data.id : null} />
							<MostShareWidget title="Most Share" />
							<NewsLetter />
						</div>
					</div>
				</div>
			</div>
			<div className="space-60" />
			<OurBlogSection />
			<div className="space-60" />
			<BlogComment />
			<div className="space-100" />
			<BannerSection />
		</Fragment>
	)
};

export default ArticlePage;