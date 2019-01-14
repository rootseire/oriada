var data = {"projects":[{"id":"0", "TypeOfProject": "1st project", "DateStart": "1960-01-01", "DateFinish": "1961-01-01","TitleOfProject": "Ceol Chualann","DescriptionOfProject": "Ensemble of traditional Irish musicians"},{"id":"1", "TypeOfProject": "2nd project", "DateStart": "1970-01-01", "DateFinish": "1971-01-01","TitleOfProject": "Ceol 2","DescriptionOfProject": "Ensemble of traditional Irish musicians"}],"success":1};
//console.log(data);
 
    
var height =  500;
var tracks = [];    
var band = {};
var today = new Date();
band.trackOffset = 4;
band.h = height;
yearMillis = 31622400000,
instantOffset = 100 * yearMillis;    
var items = data.projects; 

 yScale = function (track) {
     //return 4 + track;
     return band.trackOffset + track * band.trackHeight;
       };
    
function compareAscending(item1, item2) {
            // Every item must have two fields: 'start' and 'end'.
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            var firstdatestart = new Date(item1.DateStart);
            var seconddatestart = new Date(item2.DateStart);
           // var result = Math.round(firstdatestart.getTime() - seconddatestart.getTime()/oneDay);
            var result = firstdatestart.getTime() - seconddatestart.getTime();
          
    // earlier first
            if (result < 0) { return -1; }
            if (result > 0) { return 1; }
            // longer first
            var firstdatefinish = new Date(item1.DateFinish);
            var seconddatefinish = new Date(item2.DateFinish);
            var result = seconddatefinish.getTime() - firstdatefinish.getTime();
   
           // result = item2.DateFinish - item1.DateFinish;
            if (result < 0) { return -1; }
            if (result > 0) { return 1; }
            return 0;
        }

function compareDescending(item1, item2) {
            // Every item must have two fields: 'start' and 'end'.
            // Read the dataset in and then compare the dates of the first value with the next value
    
            var firstdatestartdesc = item1.DateStart;
            var seconddatestartdesc = item2.DateStart;
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

    function parseDate(input) {
  var parts = input.split('-');
        
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}
    
            var result = parseDate(item1.DateStart) - parseDate(item2.DateStart);
            if (result < 0) { return 1; }
            if (result > 0) { return -1; }
           
    
            // shorter first
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            var firstdatefinishdesc = item1.DateFinish;
            var seconddatefinishdesc = item2.DateFinish;
             

              result = parseDate(item2.DateFinish) - parseDate(item1.DateFinish);
            if (result < 0) { return 1; }
            if (result > 0) { return -1; }
            
            return 0;
        }
   

function calculateTracks(item, sortOrder, timeOrder) {
            var i, track;

            sortOrder = sortOrder || "descending"; // "ascending", "descending"
            timeOrder = timeOrder || "backward";   // "forward", "backward"

            function sortBackward() {
                // older items end deeper (basically the next one will be underneath and sort them right to left)
                data.projects.forEach(function (item) { // for each item as you loop through the tracks
                    for (i = 0, track = 0; i < tracks.length; i++, track++) { //while we have a certain amount of tracks, add a new track
                        if (item.DateFinish < tracks[i]) { break; } //jump out of the loop if the finish date of an item is less than the array tracks
                                                         
                    }
                    item.track = track//record the track number for this item
                    tracks[track] = item.DateStart;//record the starting date of this track
                });
            }
            
            //dont need to use this when we have sort backward instead
            function sortForward() {
                // younger items end deeper
               data.projects.forEach(function (item) {
                    for (i = 0, track = 0; i < tracks.length; i++, track++) {
                        if (item.DateStart > tracks[i]) { break; }
                    }
                    item.track = track;
                    tracks[track] = item.DateFinish;
                });
            }

            if (sortOrder === "ascending")
                data.projects.sort(compareAscending);
            else
                data.projects.sort(compareDescending);
            if (timeOrder === "forward"){
                ;
                //sortForward();
            }else{
                sortBackward();
            }
        }

    
 calculateTracks(data.projects.item, "descending", "backward");
