
(function (lng) {
    var IS_FREE = false;


    var isFree = function () {
        return IS_FREE;
    };

    var isOnline = function () {
        return true;
    };

    var share = function (data) {
        var msg = 'La prima de ' + data.countryName + ' está en ' + data.primaValue + '. Pero esta prima si que tiene riesgo:\n' + data.photoUrl + '\nMás primas en http://bit.ly/PFx7p2';
        if (typeof MozActivity !== 'undefined') {
            _downloadBlob(data.photoUrl, function (blob) {
                alert('opening activity');
                var a = new MozActivity({
                    name: 'share',
                    data: {
                        type: 'image/*',
                        number: 1,
                        blobs: [blob]
                    }
                });

                a.onerror = function(e) {
                    if (a.error.name === 'NO_PROVIDER') {
                        var errorMsg = navigator.mozL10n.get('share-noprovider');
                        alert(errorMsg);
                    } else {
                        console.warn('share activity error:', a.error.name);
                    }
                };
            });
        } else {
            console.log("SHARE BUTTON CLICKED", msg);
        }
    };

    var _downloadBlob = function (url, callback) {
        var xhr = new XMLHttpRequest({mozSystem: true});
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.addEventListener('load', function() {
            // Check img was successfully downloded
            // 0 is due to https://bugzilla.mozilla.org/show_bug.cgi?id=716491
            if (!(xhr.status === 200 || xhr.status === 0)) {
                console.log('Error downloading image ' + url + ': ' + xhr.status);
                return;
            }
            var blob = xhr.response;
            // Check the file is served as an image
            if (blob.type.split('/')[0] != 'image') {
                console.log('Response was not an image');
                return;
            }
            callback(blob);
        }, false);
        xhr.onerror = function getIconError() {
            console.log('Error fetching image ' + url);
        };
        xhr.send();
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