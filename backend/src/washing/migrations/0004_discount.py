# Generated by Django 2.1.1 on 2018-10-08 11:14

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0024_faculty'),
        ('washing', '0003_auto_20181002_0029'),
    ]

    operations = [
        migrations.CreateModel(
            name='Discount',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('discount', models.FloatField(default=1.0, validators=[django.core.validators.MinValueValidator(0.0), django.core.validators.MaxValueValidator(1.0)], verbose_name='Доля от цены')),
                ('faculty', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='discounts', to='user.Faculty', verbose_name='Факультет')),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='discounts', to='washing.Washing', verbose_name='Стиралка')),
            ],
            options={
                'verbose_name': 'Скидка',
                'verbose_name_plural': 'Скидки',
            },
        ),
    ]
