App.View = (function(lng, app, undefined) {
	
	var prima_article_selector = "#article-prima-value";
	
	//create templates
	var prima_tpl_markup = lng.dom("#prima-tpl").text();
	lng.View.Template.create('prima-tpl', prima_tpl_markup);
	
	var country_li_markup = lng.dom("#country-li-tpl").text();
	lng.View.Template.create('country-li-tpl', country_li_markup);
	
	
	var viewCountry = function (country_data) {
		if (! country_data) {
			lng.dom(prima_article_selector).html("No hay datos de este país");
		} else {
			var prima_delta_pos = country_data.prima_delta >= 0;
			var prima_percent_pos = country_data.prima_percent >= 0;
			//absolute values
			var abs_country_data = _.clone(country_data);
			abs_country_data.prima_delta = Math.abs(country_data.prima_delta);
			abs_country_data.prima_percent = Math.abs(country_data.prima_percent);
			//fill template
			lng.View.Template.render(prima_article_selector, "prima-tpl", abs_country_data);
			
			//put up or down arrows and red or green color
			lng.dom(prima_article_selector + " .prima-delta")
				.removeClass("positive-val")
				.removeClass("negative-val")
				.addClass(prima_delta_pos ? "positive-val" : "negative-val")
				.prepend("<span class='icon " + (prima_delta_pos ? "up" : "down") + "'></span>");
			
			lng.dom(prima_article_selector + " .prima-percent")
				.removeClass("positive-val")
				.removeClass("negative-val")
				.addClass(prima_percent_pos ? "positive-val" : "negative-val")
				.prepend("<span class='icon " + (prima_percent_pos ? "up" : "down") + "'></span>");
			
			app.PhotoManager.getPhoto(null, changePicture);
			
			//change text of add-to-fav-btn
			lng.Data.Sql.select("favourites", {"country_code": country_data.country_code}, function(dbres){
				if (dbres && dbres.length > 0) {
					lng.dom("#add-to-fav-btn").html("<span class='icon star'></span>Quitar de Favoritos");
				} else {
					lng.dom("#add-to-fav-btn").html("<span class='icon star'></span>Añadir a Favoritos");
				}
			});
			
			//update prima-value in li elements:
			var cc = country_data.country_code;
			$$("li[data-country-code='"+cc+"'] .li-prima-value").text(country_data.prima_value);
			
			//pull down to refresh:
//			pdrscroll.init("article-prima-value");
			
			//hide chart and set numeric as active:
			setCountryView("numeric");
//			$$("#prima-chart").peity("line");
			  
		}
	};
	
	var changePicture = function (photo) {
//		var pic = photo.photo_url;
		var pic = photo.img.src;
//		$$(prima_article_selector).style("background", "url(" + pic + ") no-repeat center center fixed");
		$$(prima_article_selector)[0].style.backgroundImage = "url(" + pic + ")";
		$$("#photo-provider-link").attr("href", photo.provider);
	};
	
	var viewFavourites = function(countries_list){
		console.log("REFRESHING FAVOURITES: ", countries_list);
		var count_span = lng.dom("#favourites-tab-btn span.bubble.count");
		var exists_counter = count_span.length > 0;
		var count = countries_list.length;
		if (exists_counter) {
			if (count < 1) {
				console.log("removing conunter");
				count_span.remove();
			} else {
				console.log("setting counter to ", count);
				count_span.text("" + count);
			}
		} else if (count > 0) {
			console.log("initialicing counter to ", count);
			lng.View.Element.count('#favourites-tab-btn', count);
		}
		var config = {
		    el: '#favourite-primas',
		    template: 'country-li-tpl',
		    data: countries_list,
		    order: {
		        field: 'prima_value',
		        type: 'desc'
		    }
		};
		lng.View.Template.List.create(config);
		//pull down to refresh:
		pdrscroll.init("favourite-primas");
	};
	
	var viewCountriesList = function(countries_list){
//		countries_list = countries_list.concat(countries_list).concat(countries_list).concat(countries_list);
		var config = {
		    el: '#all-primas',
		    template: 'country-li-tpl',
		    data: countries_list,
		    order: {
		        field: 'prima_value',
		        type: 'desc'
		    }
		};
		lng.View.Template.List.create(config);
		//pull down to refresh:
		pdrscroll.init("all-primas");
	};
	
	var setCountryView = function (viewMode) {
		if (viewMode === "numeric") {
			$$("#num-view-btn, #chart-view-btn").removeClass("current");
			$$("#num-view-btn").addClass("current");
			$$("#prima-chart").hide();
			$$("#prima-numbers").show();
		} else if (viewMode === "chart") {
			$$("#num-view-btn, #chart-view-btn").removeClass("current");
			$$("#chart-view-btn").addClass("current");
			$$("#prima-numbers").hide();
			$$("#prima-chart").show();
		}
	};
	
	//asside options behave like buttons
	$$("#menu-prima-country").on("touchstart", "a", function(evt) { $$(this).addClass("current"); });
	$$("#menu-prima-country").on("mousedown", "a", function(evt) { $$(this).addClass("current"); });
	$$("#menu-prima-country").on("touchend", "a", function(evt) { $$(this).removeClass("current"); });
	$$("#menu-prima-country").on("mouseup", "a", function(evt) { $$(this).removeClass("current"); });
	$$("#menu-prima-country").on("mouseout", "a", function(evt) { $$(this).removeClass("current"); });
	
	//li behave like buttons
	$$(".list").on("touchstart", "li.country-li", function(evt) { $$(this).addClass("active"); });
	$$(".list").on("mousedown", "li.country-li", function(evt) { $$(this).addClass("active"); });
	$$(".list").on("touchend", "li.country-li", function(evt) { $$(this).removeClass("active"); });
	$$(".list").on("mouseup", "li.country-li", function(evt) { $$(this).removeClass("active"); });
	$$(".list").on("mouseout", "li.country-li", function(evt) { $$(this).removeClass("active"); });
	
	$$.fn.peity.defaults.line ={
	    colour: "rgba(5,184,226,0.3)",
	    strokeColour: "rgba(0,98,172,0.8)",
	    strokeWidth: 3,
	    delimiter: ",",
	    height: 50,
	    max: null,
	    min: 99999,
	    width: 200
	};
	
	//favicons in about section links
//	lng.ready(function(){
//		$$(".prima-source a[href^='http']").each(function() {
//		    $$(this).style("background", "url(http://g.etfv.co/" + this.href + ") left center no-repeat");
//		    $$(this).style("padding-left", "20px");
//		});
//	});
	
    return {
    	viewCountry: viewCountry,
    	changePicture: changePicture,
    	viewFavourites: viewFavourites,
    	viewCountriesList: viewCountriesList,
    	setCountryView: setCountryView
    }

})(LUNGO, App);