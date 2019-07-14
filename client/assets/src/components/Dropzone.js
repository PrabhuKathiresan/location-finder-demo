import React, { Component } from 'react';
import '../css/dropzone.css';

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
  }

  state = {
    hightlight: false
  }

  openFileDialog = () => {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }

  onFilesAdded = evt => {
    if (this.props.disabled) return;
    const files = evt.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
  }

  onDragOver = event => {
    event.preventDefault();
    if (this.props.disabed) return;
    this.setState({ hightlight: true });
  }

  onDragLeave = () => {
    this.setState({ hightlight: false });
  }

  onDrop = event => {
    event.preventDefault();
    if (this.props.disabed) return;
    const files = event.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
    this.setState({ hightlight: false });
  }

  fileListToArray = list => {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  render() {
    return (
      <div
        className={`dropzone ${this.state.hightlight ? 'highlight' : ''}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? 'default' : 'pointer' }}
      >
        <input
          ref={this.fileInputRef}
          className='fileInput'
          type='file'
          onChange={this.onFilesAdded}
          accept='.csv'
        />
        <img
          alt='upload'
          className='icon'
          src='baseline-cloud_upload-24px.svg'
        />
        <span style={{ fontSize: 10 }}>Upload Files</span>
      </div>
    );
  }
}

export default Dropzone;