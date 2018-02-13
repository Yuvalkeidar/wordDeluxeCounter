import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startOver } from '../actions/index';
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';
import { history } from '../index';

// list of word and number of apperances in url
class countList extends Component{
  constructor(props) {
    super(props)
    this.startOver = props.startOver;
  }
  renderWords(word,index){
    return(
      <li key={index} className="list-group-item row">
        <div className="col-sm-6 count-field"> {word['word']} </div>
        <div className="col-sm-6 count-field"> {word['count']} </div>
      </li>
    )
  }
  render(){
    return(
      <div className="col-sm-6 div-count">
        <h2>Done! This is what I counted</h2>
        <div>
          <ul className="list-group">
            {this.props.wordsCount.map(this.renderWords.bind(this))}
          </ul>
        </div>
        <div>
          <span className="input-group-btn">
            <Link to="/InputUrlWords" className="btn btn-secondary" onClick={this.startOver}>Start Over</Link>
          </span>
        </div>
      </div>
    )
  }
}
// bind to redux action creator
function mapDispatchToProps(dispatch){
  return bindActionCreators({ startOver },dispatch);
}

function mapStateToProps(state){
  return {
    wordsCount:state.wordsCount,
    sessionLogin:state.sessionLogin
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(countList);
