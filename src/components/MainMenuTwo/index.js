import React, { useState, useEffect } from 'react';
import FontAwesome from "../uiStyle/FontAwesome";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import SidebarMenu from "../SidebarMenu";
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import 'moment/locale/es';

const menus = [
  {
    id: 1,
    link: '/',
    linkText: 'Inicio',
  },
];

const menusLogged = [
  {
    id: 1,
    link: '/admin',
    linkText: 'Home',
    child: true,
    icon: 'angle-down',
    submenu: [
      {
        id: 11,
        link: '/admin/home',
        linkText: 'Editar'
      },
    ]
  },
  {
    id: 2,
    link: '/admin/article',
    linkText: 'Articulos',
    child: true,
    icon: 'angle-down',
    submenu: [
      {
        id: 20,
        link: '/admin/article',
        linkText: 'Articulos'
      },
      {
        id: 21,
        link: '/admin/article/add',
        linkText: 'Nuevo'
      }
    ]
  },
  {
    id: 3,
    link: '/categorias',
    linkText: 'Categorias',
    child: true,
    icon: 'angle-down',
    submenu: [
      {
        id: 31,
        link: '/admin/category/edit',
        linkText: 'Editar',
      }
    ]
  },
  {
    id: 4,
    link: '/contactos',
    linkText: 'Contacto',
    child: true,
    icon: 'angle-down',
    submenu: [
      {
        id: 41,
        link: '/home-two/business',
        linkText: 'Business'
      },
    ]
  },
  {
    id: 5,
    link: '/logout',
    linkText: 'Salir',
  },
];
const MainMenuTwo = () => {
  const history = useHistory();
  const location = useLocation();
  const user = useSelector(state => state.user);
  const [sideShow, setSideShow] = useState(false);

  useEffect(() => {
    if (!user && location.pathname != '/login') {
      return history.push('/login');
    }
  }, []);

  return (
    <div className="container">
      <div className="main-menu">
        <div className="main-nav clearfix is-ts-sticky">
          <div className="row justify-content-between">
            <nav className="navbar navbar-expand-lg col-lg-8 align-self-center">
              <div className="site-nav-inner">
                <button className="navbar-toggler" onClick={() => setSideShow(true)}>
                  <FontAwesome name="bars" />
                </button>
                <div id="navbarSupportedContent"
                  className="collapse navbar-collapse navbar-responsive-collapse">
                  <ul className="nav navbar-nav" id="scroll">
                    {!user && menus.length > 0 ? menus.map((item, i) => (
                      <li key={i}
                        className={`${item.child ? 'dropdown' : ''} nav-item`}>
                        {item.child ? <NavLink onClick={e => e.preventDefault()} to="/"
                          className="menu-dropdown"
                          data-toggle="dropdown">{item.linkText}
                          <FontAwesome
                            name={item.icon} /></NavLink>
                          : <NavLink to={item.link} className="menu-dropdown"
                            data-toggle="dropdown">{item.linkText} <FontAwesome
                              name={item.icon} /></NavLink>}
                      </li>
                    )) : null}
                    {user && menusLogged.length > 0 ? menusLogged.map((item, i) => (
                      <li key={i}
                        className={`${item.child ? 'dropdown' : ''} nav-item`}>
                        {item.child ? <NavLink onClick={e => e.preventDefault()} to="/"
                          className="menu-dropdown"
                          data-toggle="dropdown">{item.linkText}
                          <FontAwesome name={item.icon} /></NavLink>
                          : <NavLink to={item.link} className="menu-dropdown"
                            data-toggle="dropdown">{item.linkText} <FontAwesome name={item.icon} /></NavLink>}
                        {item.child ?
                          <ul className="dropdown-menu" role="menu">
                            {item.submenu.map((sub_item, i) => (
                              <li key={i} className={`${sub_item.child ? 'dropdown-submenu' : null}`}>
                                {sub_item.child ?
                                  <NavLink onClick={e => e.preventDefault()}
                                    to="/">{sub_item.linkText}</NavLink>
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
                <SidebarMenu className="themeBlue" sideShow={sideShow} setSideShow={setSideShow} menus={menus} />
              </div>
            </nav>
            <div className="col-lg-3 text-right align-self-center">
              <div className="date3">
                <p><Moment format="dddd D, MMMM YYYY" locale="es">{Date.now()}</Moment></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenuTwo;