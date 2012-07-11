
var App = (function(lng, undefined) {

    //Define the LungoJS Application Instance
    lng.App.init({
        name: 'Mira la Prima',
        version: '0.1',
        resources: {
            sections: [
                "country.html",
                "uploadprima.html",
                "about.html"
            ]
        }
    });
    
    lng.ready(function(){
    	if (Device.isFree()) {
    		$$("#section-prima-country .country-view-mode").hide();
    		$$("#section-prima-country footer").addClass("transparent-footer");
    		$$("body").addClass("free-version");
    	}
    });

    return {

    };

})(LUNGO);


