import React, {useState} from 'react';
import FontAwesome from "../uiStyle/FontAwesome";
import Swiper from 'react-id-swiper';
import Heading from '../uiStyle/Heading';
import './style.scss';

const CarouselMatchs = ({className, data}) => {
    const [swiper, setSwiper] = useState(null);

    const goNext = () => {
        if (swiper !== null) {
            swiper.slideNext();
        }
    };

    const goPrev = () => {
        if (swiper !== null) {
            swiper.slidePrev();
        }
    };
    const params = {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 30
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 0
          }
        }
    };

    const translate = (text) => {
      if (text.includes('2nd Phase')) {
        return text.replace('2nd Phase', 'Liga Fecha')
      } else {
        return text.replace('1st Phase', 'Copa Liga')
      }
    }

    return (
      <div className={`feature_carousel_area four-items mb10 ${className ? className : ''}`}>
        <div className="container">
          <div className="row">
              <div className="col-12">
                  <Heading title="Resultados deportivos"/>
              </div>
          </div>
          <div className="row">
            <div className="col-12">
              {/*CAROUSEL START*/}
              <div className="feature_carousel nav_style1 block-fixture">
                {data.length ? (
                  <>
                    <Swiper getSwiper={setSwiper} {...params}>
                      {data.map((match, i) => (
                        <div key={i} className="single_post post_type6 post_type7 match-item">
                          <div>{translate(match.league.round)}</div>
                          <div className="evsc__i is-pregame" data-idpartido={match.fixture.id}>
                            {/* <span>VIE 03/06 </span><span> 20:00h</span> */}
                            <div className="row">
                              <img className="col-2 p-0 m-0 match-picture" src={match.teams.home.logo} width="80%" alt={match.teams.home.name} />

                              <span className="col-8">{match.teams.home.name}</span>
                              <p className="col-2">
                                {match.score.fulltime?.home}
                              </p>
                            </div>
                            <div className="row">
                              <img className="col-2 p-0 m-0 match-picture" src={match.teams.away.logo} width="80%" alt={match.teams.away.name} />
                              <span className="col-8">{match.teams.away.name}</span>
                              <p className="col-2">
                                {match.score.fulltime?.away}
                              </p>
                            </div>
                            <div className={`match-status ${match.fixture.status.long === 'Match Finished' ? 'finished' : ''}`}>
                              {match.fixture.status.long === 'Match Finished' ? 'Finalizado' : 'Por comenzar...'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </Swiper>
                    <div className="navBtns">
                        <div onClick={goPrev} className="navBtn prevtBtn"><FontAwesome name="angle-left"/></div>
                        <div onClick={goNext} className="navBtn nextBtn"><FontAwesome name="angle-right"/></div>
                    </div>
                  </>  
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default CarouselMatchs;