import urlConstants from './url-constants';
import axios from 'axios';
import get from 'lodash.get';
import queryString from './query-string';


export function getLatLongFromGoogleGeocoder(address) {
  const baseGoogleUrl = urlConstants.GOOGLE_ADDRESS_SEARCH_URL;
    const queryParameters = {
      key: urlConstants.GOOGLE_API_KEY,
      address: address
    };
    const stringifiedParams = queryString.stringify(queryParameters);
    const googleMapsGeocodeUrl = `${baseGoogleUrl}?${stringifiedParams}`

    return axios.get(googleMapsGeocodeUrl)
      .then(geocodeResults => {
        const latLongObj = get(geocodeResults.data,'results[0].geometry.location', {});
        return {
          lat: latLongObj.lat,
          long: latLongObj.lng
        };
      })
      .catch(ex => {
        console.log('Geoceder URL from google seems to be down.', ex);
        return null;
    });
}

export function getWellKnowPlaceId(latLong) {
  const baseMetaWeatherUrl = urlConstants.BASE_URL + urlConstants.WELL_KNOW_REQUEST_URL;
  const queryParams = {
    lattlong: `${latLong.lat},${latLong.long}`
  };
  const stringifiedParams = queryString.stringify(queryParams);
  const wellKnownUrl = `${baseMetaWeatherUrl}?${stringifiedParams}`

  return axios.get(wellKnownUrl)
    .then(results => {
      const wellKnowId = get(results,'data[0].woeid', -1);
      return wellKnowId;
    })
    .catch(ex => {
      console.log('Error fetching where on earth id', ex);
      return null;
  });
}

export function getWeatherInfo(whereOnEarthId) {
  const locationUrl = `${urlConstants.BASE_URL}${urlConstants.LOCATION_SEARCH_URL}${whereOnEarthId}`

  return axios.get(locationUrl)
    .then(results => {
      return results.data;
    })
    .catch(ex => {
      console.log('Error fetching weather data', ex);
      return null;
  });
}
