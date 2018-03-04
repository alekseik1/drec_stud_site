# Generated by Django 2.0 on 2018-03-04 22:29

from django.db import migrations, models
import precise_bbcode.fields


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0017_auto_20180304_1902'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='_announcements_rendered',
            field=models.TextField(blank=True, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='service',
            name='announcements',
            field=precise_bbcode.fields.BBCodeTextField(blank=True, no_rendered_field=True, null=True, verbose_name='Объявления'),
        ),
    ]
