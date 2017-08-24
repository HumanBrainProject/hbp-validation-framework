def _get_url_args (request):

    try :
        ctxstate, format_ = request.META['QUERY_STRING'][4:].split("&")

        try :
            ctx, state = ctxstate.split("%26")

            state = state[11:]
 
            return ctx, state

        except :
            ctx = ctxstate
            state = None
            return ctx, state

    except:
        ctx = request.META['QUERY_STRING'][4:]
        state = None
        return ctx, state


def get_url_args (request):
    ctx, state = _get_url_args (request)

    if state != None :
        model_id  = state[6:]
      
        return (ctx, model_id)

    return (ctx, state)


def get_url_ctx (request):
    ctx, state = _get_url_args (request)
    return ctx
