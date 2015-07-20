// OpenLayers 3.7 API

var map = new ol.Map({
  layers: [
    new ol.layer.Tile({ source: new ol.source.OSM() })
    ],
  view: new ol.View({
    center: [0,0],
    zoom: 2
  }),
  target: 'map'
});

// a DragBox interaction used to select features by drawing boxes
var dragBox = new ol.interaction.DragBox({
  condition: ol.events.condition.shiftKeyOnly,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: [0, 0, 255, 1]
    })
  })
});

map.addInteraction(dragBox);

dragBox.on('boxstart', function(boxcoord) {
  fill_boxes(boxcoord.coordinate,0);
});
dragBox.on('boxend', function(boxcoord) {
  fill_boxes(boxcoord.coordinate,1);
});


var coords = [[],[]];

// sort coordinates and fill boxes
function fill_boxes(coord,num) {
  coords[num] = ol.proj.transform(coord,"EPSG:900913","EPSG:4326");
  
  var dirs = [["#left","#right"],["#bottom","#top"]];

  for (i = 0; i < 2; i++) {
    if (coords[0][i] < coords[1][i]) {
      $(dirs[i][0]).val(coords[0][i]);
      $(dirs[i][1]).val(coords[1][i]);
    } else {
      $(dirs[i][0]).val(coords[1][i]);
      $(dirs[i][1]).val(coords[0][i]);
    }
  }
};
