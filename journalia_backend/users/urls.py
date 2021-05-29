# users/urls.py

from django.urls import path

from . import views

urlpatterns = [
    path('', views.register), # POST - create
    path('auth/', views.auth), # GET - get logged in user
    path('login/', views.login), # POST - login user
    path('token/', views.extend_token), # GET - request new access tokens
    path('<int:pk>/', views.user_detail), # GET, PUT - read/update
    path('logout/', views.logout), # POST - delete tokens
]