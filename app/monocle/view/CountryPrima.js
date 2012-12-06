// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  __View.CountryPrima = (function(_super) {

    __extends(CountryPrima, _super);

    function CountryPrima() {
      return CountryPrima.__super__.constructor.apply(this, arguments);
    }

    CountryPrima.prototype.events = {
      "tap div.prima-wrap": "onClickPrima"
    };

    CountryPrima.prototype.elements = {
      ".prima-value": "primaValue",
      ".prima-delta": "primaDelta",
      ".prima-percent": "primaPercent"
    };

    CountryPrima.prototype.container = "article#article-prima-value .prima";

    CountryPrima.prototype.template_url = "app/resources/templates/prima.mustache";

    CountryPrima.prototype.onClickPrima = function(evt) {
      return this.el.parent().toggleClass("minified");
    };

    CountryPrima.prototype._html = function() {
      var $favBtn, country, elements, method;
      method = arguments[0], elements = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      country = elements[0];
      country.is_growing = country.primaIsGrowing();
      CountryPrima.__super__._html.apply(this, arguments);
      this.el.parent().parent().parent().find("header .title").text("Prima de " + country.name);
      $favBtn = Monocle.Dom("#add-to-fav-btn");
      if (country.favourite) {
        $favBtn.find("strong").text("Quitar de favoritos");
        $favBtn.find("small").text("Elimiar este país de favoritos");
        return $favBtn.find(".icon").removeClass("star-full").addClass("star");
      } else {
        $favBtn.find("strong").text("Añadir a favoritos");
        $favBtn.find("small").text("Añade este país a favoritos");
        return $favBtn.find(".icon").removeClass("star").addClass("star-full");
      }
    };

    return CountryPrima;

  })(Monocle.View);

}).call(this);