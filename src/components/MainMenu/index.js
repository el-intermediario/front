import React, { memo, Fragment, useState, useEffect } from 'react';
import FontAwesome from "../uiStyle/FontAwesome";
import { Link, NavLink, useHistory } from "react-router-dom";
import SearchModal from "../SearchModal";
import SidebarMenu from "../SidebarMenu";
import api from '../../utils/api';
import logoIcon from '../../doc/img/logo_icon.png';

const menusDark = [
  {
    id: 1,
    linkText: 'Home',
    child: true,
    icon: 'angle-down',
    submenu: [
      {
        id: 11,
        link: '/',
        linkText: 'Home 1'
      },
      {
        id: 12,
        link: '/dark',
        linkText: 'Home Dark'
      },
      {
        id: 13,
        new: true,
        link: '/home-two',
        linkText: 'Home 2'
      },
      {
        id: 14,
        link: '/home-three',
        linkText: 'Home 3'
      },
    ]
  },
  {
    id: 2,
    linkText: 'Pages',
    child: true,
    icon: 'angle-down',
    submenu: [
      {
        id: 21,
        link: '/dark/about',
        linkText: 'About'
      },
      {
        id: 22,
        link: '/dark/archive',
        linkText: 'Archive'
      },
      {
        id: 23,
        link: '/dark/contact',
        linkText: 'Contact Us'
      },
      {
        id: 24,
        link: '/dark/404',
        linkText: '404'
      },
    ]
  },
  {
    id: 3,
    linkText: 'Posts',
    child: true,
    icon: 'angle-down',
    submenu: [
      {
        id: 31,
        child: true,
        linkText: 'General Posts',
        third_menu: [
          {
            id: 311,
            link: '/dark/post1',
            linkText: 'Post 1',
          },
          {
            id: 312,
            link: '/dark/post2',
            linkText: 'Post 2',
          },
          {
            id: 313,
            link: '/dark/post3',
            linkText: 'Post 3',
          },
        ],
      },
      {
        id: 32,
        child: true,
        linkText: 'Video Posts',
        third_menu: [
          {
            id: 321,
            link: '/dark/video_post1',
            linkText: 'Video Style 1',
          },
          {
            id: 322,
            link: '/dark/video_post2',
            linkText: 'Video Style 2',
          },
          {
            id: 323,
            link: '/dark/video_post3',
            linkText: 'Video Style 3',
          },
        ],
      },
      {
        id: 33,
        child: true,
        linkText: 'Audio Posts',
        third_menu: [
          {
            id: 331,
            link: '/dark/audio_post1',
            linkText: 'Audio Style 1',
          },
          {
            id: 332,
            link: '/dark/audio_post2',
            linkText: 'Audio Style 2',
          },
          {
            id: 333,
            link: '/dark/audio_post3',
            linkText: 'Audio Style 3',
          },
        ],
      },
      {
        id: 34,
        child: true,
        linkText: 'Sidebars',
        third_menu: [
          {
            id: 341,
            link: '/dark/post1',
            linkText: 'Right Sidebar',
          },
          {
            id: 342,
            link: '/dark/left_post2',
            linkText: 'Left Sidebar',
          },
          {
            id: 343,
            link: '/dark/post2',
            linkText: 'No Sidebar',
          },
        ],
      },
    ]
  },
  {
    id: 4,
    linkText: 'Categories',
    child: true,
    icon: 'angle-down',
    submenu: [
      {
        id: 41,
        link: '/dark/business',
        linkText: 'Business'
      },
      {
        id: 42,
        link: '/dark/entertainment',
        linkText: 'Entertainment'
      },
      {
        id: 43,
        link: '/dark/features',
        linkText: 'Features'
      },
      {
        id: 44,
        link: '/dark/sports',
        linkText: 'Sports'
      },
      {
        id: 45,
        link: '/dark/trending',
        linkText: 'Trending'
      },
    ]
  },
  {
    id: 5,
    linkText: 'World',
    link: '/dark/world'
  },
  {
    id: 6,
    linkText: 'Sports',
    link: '/dark/sports'
  },
  {
    id: 7,
    linkText: 'Contact',
    link: '/dark/contact'
  },
];

