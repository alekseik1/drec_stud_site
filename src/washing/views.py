from django.shortcuts import render
from django.http import HttpResponseRedirect

from service_item.views import ItemOrderingAbstractView
from .models import Washing, Order

# Create your views here.

class WashingDetailView(ItemOrderingAbstractView):
    model = Washing
    template_name = 'washing_timetable.html'
    context_object_name = 'service'
    def post(self, request, *args, **kwargs):
        # From ItemOrderingAbstractView
        status = self.order(request, Order, *args, **kwargs)
        return HttpResponseRedirect(self.status_to_url(status))
