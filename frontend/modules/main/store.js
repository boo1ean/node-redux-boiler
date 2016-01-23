import { compose, createStore, applyMiddleware, } from 'redux';
import DevTools from './components/dev-tools';
import thunk from 'redux-thunk';
import { syncHistory } from 'redux-simple-router';
import { persistState } from 'redux-devtools';
import { browserHistory } from 'react-router';
import routes from './routes';
import reducer from './reducer';

const initialState = {
	routing: { routes: [], params: {}, location: {}, components: [] }
};

const reduxRouterMiddleware = syncHistory(browserHistory);

function configureStore ({ state = initialState, routes, reducer }) {
	return compose(
		applyMiddleware(thunk),
		applyMiddleware(reduxRouterMiddleware),
		DevTools.instrument(),
		persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
	)(createStore)(reducer, state);
}

const store = configureStore({ routes, reducer });
reduxRouterMiddleware.listenForReplays(store);

export default store;