const MainMenu = ({ className, dark }) => {
  const history = useHistory();
  const [searchShow, setSearchShow] = useState(false);
  const [sideShow, setSideShow] = useState(false);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.category.get({ type: 'articles' },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data) {
        const newMenu = [];
        newMenu.push({
          id: 0,
          linkText: 'Inicio',
          link: '/',
          child: false
        });
        response.data.data.map((itemMenu, i) => {
          itemMenu.nodes.map((itemMenuChild, c) => {
            newMenu.push({
              id: c,
              linkText: itemMenuChild.label,
              link: `/categoria/${itemMenuChild.key.replaceAll('_', '-')}`,
              child: itemMenuChild.nodes.length,
              icon: itemMenuChild.nodes.length ? 'angle-down' : '',
              submenu: itemMenuChild.nodes.length ? [] : null
            });

            itemMenuChild.nodes.map((child, ch) => {
              newMenu[c+1].submenu.push({
                id: c+ch,
                linkText: child.label,
                link: `/categoria/${itemMenuChild.key.replaceAll('_', '-')}/${child.key.replaceAll('_', '-')}`,
                child: false
              });
            });
          });
        });

        setMenus(newMenu);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const arr = dark ? menusDark : menus;

  return (
    <Fragment>
      <div className={`main-menu ${className ? className : ''}`} id="header">
        <Link to="#top" className="up_btn up_btn1">
          <FontAwesome name="chevron-double-up" />
        </Link>
        <div className="main-nav clearfix is-ts-sticky">
          <div className="container">
            <div className="row justify-content-between">
              <nav className="navbar navbar-expand-lg col-lg-10 align-self-center">
                <div className="site-nav-inner">
                  <button className="navbar-toggler" onClick={() => setSideShow(true)}>
                    <FontAwesome name="bars" />
                  </button>
                  <div id="navbarSupportedContent"
                    className="collapse navbar-collapse navbar-responsive-collapse">
                    <ul className="nav navbar-nav" id="scroll">
                      <li><img className="logo" src={logoIcon} width="40px" height="auto" alt="elintermediario logo"/></li>
                      {arr.length > 0 ? arr.map((item, i) => (
                        <li key={i} className={`${item.child ? 'dropdown' : ''} nav-item`}>
                          {item.child ? <NavLink to={item.link}
                            className="menu-dropdown"
                            data-toggle="dropdown">{item.linkText}
                            <FontAwesome
                              name={item.icon} /></NavLink>
                            : <NavLink to={item.link} className="menu-dropdown"
                              data-toggle="dropdown">{item.linkText} <FontAwesome
                                name={item.icon} /></NavLink>}

                          {item.child ?
                            <ul className="dropdown-menu" role="menu">
                              {item.submenu.map((sub_item, i) => (
                                <li key={i}
                                  className={`${sub_item.child ? 'dropdown-submenu' : null}
                                                        `}>
                                  {sub_item.child ?
                                    <NavLink to="/">{sub_item.linkText}</NavLink>
                                    : <NavLink
                                      to={sub_item.link}>{sub_item.linkText}</NavLink>}
                                  {sub_item.third_menu ?
                                    <ul className="dropdown-menu">
                                      {sub_item.third_menu.map((third_item, i) => (
                                        <li key={i}><NavLink
                                          to={third_item.link}>{third_item.linkText}</NavLink>
                                        </li>
                                      ))}
                                    </ul> : null}
                                </li>
                              ))}
                            </ul>
                            : null
                          }
                        </li>
                      )) : null}
                    </ul>
                  </div>
                  <SidebarMenu sideShow={sideShow} setSideShow={setSideShow} menus={arr} />
                </div>
              </nav>
              <div className="col-lg-2 align-self-center">
                <div className="menu_right">
                  <div className="users_area">
                    <ul className="inline">
                      <li className="search_btn" onClick={() => setSearchShow(!searchShow)}>
                        <FontAwesome name="search" />
                      </li>
                      <li className="search_btn" onClick={() => history.push('/admin')}>
                        <FontAwesome name="user" />
                      </li>
                    </ul>
                  </div>
                  {/* <div className="temp d-none d-lg-block">
                    <div className="temp_wap">
                      <div className="temp_icon">
                        <img src={tempIcon} alt="temp icon" />
                      </div>
                      <h3 className="temp_count">13</h3>
                      <p>Santa Cruz</p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {searchShow ?
        <SearchModal setSearchShow={setSearchShow} searchShow={searchShow} />
        : null
      }
    </Fragment>
  );
};

export default memo(MainMenu);