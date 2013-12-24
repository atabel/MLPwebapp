do () ->
    describe 'App.services', () ->
        before ->
            window.t = (msg) -> msg


        it 'should have this API', ->
            services = App.Services
            expect(services).to.be.an 'object'
            expect(services).to.include.keys(
                'getCountriesList',
                'loadPrimaValue',
                'loadPrimaPicture',
                'uploadPrimaPicture',
                'loadPrimaHistory')


        describe '#getCountriesList', ->

            it 'should call a callback with a list of countries', ->
                expectedResult = [
                    name: 'España',
                    country_code: 'ES',
                    prima_value: 400,
                    prima_delta: 3,
                    prima_percent: 2.25
                ,
                    name: 'Italia',
                    country_code: 'IT',
                    prima_value: 300,
                    prima_delta: -2,
                    prima_percent: -2.5
                ]

                cache = sinon.stub Lungo.Service, 'cache', (url, data, time, cb) ->
                    cb expectedResult

                callback = sinon.spy()
                App.Services.getCountriesList callback
                expect(callback).to.be.calledWith expectedResult
                cache.restore()

        describe '#loadPrimaValue', ->

            it 'should call a callback with the prima value of the given country', ->
                expectedResult =
                    prima_percent: -2.08
                    name: 'España'
                    action: 'fromDatabase'
                    prima_delta: -5
                    prima_value: 235
                    country_code: 'ES'


                get = sinon.stub Lungo.Service, 'get', (url, data, cb) ->
                    cb expectedResult

                country = 'ES'
                callback = sinon.spy()
                App.Services.loadPrimaValue country, callback

                expect(get).to.be.calledWith App.Services.CONST.LOAD_PRIMA_URL + '?callback=?&country_code=' + country
                expect(callback).to.be.calledWith expectedResult
                get.restore()

        describe '#loadPrimaPicture', ->

            it 'should call a callback with a list of photos', (done) ->
                expectedResult = [
                    photo_url: "http://especiales.fhm.es/galerias/Sara_Sampaio_Calzedonia_2012/images/12_Sara_Sampaio_Calzedonia_2012.jpg",
                    provider: "http://www.fhm.es/",
                    country_code: "ALL"
                ,
                    photo_url: "http://especiales.fhm.es/galerias/Katrina_Bowden_Portada_De_FHM/images/Katrina_Bowden_En_FHM_01.jpg",
                    provider: "http://www.fhm.es/",
                    country_code: "ALL"
                ]

                callback = sinon.spy()
                get = sinon.stub Lungo.Service, 'get', (url, data, cb) ->
                    setTimeout (->
                        cb expectedResult
                        expect(callback).to.be.calledWith expectedResult
                        done()
                    ), 10
                    {}

                country = 'ES'
                App.Services.loadPrimaPicture country, callback

                expect(get).to.be.calledWith sinon.match(RegExp(App.Services.CONST.LOAD_PHOTO_URL))
                expect(get).returned sinon.match.hasOwn('whenLoaded')
                get.restore()

        describe '#uploadPrimaPicture', ->

            it 'should show a success feedback when the photo upload is OK', ->
                successResponse = result: "OK"
                get = sinon.stub Lungo.Service, 'get', (url, data, cb) ->
                    cb successResponse

                success = sinon.spy Lungo.Notification, 'success'

                photoUrl = 'http://example.com/photo.jpg'
                App.Services.uploadPrimaPicture photoUrl

                expect(get).to.be.calledWith sinon.match(RegExp(App.Services.CONST.UPLOAD_PHOTO_URL))
                expect(success).to.be.called
                get.restore()

            it 'should show an error feedback when the photo upload fails', ->
                errorResponse = result: "ERROR"
                get = sinon.stub Lungo.Service, 'get', (url, data, cb) ->
                    cb errorResponse

                error = sinon.spy Lungo.Notification, 'error'

                photoUrl = 'http://example.com/photo.jpg'
                App.Services.uploadPrimaPicture photoUrl

                expect(get).to.be.calledWith sinon.match(RegExp(App.Services.CONST.UPLOAD_PHOTO_URL))
                expect(error).to.be.called
                get.restore()


