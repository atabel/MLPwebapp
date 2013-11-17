root = exports ? this

App = root.App = root.App ? {}

Const = root.App.Const = root.App.Const ? {}

Const.LS_COUNTRY_CODE_LIST_KEY = 'country_code_list'

App.persist = (ls) ->

    get = (key) ->
        JSON.parse ls.getItem(key)

    set = (key, val) ->
        ls.setItem key, JSON.stringify(val)

    del = (key) ->
        ls.removeItem key

    get : get
    set : set
    del : del


App.Persist = App.persist(root.localStorage ?
    getItem: ->
    setItem: ->
    removeItem: ->
)