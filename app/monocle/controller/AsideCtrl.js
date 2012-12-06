// Generated by CoffeeScript 1.4.0
(function() {
  var AsideCtrl,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AsideCtrl = (function(_super) {

    __extends(AsideCtrl, _super);

    function AsideCtrl() {
      return AsideCtrl.__super__.constructor.apply(this, arguments);
    }

    AsideCtrl.prototype.events = {
      "tap #add-to-fav-btn": "onAddToFav"
    };

    AsideCtrl.prototype.onAddToFav = function() {
      var country;
      country = __Model.Country.getActive();
      return country.toggleFavourite();
    };

    return AsideCtrl;

  })(Monocle.Controller);

  __Controller.AsideCountryActive = new AsideCtrl("aside#menu-prima-country");

}).call(this);