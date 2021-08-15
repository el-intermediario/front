import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import logo42 from "../../doc/img/logo/logo42.png";
import FontAwesome from "../uiStyle/FontAwesome";
import FooterNewsCategories from "../FooterNewsCategories";
import FooterMoreNewsTwo from "../FooterMoreNewsTwo";
import NewsLetter from "../NewsLetter";
import FollowUs from "../FollowUs";

import phone_black from "../../doc/img/icon/phone4.png";
import speaker_black from "../../doc/img/icon/speaker4.png";
import envelope_black from "../../doc/img/icon/envelope4.png";
import banner4 from "../../doc/img/bg/banner4.png";

const twitts = [
    {
        title: 'Cyber Monday Sale, Save 33% on Jannah theme during our year-end Sale, Purchase a new license for your next project',
        linkText: '@newspark #technology https://dribbble.com/subash_chandra',
        date: 'March 26, 2020',
    },
    {
        title: 'Cyber Monday Sale, Save 33% on Jannah theme during our year-end Sale, Purchase a new license for your next project',
        linkText: '@newspark #technology https://dribbble.com/subash_chandra',
        date: 'March 26, 2020',
    },
];

const FooterAreaThree = () => {
    return (
        <div className="footer footer_area3 ">
            <div className="copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 align-self-center">
                            <p>&copy; Copyright 2020, All Rights Reserved</p>
                        </div>
                        <div className="col-lg-6 align-self-center">
                            <div className="copyright_menus text-right">
                                <div className="language"/>
                                <div className="copyright_menu inline">
                                    <ul>
                                        <li><Link to="/">About</Link></li>
                                        <li><Link to="/">Advertise</Link></li>
                                        <li><Link to="/">Privacy & Policy</Link></li>
                                        <li><Link to="/">Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterAreaThree;