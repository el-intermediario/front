import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LazyImage from '../LazyImage';
import { useWindowSize } from 'react-hanger';
import api from '../../utils/api';

const ArticleSimple = ({ article }) => {
  const { width } = useWindowSize();

  if (!article) return <></>;

  return (
    <Container>
      <Figure>
        <Link to={`/articulo/${article.slug}`}>
          <Img
            src={`${api.space}f_auto,c_fill,h_120,w_120/v${article.image.url}`}
            width={'100%'}
            height={'100%'}
          />
        </Link>
      </Figure>
      <Content>
        <Title>
          <LinkCustom to={`/articulo/${article.slug}`}>
            {article.title}
          </LinkCustom>
        </Title>
      </Content>
    </Container>
  );
};

export default ArticleSimple;

const Container = styled.div`
  border-bottom: 1px solid #d6d6d6;
  padding: 15px 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  overflow: hidden;
`;

const Figure = styled.div`
  float: right;
  width: 120px;
  height: 120px;
`;

const Content = styled.div`
  margin-right: 130px;
`;

const Img = styled.img`
  border-radius: 10px;
`;

const Title = styled.h3`
  font: 700 16px/19px 'Lato', sans-serif;
  color: black;
  margin: 0;
`;

const LinkCustom = styled(Link)`
  color: #000;
`;
