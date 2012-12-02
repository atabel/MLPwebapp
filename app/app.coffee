root = exports ? this

root.App = ((lng) ->
  
  #Define the LungoJS Application Instance
  lng.init
    name: "Mira la Prima"
    version: "2.0"
    resources: [
        "app/resources/sections/country.html"
        "app/resources/sections/uploadprima.html"
        "app/resources/sections/about.html"
    ]

  lng.ready ->
    if root.Device.isFree()
      $$("#section-prima-country .country-view-mode").hide()
      $$("#section-prima-country footer").addClass "transparent-footer"
      $$("body").addClass "free-version"
    
    unless lng.Core.environment().isMobile
      $$("#share-btn").parent().hide()
      $$("body").addClass "not-mobile"

  {}
)(Lungo)