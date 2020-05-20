from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('tickets/', views.ticketList, name="ticket-list"),
    path('tickets/<str:pk>', views.ticketDetail, name="ticket-detail"),
]
