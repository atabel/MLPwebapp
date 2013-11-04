class __View.Countryli extends __View.MLPView

	events:
		"tap li.country-li": "onClickLi"

	container: "article#all-primas ul"

	template_url: "templates/country_li.mustache"

	onClickLi: (evt) =>
		@model.active()