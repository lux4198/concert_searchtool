# Generated by Django 4.0 on 2022-01-20 18:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('searchtool', '0006_alter_event_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='composers',
            field=models.TextField(max_length=200),
        ),
    ]
