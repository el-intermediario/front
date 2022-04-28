import React, { Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';
import TopBar from "../../components/TopBar";
import LogoArea from "../../components/LogoArea";
import MainMenu from "../../components/MainMenu";
import FooterArea from "../../components/FooterArea";
import TopBarTwo from "../../components/TopBarTwo";
import LogoAreaTwo from "../../components/LogoAreaTwo";
import MainMenuTwo from "../../components/MainMenuTwo";
import FooterAreaTwo from "../../components/FooterAreaTwo";
// import LogoAreaThree from "../../components/LogoAreaThree";
import FooterAreaThree from "../../components/FooterAreaThree";
import { StickyNav } from 'react-js-stickynav'
import 'react-js-stickynav/dist/index.css'

const PublicRoute = (props) => {
  const { component: Component, ...rest } = props;
  let redirect = null;

  const style = () => {
    return (
      <style jsx>{`
        .nav {
          transition: all 0.1s linear;
          z-index: 2000;
          display: inline;
        }

        .scrollNav {
          position: fixed;
          transition: all 0.5s ease-in;
          z-index: 2000;
          background: #FFFFFF;
          width: 100%;
          border-bottom: 1px solid #dddddd;
          top: 0;
        }
        .styl {
          padding-top: 80px;
        }
      `}</style>
    )
  }
  return (
    <div className={props.parentClass}>
      {
        props.home_style === 2 ?
          <Fragment>
            {/*=== home two ===*/}
            <TopBarTwo />
            <div className="border_black" />
            <LogoAreaTwo />
            <MainMenuTwo />
          </Fragment>
          : props.home_style === 3 ?
            <Fragment>
              {/*=== home three ===*/}
              <LogoAreaTwo />
              <MainMenuTwo />
            </Fragment>
            : props.home_style === 4 ?
              <Fragment>
                {/*=== home dark version ===*/}
                <TopBar dark={true} />
                <div className="border_white" />
                <LogoArea dark={true} className="dark-2" />
                <MainMenu dark={true} className="dark-2" />
              </Fragment>
              :
              <Fragment>
                {/*=== home one/default ===*/}
                <TopBar className="white_bg" />
                <div className="border_secondary" />
                {/* <LogoArea className="white_bg"/> */}
                {style()}
                <StickyNav length='40'>
                  <MainMenu />
                </StickyNav>
              </Fragment>
      }

      <Route
        {...rest}
        render={props =>
          !redirect ? <Component {...props} /> : <Redirect to={redirect} />
        }
      />

      {props.home_style === 2 ?
        <FooterAreaTwo />
        : props.home_style === 3 ?
          <FooterAreaThree />
          : props.home_style === 4 ?
            <FooterArea className="dark-2" />
            : <FooterArea className="primay_bg" />}
    </div>
  )
};

export default PublicRoute;
