# main/urls.py
from django.contrib import admin
from django.urls import path, include # add

urlpatterns = [
    path('admin/', admin.site.urls),

    # include user app urls
    path('', include('journals.urls')),
    path('users/', include('users.urls')),
    path('notes/', include('notes.urls')),

    # add login capability to browsable REST framework api, if desired
    path('api-auth/', include('rest_framework.urls')), # add (optional)
]