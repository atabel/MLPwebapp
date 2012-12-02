class CountryLstCtrl extends Monocle.Controller

	constructor: ->
		super
		__Model.Country.bind "create", @bindCountryCreate
		__Model.Country.bind "change", @bindCountryChange

	bindCountryCreate: (country) =>
		console.error "country created: ", country
		view = new __View.Countryli model: country
		view.append country

	bindCountryChange: (country) =>
		console.error "country changed: ", country
		@


__Controller.CountryLst = new CountryLstCtrl "article#all-primas"