import { ADD_WORD } from '../actions/index';
import { START_OVER } from '../actions/index';

export default function(state=[],action){
  switch (action.type) {
    case ADD_WORD:
      if (action.error) {
        return state;
      }
      return [ ...state , action.payload ];
    case START_OVER:
      if (action.error) {
        return state;
      }
      return [];

    default:
      return state;
    }
}
