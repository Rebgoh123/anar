import React from 'react';
import ReactDOM from 'react-dom';
import promise from 'redux-promise';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createLogger } from 'redux-logger'
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";


import reducers from './reducers';
import Home from './components/home/index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import NavBar from './components/app/header';

const THEME = createMuiTheme({
    typography: {
        "fontFamily": "\"Maven Pro\", sans-serif",
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    }
});

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(promise,loggerMiddleware)(createStore);

ReactDOM.render(
    <MuiThemeProvider theme={THEME}>
        <Provider store={createStoreWithMiddleware(reducers)}>
            <BrowserRouter>
            <div>
                <NavBar/>
                <Switch>
                    {/*<Route path="/posts/new" component={PostsNew}/>*/}
                    {/*<Route path="/posts/:id" component={PostsShow}/>*/}
                    <Route path="/" component={Home}/>
                </Switch>
            </div>
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
    , document.querySelector('.app'));
