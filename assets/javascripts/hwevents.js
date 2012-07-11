var hwevents = (function(){
	
	var fireDocumentEvent = function(type) {
		var evt = document.createEvent("Event");
		evt.initEvent(type, true, true);
		document.dispatchEvent(evt);
	}
	
	return {
		fireDocumentEvent: fireDocumentEvent
	}
	
})();