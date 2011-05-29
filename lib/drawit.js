/*jslint white: true, devel: true, onevar: true, undef: true, nomen: true, regexp: true, plusplus: true, bitwise: true, newcap: true, maxerr: 50, indent: 4 */

var BURNDOWN = (function () {
    var pub = {};

    function line(paper, coordinaten) {
        var coordinatenAsStrings;
        coordinatenAsStrings = coordinaten.map(function (coordinaat) {
            return coordinaat.x + " " + coordinaat.y;
        });
        
        return paper.path("M " + coordinatenAsStrings.join(" L "));
    }
    
    pub.create = function (options) {
        function xCoordinaatVoor(dag) {
            var breedte, factor;
            breedte = options.width - 20;
            factor = breedte / options.aantalDagen;
            return ((dag * factor) + 10);
        }
        
        function yCoordinaatVoor(etc) {
            var hoogte = options.height - 20, factor = hoogte / options.maxEtc;
            return ((options.maxEtc - etc) * factor) + 10;
        }

        return {
            coordinaatVoor: function (dag, etc) {
                return {
                    x: xCoordinaatVoor(dag),
                    y: yCoordinaatVoor(etc)
                };
            },

            drawon: function (paper) {
                var coordinaten = options.totaleEtcs.map(function (etc, idx) {
                    var dag = idx + 1;
                    return this.coordinaatVoor(dag, etc);
                }, this);
                line(paper, [
                    this.coordinaatVoor(1, options.maxEtc), 
                    this.coordinaatVoor(options.aantalDagen, 0)]).attr({stroke: 'gray'});
                line(paper, coordinaten).attr({'stroke-width': 2});
            }
        };
    };
    pub.hello = function () {
        console.log('heheheh');
    };
    
    return pub;
}());



