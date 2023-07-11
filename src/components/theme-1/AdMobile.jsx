import React from 'react';
import styled from 'styled-components';
import Ad from '../Ad';

const AdMobile = ({ ads }) => {
  return (
    <Container>
      {ads.map((ad, k) => {
        if (ad.type === 'normal' && k === 1) {
          return (
            <Ad
              key={`row-ads-${k}`}
              imageUrl={`f_auto/v${ad.image.url}`}
              url={ad.url}
              title={ad.name}
              height="250px"
            />
          );
        }
      })}
      <div className="space-20" />
    </Container>
  );
};

export default AdMobile;

const Container = styled.div`
  text-align: center;
  padding: 14px 0;
`;
