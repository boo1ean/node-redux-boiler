import _ from 'lodash';

// Create http request action operating with 3 actions
// request - function to make http request (must return promise)
// actions - array of 3 actions [req, success, err]
// transformprops - optional request params transform function
export default function createRequestAction (request, actions, transformProps) {
	const [startAction, successAction, errorAction] = actions;

	return function doRequest (props) {
		return  (dispatch, getState) => {
			dispatch({type: startAction, props});

			if (_.isFunction(transformProps)) {
				props = transformProps(props, getState);
			}

			return request(props)
				.then(result => dispatch(onSuccess(result)))
				.catch(error => dispatch(onError(error)));
		}
	}

	function onSuccess (payload) {
		return {
			type: successAction,
			payload
		};
	}

	function onError (error) {
		return {
			type: errorAction,
			error
		};
	}
}