//calculateTracks(data.projects.item, "ascending", "forward");
//console.log(data.projects);
data.nTracks = tracks.length;        
band.trackHeight = Math.min((height - band.trackOffset) / data.nTracks, 20);     
          
// Parse the date / time
var	parseDate = d3.time.format("%d-%b-%y").parse;
var formatTime = d3.time.format("%e %B");// Format tooltip date / time
    
    
// Define 'div' for tooltips
var div = d3.select("body")
	.append("div")  // declare the tooltip div 
	.attr("class", "tooltip")              // apply the 'tooltip' class
	.style("opacity", 0);                  // set the opacity to nil
    
    
var svgwidth = 3060,
    svgheight = 400,
    padding = 100;
        
 
//setup the main SVG container
    
var vis = d3.select("body")
    .append("svg:svg")
    .attr("class", "svg")
    .attr("width", svgwidth)
    .attr("id", "svg")
    .attr("height", svgheight)
    .append("g")
    .attr("class", "main");
    

// define the y scale  (vertical)
//var yScale = d3.scale.linear();
//.domain([0, 50])    // values between 0 and 100
//.range([height - padding, padding]);   // map these to the chart height, less padding.      

var mindate = new Date (1945,01,01),
    maxdate = new Date (1972,12,31);
    

//define value for calculating position of rectangles    
var x = d3.time.scale()
        .domain([mindate, maxdate])  
        .range([padding, svgwidth - padding * 2]);   // map these the the chart width = total width minus padding at both sides
          
    //var x = d3.time.scale().domain([0, width], 200);    
var xScale = d3.time.scale()
.domain([new Date(mindate), new Date(maxdate)])
.range([padding, svgwidth - padding * 2]);   // map these the the chart width = total width minus padding at both sides



//draw xAxis
var xAxis = d3.svg.axis()
    .orient("bottom") 
.ticks(d3.time.years)
    .tickSize(4, 0)
    .scale(xScale);
  

// draw x axis with labels and move to the bottom of the chart area
vis.append("g") 
    .attr("class", "x axis")   // give it a class so it can be used to select only xaxis labels  below
    //.attr("transform", "translate(0," + (svgheight - padding) + ")")
    //.attr('class', 'axis')
.attr("clip-path", "url(#clip)")
    .call(xAxis);

    var  x2 = d3.time.scale().range([0, svgwidth]);

    band.parts = [],
    band.instantWidth = 100; // arbitray value
    
    band.redraw = function (items) {
        var items = vis.selectAll("svg");
        //items.attr("x", function (d) { return xScale(new Date(d.DateStart));})
        items.attr("width", function (d) {return xScale(new Date(d.DateFinish)) - xScale(new Date(d.DateStart)); });
        vis.select(".x.axis").call(xAxis3);
       //x.domain(brush.extent());
         //band.parts.forEach(function(part) { part.redraw(); }
        //console.log(xScale);
                           };
    
    var brush = d3.svg.brush()
    .x(xScale.range([0, svgwidth]))
    
            .on("brushend",endbrush)    
            .on("brush", function() {
                var domain = brush.empty()
                    ? xScale.domain() 
                    : brush.extent();
                
               
                items.forEach(function(d) {
                    xScale.domain(domain);
                    band.redraw();
                    
                });
            });

var xAxis3 = d3.svg.axis()
    .orient("bottom") 
.ticks(d3.time.months, 1)
        .tickFormat(d3.time.format('%b %Y'))
        .tickSubdivide(12)
// .ticks(d3.time.months)
//.tickFormat(d3.time.format("%b %Y"))
.tickSize(400)
    .scale(xScale);
    
    
