# Generated by Django 3.2.5 on 2021-07-16 06:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_user_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='timezone',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='timezone'),
        ),
    ]
