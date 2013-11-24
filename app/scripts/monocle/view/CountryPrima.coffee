class __View.CountryPrima extends __View.MLPView

	instance = null

	@getInstance: (args...)->
		instance ?= new __View.CountryPrima(args...)

	events:
		"tap div.prima-wrap": "onClickPrima"
		"tap div.miniature" : "onClickMiniature"

	elements:
		".prima-value": "primaValue"
		".prima-delta": "primaDelta"
		".prima-percent": "primaPercent"

	container: "article#article-prima-value .prima"

	template_url: "templates/prima.mustache"


	constructor: ->
		super
		Monocle.Dom("#num-btn").on "tap", @onClickNum
		Monocle.Dom("#chart-btn").on "tap", @onClickChart

		Monocle.Dom(".miniature").on "tap", @onClickMiniature


	onClickPrima: (evt) =>
		@container
			.animate("minify", "forward")
			.addClass("minified")

		Monocle.Dom(".miniature")
			.animate("slide", "forward")


	onClickMiniature: (evt) =>
		@container
			.animate("minify", "backward")
			.removeClass("minified")

		Monocle.Dom(".miniature")
			.animate("slide", "backward")


	onClickNum: (evt) =>
		Monocle.Dom("#num-btn").addClass 'active'
		Monocle.Dom("#chart-btn").removeClass 'active'
		@container.removeClass "rotate-3d"


	onClickChart: (evt) =>
		Monocle.Dom("#chart-btn").addClass 'active'
		Monocle.Dom("#num-btn").removeClass 'active'
		@container.addClass "rotate-3d"

	onBeforeRender: (method, elements...) ->
		country = elements[0]
		country.is_growing = country.primaIsGrowing()
		Monocle.Dom(".prima").removeClass("minified").addClass "show"
		[method, elements]

	onAfterRender: (method, elements...) ->
		country = elements[0]
		countryName = t(country.country_code) or country.name
		@header = @el.parent().parent().parent().find "header .title"
		@header.text t("country-section-title", {country_name: countryName})

		$favBtn = Monocle.Dom "#add-to-fav-btn"
		if country.favourite
			$favBtn.find("strong").text t("remove-from-favs-aside")
			$favBtn.find("small").text t("remove-from-favs-aside-desc", {country_name: countryName})
			$favBtn.find(".icon").removeClass("star").addClass("star-empty")
		else
			$favBtn.find("strong").text t("add-to-favs-aside")
			$favBtn.find("small").text t("add-to-favs-aside-desc", {country_name: countryName})
			$favBtn.find(".icon").removeClass("star-empty").addClass("star")



