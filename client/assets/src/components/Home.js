import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AutoComplete } from 'pkui-designs';
import Map from './Map';
import UploadControl from './UploadControl';
import { getLocations, searchLocation } from '../services';
import { resetLocations } from '../actions';
import config from '../config';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    dataSource: [],
    options: [],
    searchValue: '',
    openDropdown: false,
    selected: {}
  };

  componentDidMount() {
    this.getLocationData();
  }

  getLocationData = () => {
    const { dispatch } = this.props;
    getLocations()
      .then(({ data }) => {
        dispatch(resetLocations(data.locations));
        this.setState({
          dataSource: [...data.locations],
          options: [...data.locations]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  searchLocations = () => {
    if (!this.state.selected.name) return;
    const { dispatch } = this.props;
    searchLocation(this.state.selected)
      .then(({ data }) => {
        dispatch(resetLocations(data.locations));
      })
      .catch(err => {
        console.log('err', err);
      })
  }

  getCenter = location => ({
    lat: location.geo.coordinates[1],
    lng: location.geo.coordinates[0]
  });

  clearSearch = () => {
    const { dispatch } = this.props;
    this.setState({
      openDropdown: false,
      searchValue: '',
      selected: {}
    }, () => {
      dispatch(resetLocations([...this.state.dataSource]));
    });
  }

  render() {
    const { locations } = this.props;
    const { options, searchValue, openDropdown, selected } = this.state;
    return (
      <div>
        <div className='my-2 row'>
          <div className='col-lg-4 col-md-6'>
            <AutoComplete
              dataSource={options}
              multiple={false}
              id={'single'}
              showClear={true}
              onSelect={(value, selected) => {
                this.setState({
                  openDropdown: false,
                  searchValue: value,
                  options: [...this.state.dataSource],
                  selected
                }, () => {
                  this.searchLocations();
                });
              }}
              onInputChange={(e, value) => {
                const { dataSource } = this.state;
                const options = dataSource.filter(ds => ds.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                this.setState({
                  options,
                  searchValue: value,
                  openDropdown: true
                });
              }}
              placeholder={'Search cities...'}
              defaultFirstOptionSelected={true}
              openDropDownOnFocus={false}
              isAsync={false}
              loading={false}
              value={searchValue}
              open={openDropdown}
              selectOnBlur={false}
              animate={true}
              itemRenderer={item => `${item.name}`}
            />
          </div>
          <div className='col-lg-1 col-md-2'>
            {(!selected || !selected.name) && <button type='button' className='btn btn-block btn-sm btn-outline-primary' onClick={this.searchLocations}>Search</button>}
            {selected && selected.name && <button type='button' className='btn btn-block btn-sm btn-outline-primary' onClick={this.clearSearch}>Clear</button>}
          </div>
          <div className='col-lg-2 col-md-3'>
            <button type='button' className='btn btn-block btn-sm btn-outline-primary' data-toggle='modal' data-target='#uploadForm'>Upload CSV</button>
          </div>
        </div>
        {locations.length !== 0 && <Map
          center={this.getCenter(locations[0])}
          zoom={12}
          places={locations}
          googleMapURL={'https://maps.googleapis.com/maps/api/js?key=' + config.google.mapsAPIKey}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '450px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />}
        <div className='modal fade' id='uploadForm' tabIndex='-1' role='dialog' aria-labelledby='uploadFormLabel' aria-hidden='true'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='uploadFormLabel'>Upload via CSV</h5>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <UploadControl afterUpload={this.getLocationData} />
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-outline-secondary' data-dismiss='modal'>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: state.app.isAuthenticated,
  locations: state.locations.data
});

export default connect(mapStateToProps)(Home);
