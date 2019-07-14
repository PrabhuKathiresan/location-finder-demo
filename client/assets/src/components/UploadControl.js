import React, { Component } from 'react';
import Dropzone from './Dropzone';
import '../css/upload.css';
import Progress from './Progress';

export default class UploadControl extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    files: [],
    uploading: false,
    uploadProgress: {},
    successfullUploaded: false
  };

  onFilesAdded = files => {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }), () => {
      this.uploadFiles();
    });
  };

  uploadFiles = async () => {
    this.setState({ uploadProgress: {}, uploading: true });
    const { files } = this.state;
    const file = files[0];
    this.sendRequest(file)
      .then(() => {
        this.props.afterUpload();
        this.setState({ successfullUploaded: true, uploading: false });
      })
      .catch(err => {
        console.log('err', err);
      })
      .finally(() => {
        this.setState({ successfullUploaded: true, uploading: false });
      });
  };

  sendRequest = file => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener('progress', event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: 'pending',
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener('load', event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: 'done', percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener('error', event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: 'error', percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append('file', file, file.name);

      req.open('POST', 'http://localhost:5000/locations/upload');
      req.withCredentials = true;
      req.send(formData);
    });
  };

  renderProgress = file => {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className='progressWrapper'>
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className='checkIcon'
            alt='done'
            src='baseline-check_circle_outline-24px.svg'
            style={{
              opacity:
                uploadProgress && uploadProgress.state === 'done' ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions = () => {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }

  render() {
    return (
      <div className='upload'>
        <span className='title'>Upload Using CSV</span>
        <div className='content'>
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
          </div>
          {this.state.files.length !== 0 && <div className='files'>
            {this.state.files.map(file => {
              return (
                <div key={file.name} className='file-row'>
                  <span className='filename'>{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
            {
              this.state.successfullUploaded && <span className='text-success'>CSV data uploaded successfully!</span>
            }
          </div>}
        </div>
        {/* <div className='actions'>{this.renderActions()}</div> */}
      </div>
    )
  }
}
