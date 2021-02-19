window.currentLocationSelected;

window.googleMap;

window.heatmaps = {
  'waterOff': {
    map: undefined,
    config: {
      maxIntensity: 4,
      dissipating: true,
      radius: 25,
      opacity: .55,
      // Magenta
      gradient: [
        'rgba(255, 255, 255, 0)',
        'rgba(226, 151, 191, 1)',
        'rgba(149, 45, 100, 1)'
      ]
    }
  },
  'waterOn': {
    map: undefined,
    config: {
      maxIntensity: 4,
      dissipating: true,
      radius: 25,
      opacity: .55,
      // Blue
      gradient: [
        'rgba(255, 255, 255, 0)',
        'rgba(141, 172, 221, 1)',
        'rgba(9, 80, 195, 1)'
      ]
    }
  },
  'electricityOff': {
    map: undefined,
    config: {
      maxIntensity: 4,
      dissipating: true,
      radius: 25,
      opacity: .55,
      // Red
      gradient: [
        'rgba(255, 255, 255, 0)',
        'rgba(212, 85, 85, 1)',
        'rgba(212, 33, 33, 1)',
        'rgba(157, 7, 7, 1)',
        'rgba(155, 0, 0, 1)'
      ]
    }
  },
  'electricityOn': {
    map: undefined,
    config: {
      maxIntensity: 4,
      dissipating: true,
      radius: 25,
      opacity: .55,
      // Green
      gradient: [
        'rgba(255, 255, 255, 0)',
        'rgba(142, 214, 118, 1)',
        'rgba(48, 149, 15, 1)'
      ]
    }
  },
  'naughty': {
    map: undefined,
    config: {
      maxIntensity: 4,
      dissipating: true,
      radius: 25,
      opacity: .55,
      // Orange
      gradient: [
        'rgba(255, 255, 255, 0)',
        'rgba(235, 151, 92, 1)',
        'rgba(223, 100, 12, 1)'
      ]
    }
  }
};

window.mapLocations = {
  'all': {
    lats: [],
    lngs: [],
    latlngs: []
  },
  'waterOff': {
    lats: [],
    lngs: [],
    latlngs: []
  },
  'waterOn': {
    lats: [],
    lngs: [],
    latlngs: []
  },
  'electricityOff': {
    lats: [],
    lngs: [],
    latlngs: []
  },
  'electricityOn': {
    lats: [],
    lngs: [],
    latlngs: []
  },
  'naughty': {
    lats: [],
    lngs: [],
    latlngs: []
  }
};

function openModal(privacy) {
  document.getElementById('modal').style.width = window.innerWidth+'px';
  document.getElementById('modal').style.height = window.innerHeight+'px';

  if (privacy) {
    console.log('showing privacy policy');
    document.getElementById('privacy-container').style.display = 'inherit';
    document.getElementById('form-container').style.display = 'none';
  }
  else {
    document.getElementById('modal-location-address').innerText = window.currentLocationSelected['formatted_address'];
    document.getElementById('modal-location-name').innerText = window.currentLocationSelected.name;
  }

  document.getElementById('modal').style.display = 'inherit';

}


function validateForm() {
  console.log('validating form', arguments, this);
  let allowIt = true;

  let formNaughty = document.getElementById('form-naughty');
  let formElectricity = document.getElementById('form-electricity');
  let formWater = document.getElementById('form-water');

  if (formWater.value === 'idk' || formElectricity.value === 'idk') {
    allowIt = false;
  }

  if (formNaughty.value !== 'no') {
    formElectricity.value = 'yes';
    formWater.value = 'yes';
    allowIt = true;
  }

  if (allowIt) {
    document.getElementById('submit-button').style.display = 'inherit';
  }
  else {
    document.getElementById('submit-button').style.display = 'none';
  }
}

