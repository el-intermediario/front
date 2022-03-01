import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../_PrivateRoute';
import PublicRoute from '../_PublicRoute';

const BusinessPage = React.lazy(() => import('../BusinessPage'));
const EntertainmentPage = React.lazy(() => import('../EntertainmentPage'));
const FeaturePage = React.lazy(() => import('../FeaturePage'));
const SportsPage = React.lazy(() => import('../SportsPage'));
const TrendingPage = React.lazy(() => import('../TrendingPage'));
const AboutUsPage = React.lazy(() => import('../AboutUsPage'));
const ArchivePage = React.lazy(() => import('../ArchivePage'));
const ContactUsPage = React.lazy(() => import('../ContactUsPage'));
const NotFoundPage = React.lazy(() => import('../NotFoundPage'));
const PostOnePage = React.lazy(() => import('../PostOnePage'));
const PostTwoPage = React.lazy(() => import('../PostTwoPage'));
const PostThreePage = React.lazy(() => import('../PostThreePage'));
const VideoPostOnePage = React.lazy(() => import('../VideoPostOnePage'));
const VideoPostTwoPage = React.lazy(() => import('../VideoPostTwoPage'));
const VideoPostThreePage = React.lazy(() => import('../VideoPostThreePage'));
const AudioPostOnePage = React.lazy(() => import('../AudioPostOnePage'));
const AudioPostTwoPage = React.lazy(() => import('../AudioPostTwoPage'));
const AudioPostThreePage = React.lazy(() => import('../AudioPostThreePage'));
const PostOneLeftSidebarPage = React.lazy(() => import('../PostOneLeftSidebarPage'));
const BusinessTwoPage = React.lazy(() => import('../BusinessTwoPage'));
const EntertainmentTwoPage = React.lazy(() => import('../EntertainmentTwoPage'));
const FeatureTwoPage = React.lazy(() => import('../FeatureTwoPage'));
const SportsTwoPage = React.lazy(() => import('../SportsTwoPage'));
const TrendingTwoPage = React.lazy(() => import('../TrendingTwoPage'));
const AboutUsPageTwo = React.lazy(() => import('../AboutUsTwoPage'));
const ArchiveTwoPage = React.lazy(() => import('../ArchiveTwoPage'));
const PostOneHTwoPage = React.lazy(() => import('../PostOneHTwoPage'));
const PostTwoHTwoPage = React.lazy(() => import('../PostTwoHTwoPage'));
const PostThreeHTwoPage = React.lazy(() => import('../PostThreeHTwoPage'));
const VideoPostOneHTwoPage = React.lazy(() => import('../VideoPostOneHTwoPage'));
const VideoPostTwoHTwoPage = React.lazy(() => import('../VideoPostTwoHTwoPage'));
const AudioPostOneHTwoPage = React.lazy(() => import('../AudioPostOneHTwoPage'));
const AudioPostTwoHTwoPage = React.lazy(() => import('../AudioPostTwoHTwoPage'));
const AudioPostThreeHTwoPage = React.lazy(() => import('../AudioPostThreeHTwoPage'));
const PostOneHTwoLeftSidebarPage = React.lazy(() => import('../PostOneHTwoLeftSidebarPage'));
const HomePageThree = React.lazy(() => import('../HomePageThree'));
const BusinessThreePage = React.lazy(() => import('../BusinessThreePage'));
const EntertainmentThreePage = React.lazy(() => import('../EntertainmentThreePage'));
const FeatureThreePage = React.lazy(() => import('../FeatureThreePage'));
const SportsThreePage = React.lazy(() => import('../SportsThreePage'));
const TrendingThreePage = React.lazy(() => import('../TrendingThreePage'));
const AboutUsThreePage = React.lazy(() => import('../AboutUsThreePage'));
const ArchiveThreePage = React.lazy(() => import('../ArchiveThreePage'));
const ContactUsThreePage = React.lazy(() => import('../ContactUsThreePage'));
const NotFoundThreePage = React.lazy(() => import('../NotFoundThreePage'));
const PostOneHThreePage = React.lazy(() => import('../PostOneHThreePage'));
const PostTwoHThreePage = React.lazy(() => import('../PostTwoHThreePage'));
const HomePage = React.lazy(() => import('../HomePage'));
const HomePageTwo = React.lazy(() => import('../HomePageTwo'));
const PostThreeHThreePage = React.lazy(() => import('../PostThreeHThreePage'));
const VideoPostOneHThreePage = React.lazy(() => import('../VideoPostOneHThreePage'));
const VideoPostTwoHThreePage = React.lazy(() => import('../VideoPostTwoHThreePage'));
const VideoPostThreeHThreePage = React.lazy(() => import('../VideoPostThreeHThreePage'));
const AudioPostOneHThreePage = React.lazy(() => import('../AudioPostOneHThreePage'));
const AudioPostTwoHThreePage = React.lazy(() => import('../AudioPostTwoHThreePage'));
const AudioPostThreeHThreePage = React.lazy(() => import('../AudioPostThreeHThreePage'));
const PostOneHThreeLeftSidebarPage = React.lazy(() => import('../PostOneHThreeLeftSidebarPage'));
const HomeDarkPage = React.lazy(() => import('../HomeDarkPage'));
const BusinessDarkPage = React.lazy(() => import('../BusinessDarkPage'));
const EntertainmentDarkPage = React.lazy(() => import('../EntertainmentDarkPage'));
const FeatureDarkPage = React.lazy(() => import('../FeatureDarkPage'));
const SportsDarkPage = React.lazy(() => import('../SportsDarkPage'));
const TrendingDarkPage = React.lazy(() => import('../TrendingDarkPage'));
const AboutUsDarkPage = React.lazy(() => import('../ArchiveDarkPage'));
const ArchiveDarkPage = React.lazy(() => import('../ArchiveDarkPage'));
const ContactUsDarkPage = React.lazy(() => import('../ContactUsDarkPage'));
const NotFoundDarkPage = React.lazy(() => import('../NotFoundDarkPage'));
const PostOneDarkPage = React.lazy(() => import('../PostOneDarkPage'));
const PostTwoDarkPage = React.lazy(() => import('../PostTwoDarkPage'));
const PostThreeDarkPage = React.lazy(() => import('../PostThreeDarkPage'));
const VideoPostOneDarkPage = React.lazy(() => import('../VideoPostOneDarkPage'));
const VideoPostTwoDarkPage = React.lazy(() => import('../VideoPostTwoDarkPage'));
const VideoPostThreeDarkPage = React.lazy(() => import('../VideoPostThreeDarkPage'));
const AudioPostOneDarkPage = React.lazy(() => import('../AudioPostOneDarkPage'));
const AudioPostTwoDarkPage = React.lazy(() => import('../AudioPostTwoDarkPage'));
const AudioPostThreeDarkPage = React.lazy(() => import('../AudioPostThreeDarkPage'));
const VideoPostThreeHTwoPage = React.lazy(() => import('../VideoPostThreeHTwoPage'));
const PostOneLeftSidebarDarkPage = React.lazy(() => import('../PostOneLeftSidebarDarkPage'));
const LoginPage = React.lazy(() => import('../Admin/LoginPage'));
const RegisterPage = React.lazy(() => import('../RegisterPage'));
const ArticlePage = React.lazy(() => import('../ArticlePage'));
const SectionPage = React.lazy(() => import('../SectionPage'));
const ArticlesPage = React.lazy(() => import('../ArticlePage/articles'));
const CategoryPage = React.lazy(() => import('../CategoryPage'));
const AdminPage = React.lazy(() => import('../Admin'));
const Logout = React.lazy(() => import('../Admin/Logout'));
const FormHomePage = React.lazy(() => import('../Admin/FormHomePage'));
const FormVideoPage = React.lazy(() => import('../Admin/FormVideoPage'));
const FormAdsPage = React.lazy(() => import('../Admin/FormAdsPage'));
const FormArticlePage = React.lazy(() => import('../Admin/FormArticlePage'));
const FormSectionPage = React.lazy(() => import('../Admin/FormSectionPage'));
const FormCategoryPage = React.lazy(() => import('../Admin/FormCategoryPage'));
const FormContactPage = React.lazy(() => import('../Admin/FormContactPage'));
const FormTagPage = React.lazy(() => import('../Admin/FromTagsPage'));


