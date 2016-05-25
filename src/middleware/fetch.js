import 'isomorphic-fetch'
import {createAction} from 'redux-actions'
import URI from 'urijs'
import Rx from 'rx'
import config from '../config'

const {fromPromise} = Rx.Observable;

export default store => next => ({type, payload}) => {
  let action = createAction(type);

  return String(type) === String(Symbol('FETCH')) ?
    fromPromise(fetch(payload,
      {
        credentials: 'same-origin'
      }
    ))
      .flatMap(response=> {
        if (response.status == '404') {
          let query = URI.parseQuery(payload);
          let error = new Error();
          error.status = response.status;
          error.pageIndex = query.pageIndex;
          throw error;
        }

        return response.json();
      })
      .map(result=> {
        let {status, message, data} = result;

        switch (status) {
          case -8193:
            location.href = URI(config.HJPASSPORT_PATH)
              .query({
                url: location.href,
                source: 'cichang',
                skips: ['category-select', 'interest-select', 'register-success'],
                plain_login: true,
                plain_register: true
              })
              .toString();
            break;
          case 0:
            let query = URI.parseQuery(payload);


            data.pageIndex = query.pageIndex;
            return next(action(data));
          default:
            throw new Error(message);
        }
      })
      .catch(error=> next(action(Rx.Observable.return(error)))) :
    next(action);
}