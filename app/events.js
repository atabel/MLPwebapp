App.Events = (function(lng, app, undefined) {

	UNIMPLEMENTED_FEATURES = [
//	        "#share-your-prima-btn",
//	        "#chart-view-btn"
	];
	
	var _init = function () {
		console.log("*****LUNGO INIT DONE*****");
		// init favourites counter:
		lng.Data.Sql.select("favourites", null, function(favourites) {
			lng.View.Element.count('#favourites-tab-btn', favourites.length);
		});
		// load countries list:
		app.Data.getCountriesList(app.View.viewCountriesList, true);
		
		// preload some primas photos ;-)
//		app.Services.loadPrimaPicture(null, app.PhotoManager.addPhotos);
	};
	
	lng.dom("#all-primas").on("pulldownrefresh", function(){
		app.Data.getCountriesList(function(data) {
			app.View.viewCountriesList(data);
			pdrscroll.refresh("all-primas");
		}, true);
	});
	
	lng.dom("#article-prima-value").on("pulldownrefresh", function(){
		var cc = lng.Data.Cache.get("current-country");
		app.Data.getCountry(cc.country_code, function(data) {
			app.View.viewCountry(data);
			pdrscroll.refresh("article-prima-value");
		}, true);
	});
	
	lng.dom("#favourite-primas").on("pulldownrefresh", function(){
		app.Data.getFavourites(function(data) {
			app.View.viewFavourites(data);
			pdrscroll.refresh("favourite-primas");
		}, true);
	});
	
	lng.dom("#section-main li a[data-country]").tap(function(evt) {
		//first clean country section to prevent showing previous country while loding:
		lng.dom("#article-prima-value").html("");
		lng.dom("#article-prima-value").style("background-image", "none");
//		lng.dom("#article-prima-value").style("background-color", "#EDEDED");
		lng.dom("#article-prima-value").style("background-color", "gray");
		//get clicked country
		var country = lng.dom(this).data("country");
		var country_name = $$(this).children(".country-name").text();
		//change title
		lng.dom("#section-prima-country header .title").text("Prima de " + country_name);
		//print country
		app.Data.getCountry(country, app.View.viewCountry);
	});
	
	//change picture when click on change-picture btn
	lng.dom("#change-picture").tap(function(evt){
		app.PhotoManager.getPhoto(null, app.View.changePicture);
	});
	
	//add or remove from favourites when add-to-fav-btn is clicked
	lng.dom("#add-to-fav-btn").tap(function(evt) {
		var country = lng.Data.Cache.get("current_country");
		lng.Data.Sql.select("favourites", {"country_code": country.country_code}, function(dbres){
			//if is in favourites, remove it. Else add it
			if (dbres && dbres.length > 0) {
				app.Data.removeFavourite(country["country_code"]);
				lng.Sugar.Growl.notify("Favoritos", "País quitado de favoritos", "star", "info", 2);
				lng.dom("#add-to-fav-btn").html("<span class='icon star'></span>Añadir a Favoritos");
			} else {
				app.Data.addFavourite(country["country_code"]);
				lng.Sugar.Growl.notify("Favoritos", "País añadido a favoritos", "star", "info", 2);
				lng.dom("#add-to-fav-btn").html("<span class='icon star'></span>Quitar de Favoritos");
			}
			console.log("geting favourites to refresh");
			setTimeout(function(){
				app.Data.getFavourites(app.View.viewFavourites);
			},600);
			lng.Router.aside("section-prima-country", "menu-prima-country");
		});
	});
	
	//hide or show prima
//	lng.dom("#article-prima-value").on("tap", function(evt) {
//		if (! Device.isFree()) {
//			console.log("tap on prima");
//			var ishidden = lng.dom("#article-prima-value .prima").style("visibility") == "hidden";
//			if (ishidden) {
//	//			$$("#article-prima-value .prima").show();
//				lng.dom("#article-prima-value .prima").style("visibility", "visible");
//			} else {
//	//			$$("#article-prima-value .prima").hide();
//				lng.dom("#article-prima-value .prima").style("visibility", "hidden");
//			}
//		}
//	});
	
	lng.dom("#article-prima-value .prima").tap( function(evt) {
		if (! Device.isFree()) {
			var $this = lng.dom("#article-prima-value .prima");
			var ishidden = $this.hasClass("minified");
			if (ishidden) {
				$this.removeClass("minified");
			} else {
				$this.addClass("minified");
			}
		}
	});
	
	lng.dom(document).on("backbutton", function(evt){
		var current_section = lng.Router.History.current();
		if (current_section == "#section-main") {
			var is_menu_open = lng.dom("#menu-main").hasClass("current");
			if (is_menu_open) {
				lng.Router.aside("section-main", "menu-main");
			} else {
				Device.exit();
			}
		} else {
			var is_menu_open = lng.dom("#menu-prima-country").hasClass("current");
			if (is_menu_open) {
				lng.Router.aside("section-prima-country", "menu-prima-country");
			} else {
				lng.Router.back();
			}
		}
	});
	
	// on hw menu button pressed show menu
	lng.dom(document).on("menubutton", function(evt){
		var current_section = lng.Router.History.current();
		if (current_section == "#section-prima-country") {
			lng.Router.aside("section-prima-country", "menu-prima-country");
		} else if (current_section == "#section-main") {
			lng.Router.aside("section-main", "menu-main");
		}
	});
	
	// refresh favourites when favourite-primas article is loaded
	lng.dom("#favourite-primas").on(lng.Constants.TRIGGER.LOAD, function(evt) {
		app.Data.getFavourites(app.View.viewFavourites);
	});
	
	//upload your prima:
	lng.dom("#share-your-prima-btn").tap(function(){
		lng.Router.aside("section-prima-country", "menu-prima-country");
	});
	
	lng.dom("#share-your-prima2-btn").tap(function(){
		lng.Router.aside("section-main", "menu-main");
	});
	
	lng.dom("#upload-url-btn").tap(function(){
		var url = lng.dom("#url-input").val();
		if (url && app.Utils.Valid.isURL(url)) {
			app.Services.uploadPrimaPicture(url);
			lng.dom("#url-input").val("");
		} else {
			lng.Sugar.Growl.show("Introduce una URL válida","", "warning", false, 3);
		}
	});
	
	
	//image cover/contain
	lng.dom("#img-cover-btn").tap(function(evt){
		evt.preventDefault();
		var span = $$(this).children("span");
		var is_cover = span.hasClass("icon-fullscreen");
		span.removeClass("icon-fullscreen").removeClass("icon-fullscreen-exit");
		
		if (is_cover) {
			lng.dom("#article-prima-value").style("background-size", "cover");
			lng.dom("#article-prima-value").style("-webkit-background-size", "cover");
			span.addClass("icon-fullscreen-exit");
		} else {
			lng.dom("#article-prima-value").style("background-size", "contain");
			lng.dom("#article-prima-value").style("-webkit-background-size", "contain");
			span.addClass("icon-fullscreen");
		}

	});
	
	lng.dom("#num-view-btn").tap(function() {
		app.View.setCountryView("numeric");
	});
	
	lng.dom("#chart-view-btn").tap(function() {
		var country = lng.Data.Cache.get("current_country");
		app.Services.loadPrimaHistory(country.country_code, 7, function(history){
			var $chart = $$("#prima-chart");
			$chart.hide().text(history.reverse().join());
			$chart.peity("line");
			$chart.show();
		});
		app.View.setCountryView("chart");
	});
	
	lng.dom(UNIMPLEMENTED_FEATURES.join(", ")).tap(function(){
		var options = [
           {
               name: 'Aceptar',
               icon: 'info',
               color: 'blue',
               callback: function() {
                   lng.Sugar.Growl.hide();
               }
           }
       ];
       lng.Sugar.Growl.option('Esta opción no está disponible aun', options);
	});
	
	lng.dom("#share-btn").tap(function(evt) {
		evt.preventDefault();
		var country = lng.Data.Cache.get("current_country");
		var country_name = country.name;
		var prima_value = country.prima_value;
		var photo = lng.Data.Cache.get("current_photo");
		var photo_url = photo.photo_url;
		Device.share("La prima de " + country_name + " está en " + prima_value + ". Pero esta prima si que tiene riesgo:\n"+photo_url+"\nMás primas en http://bit.ly/PFx7p2");
	});
	
	lng.ready(function(){
		_init();
	});
	
	return {

	}

})(LUNGO, App);