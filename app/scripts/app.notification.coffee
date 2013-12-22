root = exports ? this

App = root.App = root.App ? {}

App.notification = (notifLib) ->
    numShows = 0

    hide : ->
        if numShows > 0
            numShows -= 1
            if numShows is 0
                notifLib.hide()

    show : ->
        if numShows is 0
            notifLib.show()
        numShows += 1

App.Notification = App.notification(Lungo?.Notification)