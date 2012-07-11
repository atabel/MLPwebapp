
Device = window.Device = window.Device || {};

Device.Const = {
	IS_FREE: false,
};

Device.isFree = Device.isFree || function() {return Device.Const.IS_FREE;};
Device.isOnline = Device.isOnline || function() {return true;};
Device.share = Device.share || function(){console.log("SHARE BTN CLICKED");};

Device.HWexit = Device.exit;
Device.exit = function () {
	console.log("user wants to EXIT");
	if (_.isFunction(Device.HWexit)) {
		lng.Data.Sql.execute("DROP TABLE IF EXISTS countries");
		Device.HWexit();
		console.log("EXIT");
	} else {
//		window.location.href = "http://www.example.com/#EXIT";
	}
};


