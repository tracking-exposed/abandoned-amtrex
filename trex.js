function amtrexRender(chunk, containerId) {

    $(containerId).html("");

    var margin = {top: 20, right: 20, bottom: 30, left: 60},
        width = 960 - margin.left - margin.right,
        height = 900 - margin.top - margin.bottom,
        /* the space in the 'x' line before the 1st tick & after the last */
        padding = 40;

    /* Cargo Cult Programming ahead */
    var graph = raw.models.graph();

    var chart = raw.chart()
        .model(graph)

    var nodeWidth = 5;
    var nodePadding = 12;

    d3.json("/generated-" + chunk + ".json", function (data) {

        var formatNumber = d3.format(",.0f"),
            format = function(d) { return formatNumber(d); };

        var g = d3
            .select(containerId)
            .append("svg")
            .attr("width", width + margin.left + margin.right )
            .attr("height", height + margin.top + margin.bottom)
              .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.bottom + ")");

        var maxNodes = 10;

        var sankey = d3.sankey()
            .nodeWidth(nodeWidth)
            .nodePadding(nodePadding)
            .size([width, height]);

        var path = sankey.link();

        sankey
            .nodes(data.nodes)
            .links(data.links)
            .layout(32);

        // Re-sorting nodes
        nested = d3.nest()
            .key(function(d){ return d.group; })
            .map(data.nodes)

        d3.values(nested)
            .forEach(function (d){
                var y = ( height - d3.sum(d,function(n){ return n.dy+sankey.nodePadding();}) ) / 2 + sankey.nodePadding()/2;
                d.sort(function (a,b){
                    return b.dy - a.dy;
                })
                d.forEach(function (node){
                    node.y = y;
                    y += node.dy +sankey.nodePadding();
                })
            })

        // Resorting links

        d3.values(nested).forEach(function (d){

            d.forEach(function (node){

                var ly = 0;
                node.sourceLinks
                    .sort(function (a,b){
                        return a.target.y - b.target.y;
                    })
                    .forEach(function (link){
                        link.sy = ly;
                        ly += link.dy;
                    })

                ly = 0;
                node.targetLinks
                    .sort(function(a,b){
                        return a.source.y - b.source.y;
                    })
                    .forEach(function (link){
                        link.ty = ly;
                        ly += link.dy;
                    })
            })
        })

        var colors = d3.scale.category20();

        var link = g.append("g").selectAll(".link")
            .data(data.links)
               .enter().append("path")
                    .attr("class", "link")
                    .attr("d", path )
                    .style("stroke-width", function(d) { return Math.max(1, d.dy); })
                    .style("fill","none")
                    .style("stroke", function (d){ return colors(d.source.name); })
                    .style("stroke-opacity",".4")
                    .sort(function(a, b) { return b.dy - a.dy; })
                    .append("title")
                    .text(function(d) { return d.value });

        var node = g.append("g").selectAll(".node")
            .data(data.nodes)
            .enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

        node.append("rect")
            .attr("height", function(d) { return d.dy; })
            .attr("width", sankey.nodeWidth())
            .style("fill", function (d) { return d.sourceLinks.length ? colors(d.name) : "#666"; })
            .append("title")
            .text(function(d) { return d.name + "\n" + format(d.value); });


        node
            .append("text")
            .attr("x", -6)
            .attr("y", function (d) { return d.dy / 2; })
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .attr("transform", null)
            .text(function(d) { return d.name; })
            .style("font-size","11px")
            .style("font-family","Arial, Helvetica")
            .style("pointer-events","none")
            .filter(function(d) { return d.x < width / 2; })
            .attr("x", 6 + sankey.nodeWidth())
            .attr("text-anchor", "start");

        node.filter(function(d) { return d.group === "site" })
            .append("foreignObject")
            .attr("x", 6 + sankey.nodeWidth())
            .attr("y", function (d) { return d.dy / 2; })
            .attr("dy", ".35em")
            .attr("width", "100%")
            .attr("text-anchor", "start")
            .attr("transform", null)
            /* in theory I've d.href with http or https, but in practice I'm loosing that attribute with sankey mangling */
            /* note: I was putting a simple link here, but on mobile platform was not display, so I'll removed and bon. */
            .html(function(d) { console.log(d); return "<a target='_blank' href='http://" + d.name + "'>-----------</a>"; })
            .style("font-weight", "bolder")
            .style("background-color", "#f1ffea")
            .style("font-size","11px")
            .style("font-family","Arial, Helvetica");

    });
};