const Routes = () => {
  return (
    <Suspense fallback={<span></span>}>
      <Switch>
        {/*home one routes*/}
        <PublicRoute
          exact
          path="/"
          parentClass="theme-1"
          component={HomePage} />
        <PublicRoute
          exact
          home_style={3}
          path="/login"
          parentClass="theme-3"
          component={LoginPage} />
        <PrivateRoute
          exact
          path="/logout"
          parentClass="theme-3"
          component={Logout} />
        <PrivateRoute
          exact
          home_style={3}
          path="/register"
          parentClass="theme-3"
          component={RegisterPage} />  
        <PrivateRoute
          exact
          home_style={3}
          path="/admin"
          parentClass="theme-3"
          component={AdminPage} />
        <PrivateRoute
          exact
          home_style={3}
          path="/admin/home"
          parentClass="theme-3"
          component={FormHomePage} />
        <PrivateRoute
          exact
          home_style={3}
          path="/admin/home/edit"
          parentClass="theme-3"
          component={FormHomePage} />
        <PrivateRoute
          exact
          home_style={3}
          path="/admin/article/add"
          parentClass="theme-3"
          component={FormArticlePage} />
        <PrivateRoute
          exact
          home_style={3}
          path="/admin/article/:id/edit"
          parentClass="theme-3"
          component={FormArticlePage} />
        <PrivateRoute
          exact
          home_style={3}
          path="/admin/article"
          parentClass="theme-3"
          component={ArticlesPage} />
        <PrivateRoute
          exact
          home_style={3}
          path="/admin/category/edit"
          parentClass="theme-3"
          component={FormCategoryPage} />
        <PrivateRoute
          exact
          home_style={3}
          path="/admin/ad/add"
          parentClass="theme-3"
          component={FormAdsPage} />
        <PrivateRoute
          exact
          home_style={3}
          path="/admin/video/add"
          parentClass="theme-3"
          component={FormVideoPage} />
        <PrivateRoute
          exact
          home_style={3}
          path="/admin/contact/add"
          parentClass="theme-3"
          component={FormContactPage} />
        <PrivateRoute
          exact
          home_style={3}
          path="../admin/FormTagPage"
          parentClass="theme-3"
          component={FormTagPage} />
        <PrivateRoute
          exact
          home_style={3}
          path="/admin/section/add"
          parentClass="theme-3"
          component={FormSectionPage} />  
        <PublicRoute
          exact
          path="/articulo/:path"
          parentClass="theme-1"
          component={ArticlePage} />
        <PublicRoute
          exact
          path="/seccion/:path"
          parentClass="theme-1"
          component={SectionPage} />    
        <PublicRoute
          exact
          path="/categoria/:path"
          parentClass="theme-1"
          component={CategoryPage} />
        <PublicRoute
          exact
          path="/categoria/:path/:path2"
          parentClass="theme-1"
          component={CategoryPage} />
        <PublicRoute
          exact
          path="/categoria/:path/:path2/:path3"
          parentClass="theme-1"
          component={CategoryPage} />  
        <PrivateRoute
          exact
          path="/business"
          parentClass="theme-1"
          component={BusinessPage} />
        <PrivateRoute
          exact
          path="/entertainment"
          parentClass="theme-1"
          component={EntertainmentPage} />
        <PrivateRoute
          exact
          path="/features"
          parentClass="theme-1"
          component={FeaturePage} />
        <PrivateRoute
          exact
          path="/trending"
          parentClass="theme-1"
          component={TrendingPage} />
        <PrivateRoute
          exact
          path="/sports"
          parentClass="theme-1"
          component={SportsPage} />
        <PrivateRoute
          exact
          path="/about"
          parentClass="theme-1"
          component={AboutUsPage} />
        <PrivateRoute
          exact
          path="/archive"
          parentClass="theme-1"
          component={ArchivePage} />
        <PrivateRoute
          exact
          path="/contact"
          parentClass="theme-1"
          component={ContactUsPage} />
        <PrivateRoute
          exact
          path="/404"
          parentClass="theme-1"
          component={NotFoundPage} />
        <PrivateRoute
          exact
          path="/post1"
          parentClass="theme-1"
          component={PostOnePage} />
        <PrivateRoute
          exact
          path="/post2"
          parentClass="theme-1"
          component={PostTwoPage} />
        <PrivateRoute
          exact
          path="/post3"
          parentClass="theme-1"
          component={PostThreePage} />
        <PrivateRoute
          exact
          path="/video_post1"
          parentClass="theme-1"
          component={VideoPostOnePage} />
        <PrivateRoute
          exact
          path="/video_post2"
          parentClass="theme-1"
          component={VideoPostTwoPage} />
        <PrivateRoute
          exact
          path="/video_post3"
          parentClass="theme-1"
          component={VideoPostThreePage} />
        <PrivateRoute
          exact
          path="/audio_post1"
          parentClass="theme-1"
          component={AudioPostOnePage} />
        <PrivateRoute
          exact
          path="/audio_post2"
          parentClass="theme-1"
          component={AudioPostTwoPage} />
        <PrivateRoute
          exact
          path="/audio_post3"
          parentClass="theme-1"
          component={AudioPostThreePage} />
        <PrivateRoute
          exact
          path="/left_post2"
          parentClass="theme-1"
          component={PostOneLeftSidebarPage} />

        {/*home two routes*/}
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3 theme3_bg"
          path="/home-two"
          component={HomePageTwo} />
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3 theme3_bg"
          path="/home-two/business"
          component={BusinessTwoPage} />
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3 theme3_bg"
          path="/home-two/entertainment"
          component={EntertainmentTwoPage} />
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3 theme3_bg"
          path="/home-two/features"
          component={FeatureTwoPage} />
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3 theme3_bg"
          path="/home-two/sports"
          component={SportsTwoPage} />
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3 theme3_bg"
          path="/home-two/trending"
          component={TrendingTwoPage} />
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3 theme3_bg"
          path="/home-two/about"
          component={AboutUsPageTwo} />
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3 theme3_bg"
          path="/home-two/archive"
          component={ArchiveTwoPage} />
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3 theme3_bg"
          path="/home-two/contact"
          component={ContactUsPage} />
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3"
          path="/home-two/post1"
          component={PostOneHTwoPage} />
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3"
          path="/home-two/post2"
          component={PostTwoHTwoPage} />
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3"
          path="/home-two/post3"
          component={PostThreeHTwoPage} />
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3"
          path="/home-two/video_post1"
          component={VideoPostOneHTwoPage} />
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3"
          path="/home-two/video_post2"
          component={VideoPostTwoHTwoPage} />
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3"
          path="/home-two/video_post3"
          component={VideoPostThreeHTwoPage} />
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3"
          path="/home-two/audio_post1"
          component={AudioPostOneHTwoPage} />
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3"
          path="/home-two/audio_post2"
          component={AudioPostTwoHTwoPage} />
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3"
          path="/home-two/audio_post3"
          component={AudioPostThreeHTwoPage} />
        <PrivateRoute
          exact
          home_style={2}
          parentClass="theme-3"
          path="/home-two/left_post2"
          component={PostOneHTwoLeftSidebarPage} />

        {/*home page three*/}
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4"
          path="/home-three"
          component={HomePageThree} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4 bg4"
          path="/home-three/business"
          component={BusinessThreePage} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4 bg4"
          path="/home-three/entertainment"
          component={EntertainmentThreePage} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4 bg4"
          path="/home-three/features"
          component={FeatureThreePage} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4 bg4"
          path="/home-three/sports"
          component={SportsThreePage} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4 bg4"
          path="/home-three/trending"
          component={TrendingThreePage} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4 bg4"
          path="/home-three/about"
          component={AboutUsThreePage} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4 bg4"
          path="/home-three/archive"
          component={ArchiveThreePage} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4 bg4"
          path="/home-three/contact"
          component={ContactUsThreePage} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4 bg4"
          path="/home-three/404"
          component={NotFoundThreePage} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4"
          path="/home-three/post1"
          component={PostOneHThreePage} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4"
          path="/home-three/post2"
          component={PostTwoHThreePage} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4 theme3_bg"
          path="/home-three/post3"
          component={PostThreeHThreePage} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4"
          path="/home-three/video_post1"
          component={VideoPostOneHThreePage} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4"
          path="/home-three/video_post2"
          component={VideoPostTwoHThreePage} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4"
          path="/home-three/video_post3"
          component={VideoPostThreeHThreePage} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4"
          path="/home-three/audio_post1"
          component={AudioPostOneHThreePage} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4"
          path="/home-three/audio_post2"
          component={AudioPostTwoHThreePage} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4"
          path="/home-three/audio_post3"
          component={AudioPostThreeHThreePage} />
        <PrivateRoute
          exact
          home_style={3}
          parentClass="theme-4"
          path="/home-three/left_post2"
          component={PostOneHThreeLeftSidebarPage} />

        {/*home dark version*/}
        <PrivateRoute
          exact
          home_style={4}
          path="/dark"
          parentClass="dark-theme primay_bg"
          component={HomeDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/business"
          parentClass="dark-theme primay_bg"
          component={BusinessDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/entertainment"
          parentClass="dark-theme primay_bg"
          component={EntertainmentDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/features"
          parentClass="dark-theme primay_bg"
          component={FeatureDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/sports"
          parentClass="dark-theme primay_bg"
          component={SportsDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/trending"
          parentClass="dark-theme primay_bg"
          component={TrendingDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/about"
          parentClass="dark-theme primay_bg"
          component={AboutUsDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/archive"
          parentClass="dark-theme primay_bg"
          component={ArchiveDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/contact"
          parentClass="dark-theme primay_bg"
          component={ContactUsDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/404"
          parentClass="dark-theme primay_bg"
          component={NotFoundDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/post1"
          parentClass="dark-theme primay_bg"
          component={PostOneDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/post2"
          parentClass="dark-theme primay_bg"
          component={PostTwoDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/post3"
          parentClass="dark-theme primay_bg"
          component={PostThreeDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/video_post1"
          parentClass="dark-theme primay_bg"
          component={VideoPostOneDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/video_post2"
          parentClass="dark-theme primay_bg"
          component={VideoPostTwoDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/video_post3"
          parentClass="dark-theme primay_bg"
          component={VideoPostThreeDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/audio_post1"
          parentClass="dark-theme primay_bg"
          component={AudioPostOneDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/audio_post2"
          parentClass="dark-theme primay_bg"
          component={AudioPostTwoDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/audio_post3"
          parentClass="dark-theme primay_bg"
          component={AudioPostThreeDarkPage} />
        <PrivateRoute
          exact
          home_style={4}
          path="/dark/left_post2"
          parentClass="dark-theme primay_bg"
          component={PostOneLeftSidebarDarkPage} />

        <Route exact component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
};
export default Routes