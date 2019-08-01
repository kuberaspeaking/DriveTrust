// Instantiate a map and platform object:
var platform = new H.service.Platform({
    "apikey": "AISeycu4yK9s05EFqCdX_xPNinUV5MGnCAUdbu3NWJ4",
    "useHTTPS": true
  });

  var defaultLayers = platform.createDefaultLayers();

  //Step 2: initialize a map - this map is centered over Europe
  var map = new H.Map(document.getElementById('mapContainer2'),
    defaultLayers.vector.normal.map,{
    center: {lat:52, lng:5},
    zoom: 5,
    pixelRatio: window.devicePixelRatio || 1
  });
  // add a resize listener to make sure that the map occupies the whole container
  window.addEventListener('resize', () => map.getViewPort().resize());

  //Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

var xmlhttp = new XMLHttpRequest();
var points = [];


xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   
    var myObj = JSON.parse(this.responseText);
    var i;
    for (i=0; i < myObj.TracePoints.length; i++){
      points[i] = {"lat": myObj.TracePoints[i].latMatched, "lng": myObj.TracePoints[i].lonMatched};
      
    }
    addPolylineToMap(map, points);
  }
    
  };

  xmlhttp.open("GET", "https://kuberaspeaking.github.io/DriveTrust/route_match_response_full.json", true);
  xmlhttp.send();


  function addPolylineToMap(map,points) {
    // console.log(points);
    var lineString = new H.geo.LineString();
  
    points.forEach(function(point) {
        lineString.pushPoint(point);
      });
  
      polyline = map.addObject(new H.map.Polyline(
      lineString, { style: { lineWidth: 4 }}
    ));
  
    map.getViewModel().setLookAtData({bounds: polyline.getBoundingBox()});
  
  }

  


