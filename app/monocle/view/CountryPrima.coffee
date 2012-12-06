class __View.CountryPrima extends Monocle.View

	events:
		"tap div.prima-wrap": "onClickPrima"

	elements:
		".prima-value": "primaValue"
		".prima-delta": "primaDelta"
		".prima-percent": "primaPercent"

	container: "article#article-prima-value .prima"
	
	template_url: "app/resources/templates/prima.mustache"

	onClickPrima: (evt) ->
		@el.parent().toggleClass "minified"

	_html: (method, elements...) ->
		country = elements[0]
		country.is_growing = country.primaIsGrowing()
		super
		@el.parent().parent().parent().find("header .title").text "Prima de " + country.name
		# lng.dom("#add-to-fav-btn").html("<span class='icon star'></span>Quitar de Favoritos");
		# 		} else {
		# 			lng.dom("#add-to-fav-btn").html("<span class='icon star'></span>Añadir a Favoritos");
		$favBtn = Monocle.Dom "#add-to-fav-btn"
		if country.favourite
			$favBtn.find("strong").text("Quitar de favoritos")
			$favBtn.find("small").text("Elimiar este país de favoritos")
			$favBtn.find(".icon").removeClass("star-full").addClass("star")
		else
			$favBtn.find("strong").text("Añadir a favoritos")
			$favBtn.find("small").text("Añade este país a favoritos")
			$favBtn.find(".icon").removeClass("star").addClass("star-full")

