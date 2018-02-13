import { combineReducers } from 'redux';
import WordListReducer from './word_list_reducer';
import WordCountReducer from './word_count_reducer';
import LoginReducer from './login_reducer';

const rootReducer = combineReducers({
  words:WordListReducer,
  wordsCount:WordCountReducer,
  sessionLogin:LoginReducer
});

export default rootReducer;
