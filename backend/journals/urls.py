# journals URLs

from django.urls import path

from . import views

urlpatterns = [
    path('', views.journal_item_list)
]