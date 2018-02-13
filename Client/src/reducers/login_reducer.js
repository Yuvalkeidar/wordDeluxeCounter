import { FOUND_USER } from '../actions/index';
import { ERROR_FINDING_USER } from '../actions/index';
import { CREATE_USER } from '../actions/index';
import { ERROR_CREATE_USER } from '../actions/index';

export default function(state=[],action){
  // handle action
  switch (action.type) {
    case FOUND_USER:
      if (action.error) {
        return state;
      }
      return {authoriztionCheck:true,ErrorMessage:action.payload.data,username:action.username};
    case ERROR_FINDING_USER:
      if (action.error) {
        return state;
      }
      return {authoriztionCheck:false,ErrorMessage:action.payload.response.data};
    case CREATE_USER:
      if (action.error) {
        return state;
      }
      return {authoriztionCheck:false,ErrorMessage:action.payload.response.data};
    case ERROR_CREATE_USER:
      if (action.error) {
        return state;
      }
      return {authoriztionCheck:false,ErrorMessage:action.payload.response.data};

    default:
      return state;
    }
}
