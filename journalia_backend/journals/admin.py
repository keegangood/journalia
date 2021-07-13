from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline, GenericInlineModelAdmin
from django.urls import reverse
from django.utils.html import format_html, format_html_join, escape, mark_safe

from .models import JournalItem


def get_link(instance):
    '''
    return a reverse route lookup for a particular admin instance
    '''
    model = instance._meta.model_name
    app = instance._meta.app_label

    return reverse(
        f"admin:{app}_{model}_change", args={instance.id}
    )


class JournalItemAdmin(admin.ModelAdmin):
    model = JournalItem

    list_display = (
        'title',
        'owner',
        'date_created',
        'content_object',
        'parent_object',
    )

    exclude = (
        'object_id'
        'parent_type',
        'parent_id',
        'child_type',
        'child_id',
        'content_type',
    )

    search_fields = (
        'owner__username',
        'date_created',
    )

    readonly_fields = (
        'content_object',
        'children',
        'parent_object',
    )

    def change_view(self, request, object_id, extra_context=None):
        self.exclude = (
            'parent_type',
            'parent_id',
            'child_type',
            'content_type',
            'child_id',
            'object_id',
        )
        return super(JournalItemAdmin, self).change_view(request, object_id, extra_context)

    def content_object(self, instance):
        '''Display a link to the content object for a particular JournalItem instance'''

        return format_html(
            '<a href="{}"> {} </a><br>',
            get_link(instance.content_object),
            instance.content_object
        )

    def parent_object(self, instance):
        '''populate the parent_object field for a particular JournalItem instance'''
        parent_object = instance.parent_object
        if parent_object:
            html = format_html(
                '<a href="{}"> {} </a><br>',
                get_link(parent_object), parent_object
            )
        else:
            html = None

        return html

    def children(self, instance):
        '''populate the 'children' field for a particular JournalItem'''

        return format_html_join(
            '', mark_safe('<a href="{}"> {} </a><br>'),
            ((get_link(child), child)
             for child in instance.children.all()),
        ) or None

    def title(self, instance):
        if instance and instance.content_object:
            return (f'{instance.id} - {instance.content_object.title}' )
        else:
            return 'None'

admin.site.register(JournalItem, JournalItemAdmin)
