
var App = (function(lng, undefined) {

    //Define the LungoJS Application Instance
    lng.init({
        name: 'Mira la Prima',
        version: '2.0',
        resources: [
            "app/resources/sections/country.html",
            "app/resources/sections/uploadprima.html",
            "app/resources/sections/about.html"
        ]
    });
    
    lng.ready(function(){
    	if (Device.isFree()) {
    		$$("#section-prima-country .country-view-mode").hide();
    		$$("#section-prima-country footer").addClass("transparent-footer");
    		$$("body").addClass("free-version");
    	}
        if (! lng.Core.environment().isMobile) {
            $$("#share-btn").hide();
            $$("body").addClass("not-mobile");
        }
    });

    return {

    };

})(Lungo);


