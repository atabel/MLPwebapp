
describe 'App.Utils', ->

    describe '#isUrl', ->

        it 'should return true for "http://example.com"', ->
            expect(App.Utils.isUrl 'http://example.com').to.be.true

        it 'should return true for "http://www.example.com"', ->
            expect(App.Utils.isUrl 'http://www.example.com').to.be.true

        it 'should return true for "https://example.com"', ->
            expect(App.Utils.isUrl 'https://example.com').to.be.true

        it 'should return true for "ftp://example.com"', ->
            expect(App.Utils.isUrl 'ftp://example.com').to.be.true

        it 'should return true for "http://example.es/something"', ->
            expect(App.Utils.isUrl 'http://example.es/something').to.be.true

        it 'should return true for "http://example.es/something.jpg"', ->
            expect(App.Utils.isUrl 'http://example.es/something.jpg').to.be.true

        it 'should return true for "http://example.es/something?param=value&param2=6"', ->
            expect(App.Utils.isUrl 'http://example.es/something?param=value&param2=6').to.be.true

        it 'should return true for "http://example.es/something?param=value&param2=6#hash"', ->
            expect(App.Utils.isUrl 'http://example.es/something?param=value&param2=6#hash').to.be.true

        it 'should return false for "asdf://example.com"', ->
            expect(App.Utils.isUrl 'asdf://example.com').to.be.false

        it 'should return false for "example.com"', ->
            expect(App.Utils.isUrl 'example.com').to.be.false

        it 'should return false for "barco"', ->
            expect(App.Utils.isUrl 'barco').to.be.false
