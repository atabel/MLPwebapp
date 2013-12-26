
describe 'App.Persist', ->
    persist = null
    beforeEach ->
        persist = App.persist window.localStorage

    describe '#set and #get', ->

        it 'should be able to store and load a number', ->
            key = 'key'
            num = 5
            persist.set key, num
            expect(persist.get key).to.be.equal num

        it 'should be able to store and load a string', ->
            key = 'key'
            str = 'mystring'
            persist.set key, str
            expect(persist.get key).to.be.equal str

        it 'should be able to store and load an array', ->
            key = 'key'
            arr = ['item1', 'item2']
            persist.set key, arr
            expect(persist.get key).to.be.eql arr

        it 'should be able to store and load an object', ->
            key = 'key'
            obj =
                attr1 :
                    attr11 : 'asdf'
                    attr12 : [1, 2, 3]
                attr2 : 'lkj'
            persist.set key, obj
            expect(persist.get key).to.be.eql obj



    describe '#del', ->

        it 'should be able to delete a stored item', ->
            key = 'key'
            val = 5
            persist.set key, val
            expect(persist.get key).to.be.equal val
            persist.del key
            expect(persist.get key).to.be.null