function endbrush(){
        
    //vis.select(".x.axis")
   //.call(xAxis3)
    
    
    //.selectAll("line").attr("y2", 400)
    
    
    //vis.call(xAxis);
    //x.domain(brush.extent());
    vis.selectAll(".point").attr('x', function(d) {return xScale(new Date(d.DateFinish))});
     vis.selectAll("text").attr("y", 5);
 
    get_button = d3.select(".clear-button");
  if(get_button.empty() === true) {
    clear_button = vis.append('text')
      .attr("y", 20)
      .attr("x", 15)
      .attr("class", "clear-button")
      .text("Clear Selection");
  }

 
  
//d3.select(".brush").call(brush.clear());
    
  clear_button.on('click', function(){
      d3.select(".brush").call(brush.clear());
    x.domain([0, 50]);
      reset_axis();
    clear_button.remove();
  });
}
    
    function transition_data() {
  
}

    
    
vis.append("g")
 .attr("class", "x brush")
 .call(brush)
 .selectAll('rect')
 .attr('height', height);
 
    
vis.selectAll(".tick text")
            .attr("y", 5);
            
   


    
var barHeight = 20;
var topPadding = 5;
var sidePadding = 75;
var yVal = function(d,i) { return 1; };
var newValue2 = 2;

d3.select("#scores").on("change", Scores);
d3.select("#scol").on("change", SpecColl);
d3.select("#pub").on("change", Pub);
d3.select("#plays").on("change", Plays);
d3.select("#films").on("change", Film);
d3.select("#radio").on("change", Radio);
    
   

        

var see = vis.selectAll ("g")
   .data(data.projects)
   .enter() 
   .append("svg")
   .style("margin-bottom", 5)
   .attr("y", function (d) { return yScale(d.track); })
   .attr('x', function(d) {return x(new Date(d.DateStart))})
   .attr('width', function(d) { 
    var calcdate = x(new Date(d.DateFinish)) - x(new Date(d.DateStart));
    //console.log(calcdate);
       
   // var barWidth = data.projects.length;
       //console.log(barWidth);
       return calcdate;
        console.log("Calcdate value is: " +calcdate);
    
    if(calcdate<='0'){return 100}else{return 10}})
   .attr("class", "rectclass")
   .append("rect")
.on("mouseover", function(d) {
    
     div.transition()
				.duration(500)	
				.style("opacity", 0)
                .style("height",'auto')
			div.transition()
				.duration(200)	
            .style("z-index", 100)
				.style("opacity", .9);	
			div	.html(
				d.DateFinish + 
                '<a href= "http://google.com">' + // The first <a> tag
				"<br />" +
                d.TitleOfProject +
				"</a>" +                          // closing </a> tag
				"<br/>"  )	 
				.style("left", (d3.event.pageX) + "px")			 
				.style("top", (d3.event.pageY - 28) + "px")
    
    
               var nodeSelection = d3.select(this.nextSibling);
                nodeSelection.style({opacity:'1'});
                    //.text((function(d) {return d.TitleOfProject}))
                    //.style("top", d[7] + "px")
                    //.style("left", d[6] + "px")
                   // .style("visibility", "visible");
                })
            .on("mouseout", function(){
               // div.transition().style("opacity", 0);
                div.transition()
				.duration(1800)	
				.style("z-index", -100);	
		
            
                var nodeSelection = d3.select(this.nextSibling);
                nodeSelection.style({opacity:'0'});
            })
   .attr('width', '100%')
   
//d3.time.format("%B %d, %Y")(d.DateFinish
   .attr("height", 20)
   .attr("margin-top", 5)
   //.attr("y", collide(rect))
   //.attr("y", function(d, i){ return i*2 + topPadding - 2 + 35;  })

   .attr("y", function (d) {return yScale(d.track) +30;})

 
   .attr("font-family", "sans-serif")
.attr("fill", function (d) {

  return 'brown';
})
   .attr("class", "seerect")    
   //.text((function(d) {return d.TitleOfProject}))
   ;

 vis.selectAll("svg.rectclass")
   .append("text")
 .style("opacity", 0)
   .classed('data', true)
   .attr('x', 1)
      .attr("fill","#000")
      .style("stroke-width", 1)
      .style("text-anchor", "right")
   //.attr('x', function(d) {return x(new Date(d.DateStart))})
   .attr("height", 20) 
       //.attr("y", 5)
  .attr("y", 10)
