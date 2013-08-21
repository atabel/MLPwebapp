// Generated by CoffeeScript 1.4.0
(function() {
  var CountryActiveCtrl,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CountryActiveCtrl = (function(_super) {

    __extends(CountryActiveCtrl, _super);

    function CountryActiveCtrl() {
      this.refreshActive = __bind(this.refreshActive, this);

      this.bindCountryChange = __bind(this.bindCountryChange, this);
      __Model.Country.bind("change", this.bindCountryChange);
      __Model.Country.bind("active", this.refreshActive);
    }

    CountryActiveCtrl.prototype.bindCountryChange = function(country) {
      if (country.isActive()) {
        return this.refreshActive(country);
      }
    };

    CountryActiveCtrl.prototype.refreshActive = function(country) {
      var view;
      view = __View.CountryPrima.getInstance({
        model: country
      });
      view.html(country);
      return this.loadHistory(country);
    };

    CountryActiveCtrl.prototype.loadHistory = function(country) {
      var cc;
      cc = country.country_code;
      return App.Services.loadPrimaHistory(cc, null, function(history) {
        var $chart;
        console.error("loading chart");
        $chart = Monocle.Dom(".prima-chart");
        $chart.hide().text(history.reverse().join());
        $chart.peity("line", {
          "width": Math.floor($$(".prima").width()),
          "height": Math.floor($$(".prima").height())
        });
        return $chart.show();
      });
    };

    return CountryActiveCtrl;

  })(Monocle.Controller);

  __Controller.CountryActive = new CountryActiveCtrl("section#section-prima-country");

}).call(this);
