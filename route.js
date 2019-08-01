// Instantiate a map and platform object:
var platform = new H.service.Platform({
    "apikey": "AISeycu4yK9s05EFqCdX_xPNinUV5MGnCAUdbu3NWJ4",
    "useHTTPS": true
  });

  var defaultLayers = platform.createDefaultLayers();

  //Step 2: initialize a map - this map is centered over Europe
  var map1 = new H.Map(document.getElementById('mapContainer1'),
    defaultLayers.vector.normal.map,{
    center: {lat:52, lng:5},
    zoom: 5,
    pixelRatio: window.devicePixelRatio || 1
  });
  // add a resize listener to make sure that the map occupies the whole container
  window.addEventListener('resize', () => map1.getViewPort().resize());

  //Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map1));

// Create the default UI components
var ui = H.ui.UI.createDefault(map1, defaultLayers);

var xmlhttp = new XMLHttpRequest();
var points = [];


xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   
    var myObj = JSON.parse(this.responseText);
    var i;
    for (i=0; i < myObj.observations.length; i++){
      points[i] = {"lat": myObj.observations[i].location.lat, "lng": myObj.observations[i].location.lon};
      
    }
    addPolylineToMap(map1, points);
  }
    
  };

  xmlhttp.open("GET", "https://kuberaspeaking.github.io/DriveTrust/output_full.json", true);
  xmlhttp.send();


  function addPolylineToMap(map1,points) {
    // console.log(points);
    var lineString = new H.geo.LineString();
  
    points.forEach(function(point) {
        lineString.pushPoint(point);
      });
  
      polyline = map1.addObject(new H.map.Polyline(
      lineString, { style: { lineWidth: 4 }}
    ));
  
    map1.getViewModel().setLookAtData({bounds: polyline.getBoundingBox()});
  
  }

  


