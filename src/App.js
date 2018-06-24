import React, { Component } from 'react';

import SearchInput from './components/search-input/search-input';

import {getLatLongFromGoogleGeocoder, getWellKnowPlaceId, getWeatherInfo} from '../src/util/js/api-helpers';

import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.onSearchButtonClicked = this.onSearchButtonClicked.bind(this);
    this.onSearchTextChanged = this.onSearchTextChanged.bind(this);

    this.state = {
      searchInputText: '',
      errorText: ''
    }
  }

  componentDidMount() {

  }

  onSearchButtonClicked() {
    if(this.state.searchInputText) {
      const address = this.state.searchInputText;
      getLatLongFromGoogleGeocoder(address).then(latLong => {
        if(latLong) {
          getWellKnowPlaceId(latLong).then((wellKnownEarthId) => {
            if(wellKnownEarthId) {
              getWeatherInfo(wellKnownEarthId).then(weatherResults => {
                console.log(weatherResults);
              });
            }
          });
        }
      });
    }
  }

  onSearchTextChanged(evt) {
    this.setState({
      searchInputText: evt.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <div className="main-content">
          <h1>
            Weather Today
          </h1>
          <SearchInput searchText={this.state.searchInputText} onSearchButtonClicked = {this.onSearchButtonClicked} onSearchTextChanged = {this.onSearchTextChanged}/>
        </div>
      </div>
    );
  }
}

export default App;
