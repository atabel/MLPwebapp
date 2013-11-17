App.PhotoManager = (function (lng, app, undefined) {

	var CACHE_LABEL_CURRENT_PHOTO = "current_photo";

	var _photoList = [];

	var _xhr;

	var addPhotos = function (photos) {
		if (! _.isArray(photos)) {
			photos = [photos];
		}

		_.each(photos, function(p) {
			_addPhoto(p);
		});
	};

	var getPhoto = function (country_code, callback, recur_times) {
		//recur_times is a recursive calls counter
		recur_times = recur_times || 0;

		var ret_list = _.filter(_photoList, function(p) {
			return !p.viewed;
		});

		if (country_code) {
			ret_list = _.filter(ret_list, function(p) {
				return p.country_code === country_code;
			});
		}
		if (ret_list.length === 0) {
			if (recur_times > 2) {
				_markAllAsUnviewed();
				callback(_returnRandomPhoto(_photoList));
			} else if (_xhr) {
				_xhr.whenLoaded(function () {
					getPhoto(country_code, callback, recur_times + 1);
				});
			} else {
				_xhr = app.Services.loadPrimaPicture(country_code, function (photos) {
					addPhotos(photos);
					getPhoto(country_code, callback, recur_times + 1);
					_xhr = null;
				});
			}
		} else {
			callback(_returnRandomPhoto(ret_list));
		}
	};

	var getPhotos = function(country_code, num, callback) {
		var i = 0;
		var photos = [];
		var fetchPhoto = function (photo) {
			photos.push(photo);
			if (photos.length >= num) {
				callback.call(callback, photos);
			}
		};

		for (i = 0; i < num; i++) {
			getPhoto(country_code, fetchPhoto);
		}
	};

	var has = function (photo) {
		return !! _.find(_photoList, function (p) {
			return p.photo_url == photo.photo_url;
		});
	};

	var _numImg = 0;
	var _addPhoto = function(new_photo) {
		if (! has(new_photo)) {
			new_photo.viewed = false;
			new_photo.loaded = false;

			//precache photo:
			new_photo.img = _preloadImg(new_photo.photo_url, function() {
				new_photo.loaded = true;
				_numImg++;
			});

			_photoList.push(new_photo);
		}
	};

	var _markAllAsUnviewed = function() {
		_photoList = _.map(_photoList, function(p) {
			p.viewed = false;
			return p;
		});
	};

	var _preloadImg = function (imgurl, onload_callback) {
		var img = new Image();
		img.src = imgurl;
		img.onload = onload_callback;
		return img;
	};

	var _returnRandomPhoto = function (plist) {
		var photo = _randomFromList(plist);
		_photoList = _.map(_photoList, function(p) {
			if (p.photo_url === photo.photo_url) {
				p.viewed = true;
			}
			return p;
		});
		lng.Cache.set(CACHE_LABEL_CURRENT_PHOTO, photo);
		return photo;
	};

	var _randomFromList = function (list) {
		return list[Math.floor(Math.random()*list.length)];
	};

	var init = function (callback) {
		app.Services.loadPrimaPicture(null, function (photos) {
			addPhotos(photos);
			callback();
		});
	};

	return {
		addPhotos : addPhotos,
		getPhoto: getPhoto,
		getPhotos: getPhotos,
		has: has,
		init: init
	};

})(Lungo, App);