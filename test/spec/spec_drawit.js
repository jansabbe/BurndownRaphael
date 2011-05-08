describe("BURNDOWN module kan een simpele burndown grafiek tekenen", function (){

  describe("kan etc uren mappen op Y-coordinaten", function () {
    var burndown;

    beforeEach(function() {
      burndown = BURNDOWN.create({maxEtc:40,height:420});
    });

    it("laat bovenaan een aantal pixels over", function() {
      expect(burndown.coordinaatVoor(1, 40).y).toEqual(10);
    });

    it("laat onderaan ook een aantal pixels over", function () {
      expect(burndown.coordinaatVoor(1, 0).y).toEqual(410);
    });

    it("mapt etc uren naar gelang de hoogte van paper", function () {
      expect(burndown.coordinaatVoor(1, 20).y).toEqual(210);
    });
  });

  describe("kan dagen mappen op X-coordinaten", function () {
    var burndown;

    beforeEach(function() {
      burndown = BURNDOWN.create({aantalDagen: 10, width: 820});
    });
    
    it("laat bij start een aantal pixels over", function() {
      expect(burndown.coordinaatVoor(1,20).x).toEqual(90);
    });

    it("laat op het einde ook een aantal pixels over", function () {
      expect(burndown.coordinaatVoor(10,20).x).toEqual(810);
    });

    it("mapt dag naar gelang de breedte van paper", function () {
      expect(burndown.coordinaatVoor(5,20).x).toEqual(410);
    });
  });

  describe("kan etcs tekenen op paper", function () {
    var burndown, dag1xy, dag2xy, dag3xy;

    beforeEach(function() {
      burndown = BURNDOWN.create({
        aantalDagen: 3, 
        width: 800,
        maxEtc: 10,
        height: 600,
        totaleEtcs: [10,9,0]
      });
      dag1xy = burndown.coordinaatVoor(1,10);
      dag2xy = burndown.coordinaatVoor(2,9);
      dag3xy = burndown.coordinaatVoor(3,0);
    });

    it("tekent een lijn op paper", function () {
      var expectedPathString = 
        "M " + dag1xy.x + " " + dag1xy.y 
        + " L " + dag2xy.x + " " + dag2xy.y
        + " L " + dag3xy.x + " " + dag3xy.y;
      var paperMock = jasmine.createSpyObj('paper', ['path']);
      burndown.drawon(paperMock);

      expect(paperMock.path).toHaveBeenCalledWith(expectedPathString);
    });

    
  });

});
