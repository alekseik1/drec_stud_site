from django.shortcuts import render, redirect
from django.views.generic.base import TemplateView
from django.views.generic.detail import DetailView
from django.db.models import Q
from django.db import transaction
import datetime
from .models import Survey, Answer, AnswerData

# Create your views here.

class SurveyListView(TemplateView):
    template_name = 'survey_list.html'
    # get for last month
    def get_context_data(self, **kwargs):
        context = super(SurveyListView, self).get_context_data(**kwargs)
        now = datetime.datetime.now()
        #years = self.request.GET.get('years')
        #if years:
        #    queryset = queryset.filter(Q(started__year__in = years.split('-')) | Q(started__year__in = years.split('-'))).order_by('-started')
        answered = []
        if self.request.user.is_authenticated:
            answered = list(self.request.user.answers.filter(Q(survey__started__lte = now) & Q(survey__finished__gt = now)).values_list('survey__id', flat = True))
        queryset = Survey.objects.all()
        queryset_finished = list(queryset.filter(finished__lt = now))
        queyset_not_finished = list(queryset.filter(Q(started__lte = now) & Q(finished__gt = now)))
        queryset_now = []
        queryset_editable = []
        queryset_uneditable = []
        for q in queyset_not_finished:
            if q.id in answered:
                if q.allow_rewrite and not q.is_anonymous:
                    queryset_editable.append(q)
                else:
                    queryset_finished.append(q)
            else:
                queryset_now.append(q)

        context['survey_list_now'] = queryset_now
        context['survey_list_editable'] = queryset_editable
        context['survey_list_finished'] = queryset_finished
        return context

class SurveyDetailView(DetailView):
    model = Survey
    template_name = 'survey_detail.html'
    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('/')
        data = request.POST.dict()
        status = 'created'
        finished = False
        started = True
        survey = Survey.objects.all().filter(pk = data['survey_pk']).first()
        queryset = Answer.objects.all().filter(survey = survey, user = request.user)
        a_data = None
        if queryset.exists():
            a = queryset.first()
            if survey.allow_rewrite:
                status = 'edited'
                a_data = a.answer_data.first()
                a_data.value = data['survey_result']
                if not survey.is_anonymous:
                    a_data.answer = a
            else:
                status = 'noedit'
        else:
            a = Answer(survey = Survey.objects.all().filter(pk = data['survey_pk']).first(), user = request.user)
            a_data = AnswerData(value = data['survey_result'])
            a_data.survey = survey
        now = datetime.datetime.now()
        if a.survey.finished < now:
            finished = True
        elif a.survey.started > now:
            started = False
        else:
            with transaction.atomic():
                a.save()
                if a_data:
                    # querysets are lazy!
                    if not survey.is_anonymous and queryset.exists():
                        queryset = Answer.objects.all().filter(survey = survey, user = request.user)
                        a_data.answer = queryset.first()
                    a_data.save()
        return render(request, 'survey_thanks.html', {'status': status, 'finished': finished, 'started': started})

