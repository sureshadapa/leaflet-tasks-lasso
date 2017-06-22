# leaflet-task-1
	This Task-1, will dynamically display legend with “Prospect Leads” and “Forecast Amount” at zoom greater than 8.
# leaflet-task-2
	lasso functionality – For client within SFDC application, when one goes deep into “Region-> Market Area->Business Unit-> Site-> Acquisition Territory” 
	and then zooms-in at particular place, he wants to perform a lasso functionality,i.e draw some random shape and once the shape is complete/closed,
	dislay the Opportunity data Information within that shape.

	Steps1.
        Unzip the source code to any folder “Maps” / desktop
        Open the index.html
        ZoomIn /Zoomout and check the values for “Prospect Leads” and “ForecastAmount”

	If you are using leaflet0.7/0.5 version try to put the logic in map.on('viewreset', function(e) { });
	If you are using leaflet1.0/1.X try to put logic in map.on('zoom', function(e) { });
	
Reference

Understand requirements and searching for solutions at different forums and Other Issues  
    https://github.com/Leaflet/Leaflet/issues/426                               
        leaflet0.5/0.7 viewreset - Event Vs leaflet1.0 zoom Event                             
    https://github.com/Leaflet/Leaflet/issues/76
    http://jsfiddle.net/vgtc7c5o/

Looking at Legend plugins and testing (Which did not work for me,May be my mistake)
    https://github.com/restani/leaflet-legend
    https://github.com/mikeskaug/Leaflet.Legend/blob/master/README.md

Writing sample JavaScript vanilla code and testing Datapoints/Markers with Zoom-in/Zoom-out
Testing for correct values on Legend

Other Activities:
    Looking at other alternatives and playing around
	https://www.scribblemaps.com/create/?demoMode#lat=37.31775185163749&lng=-97.8662109375&z=6&t=mb_contrast
	https://www.scribblemaps.com/api/playground
	file:///E:/Adapa_Suresh/E-drive/Apps/Maps/scribbleMap.html

	Reading leaflet API reference for “bounds” , “zoom”, ”circle” and ”circlemarker”
        http://leafletjs.com/reference-1.0.3.html

