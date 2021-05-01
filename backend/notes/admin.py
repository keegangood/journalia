from django.contrib import admin
from .models import Note

class NoteAdmin(admin.ModelAdmin):
    model = Note

    fields=('title',)
    readonly_fields=('children',)
admin.site.register(Note, NoteAdmin)
