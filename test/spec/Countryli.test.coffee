
describe 'Countryli View', ->
    ELEM =
        COUNTRY : 'li.country-li'
        PRIMA_VALUE : '.count'
        NAME : '.country-name'
        FLAG_ICON : '.icon.flags-'

    fields =
        name: 'España'
        country_code: 'ES'
        prima_value: 400
        prima_delta: 3
        prima_percent: 2.25

    country = null
    container = null
    containerId = 'container-id'

    before (done)->
        window.t = (msg) -> msg
        country = __Model.Country.create fields
        $$ ->
            container = $$('<div id="' + containerId + '">')
            $$('body').append container
            done()

    it 'should print a <li> with the country info', ->
        view = new __View.Countryli model: country, container: "##{containerId}"
        view.html country
        countryLi = container.find(ELEM.COUNTRY)
        expect(countryLi.length).to.be.equal 1
        expect(countryLi.find(ELEM.PRIMA_VALUE).text()).to.be.equal String(fields.prima_value)
        expect(countryLi.find(ELEM.NAME).text()).to.be.equal fields.name
        expect(countryLi.find("#{ELEM.FLAG_ICON}#{fields.country_code}").length).to.be.equals 1

    it 'should be able to append multiple country <li>s to a container', ->
        view = new __View.Countryli model: country, container: "##{containerId}"
        view.html country
        view2 = new __View.Countryli model: country, container: "##{containerId}"
        view2.append country
        countryLi = container.find(ELEM.COUNTRY)
        expect(countryLi.length).to.be.equal 2

    afterEach ->
        container.html ''

