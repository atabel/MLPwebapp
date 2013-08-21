
window.Device = (function (Device, lng) {
	var IS_FREE = false;


	var isFree = function() {
		return IS_FREE;
	};

	var isOnline = function() {
		return true;
	};

	var share = function() {
		console.log("SHARE BTN CLICKED");
	};

	var exit = function () {
		console.log("user wants to EXIT");
	};

	var _init = function () {
		console.error("initializing hw button event handlers");
		lng.dom(document).on("backbutton", function(evt) {
			console.warn("back button pressed");
			var aside = lng.Element.Cache.aside;
			if (aside) {
				lng.Aside.hide();
			} else {
				var currentSection = lng.Router.history();
				if (currentSection === "section-main") {
					window.Device.exit();
				} else {
					lng.Router.back();
				}
			}
		});

		lng.dom(document).on("menubutton", function(evt){
			console.warn("menu button pressed");
			var currentSection = lng.Router.history();
			if (currentSection === "section-prima-country") {
				lng.Aside.toggle("menu-prima-country");
			} else if (currentSection === "section-main") {
				lng.Aside.toggle("menu-main");
			}
		});
	};

	lng.ready(function() {
		_init();
	});

	return _.extend({
		isFree: isFree,
		isOnline: isOnline,
		share: share,
		exit: exit
	}, Device);

})(window.Device || {}, Lungo);