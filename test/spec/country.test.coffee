
describe '__Model.Country', ->
    fields =
        name: 'España'
        country_code: 'ES'
        prima_value: 400
        prima_delta: 3
        prima_percent: 2.25

    fields2 =
        name: 'Italia'
        country_code: 'IT'
        prima_value: 300
        prima_delta: 4
        prima_percent: 3.10

    describe 'country creation', ->

        it 'should create a country with the given fields', ->
            country = __Model.Country.create fields

            expect(country.name).to.be.equal fields.name
            expect(country.country_code).to.be.equal fields.country_code
            expect(country.prima_value).to.be.equal fields.prima_value
            expect(country.prima_delta).to.be.equal fields.prima_delta
            expect(country.prima_percent).to.be.equal fields.prima_percent

        describe '#updateOrCreate', ->

            it 'should create a new country when does not exist one with the given country_code', ->
                country = __Model.Country.updateOrCreate country_code : 'ES'
                expect(country).to.be.instanceOf __Model.Country

            it 'should update the fiends of a country with the given country_code', ->
                country = __Model.Country.updateOrCreate
                    country_code : 'ES'
                    prima_value : 200
                expect(country.prima_value).to.be.equal 200
                expect(__Model.Country.all().length).to.be.equal 1
                __Model.Country.updateOrCreate
                    country_code : 'ES'
                    prima_value : 300
                expect(country.prima_value).to.be.equal 300
                expect(__Model.Country.all().length).to.be.equal 1

    describe 'favourites', ->

        it 'should not be favourite by default', ->
            country = __Model.Country.create fields
            expect(country.favourite).to.be.falsy

        it 'should be able to mark and unmark a country as favourite', ->
            country = __Model.Country.create fields
            country.toggleFavourite()
            expect(country.favourite).to.be.true
            country.toggleFavourite()
            expect(country.favourite).to.be.false

        it 'should be able to get a list with the favourite countries', ->
            spain = __Model.Country.create fields
            italy = __Model.Country.create fields2
            spain.toggleFavourite()
            italy.toggleFavourite()

            favourites = __Model.Country.favourites()
            expect(favourites).to.be.an.array
            expect(favourites.length).to.be.equal 2

    describe 'active', ->

        it 'should not be active by default', ->
            country = __Model.Country.create fields
            expect(country.isActive()).to.be.false

        it 'should be able to mark a country as active', ->
            country = __Model.Country.create fields
            country.active()
            expect(country.isActive()).to.be.true

        it 'should be able to get the active country', ->
            country = __Model.Country.create fields
            country.active()
            activeCountry = __Model.Country.getActive()
            expect(activeCountry.isActive()).to.be.true
            expect(activeCountry).to.be.eql country

        it 'should not be more than one active country', ->
            spain = __Model.Country.create fields
            spain.active()
            italy = __Model.Country.create fields2
            italy.active()
            expect(spain.isActive()).to.be.false
            expect(italy.isActive()).to.be.true

    describe '#primaIsGrowing', ->

        it 'should return true when the prima value is growing', ->
            country = __Model.Country.create
                'country_code' : 'ES'
                'prima_delta' : 3.10

            expect(country.primaIsGrowing()).to.be.true

        it 'should return false when the prima value is not growing', ->
            country = __Model.Country.create
                'country_code' : 'ES'
                'prima_delta' : -3.10

            expect(country.primaIsGrowing()).to.be.false

    describe 'abs prima values', ->

        describe '#prima_delta_abs', ->

            it 'should return the absolute value of prima delta as string', ->
                country = __Model.Country.create
                    'country_code' : 'ES'
                    'prima_delta' : -3.1
                expectedPrimaDeltaAbs = '3.1'
                expect(country.prima_delta_abs()).to.be.equal expectedPrimaDeltaAbs

        describe '#prima_percent_abs', ->

            it 'should return the absolute value of prima delta as string', ->
                country = __Model.Country.create
                    'country_code' : 'ES'
                    'prima_percent' : -3.1
                expectedPrimaPercentAbs = '3.1'
                expect(country.prima_percent_abs()).to.be.equal expectedPrimaPercentAbs



    afterEach ->
        __Model.Country.destroyAll()
