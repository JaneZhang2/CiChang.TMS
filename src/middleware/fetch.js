import 'isomorphic-fetch'
import {createAction} from 'redux-actions'
import URI from 'urijs'
import config from '../config'

export default store => next => ({type, payload}) => {
  let action = createAction(type);

  return /FETCH/.test(String(type)) ?
    (()=> {
      next(action({
        ...URI.parseQuery(payload),
        loading: true
      }));

      return fetch(payload,
        {
          credentials: 'same-origin'
        }
      )
        .then(response=> {
          if (response.status !== 200) {
            throw _.assign(
              new Error('数据获取失败'),
              URI.parseQuery(payload),
              {status: response.status}
            );
          }

          return response.json();
        })
        .then(result=> {
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
        .catch(error=> next(action(error)));
    })() :
    next(action);
}