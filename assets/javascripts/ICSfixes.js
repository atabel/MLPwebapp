(function() {

	var oldsection = LUNGO.Router.section;
	LUNGO.Router.section = function(section_id) {
		$$("section").addClass("ontransition");
		setTimeout(function() {
			oldsection(section_id);
		}, 0);
	};
	
	var oldback = LUNGO.Router.back;
	LUNGO.Router.back = function() {
		$$("section").addClass("ontransition");
		setTimeout(oldback, 0);
	};

	$$("body").on("webkitTransitionEnd", "section", function(evt) {
		$$("section").removeClass("ontransition");
	});
	
})();