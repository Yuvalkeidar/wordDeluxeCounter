import { COUNT_WORDS } from '../actions/index';
import { ERROR_COUNTING } from '../actions/index';

export default function(state=[],action){
  switch (action.type) {
    case COUNT_WORDS:
      if (action.error) {
        return state;
      }
      return action.payload.data.words;
    case ERROR_COUNTING:
      if (action.error) {
        return state;
      }
      return action.payload.response.data;
    default:
      return state;
    }
}
