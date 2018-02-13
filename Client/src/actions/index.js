import axios from 'axios';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import { history } from '../index';
import Alert from 'react-s-alert';

const ROOT_URL = `http://127.0.0.1:5002`;
export const ADD_WORD = 'ADD_WORD';
export const COUNT_WORDS = 'COUNT_WORDS';
export const ERROR_COUNTING = 'ERROR_COUNTING';
export const START_OVER = 'START_OVER';
export const FOUND_USER = 'FOUND_USER';
export const ERROR_FINDING_USER = 'ERROR_FINDING_USER';
export const CREATE_USER = 'CREATE_USER';
export const ERROR_CREATE_USER = 'ERROR_CREATE_USER';

// login request from server
export function onLogin(username,password){
    const url = `${ROOT_URL}/login?username=${username}`;
    console.log(url);
    return axios({
          url:url,
          method:'post',
          data:password,
          onUploadProgress:loadProgressBar()
    })
      .then( response => {
        history.push('/InputUrlWords');
        console.log(response.data);
        Alert.success(response.data, { position: 'top' });
        return { type: FOUND_USER, payload:response,username:username }
      }
    )
    .catch(function (error) {
      history.push('/');
      if (error.response.data) {
        Alert.error(error.response.data, { position: 'top' });
      }else{
        Alert.error(error, { position: 'top' });
      }
      return { type: ERROR_FINDING_USER, payload:error }
    })
}
// register request from server
export function onRegister(username,password){
    const url = `${ROOT_URL}/register?username=${username}`;

    return axios({
          url:url,
          method:'post',
          data:password,
          onUploadProgress:loadProgressBar()
    })
      .then( response => {
        history.push('/');
        Alert.success(response.data, { position: 'top' });
        return{ type: CREATE_USER,payload:response }
      }
    )
    .catch(function (error) {
      history.push('/Register');
      if (error.response.data) {
        Alert.error(error.response.data, { position: 'top' });
      }else{
        Alert.error(error, { position: 'top' });
      }

      return {type:ERROR_CREATE_USER,payload:error}
    })

}
// count word from url
export function countWord(searchUrl,words,username){

  const url = `${ROOT_URL}/countWords?url=${searchUrl}&username=${username}`;
  console.log(url);
  return axios({
        url:url,
        method:'post',
        data:words,
        onUploadProgress:loadProgressBar()
  })
    .then( response => {
      history.push('/countList');
      return { type: COUNT_WORDS, payload:response }
    }
  )
  .catch(function (error) {
    history.push('/InputUrlWords');
    if (error.response.data) {
      Alert.error(error.response.data, { position: 'top' });
    }else{
      Alert.error(error, { position: 'top' });
    }
    return {type:ERROR_COUNTING,payload:error};
  })

}
// add word to reducer
export function addWord(word){
  return{
    type:ADD_WORD,
    payload:{'word':word,'count':0}
  };
}
// clean up state for reducer
export function startOver(){
  return{
    type:START_OVER
  };
}