//.attr("y", function(d, i){return i*2 + topPadding - 2 + 75;})

    
       .text((function(d) {//return d.TitleOfProject
 })).each(wrap)
       .attr("class","rectclass")
 //.attr('width', rect.width)
               
         //.attr("padding", 10)    
            ;


    
    
    
    
function Scores() {
    if (this.checked) {
    score = vis.selectAll("svg.rectclass")
    score.selectAll("rect")
    .filter(function(d) { return d.TypeOfProject === 'Composition' || d.TypeOfProject === 'Arrangement'; })
    .attr("fill", "orange")
    }else{
    score.selectAll("rect")
    .filter(function(d) { return d.TypeOfProject === 'Composition' || d.TypeOfProject === 'Arrangement'; })
    .attr("fill", "brown")    
    }
}
    
function SpecColl() {
    if (this.checked) {
    specs = vis.selectAll("svg.rectclass")
    specs.selectAll("rect")
    .filter(function(d) { return d.SpecColl === 'Yes'; })
    .attr("fill", "teal")
    }else{
    specs.selectAll("rect")
    .filter(function(d) { return d.SpecColl === 'Yes'; })
    .attr("fill", "brown")    
    }
}
function Pub() {
    if (this.checked) {
    pubs = vis.selectAll("svg.rectclass")
    pubs.selectAll("rect")
    .filter(function(d) { return d.Published > ''; })
    .attr("fill", "#CD5C5C")
    }else{
    pubs.selectAll("rect")
    .filter(function(d) { return d.Published > ''; })
    .attr("fill", "brown")    
    }
}    
function Plays() {
    if (this.checked) {
    play = vis.selectAll("svg.rectclass")
    play.selectAll("rect")
    .filter(function(d) { return d.TypeOfProject === 'Play'; })
    .attr("fill", "green")
    }else{
    play.selectAll("rect")
    .filter(function(d) { return d.TypeOfProject === 'Play'; })
    .attr("fill", "brown")    
    }
}    
function Film() {
    if (this.checked) {
    film = vis.selectAll("svg.rectclass")
    film.selectAll("rect")
    .filter(function(d) { return d.TypeOfProject === 'Film' || d.TypeOfProject === 'Film Music'; })
    .attr("fill", "silver")
    }else{
    film.selectAll("rect")
    .filter(function(d) { return d.TypeOfProject === 'Film' || d.TypeOfProject === 'Film Music'; })
    .attr("fill", "brown")    
    }
}        
function Radio() {
    if (this.checked) {
    radio = vis.selectAll("svg.rectclass")
    radio.selectAll("rect")
    .filter(function(d) { return d.TypeOfProject === 'Radio Programme'; })
    .attr("fill", "skyblue")
    }else{
    radio.selectAll("rect")
    .filter(function(d) { return d.TypeOfProject === 'Radio Programme'; })
    .attr("fill", "brown")    
    }
}     
    
   function wrap(d) {
               

        var self = d3.select(this),
            textLength = self.node().getComputedTextLength(),
            //rectLength = d3.select("rect").node().getBoundingClientRect(),
              rectLength = d3.select("rect").node().getBoundingClientRect(),
          
            text = self.text();
        
       //console.log("Text computed length:" + textLength);
      // console.log("Rectangle width: " + rectLength.width);
       
       
       
        //while (textLength > rectLength.width && textLength > 0) {
            //console.log("bigger");
           // text = text.slice(0, -1);
           // self.text(text + '...');
           // textLength = self.node().getComputedTextLength();
            
        //}
        if(textLength<100){
           // console.log("smaller");
           // textLength = 10;     
            //console.log(d.TitleOfProject);
            //console.log("width is now" +textLength);
           
        }
    } 

    
