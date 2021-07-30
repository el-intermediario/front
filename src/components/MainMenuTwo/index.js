import React, {useState} from 'react';
import FontAwesome from "../uiStyle/FontAwesome";
import {NavLink} from "react-router-dom";
import SidebarMenu from "../SidebarMenu";

const menus = [
    {
        id: 1,
        link: '/admin',
        linkText: 'Home',
    },
    {
        id: 2,
        link: '/articulos',
        linkText: 'Articulos',
        child: true,
        icon: 'angle-down',
        submenu: [
            {
                id: 20,
                link: '/articulos',
                linkText: 'Articulos'
            },
            {
                id: 21,
                link: '/admin/article/add',
                linkText: 'Nuevo'
            },
            {
                id: 22,
                link: '/home-two/archive',
                linkText: 'Buscar'
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
                link: '/admin/category/add',
                linkText: 'Nueva',
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
];
const MainMenuTwo = () => {
    const [sideShow, setSideShow] = useState(false);
    return (
        <div className="container">
            <div className="main-menu">
                <div className="main-nav clearfix is-ts-sticky">
                    <div className="row justify-content-between">
                        <nav className="navbar navbar-expand-lg col-lg-8 align-self-center">
                            <div className="site-nav-inner">
                                <button className="navbar-toggler" onClick={() => setSideShow(true)}>
                                    <FontAwesome name="bars"/>
                                </button>
                                <div id="navbarSupportedContent"
                                     className="collapse navbar-collapse navbar-responsive-collapse">
                                    <ul className="nav navbar-nav" id="scroll">
                                        {menus.length > 0 ? menus.map((item, i) => (
                                            <li key={i}
                                                className={`
                                                ${item.child ? 'dropdown' : ''}
                                                nav-item`}>
                                                {item.child ? <NavLink onClick={e => e.preventDefault()} to="/"
                                                                       className="menu-dropdown"
                                                                       data-toggle="dropdown">{item.linkText}
                                                        <FontAwesome
                                                            name={item.icon}/></NavLink>
                                                    : <NavLink to={item.link} className="menu-dropdown"
                                                               data-toggle="dropdown">{item.linkText} <FontAwesome
                                                        name={item.icon}/></NavLink>}

                                                {item.child ?
                                                    <ul className="dropdown-menu" role="menu">
                                                        {item.submenu.map((sub_item, i) => (
                                                            <li key={i}
                                                                className={`${sub_item.child ? 'dropdown-submenu' : null}
                                                        `}>
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
                                <SidebarMenu className="themeBlue" sideShow={sideShow} setSideShow={setSideShow} menus={menus}/>
                            </div>
                        </nav>
                        <div className="col-lg-3 text-right align-self-center">
                            <div className="date3">
                                <p>10 de Julio 2021 (@todo)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainMenuTwo;