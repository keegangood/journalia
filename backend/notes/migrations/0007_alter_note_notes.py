# Generated by Django 3.2 on 2021-04-24 21:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0006_note_notes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='notes',
            field=models.ManyToManyField(to='notes.Note'),
        ),
    ]