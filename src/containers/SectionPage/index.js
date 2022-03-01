import React, { Fragment, useState, useEffect, lazy } from 'react';
import { useLocation } from "react-router";
import { useParams } from "react-router-dom";

// images
import api from "../../utils/api";
import './style.scss';
import {Helmet} from "react-helmet";
const BreadCrumb = lazy(() => import('../../components/BreadCrumb'));

const SectionPage = () => {
  const state = useLocation();
	let { path } = useParams();
	const [data, setData] = useState(null);
  const [body, setBody] = useState(null);

  useEffect(() => {
		fetchData();
	}, []);

  const fetchData = async () => {
    try {
      const response = await api.page.get({id: path, by: 'slug'},
        { headers: { 'Content-Type': 'application/json' } }
      );
        
      if (response) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(body);
	return (
		<Fragment>
      <Helmet>
        {data && <title>{data.title} | Intermediario</title>}
        <link rel="canonical" href={`https://intermediario.sanjua.com/seccion/${data && data.slug}`} />
        {data && <meta name="description" content={data.dropline} />}
      </Helmet>
			<div className="archives post post1 page-article">
				<BreadCrumb className="shadow5 padding-top-10" title={data && data.title} />
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-lg-8 page-content">
							<div className="shadow6">
								<div className="padding20 white_bg">
                  {data && <div dangerouslySetInnerHTML={{__html: data.bodyHtml}} />}
								</div>
							</div>
							<div className="space-30" />
							{/* <PostOnePagination className="next_prv_single padding20 shadow6 next_prv_single3" /> */}
						</div>
						<div className="col-md-6 col-lg-4 page-sidebar">
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
};

export default SectionPage;