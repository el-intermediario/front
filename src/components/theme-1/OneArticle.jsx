import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LazyImage from '../LazyImage';
import { useWindowSize } from 'react-hanger';
import Placeholder from '../Placeholder';

const OneArticle = ({ article }) => {
  const { width } = useWindowSize();

  if (!article) return <></>;

  return (
    <Container>
      <Figure>
        <Link className="play_btn" to={`/articulo/${article.slug}`}>
          {article.image ? (
            <LazyImage
              src={`f_auto,c_fill,g_face,h_${width < 426 ? 240 : 400},w_${
                width < 426 ? 425 : 600
              }/v${article.image.url}`}
              width={width < 426 ? 425 : 600}
              height={width < 426 ? 240 : 400}
              alt={article.title}
            />
          ) : (
            <Placeholder />
          )}
        </Link>
      </Figure>
      <Content>
        <Category>{article.copete}</Category>
        <Title>{article.title}</Title>
      </Content>
    </Container>
  );
};

export default OneArticle;

const Container = styled.div`
  width: 91vw;
  height: 91vw;
  margin: 20px auto;
  box-shadow: 4px 4px 10px #00000066;
  border-radius: 10px;
  background: white;
`;

const Figure = styled.div``;

const Content = styled.div`
  padding: 10px 13px 10px 11px;
`;

const Category = styled.div`
  text-transform: uppercase;
  position: relative;
  background-color: #14a5c0;
  padding: 2px 5px;
  letter-spacing: 0.5px;
  display: inline-block;
  color: white;
`;

const Title = styled.h2`
  color: black;
  font-size: 20px;
  font: 900 18px/22px 'Lato', sans-serif;
  margin: 0;
`;
