import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addWord,countWord } from '../actions/index';
import Field from '../components/field';
import Alert from 'react-s-alert';
import { history } from '../index';

class InputWordList extends Component{
  constructor(props) {
    super(props)

// set initial state for data enter
    this.state = {
      url: '',
      currentWord:   '',
      words:[]
    };

// create new instance with connection to this
    this.addWord         = props.addWord;
    this.countWord       = props.countWord;
    this.onWordChange    = this.onWordChange.bind(this);
    this.onUrlChange     = this.onUrlChange.bind(this);
    this.addNewWord      = this.addNewWord.bind(this);
    this.getWordFromUrl  = this.getWordFromUrl.bind(this);

  }
  onWordChange(event){
    this.setState({currentWord:event.target.value});
  }
  onUrlChange(event){
    this.setState({url:event.target.value});
  }
  addNewWord(event){
    event.preventDefault();

    if(this.state.currentWord){
      this.addWord(this.state.currentWord);
      this.setState({currentWord:''});
    }
    else{
      Alert.warning('Please enter word', {
          position: 'top'
      });
    }
  }
  getWordFromUrl(event){
    if (this.props.words.length === 0) {
      Alert.error('There isnt words for searching', {
          position: 'top'
      });
    }
    else{
      Alert.closeAll();
      var url = this.state.url;
      var words = this.props.words;
      console.log(url,words);
      this.setState({
        url: '',
        currentWord:   '',
        words:[]
      })
      this.countWord(url,words,this.props.sessionLogin.username);
    }
  }
  renderWords(word,index){
    return(
      <li key={index} className="list-group-item ">
        {word['word']}
      </li>
    )
  }
  render(){
    return(
      <div className="col-sm-6 div-input">
        <div>
          <Field
            label="Target Url"
            placeholder="Enter url for counting words"
            value={this.state.url}
            type="text"
            onChange={this.onUrlChange}
          />
        </div>
        <div>
          <label>Words to count</label>
          <ul className="list-group">
            {this.props.words.map(this.renderWords.bind(this))}
          </ul>
        </div>
        <div>
          <form className="input-group" onSubmit={this.addNewWord}>
            <Field
              placeholder="Enter word for counting"
              value={this.state.currentWord}
              type="text"
              onChange={this.onWordChange}
            />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-secondary">Add</button>
            </span>
          </form>
        </div>
        <div>
          <span className="input-group-btn">
            <button type="submit" className="btn btn-primary input-button" onClick={this.getWordFromUrl}>Count</button>
          </span>
        </div>
      </div>
    )
  }
}
// bind to redux action creator
function mapDispatchToProps(dispatch){
  return bindActionCreators({ addWord,countWord },dispatch);
}

function mapStateToProps(state){
  return {
    words:state.words,
    sessionLogin:state.sessionLogin
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(InputWordList);
