import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LazyImage from '../LazyImage';
import { useWindowSize } from 'react-hanger';
import api from '../../utils/api';

const OneArticleFeatured = ({ article }) => {
  const { width } = useWindowSize();

  if (!article) return <></>;

  return (
    <Container>
      <Figure>
        <Link to={`/articulo/${article.slug}`}>
          {article?.image && (
            <Img
              src={`${api.space}f_auto,c_fill,g_face,h_${
                width < 426 ? 425 : 400
              },w_${width < 426 ? 425 : 600}/v${article?.image?.url}`}
              width={'100%'}
              height={'100%'}
            />
          )}
        </Link>
      </Figure>
      <Content>
        <Category>{article.copete}</Category>
        <Title>
          <LinkCustom to={`/articulo/${article.slug}`}>
            {article.title}
          </LinkCustom>
        </Title>
      </Content>
    </Container>
  );
};

export default OneArticleFeatured;

const Container = styled.div`
  width: 91vw;
  height: 91vw;
  margin: 20px auto;
  box-shadow: 4px 4px 10px #00000066;
  border-radius: 10px;
  position: relative;
`;

const Figure = styled.div`
  overflow: hidden;
  position: relative;
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding: 18px 14px;
`;

const Img = styled.img`
  border-radius: 10px;
`;
const Category = styled.div`
  text-transform: uppercase;
  position: relative;
  background-color: black;
  padding: 2px 5px 2px;
  letter-spacing: 0.5px;
  display: inline-block;
  color: white;
`;

const Title = styled.h2`
  color: white;
  font-size: 20px;
  font: 900 24px/26px 'Lato', sans-serif;
  margin: 0;
`;

const LinkCustom = styled(Link)`
  background-color: #14a5c0;
  color: white;
  padding: 2px;
`;
