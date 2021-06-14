# Generated by Django 3.2 on 2021-06-12 06:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(blank=True, error_messages={'unique': 'This username has already been registered.'}, max_length=20, null=True, unique=True, verbose_name='username'),
        ),
    ]