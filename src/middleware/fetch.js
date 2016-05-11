import 'isomorphic-fetch'
import {createAction} from 'redux-actions'
import URI from 'urijs'
import Rx from 'rx'
import {HJPASSPORT_PATH} from '../config'

const {fromPromise} = Rx.Observable;

export default store => next => ({type, payload}) => {
  let action = createAction(type);

  return String(type) === String(Symbol('FETCH')) ?
    fromPromise(fetch(payload))
      .flatMap(response=>response.json())
      .map(result=> {
        let {status, message, data} = result;

        switch (status) {
          case -8193:
            return next(action(
              URI(HJPASSPORT_PATH)
                .query({
                  url: location.href,
                  source: 'cichang',
                  skips: ['category-select', 'interest-select', 'register-success'],
                  plain_login: true,
                  plain_register: true
                })
            ));
          case 0:
            return next(action(data));
          default:
            throw new Error(message);
        }
      })
      .catch(error=> next(action(Rx.Observable.return(error)))) :
    next(action);
}