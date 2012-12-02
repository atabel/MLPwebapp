class __View.Countryli extends Monocle.View

	container: "article#all-primas ul"

	# template: """
	# 	<li class="country-li" data-icon="user" data-country-code="{{country_code}}">
 #      		<a href="#section-prima-country" data-router="section" data-country="{{country_code}}">
 #        		<img src="assets/images/flags/{{country_code}}.png" class="icon" />
 #        		<span class="country-name">{{name}}</span>
 #        		<span class="right bubble red li-prima-value">{{prima_value}}</span>
 #      		</a>
 #    	</li>
	# 	"""
	
	template_url: "app/resources/templates/country_li.mustache"