# Generated by Django 3.0.5 on 2020-04-29 01:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20200428_1943'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='complianceCalculatedDate',
            field=models.DateTimeField(blank=True, default='2020-01-01 00:00', null=True),
        ),
        migrations.AddField(
            model_name='ticket',
            name='effectivityDate',
            field=models.DateTimeField(blank=True, default='2020-01-01 00:00', null=True),
        ),
        migrations.AddField(
            model_name='ticket',
            name='incorpDate',
            field=models.DateTimeField(blank=True, default='2020-01-01 00:00', null=True),
        ),
        migrations.AddField(
            model_name='ticket',
            name='releaseDate',
            field=models.DateTimeField(blank=True, default='2020-01-01 00:00', null=True),
        ),
    ]