function submitRecord() {
  var record = {
    address: window.currentLocationSelected['formatted_address'],
    lat: window.currentLocationSelected.geometry.location.lat,
    lng: window.currentLocationSelected.geometry.location.lng,
    naughty: document.getElementById('form-naughty').value === 'yes' ? true : false,
    electricity: document.getElementById('form-electricity').value === 'yes' ? true : false,
    water: document.getElementById('form-water').value === 'yes' ? true : false,
    meta: window.currentLocationSelected,
    name: window.currentLocationSelected['name']
  };
  console.log('submitting info:', record);

  axios
  .post('/location', record)
  .then(function (response) {
    console.log('got response',response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    let formContainer = document.getElementById('form-container');
    formContainer.parentNode.removeChild(formContainer);
    document.getElementById('thanks-container').innerText = 'Thanks for your submission!';
    setTimeout(()=> {
      window.location.href='/';
    }, 3000);

  });
}

function closeModal() {
  document.getElementById('modal').style.width = '0px';
  document.getElementById('modal').style.height = '0px';
  document.getElementById('modal').style.display = 'none';
  document.getElementById('privacy-container').style.display = 'none';
  document.getElementById('form-container').style.display = 'inherit';

}

function getCenter() {
  return {
    lat: math.round(math.median(_.compact(window.mapLocations.all.lats)), 7),
    lng: math.round(math.median(_.compact(window.mapLocations.all.lngs)), 7)
  };
};

async function initMap() {

  let serverSays;
  try {
    serverSays = await axios.get('/location');
  }
  catch(nope) {
    console.log('uh oh:', nope.message);
  }

  for (let oneLocation of serverSays.data) {

    let oneLatlng = new google.maps.LatLng(oneLocation.lat, oneLocation.lng);

    window.mapLocations.all.lats.push(Number(oneLocation.lat));
    window.mapLocations.all.lngs.push(Number(oneLocation.lng));
    window.mapLocations.all.latlngs.push(oneLatlng);

    if (oneLocation.electricity) {
      window.mapLocations.electricityOn.lats.push(Number(oneLocation.lat));
      window.mapLocations.electricityOn.lngs.push(Number(oneLocation.lng));
      window.mapLocations.electricityOn.latlngs.push(oneLatlng);
    }
    else {
      window.mapLocations.electricityOff.lats.push(Number(oneLocation.lat));
      window.mapLocations.electricityOff.lngs.push(Number(oneLocation.lng));
      window.mapLocations.electricityOff.latlngs.push(oneLatlng);
    }
    if (oneLocation.water) {
      window.mapLocations.waterOn.lats.push(Number(oneLocation.lat));
      window.mapLocations.waterOn.lngs.push(Number(oneLocation.lng));
      window.mapLocations.waterOn.latlngs.push(oneLatlng);
    }
    else {
      window.mapLocations.waterOff.lats.push(Number(oneLocation.lat));
      window.mapLocations.waterOff.lngs.push(Number(oneLocation.lng));
      window.mapLocations.waterOff.latlngs.push(oneLatlng);
    }

    if (oneLocation.naughty) {
      window.mapLocations.naughty.lats.push(Number(oneLocation.lat));
      window.mapLocations.naughty.lngs.push(Number(oneLocation.lng));
      window.mapLocations.naughty.latlngs.push(oneLatlng);
    }
  }

  loadHeatMaps();          
}

function loadHeatMaps() {

  console.log('loading all maps', window.mapLocations.all);

  window.googleMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: getCenter(window.mapLocations.all.lats, window.mapLocations.all.lngs),
    mapTypeId: 'roadmap'
  });

  window.heatmaps.waterOff.map = new google
    .maps
    .visualization
    .HeatmapLayer({
      data: window.mapLocations.waterOff.latlngs,
      map: window.googleMap,
      radius: window.heatmaps.waterOff.config.radius,
      opacity: window.heatmaps.waterOff.config.opacity,
      gradient: window.heatmaps.waterOff.config.gradient,
      //maxIntensity: window.heatmaps.waterOff.config.maxIntensity,
      dissipating: window.heatmaps.waterOff.config.dissipating
  });

  window.heatmaps.waterOn.map = new google
    .maps
    .visualization
    .HeatmapLayer({
      data: window.mapLocations.waterOn.latlngs,
      map: window.googleMap,
      radius: window.heatmaps.waterOn.config.radius,
      opacity: window.heatmaps.waterOn.config.opacity,
      gradient: window.heatmaps.waterOn.config.gradient,
      //maxIntensity: window.heatmaps.waterOn.config.maxIntensity,
      dissipating: window.heatmaps.waterOn.config.dissipating
  });

  window.heatmaps.electricityOff.map = new google
    .maps
    .visualization
    .HeatmapLayer({
      data: window.mapLocations.electricityOff.latlngs,
      map: window.googleMap,
      radius: window.heatmaps.electricityOff.config.radius,
      opacity: window.heatmaps.electricityOff.config.opacity,
      gradient: window.heatmaps.electricityOff.config.gradient,
      //maxIntensity: window.heatmaps.electricityOff.config.maxIntensity,
      dissipating: window.heatmaps.electricityOff.config.dissipating
  });

  window.heatmaps.electricityOn.map = new google
    .maps
    .visualization
    .HeatmapLayer({
      data: window.mapLocations.electricityOn.latlngs,
      map: window.googleMap,
      radius: window.heatmaps.electricityOn.config.radius,
      opacity: window.heatmaps.electricityOn.config.opacity,
      gradient: window.heatmaps.electricityOn.config.gradient,
      //maxIntensity: window.heatmaps.electricityOn.config.maxIntensity,
      dissipating: window.heatmaps.electricityOn.config.dissipating
  });

  window.heatmaps.naughty.map = new google
    .maps
    .visualization
    .HeatmapLayer({
      data: window.mapLocations.naughty.latlngs,
      map: window.googleMap,
      radius: window.heatmaps.naughty.config.radius,
      opacity: window.heatmaps.naughty.config.opacity,
      gradient: window.heatmaps.naughty.config.gradient,
      //maxIntensity: window.heatmaps.naughty.config.maxIntensity,
      dissipating: window.heatmaps.naughty.config.dissipating
  });

  // toggleHeatmap('waterOff')
  // toggleHeatmap('waterOn')
  // toggleHeatmap('electricityOff')
  // toggleHeatmap('electricityOn')

  // Place autocomplete stuff

  const card = document.getElementById('pac-card');
  const input = document.getElementById('pac-input');
  const options = {
    componentRestrictions: { country: 'us' },
    fields: ['formatted_address', 'geometry', 'name'],
    origin: window.googleMap.getCenter(),
    strictBounds: false
    // types: ['all'],
  };
  window.googleMap.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
  const autocomplete = new google.maps.places.Autocomplete(input, options);

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  // autocomplete.bindTo('bounds', map);
  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  const marker = new google.maps.Marker({
    map: window.googleMap,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', () => {
    infowindow.close();
    marker.setVisible(false);
    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert('No details available for input:'+place.name);
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      window.googleMap.fitBounds(place.geometry.viewport);
    } else {
      window.googleMap.setCenter(place.geometry.location);
      window.googleMap.setZoom(13);
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-address'].textContent = place.formatted_address;

    infowindow.open(window.googleMap, marker);
    // window.setTimeout()
    window.currentLocationSelected = JSON.parse(JSON.stringify(place)); 
    openModal();
  });
}

function toggleHeatmap(someMapName) {

  console.log('toggling', someMapName);
  let buttonClicked = document.getElementById('button-'+someMapName);
  if (buttonClicked.classList.contains('showing')) {
    console.log('Now hiding', someMapName);
    buttonClicked.classList.remove('showing');
    buttonClicked.classList.add('hiding');
    buttonClicked.innerText = buttonClicked.innerText.replace(/Hide/ig,'Show');
  }
  else {
    console.log('Now showing', someMapName);
    buttonClicked.classList.remove('hiding');
    buttonClicked.classList.add('showing');
    buttonClicked.innerText = buttonClicked.innerText.replace(/Show/ig,'Hide');
  }

  window.heatmaps[someMapName].map.setMap(window.heatmaps[someMapName].map.getMap() ? null : window.googleMap);
}
