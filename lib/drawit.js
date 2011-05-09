BURNDOWN = (function (){
  var pub = {};

  function line(paper,coordinaten) {
    var coordinatenAsStrings = coordinaten.map(function (coordinaat) {return coordinaat.x + " " + coordinaat.y});
    var pathString = "M " + coordinatenAsStrings.join(" L ");
    return paper.path(pathString);
  }

  pub.create = function (options) {
    function xCoordinaatVoor(dag) {
      var breedte = options.width - 20;
      var factor = breedte / options.aantalDagen;
      return ((dag*factor) + 10);
    }

    function yCoordinaatVoor(etc) {
      var hoogte = options.height - 20;
      var factor = hoogte / options.maxEtc;
      return ((options.maxEtc - etc)*factor) + 10;
    }

    return {
      coordinaatVoor: function(dag,etc) {
        return {
          x: xCoordinaatVoor(dag),
          y: yCoordinaatVoor(etc)
        }
      },

      drawon: function(paper) {
        var coordinaten = options.totaleEtcs.map(function (etc, idx) {
          var dag = idx+1;
          return this.coordinaatVoor(dag,etc);
        }, this);
        line(paper, [
          this.coordinaatVoor(1,options.maxEtc), 
          this.coordinaatVoor(options.aantalDagen,0)]).attr({stroke:'gray'});
        line(paper, coordinaten).attr({'stroke-width':2});
      }
    }
  }
  return pub;
} ());



