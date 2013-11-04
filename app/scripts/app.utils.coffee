root = exports ? this

App = root.App = root.App ? {}

App.Utils = do ->
    isUrl = (url) ->
        regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        regexp.test url


    isUrl: isUrl