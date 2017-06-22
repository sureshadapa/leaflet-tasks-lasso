L.LassoSelect = L.Class.extend({
  includes: L.Mixin.Events,

  options: {
    activeTooltip: 'Click and release to place your first point.',
    startedTooltip: 'Click on the map to draw an edge.',
    readyTooltip: 'Continue placing points or click on the first point to finish shape.',
    finishedTooltip: '',
    polyline: {color: '#C70039'},
	//polyline: {color: '#AFF72F'},
    initialPath: null,
  },

  initialize: function(options) {
    L.Util.setOptions(this, options);
  },

  addTo: function(map) {
    this.map = map;
    this.map.on('mousedown', this.onMapClick, this);
    this.disable();
    this.fire('create');
    if (this.options.initialPath) {
      for (var i = 0; i < this.options.initialPath.length; i++) {
        this.addPointToPath(this.options.initialPath[i]);
      }
    }
	console.log("in addTo");
    return this;
  },

  remove: function() {
    this.map.off('mousedown', this.onMapClick, this);
    this.map = null;
	console.log("in remove");
    this.fire('remove');
  },

  enable: function() {
    this.isActive = true;
	console.log("in enable");
    this.reset();
  },

  reset: function() {
    // remove the polygon from the map and clear its reference
    if (this.polygon) {
      this.map.removeLayer(this.polygon);
    }
    this.polygon = null;

    // remove the polyline from the map and clear its reference
    if (this.polyline) {
      this.map.removeLayer(this.polyline);
    }
    this.polyline = null;

    // remove point markers
    if (this.markers) {
      for (var i = 0; i < this.markers.length; i++) {
        this.map.removeLayer(this.markers[i]);
      }
    }
    this.markers = [];

    // reset state
    this.isStarted = false;
    this.isFinished = false;

    // reset default tooltip
	console.log("in reset");
    this.setMapTooltip();
  },

  disable: function() {
    this.isActive = false;
	console.log("in disable");
    this.reset();
  },

  getPath: function() {
    if (this.isStarted) {
      return this.polyline.getLatLngs();
    }
	console.log("in getPath");
    return null;
  },

  getBounds: function() {
    if (this.isFinished) {
      return this.polyline.getBounds();
    }
	console.log("in getBounds");
    return null;
  },

  contains: function(point) {
    var path = this.getPath();

    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    var x = point.lat, y = point.lng;
    var inside = false;
    for (var i = 0, j = path.length - 1; i < path.length; j = i++) {
        var xi = path[i].lat, yi = path[i].lng;
        var xj = path[j].lat, yj = path[j].lng;
        var intersect = ((yi > y) != (yj > y)) &&
                        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) {
          inside = !inside;
        }
    }
	console.log("in contains");
    return inside;
  },

  setMapTooltip: function() {
    var tooltip = '';
    var cursor = '';
    if (this.isActive) {
      if (this.isFinished) {
        tooltip = this.options.finishedTooltip;
      } else if (! this.isStarted) {
        cursor = 'crosshair';
        tooltip = this.options.activeTooltip;
      } else if (this.getPath().length < 3) {
        cursor = 'crosshair';
        tooltip = this.options.startedTooltip;
      } else {
        cursor = 'crosshair';
        tooltip = this.options.readyTooltip;
      }
    }
    this.map._container.style.cursor = cursor;
    this.map._container.title = tooltip;
	console.log("in setMapTooltip");
  },

  onMapClick: function(event) {
    if (this.isActive) {
      if (this.isFinished) {
        this.fire('click', event);
      } else {
        this.addPointToPath(event.latlng);
        this.setMapTooltip();
      }
    }
	console.log("in onMapClick");
  },

  addPointToPath: function(latlng) {
    if (!this.isStarted) {
		
      this.polyline = L.polyline([], this.options.polyline).addTo(this.map);
      this.markers = [];
      this.isStarted= true;
    }

	var d = this.polyline.getBounds();
	//alert(d);
    this.polyline.addLatLng(latlng);
	
    const marker = L.marker(latlng,{
      draggable: true,
      icon: L.divIcon({ html: '<p>&times;</p>',className:'suresh-div-icon'}),
    }).addTo(this.map);

    if (this.markers.length === 0) {
      marker.on('click', this.completePath.bind(this));
    }

    marker.on('dragend', this.fire.bind(this, 'pathchange'));

    marker.on('drag', this.updatePath.bind(this));

    this.markers.push(marker);
	console.log("in addPointToPath");
  },

  updatePath: function() {
    // create a new path by joining the positions of markers
    var path = [];
    for (var i = 0; i < this.markers.length; i++) {
      path.push(this.markers[i].getLatLng());
    }

    // complete the path by adding the first position
    path.push(this.markers[0].getLatLng());

    // update polyline path
    this.polyline.setLatLngs(path);
	console.log("in updatePath");
  },

  completePath: function() {
    // do nothing if the path has been completed
    if (this.isFinished) return;

    // can only complete the path after 3 points have been selected
    if (this.markers.length < 3) return;

    // complete the path by adding the fisrt point, then mark it as finished
    this.polyline.addLatLng(this.markers[0].getLatLng());
    this.isFinished = true;

    // update map tooltip
    this.setMapTooltip();

    // trigger path change event
    this.fire('pathchange');
	console.log("in completePath");
	var dd = this.polyline.getBounds();
	Cnt2Pass=0;
	Amt2Pass=0;
	//map.fitBounds(this.polyline.getBounds());
	for (i = 0; i < circledata.length; i++) {
						if(dd.contains(circledata[i][1])) {
							Amt2Pass += parseFloat(circledata[i][0][1]);
							Cnt2Pass += 1;
						}
						}
				//alert("Map is reset"+d.contains([27.6648274, -81.5057535]));
			//}
	alert("loop completed.Check Legend values.");
	setLegand(Cnt2Pass,Amt2Pass);
  },

});

L.lassoSelect = function(options) {
  return new L.LassoSelect(options);
}
