import 'isomorphic-fetch'
import {createAction} from 'redux-actions'
import URI from 'urijs'
import Rx from 'rx'
import config from '../config'

const {fromPromise} = Rx.Observable;

export default store => next => ({type, payload}) => {
  let action = createAction(type);

  return String(type) === String(Symbol('FETCH')) ?
    (()=> {
      next(action({
        ...URI.parseQuery(payload),
        loading: true
      }));

      return fromPromise(fetch(payload,
        {
          credentials: 'same-origin'
        }
      ))
        .flatMap(response=> {
          if (response.status !== 200) {
            throw _.assign(
              new Error('数据获取失败'),
              URI.parseQuery(payload),
              {status: response.status}
            );
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
              return next(action(
                _.assign(data, URI.parseQuery(payload))
              ));
            default:
              throw new Error(message);
          }
        })
        .catch(error=> next(action(Rx.Observable.return(error))))
    })() :
    next(action);
}