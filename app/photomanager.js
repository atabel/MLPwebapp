App.PhotoManager = (function (lng, app, undefined) {
	
	var CACHE_LABEL_CURRENT_PHOTO = "current_photo";
	
	var _viewedPhotos = [];
	
	var _photoList = [];
	
	var addPhotos = function (photos) {
		if (! _.isArray(photos)) {
			photos = [photos];
		}
		
		_.each(photos, function(p) {
			_addPhoto(p);
		});
	};
	
	var getPhoto = function (country_code, callback, recur_times) {
		console.log("PHOTO REQUEST: ", country_code, "recur_times:", recur_times);
		console.log("_photoList:", _photoList);
		//recur_times is a recursive calls counter
		recur_times = recur_times || 0;
		
		var ret_list = _.filter(_photoList, function(p) {
			return ! p.viewed;
		});
		
		if (country_code) {
			console.log("filtering by country code");
			ret_list = _.filter(ret_list, function(p) {
				return p.country_code == country_code;
			});
		}
		console.log("_photoList_filtered:", ret_list);
		if (ret_list.length === 0) {
			if (recur_times > 2) {
				console.log("recurtimes exceded", recur_times, _photoList.length);
				_markAllAsUnviewed();
				callback(_returnRandomPhoto(_photoList));
			} else {
				console.log("get photos from server");
				app.Services.loadPrimaPicture(country_code, function (photos) {
					console.log("photos to add:", photos);
					addPhotos(photos);
					console.log("photos added _photoList:", _photoList);
					console.log("now recur...");
					getPhoto(country_code, callback, recur_times + 1);
				});
			}
		} else {
			callback(_returnRandomPhoto(ret_list));
		}
	};
	
	var has = function (photo) {
		return !! _.find(_photoList, function (p) {
			return p.photo_url == photo.photo_url;
		});
	};
	
	var _addPhoto = function(new_photo) {
		if (! has(new_photo)) {
			new_photo.viewed = false;
			new_photo.loaded = false;
			
			//precache photo:
			new_photo.img = _preloadImg(new_photo.photo_url, function() {
				new_photo.loaded = true;
				console.log("loaded IMG:", new_photo);
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
		img.src= imgurl;
		img.onload = onload_callback;
		return img;
	};
	
	var _returnRandomPhoto = function (plist) {
		var photo = _randomFromList(plist);
		_photoList = _.map(_photoList, function(p) {
			if (p.photo_url == photo.photo_url) {
				p.viewed = true;
				return p;
			} else {
				return p;
			}
		});
		lng.Data.Cache.set(CACHE_LABEL_CURRENT_PHOTO, photo);
		console.log("returned photo:", photo);
		_viewedPhotos.push(photo);
		return photo;
	};
	
	var _randomFromList = function (list) {
		return list[Math.floor(Math.random()*list.length)];
	};
	
	return {
		addPhotos : addPhotos,
		getPhoto: getPhoto,
		has: has
	};
	
})(Lungo, App);