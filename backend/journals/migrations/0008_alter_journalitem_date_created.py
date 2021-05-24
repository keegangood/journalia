# Generated by Django 3.2 on 2021-05-24 03:21

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('journals', '0007_alter_journalitem_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='journalitem',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='date created'),
            preserve_default=False,
        ),
    ]
