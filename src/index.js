import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './store/actions/reducers/auth';
import skillReducer from './store/actions/reducers/skill';
import jobReducer from './store/actions/reducers/job';
import schoolReducer from './store/actions/reducers/school';
import profileReducer from './store/actions/reducers/profile';
import resumeReducer from './store/actions/reducers/resume';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    skill: skillReducer,
    job: jobReducer,
    profile: profileReducer,
    resume: resumeReducer,
    school: schoolReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
