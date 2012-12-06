// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __View.Countryli = (function(_super) {

    __extends(Countryli, _super);

    function Countryli() {
      this.onClickLi = __bind(this.onClickLi, this);
      return Countryli.__super__.constructor.apply(this, arguments);
    }

    Countryli.prototype.events = {
      "tap li.country-li": "onClickLi"
    };

    Countryli.prototype.container = "article#all-primas ul";

    Countryli.prototype.template_url = "app/resources/templates/country_li.mustache";

    Countryli.prototype.onClickLi = function(evt) {
      return this.model.active();
    };

    return Countryli;

  })(Monocle.View);

}).call(this);
