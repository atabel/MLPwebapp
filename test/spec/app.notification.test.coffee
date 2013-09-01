
do () ->
    describe 'App.notification', () ->
        lngNotification = {}

        beforeEach ->
            lngNotification =
                show : sinon.spy()
                hide : sinon.spy()


        it 'should return an object', ->
            notification = App.notification()
            expect(notification).to.be.an 'object'
            expect(notification).to.include.keys 'show', 'hide'



        it 'should call Lungo.Notification.show when show is called', () ->
            notification = App.notification lngNotification

            notification = App.notification lngNotification
            notification.show()

            expect(lngNotification.show.calledOnce).to.be.true


        it 'should call Lungo.Notification.show once when show is called twice and hide is never called', ->
            notification = App.notification lngNotification

            notification.show()
            expect(lngNotification.show.calledOnce).to.be.true
            notification.show()
            expect(lngNotification.show.calledOnce).to.be.true


        it 'should call Lungo.Notification.show twice when show is called twice and hide is called between show calls', ->
            notification = App.notification lngNotification

            notification.show()
            expect(lngNotification.show.calledOnce).to.be.true

            notification.hide()
            notification.show()
            expect(lngNotification.show.calledTwice).to.be.true


        it 'should never call Lungo.Notification.hide if show has not been called before', ->
            notification = App.notification lngNotification

            notification.hide()
            expect(lngNotification.hide.called).to.be.false


        it 'should call Lungo.Notification.hide if show has been called before', ->
            notification = App.notification lngNotification

            notification.show()
            notification.hide()
            expect(lngNotification.show.calledOnce).to.be.true
            notification.hide()
            expect(lngNotification.show.calledOnce).to.be.true


        it 'should only call Lungo.Notification.hide when hide is called and #show calls - #hide calls is 0', ->
            notification = App.notification lngNotification

            notification.show() # +1 = 1
            expect(lngNotification.show.calledOnce).to.be.true
            notification.show() # +1 = 2
            expect(lngNotification.show.calledOnce).to.be.true
            notification.hide() # -1 = 1
            expect(lngNotification.hide.called).to.be.false
            notification.show() # +1 = 2
            expect(lngNotification.show.calledOnce).to.be.true
            notification.hide() # -1 = 1
            expect(lngNotification.hide.called).to.be.false
            notification.hide() # -1 = 0 -> call lng hide
            expect(lngNotification.hide.calledOnce).to.be.true
