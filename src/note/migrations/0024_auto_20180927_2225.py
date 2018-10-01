# Generated by Django 2.1.1 on 2018-09-27 22:25

from django.db import migrations, models
import note.models


class Migration(migrations.Migration):

    dependencies = [
        ('note', '0023_auto_20180407_2250'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='is_approved',
            field=models.BooleanField(blank=True, default=note.models.get_default_approved, verbose_name='Одобрено'),
        ),
    ]