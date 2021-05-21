from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline, GenericInlineModelAdmin
from django.urls import reverse
from django.utils.html import format_html, format_html_join, escape, mark_safe

from .models import JournalItem

def get_link(instance): return reverse(
            "admin:journals_journalitem_change", args=[instance.id])

class JournalItemAdmin(admin.ModelAdmin):
    model = JournalItem

    list_display = ('owner', 'date_created', 'parent_object', )

    exclude = ('parent_type', 'parent_id', 'child_type', 'child_id', 'content_type', 'object_id')

    search_fields = ('owner__username', 'date_created', )

    readonly_fields = ( 'content_object', 'children', 'parent_object',)

    def content_object(self, instance):
        '''Display a link to the content object for a particular JournalItem instance'''
        return format_html('<a href="{}"> {} </a><br>', get_link(instance.content_object), instance.content_object)

    def parent_object(self, instance):
        '''populate the parent_object field for a particular JournalItem instance'''
        parent_object = instance.parent_object
        if parent_object:
            html = format_html('<a href="{}"> {} </a><br>', get_link(parent_object), parent_object)
        else:
            html = None

        return html

    def children(self, instance):
        '''populate the 'children' field for a particular JournalItem'''

        return format_html_join('', mark_safe('<a href="{}"> {} </a><br>'),
                                ((get_link(child), child)for child in instance.children.all()),
                                ) or None



admin.site.register(JournalItem, JournalItemAdmin)
