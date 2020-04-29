from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('ticket-list/', views.ticketList, name="ticket-list"),
    path('ticket-detail/<str:pk>/', views.ticketDetail, name="ticket-detail"),
    path('ticket-create/', views.ticketCreate, name="ticket-create"),
    path('ticket-update/<str:pk>/', views.ticketUpdate, name="ticket-update"),
    path('ticket-delete/<str:pk>/', views.ticketDelete, name="ticket-delete"),
    path('ticket-simulation/', views.ticketSimulation, name="ticket-simulation"),
]