//brush stuff

    


vis.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", 3060)
    .attr("height", 500);    
        


      
    
    
d3.json("http://localhost/oriada/phpjson/LetterService/getAllLetters.php", function(data) {
    
    var letters = vis.selectAll("div#nav")
   .data(data.letters)
   .data(data.letters)
   .enter()
   .append("rect")
   .attr('class', "new")
   .attr('x', function(d) {return x(new Date(d.DateFinish))})
   .attr("width", 5)
   .attr("clip-path", "url(#clip)")
   .attr("class", "rectclass point")
   .attr("fill", "gold")
   .attr("stroke", "brown")
   .attr("y", 434)
   
   //.style("bottom", 0)
    .attr("height", 20)
   .text((function(d) {return d.DateFinish} )) 
    
    .on("mouseover", function(d) {
    
     div.transition()
				.duration(500)	
				.style("opacity", 0)
                .style("height",'auto')
			div.transition()
				.duration(200)	
            .style("z-index", 100)
				.style("opacity", .9);	
			div	.html(
                d.DateFinish +
                "<br />" +
				'<a href= "http://google.com">' + // The first <a> tag
				
                d.Description +
				"</a>" +                          // closing </a> tag
				"<br/>"  )	 
				.style("left", (d3.event.pageX) + "px")			 
				.style("top", (d3.event.pageY - 28) + "px")
    
    
               var nodeSelection = d3.select(this.nextSibling);
                nodeSelection.style({opacity:'1'});
                    //.text((function(d) {return d.TitleOfProject}))
                    //.style("top", d[7] + "px")
                    //.style("left", d[6] + "px")
                   // .style("visibility", "visible");
                })
    //console.log(data);
    
    
});
    d3.json("http://localhost/oriada/phpjson/EventService/getAllEvents.php", function(data) {
    
    var letters = vis.selectAll("div#nav")
   .data(data.events)
   .data(data.events)
   .enter()
   .append("rect")
   .attr('class', "new")
   .attr('x', function(d) {return x(new Date(d.DateFinish))})
    .attr('x', function(d) {return x(new Date(d.DateStart))})
   .attr("width", 5)
   .attr("clip-path", "url(#clip)")
   .attr("class", "rectclass point")
    
    .attr("fill", function(d) { if(d.EventType=='Performance'){return 'white'}else if(d.EventType!='Performance'){ return 'teal' }}) 

   // .filter(function(d) { return d.EventType === 'Performance'; })
    //.attr("fill", "teal") 
   
   .attr("stroke", "brown")
   //.attr("y", 414)
   .attr("y", function(d) { if(d.EventType=='Performance'){return 424}else if(d.EventType!='Performance'){ return 414 }}) 
   //.style("bottom", 0)
    //.attr("height", 20)
    .attr("height", function(d) { if(d.EventType=='Performance'){return 10}else if(d.EventType!='Performance'){ return 20 }}) 
   .text((function(d) {return d.DateFinish} )) 
    
    .on("mouseover", function(d) {
    
     div.transition()
				.duration(500)	
				.style("opacity", 0)
                .style("height",'auto')
			div.transition()
				.duration(200)	
            .style("z-index", 100)
				.style("opacity", .9);	
			div	.html(
                d.DateFinish +
                "<br />" +
                d.DateFinish +
                "<br />" +
				'<a href= "http://google.com">' + // The first <a> tag
				
                d.Description +
				"</a>" +                          // closing </a> tag
				"<br/>"  )	 
				.style("left", (d3.event.pageX) + "px")			 
				.style("top", (d3.event.pageY - 28) + "px")
    
    
               var nodeSelection = d3.select(this.nextSibling);
                nodeSelection.style({opacity:'1'});
                    //.text((function(d) {return d.TitleOfProject}))
                    //.style("top", d[7] + "px")
                    //.style("left", d[6] + "px")
                   // .style("visibility", "visible");
                })
    //console.log(data);
    
    
});


     });

        
        //now import letters


