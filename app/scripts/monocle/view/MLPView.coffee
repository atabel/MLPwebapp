class __View.MLPView extends Monocle.View

    onBeforeRender: (method, elements...) ->
        [method, elements]

    onAfterRender: (method, elements...) ->
        @

    _translate: (el) ->
        document.webL10n.ready ->
            document.webL10n.translate el

    _html: (method, elements...) ->
        [method, elements] = @onBeforeRender method, elements...
        super method, elements...
        @_translate @el[0]
        @onAfterRender method, elements...
        @

    _loadTemplateFrom: (url) ->
        unless Monocle.Templates[url]
            loader = if $$? then $$ else $
            response = loader.ajax
                            url: url
                            async: false
                            dataType: 'text'
                            error: -> console.error arguments
            response = response.responseText unless $$?
            Monocle.Templates[url] = response

        @template = Monocle.Templates[url]