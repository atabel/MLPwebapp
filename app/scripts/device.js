
(function (lng) {
	var IS_FREE = false;


	var isFree = function () {
		return IS_FREE;
	};

	var isOnline = function () {
		return true;
	};

	var share = function (msg) {
		console.log("SHARE BTN CLICKED", msg);
	};

	var exit = function () {
		console.log("user wants to EXIT");
	};

	var _init = function () {
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

	window.Device = window.Device || {};
	window.Device.isFree = window.Device.isFree || isFree;
	window.Device.isOnline = window.Device.isOnline || isOnline;
	window.Device.share = window.Device.share || share;
	window.Device.exit = window.Device.exit || exit;

})(Lungo);