import React, { Component } from 'react';
import '../css/progress.css';

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='progressBar'>
        <div
          className='progress'
          style={{ width: this.props.progress + '%' }}
        />
      </div>
    );
  }
}

export default Progress;