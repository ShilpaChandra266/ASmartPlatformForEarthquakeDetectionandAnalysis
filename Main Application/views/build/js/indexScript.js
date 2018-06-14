 function todayDate(day){
    	var today = new Date();
    	var dd = today.getDate();

    	var mm = today.getMonth()+1; 
    	var yyyy = today.getFullYear();
    	 
    	switch(day){		
    	case 1:
    			{  dd=dd-7;
    			if(dd<0){
    				dd+=30;
    				mm--;
    				if(mm<=0){
    					mm=12;
    					yyyy--;
    				}
    			}
    			break;
    		 }
    	case 2:{
    		mm--;
    		if(mm<=0){
    			mm=12;
    			yyyy--;
    		}
    		break;
    	}
    	case 3:{
    		yyyy--;
    		break;
    	}
    	}
    	if(dd<10) 
    	{
    	    dd='0'+dd;
    	} 

    	if(mm<10) 
    	{
    	    mm='0'+mm;
    	}
    	today = yyyy+'-'+mm+'-'+dd;
	
    	return today;
    }
    
    
      var HttpClient = function() {
      this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
       }
      }
      var client = new HttpClient();

     
      endtime=todayDate(0);
      pastweek=todayDate(1);
      pastmonth=todayDate(2);
      pastyear=todayDate(3);
    //  console.log(starttime);
      client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude=2&starttime='+pastweek+'&endtime='+endtime+'&latitude=36.17&longitude=-119.7462&maxradius=6', function(response) {
          document.getElementById('pastweek').innerHTML=response;
      });
      client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude=2&starttime='+pastmonth+'&endtime='+endtime+'&latitude=36.17&longitude=-119.7462&maxradius=6', function(response) {
          document.getElementById('pastmonth').innerHTML=response;
      });
      client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude=2&starttime='+pastyear+'&endtime='+endtime+'&latitude=36.17&longitude=-119.7462&maxradius=6', function(response) {
          document.getElementById('pastyear').innerHTML=response;
      });
     
     
      var mag_2,mag2_3,mag3_4,mag4_5,mag5;
      var earthquake2018,earthquake2017,earthquake2016,earthquake2015,earthquake2014;
     

      client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude=2&starttime=2014-01-1&endtime=2014-12-31&latitude=36.17&longitude=-119.7462&maxradius=2', function(response) {
             earthquake2014=response;

      });
      client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude=2&starttime=2015-01-1&endtime=2015-12-31&latitude=36.17&longitude=-119.7462&maxradius=2', function(response) {
             earthquake2015=response;

      });
      client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude=2&starttime=2016-01-1&endtime=2016-12-31&latitude=36.17&longitude=-119.7462&maxradius=2', function(response) {
             earthquake2016=response;

      });

      client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude=2&starttime=2017-01-1&endtime=2017-12-31&latitude=36.17&longitude=-119.7462&maxradius=2', function(response) {
             earthquake2017=response;

      });

      client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude=2&starttime=2018-01-1&endtime=2018-12-31&latitude=36.17&longitude=-119.7462&maxradius=2', function(response) {
             earthquake2018=response;

      });

      client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude=1&maxmagnitude=2&starttime=2018-02-26&endtime=2018-03-26&latitude=36.17&longitude=-119.7462&maxradius=2', function(response) {
             mag_2=response;

      });
      client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude=2&maxmagnitude=3&starttime=2018-02-26&endtime=2018-03-26&latitude=36.17&longitude=-119.7462&maxradius=2', function(response) {
             mag2_3=response;

      });
      client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude=3&maxmagnitude=4&starttime=2018-02-26&endtime=2018-03-26&latitude=36.17&longitude=-119.7462&maxradius=2', function(response) {
             mag3_4=response;

      });
      client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude=4&maxmagnitude=5&starttime=2017-02-26&endtime=2018-03-26&latitude=36.17&longitude=-119.7462&maxradius=2', function(response) {
             mag4_5=response;

      });
      client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude=5&starttime=2017-02-26&endtime=2018-03-26&latitude=36.17&longitude=-119.7462&maxradius=2', function(response) {
      mag5=response;
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      console.log(response);
           function drawChart() {

        // PieChart
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Year');
        data.addColumn('number', 'count');
        data.addRows([
          ['2014', parseInt(earthquake2014)],
          ['2015', parseInt(earthquake2015)],
          ['2016', parseInt(earthquake2016)],
          ['2017', parseInt(earthquake2017)],
          ['2018', parseInt(earthquake2018)]
        ]);
        var options = {'title':'',
                slices: {0: {color: 'red'}, 1:{color: 'green'}, 2:{color: 'blue'}, 3: {color: 'orange'}, 4:{color: 'purple'}},
 				legend:{position:'bottom'}};
        var chart = new google.visualization.PieChart  (document.getElementById('earthquake_PieChart'));
        chart.draw(data, options);


       //Area chart
      
      magOnChange(3,0);
        // Donut Chart
        var data3 = new google.visualization.DataTable();
        data3.addColumn('string', 'magnitude');
        data3.addColumn('number', 'count');
        data3.addRows([
          ['Magnitude <2', parseInt(mag_2)],
          ['Magnitude 2-3', parseInt(mag2_3)],
          ['Magnitude 3-4', parseInt(mag3_4)],
          ['Magnitude 4-5', parseInt(mag4_5)],
          ['Magnitude >5', parseInt(mag5)]
        ]);
        var options3 = {'title':'',
                slices: {0: {color: 'orange'}, 1:{color: 'green'}, 2:{color: 'yellow'}, 3: {color: 'purple'}, 4:{color: 'grey'}},
          legend:{position:'bottom'},
        'pieHole': 0.4};
        var chart3 = new google.visualization.PieChart  (document.getElementById('earthquake_donut'));
        chart3.draw(data3, options3);

        // TrendLine
        var data4 = google.visualization.arrayToDataTable([
                     ['Year', 'Earthquakes'],
                     [2014, parseInt(earthquake2014)],
                     [2015, parseInt(earthquake2015)],
                     [2016, parseInt(earthquake2016)],
                      [2017, parseInt(earthquake2017)]]);
        var options4 = {
                title: '',
                hAxis: {title: 'Year'},
                vAxis: {title: 'Earthquakes'},
                legend: 'none',
                trendlines: { 0: {} }    // Draw a trendline for data series 0.
             };

         var chart4 = new google.visualization.ScatterChart(document.getElementById('earthquake_trendline'));
         chart4.draw(data4, options4);
      }
   
      });

      
      function parameterMagOnChange(){

    	  var magnitude=document.getElementById("magnitude").value;
       
           var loc=parseInt(document.getElementById("location").value);
           magOnChange(magnitude,loc);
    	  
      }
      
      
      function magOnChange(magnitude,loc){
    	  
    	   var magless2014,magless2015,magless2016,magless2017,magless2018,magmore2014,magmore2015,magmore2016,magmore2017,magmore2018;
           document.getElementById("earthquake_area_chart").innerHTML = "";
    	  var latlong=[
       	   [36.821,-119.936,6.2],[37.740,-122.452,1.09],[37.321,-121.905,0.9],[34.011,34.011,1.65]
          ] 

         client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude=2&maxmagnitude='+magnitude+'&starttime=2014-01-1&endtime=2014-12-31&latitude='+latlong[loc][0]+'&longitude='+latlong[loc][1]+'&maxradius='+latlong[loc][2]+'', function(response) {
                magless2014=response;
         });

          client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude=2&maxmagnitude='+magnitude+'&starttime=2015-01-1&endtime=2015-12-31&latitude='+latlong[loc][0]+'&longitude='+latlong[loc][1]+'&maxradius='+latlong[loc][2], function(response) {
                magless2015=response;

         });

         client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude=2&maxmagnitude='+magnitude+'&starttime=2016-01-1&endtime=2016-12-31&latitude='+latlong[loc][0]+'&longitude='+latlong[loc][1]+'&maxradius='+latlong[loc][2], function(response) {
                magless2016=response;

         });

          client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude=2&maxmagnitude='+magnitude+'&starttime=2017-01-1&endtime=2017-12-31&latitude='+latlong[loc][0]+'&longitude='+latlong[loc][1]+'&maxradius='+latlong[loc][2], function(response) {
                magless2017=response;

         });

           client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude=2&maxmagnitude='+magnitude+'&starttime=2018-01-1&endtime=2018-12-31&latitude='+latlong[loc][0]+'&longitude='+latlong[loc][1]+'&maxradius='+latlong[loc][2], function(response) {
                magless2018=response;

         });

          client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude='+magnitude+'&starttime=2014-01-1&endtime=2014-12-31&latitude='+latlong[loc][0]+'&longitude='+latlong[loc][1]+'&maxradius='+latlong[loc][2], function(response) {
                magmore2014=response;

         });
          client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude='+magnitude+'&starttime=2015-01-1&endtime=2015-12-31&latitude='+latlong[loc][0]+'&longitude='+latlong[loc][1]+'&maxradius='+latlong[loc][2], function(response) {
                magmore2015=response;

         });

         client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude='+magnitude+'&starttime=2016-01-1&endtime=2016-12-31&latitude='+latlong[loc][0]+'&longitude='+latlong[loc][1]+'&maxradius='+latlong[loc][2], function(response) {
                magmore2016=response;

         });

          client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude='+magnitude+'&starttime=2017-01-1&endtime=2017-12-31&latitude='+latlong[loc][0]+'&longitude='+latlong[loc][1]+'&maxradius='+latlong[loc][2], function(response) {
                magmore2017=response;

         });

           client.get('https://earthquake.usgs.gov/fdsnws/event/1/count?minmagnitude='+magnitude+'&starttime=2018-01-1&endtime=2018-12-31&latitude='+latlong[loc][0]+'&longitude='+latlong[loc][1]+'&maxradius='+latlong[loc][2], function(response) {
                magmore2018=response;

         
          
        //   console.log(magless2014+" "+magless2015+" "+magless2016+" "+magless2017+" "+magless2018);
          // console.log(magmore2014+" "+magmore2015+" "+magmore2016+" "+magmore2017+" "+magmore2018);
           // Area Chart
           var data1 = google.visualization.arrayToDataTable([
            ['Year', 'Magnitude<'+magnitude, 'Magnitude>'+magnitude],
            ['2014',  parseInt(magless2014),parseInt(magmore2014)],
            ['2015',  parseInt(magless2015),parseInt(magmore2015)],
            ['2016',  parseInt(magless2016),parseInt(magmore2016)],
            ['2017',  parseInt(magless2017),parseInt(magmore2017)],
            ['2018',  parseInt(magless2018),parseInt(magmore2018)]
          ]);

          var options1 = {
            title: 'Earthquakes Over Time',
            hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
            vAxis: {minValue: 0},
              // Colors the entire chart area, simple version
              // backgroundColor: '#FF0000',
              // Colors the entire chart area, with opacity
              backgroundColor: {
                fill: '#1ABB9C',
                fillOpacity: 0.1
              }
          };
          var chartType=document.getElementById("chartType").value;
          if(chartType=="areachart"){
          var chart1 = new google.visualization.AreaChart(document.getElementById('earthquake_area_chart'));
          chart1.draw(data1, options1);
          }
          else if(chartType=="barchart"){
        	  var chart1 = new google.visualization.BarChart(document.getElementById('earthquake_area_chart'));
              chart1.draw(data1, options1);  
          }
          else {
        	  var chart1 = new google.visualization.ColumnChart(document.getElementById('earthquake_area_chart'));
              chart1.draw(data1, options1);  
          }
           });  
      }
      
      var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
      function myFunction() {
        var x = document.getElementById("option").value;
        if(x=="significant_hour")
          url='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson';
        else if(x=="4.5_hour")
          url='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_hour.geojson';
        else if(x=="2.5_hour")
          url='https://earthquke.usgs.gov/earthquakes/feed/v1.0/summary/2.5_hour.geojson';
        else if(x=='1.0_hour')
          url='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson';
        else if(x=="all_hour")
          url='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';
        else if(x=="significant_day")
          url='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson';
        else if(x=="4.5_day")
          url='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson';
        else if(x=="2.5_day")
          url='https://earthquke.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson';
        else if(x=='1.0_day')
          url='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson';
        else if(x=="all_day")
          url='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
        map.on('load', function () {
        window.setInterval(function() {
            map.getSource('drone').setData(url);
        }, 2000);
         map.removeSource('drone');
        map.addSource('drone', { type: 'geojson', data: url });
        map.addLayer({
            "id": "drone",
            "type": "circle",
            "source": "drone",
            "layout": {
                'visibility': 'visible',
                
            },
            'paint': {
               'circle-radius': 4,
                 'circle-color': 'yellow',
                  'circle-stroke-color':'red' ,
                  'circle-stroke-width':2
            },
        });
       });
    }
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpbHBhY2hhbmRyYSIsImEiOiJjajhycXJ2OTEwMGFsMnhvMjZlNW12bnU1In0.-qhoEBgFVL1LZz470nbRdw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [-120.50, 40],
        zoom: 5
    });


    map.on('load', function () {
        window.setInterval(function() {
            map.getSource('drone').setData(url);
        }, 2000);

        map.addSource('drone', { type: 'geojson', data: url });
        map.addLayer({
            "id": "drone",
            "type": "circle",
            "source": "drone",
            "layout": {
                'visibility': 'visible',
                
            },
            'paint': {
                 'circle-radius': 4,
                   'circle-color':'yellow' ,
                  'circle-stroke-color':'red',
                  'circle-stroke-width':2        
            },
        });
        map.on('click', function(e) {
      var features = map.queryRenderedFeatures(e.point, {
        layers: ['drone'] // replace this with the name of the layer
      });

      if (!features.length) {
        return;
      }

      var feature = features[0];
    var t = new Date( feature.properties.time );
    //var d=features.bbox;
    //System.out.println(feature);
    // var formatted = t.format("dd.mm.yyyy hh:MM:ss");
      var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + feature.properties.title + '</h3><p> Time :   ' + t + '</p><p>'+'</p>')
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    });
    });

      function initMap() {
          var map = new google.maps.Map(document.getElementById('map2'), {
            zoom: 10,
            center: {lat: 32.397, lng: -120.644}
          });

          var geocoder = new google.maps.Geocoder();

         var HttpClient = function() {
        this.get = function(aUrl, aCallback) {
          var anHttpRequest = new XMLHttpRequest();
          anHttpRequest.onreadystatechange = function() { 
              if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                  aCallback(anHttpRequest.responseText);
          }


          anHttpRequest.open( "GET", aUrl, true );            
          anHttpRequest.send( null );
         }
        }

         endtime=todayDate(0);
         pastweek=todayDate(1);   
        var client = new HttpClient();
      client.get('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=3&starttime='+pastweek+'&orderby=time&endtime='+endtime+'&minlatitude=32&maxlatitude=39&minlongitude=-130&maxlongitude=-114', function(response) {
            
          var result=JSON.parse(response);
          var place=result.features[0].properties.place;
          
          for(var i=0;i<result.metadata.count;i++){
          	document.getElementById('moreTable').innerHTML+="<td>"+result.features[i].properties.place+"</td><td>"+new Date(result.features[i].properties.time)+"</td><td>"+result.features[i].properties.mag+"</td>";
          }
          console.log(result.features[0].properties.mag);
          document.getElementById('locate').innerHTML+="<h5>Magnitude: <b>"+result.features[0].properties.mag+"</b></h5><div style='font-size:12px;'>Location: <b>"+place+"</b> <br><b> "+new Date(result.features[0].properties.time)+"</b></div><input type='button' onClick='callClick()' id='more' style='float:right;' class='btn btn-sm btn-info'  value='more'>";


            var marker = new google.maps.Marker({
                map: map,
                position:{ lat:result.features[0].geometry.coordinates[1],lng:result.features[0].geometry.coordinates[0]}
              });

            map.setCenter(new google.maps.LatLng(result.features[0].geometry.coordinates[1], result.features[0].geometry.coordinates[0]));
      	  map.setZoom(map.getZoom()-1);
      }); 
       

        }
      var modal = document.getElementById('myModal');

      // Get the button that opens the modal
      var btn = document.getElementById("more");

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];

      // When the user clicks the button, open the modal 
      function callClick() {
          modal.style.display = "block";
      }
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }