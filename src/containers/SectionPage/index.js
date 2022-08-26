import React, { Fragment, useState, useEffect, lazy } from 'react';
import { useParams } from "react-router-dom";

// images
import api from "../../utils/api";
import './style.scss';
import {Helmet} from "react-helmet";
import { convertFromRaw, Editor, EditorState } from 'draft-js';
const BreadCrumb = lazy(() => import('../../components/BreadCrumb'));

const SectionPage = () => {
	let { path } = useParams();
  const [currentPath, setCurrentPath] = useState('');
	const [data, setData] = useState(null);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  useEffect(() => {
    if (path !== currentPath) {
      setCurrentPath(path);
      fetchData();
    }
  }, [path]);

  const fetchData = async () => {
    try {
      const response = await api.page.get({id: path, by: 'slug'},
        { headers: { 'Content-Type': 'application/json' } }
      );
        
      if (response) {
        setData(response.data);

        const contentState = convertFromRaw(JSON.parse(response.data.body));
        setEditorState(EditorState.createWithContent(contentState));
      }
    } catch (error) {
      console.log(error);
    }
  }

	return (
		<Fragment>
      <Helmet>
        {data && <title>{data.title} | Sanjua</title>}
        <link rel="canonical" href={`https://sanjua.com/seccion/${data && data.slug}`} />
        {data && <meta name="description" content={data.dropline} />}
      </Helmet>
			<div className="archives post post1 page-article">
				<BreadCrumb className="shadow5 padding-top-10" title={data && data.title} />
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-lg-8 page-content">
							<div className="shadow6">
								<div className="padding20 white_bg">
								<Editor
									editorState={editorState}
									readOnly={true}
									stripPastedStyles={true}
								/>
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