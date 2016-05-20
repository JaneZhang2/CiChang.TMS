import 'isomorphic-fetch'
import {createAction} from 'redux-actions'
import URI from 'urijs'
import Rx from 'rx'
import {HJPASSPORT_PATH} from '../config'

const {fromPromise} = Rx.Observable;

export default store => next => ({type, payload}) => {
  let action = createAction(type);

  return String(type) === String(Symbol('FETCH')) ?
    fromPromise(fetch(payload,
      {
        credentials: 'same-origin'
      }
    ))
      .flatMap(response=>response.json())
      .map(result=> {
        let {Status, Message, Data} = result;

        switch (Status) {
          case -8193:
            // console.log(payload);
            // console.log(result)

            location.href = URI(HJPASSPORT_PATH)
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


            Data.pageIndex = query.pageIndex;
            return next(action(Data));
          default:
            throw new Error(Message);
        }
      })
      .catch(error=> next(action(Rx.Observable.return(error)))) :
    next(action);
}