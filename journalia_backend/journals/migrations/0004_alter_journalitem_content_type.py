# Generated by Django 3.2 on 2021-04-26 04:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        ('journals', '0003_alter_journalitem_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='journalitem',
            name='content_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='object_item', to='contenttypes.contenttype'),
        ),
    ]