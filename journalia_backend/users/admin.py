from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import ugettext_lazy as _
from .models import User, RefreshToken


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    """Define admin model for custom User model with no email field."""

    # exclude=('password',)

    fieldsets = (
        (None, {'fields': ('email', 'username')}),
        (_('Personal info'), {
         'fields': ('first_name', 'last_name', 'timezone')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'username', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'username', 'first_name', 'last_name')
    ordering = ('email',)

    def formfield_for_choice_field(self, db_field, request, **kwargs):
        if db_field == 'timezone':
            kwargs['choices'] = timezones

        return super().formfield_for_choice_field(db_field, request, **kwargs)


admin.site.register(RefreshToken)
