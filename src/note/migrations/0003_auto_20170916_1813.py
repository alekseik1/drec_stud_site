# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-09-16 15:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('note', '0002_auto_20170916_1621'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='note',
            options={'ordering': ['order', 'name'], 'verbose_name': 'Заметку', 'verbose_name_plural': 'Заметки'},
        ),
        migrations.AddField(
            model_name='note',
            name='order',
            field=models.PositiveIntegerField(default=0, verbose_name='Порядок показа'),
        ),
    ]
