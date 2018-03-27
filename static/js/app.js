/**
 * react路由配置文件
 */
import React from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route} from "react-router-dom";
import createHistory from "history/createHashHistory";
import {asyncComponent} from "./AsyncComponent";
const history = createHistory();

const Main = asyncComponent(() => import(/* webpackChunkName: "main" */ './modules/main'));

const router = (
  <Router history={history}>
    <Router>
      <Route exact path="/" component={Main}/>
    </Router>
  </Router>
);

ReactDOM.render(router, document.getElementById("content"));