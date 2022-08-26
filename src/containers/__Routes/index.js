import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import AdsPage from '../AdPage/ads';
import SectionsPage from '../SectionPage/sections';
import PrivateRoute from '../_PrivateRoute';
import PublicRoute from '../_PublicRoute';

const NotFoundPage = React.lazy(() => import('../NotFoundPage'));
const HomePage = React.lazy(() => import('../HomePage'));
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
        <PublicRoute
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
          path="/admin/ads"
          parentClass="theme-3"
          component={AdsPage} />
        <PrivateRoute
          exact
          home_style={3}
          path="/admin/ad/add"
          parentClass="theme-3"
          component={FormAdsPage} />
        <PrivateRoute
          exact
          home_style={3}
          path="/admin/ad/:id/edit"
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
          path="/admin/FormTagPage"
          parentClass="theme-3"
          component={FormTagPage} />
        <PrivateRoute
          exact
          home_style={3}
          path="/admin/sections"
          parentClass="theme-3"
          component={SectionsPage} />  
        <PrivateRoute
          exact
          home_style={3}
          path="/admin/sections/add"
          parentClass="theme-3"
          component={FormSectionPage} />
        <PrivateRoute
          exact
          home_style={3}
          path="/admin/sections/:id/edit"
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
          path="/404"
          parentClass="theme-1"
          component={NotFoundPage} />

        {/*home two routes*/}
        {/*home page three*/}

        <Route exact component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
};
export default Routes