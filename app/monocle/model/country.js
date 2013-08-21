// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Model.Country = (function(_super) {

    __extends(Country, _super);

    function Country() {
      return Country.__super__.constructor.apply(this, arguments);
    }

    Country.fields("name", "country_code", "prima_value", "prima_delta", "prima_percent", "last_update", "favourite");

    Country.favourites = function() {
      return this.select(function(country) {
        return !!country.favourite;
      });
    };

    Country.setActive = function(country) {
      this._active = country;
      return country.trigger("active");
    };

    Country.getActive = function() {
      return this._active;
    };

    Country.prototype.primaIsGrowing = function() {
      return !!(this.prima_delta > 0);
    };

    Country.prototype.prima_delta_abs = function() {
      return "" + Math.abs(this.prima_delta);
    };

    Country.prototype.prima_percent_abs = function() {
      return "" + Math.abs(this.prima_percent);
    };

    Country.prototype.active = function() {
      return __Model.Country.setActive(this);
    };

    Country.prototype.isActive = function() {
      return this.equal(this.constructor.getActive());
    };

    Country.prototype.toggleFavourite = function() {
      return this.updateAttributes({
        favourite: !this.favourite
      });
    };

    return Country;

  })(Monocle.Model);

}).call(this);
