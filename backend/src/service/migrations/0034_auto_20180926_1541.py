# Generated by Django 2.0 on 2018-09-26 15:41

from django.db import migrations, models
import django.db.models.deletion
import django.db.models.query_utils


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0033_auto_20180919_0008'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workingtime',
            name='content_type',
            field=models.ForeignKey(limit_choices_to=django.db.models.query_utils.Q(django.db.models.query_utils.Q(('app_label', 'service'), ('model', 'service'), _connector='AND'), django.db.models.query_utils.Q(('app_label', 'service'), ('model', 'item'), _connector='AND'), _connector='OR'), on_delete=django.db.models.deletion.CASCADE, related_name='wt_set', to='contenttypes.ContentType', verbose_name='Тип назначения'),
        ),
        migrations.AlterField(
            model_name='workingtimeexception',
            name='content_type',
            field=models.ForeignKey(limit_choices_to=django.db.models.query_utils.Q(django.db.models.query_utils.Q(('app_label', 'service'), ('model', 'service'), _connector='AND'), django.db.models.query_utils.Q(('app_label', 'service'), ('model', 'item'), _connector='AND'), _connector='OR'), on_delete=django.db.models.deletion.CASCADE, related_name='wte_set', to='contenttypes.ContentType', verbose_name='Тип назначения'),
        ),
    ]
