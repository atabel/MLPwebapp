class __View.MLPView extends Monocle.View

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