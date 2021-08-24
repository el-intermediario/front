import React, {Fragment, useState} from 'react';
import {TabContent, TabPane, Nav, NavItem, Fade} from 'reactstrap';
import classnames from 'classnames';
import {Link} from "react-router-dom";

import thumb1 from '../../doc/img/header/widget/tab1.jpg';
import thumb2 from '../../doc/img/header/widget/tab2.jpg';
import thumb3 from '../../doc/img/header/widget/tab3.jpg';
import thumb4 from '../../doc/img/header/widget/tab4.jpg';

const data = [
    {
        image: thumb1,
        title: 'Daniela Ledesma: "Si no es una cosa, es otra, pero siempre se termina suspendiendo"',
        category: 'Río Gallegos',
        date: 'Julio 8, 2020'
    },
    {
        image: thumb2,
        title: 'Fuerte operativo territorial en Pico Truncado',
        category: 'Prevencion',
        date: 'Julio 7, 2020'
    },
    {
        image: thumb3,
        title: 'Santa Cruz registró 108 nuevos casos de coronavirus',
        category: 'Pandemia',
        date: 'Julio 6, 2020'
    },
    {
        image: thumb4,
        title: 'Emiliano Martínez brilló en los penales y Argentina es finalista',
        category: 'Deportes',
        date: 'March 26, 2020'
    }
];

const WidgetTabPane = ({arr, a_id, id, dark}) => {
    return (
        <Fade in={id === a_id}>
            <div className="widget tab_widgets">
                {arr.map((item, i) => (
                    <Fragment key={i}>
                        <div className="single_post widgets_small">
                            <div className="post_img">
                                <div className="img_wrap">
                                    <Link to="/">
                                        <img src={item.image} alt="thumb"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="single_post_text">
                                <div className="meta2 meta_separator1"><Link to="#">{item.category}</Link>
                                    <Link to="#">{item.date}</Link>
                                </div>
                                <h4><Link to="/post1">{item.title}</Link></h4>
                            </div>
                        </div>
                        <div className="space-15"/>
                        {dark ? <div className="border_white"/> : <div className="border_black"/>}
                        <div className="space-15"/>
                    </Fragment>
                ))}
            </div>
        </Fade>
    )
};

const WidgetTab = ({className, dark}) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <div className={`widget_tab md-mt-30 ${className}`}>
            <Nav tabs>
                <NavItem>
                    <Link
                        to="/"
                        className={classnames({active: activeTab === '1'})}
                        onClick={() => {
                            toggle('1');
                        }}
                    >
                        RELACIONADAS
                    </Link>
                </NavItem>
                <NavItem>
                    <Link
                        to="/"
                        className={classnames({active: activeTab === '3'})}
                        onClick={() => {
                            toggle('3');
                        }}
                    >
                        POPULARES
                    </Link>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId='1'><WidgetTabPane dark={dark} a_id={activeTab} id="1" arr={data}/></TabPane>
                <TabPane tabId='2'><WidgetTabPane dark={dark} a_id={activeTab} id="2" arr={data}/></TabPane>
                <TabPane tabId='3'><WidgetTabPane dark={dark} a_id={activeTab} id="3" arr={data}/></TabPane>
            </TabContent>
        </div>
    );
};

export default WidgetTab;