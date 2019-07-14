import React, { Component } from 'react';
import { connect } from 'react-redux';

class Error extends Component {
  render() {
    return (
      <div className='container my-5'>
        <span className='alert alert-danger'>
          {this.props.error}
        </span>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: state.error.message
});

export default connect(mapStateToProps)(Error);
