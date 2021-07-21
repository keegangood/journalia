# journals URLs

from django.urls import path

from . import views

urlpatterns = [
    path('', views.journal_item_list),
    path('<str:start_date>&<str:end_date>&<str:date_interval>/', views.journal_item_list),
    path('detail/', views.journal_item_detail),
    path('update/', views.journal_item_detail),
    path('delete/', views.journal_item_delete)
]