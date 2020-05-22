from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from api.models import Ticket
from api.serializers import TicketSerializer
from rest_framework.decorators import api_view

from rest_framework.response import Response

from .TicketStr import *

import logging
# Create your views here.

logger = logging.getLogger(__name__)


@api_view(['GET'])
def apiOverview(request):

    api_urls = {
        '[GET, POST] All tickets': '/tickets/',
        '[GET, PUT, DELETE] Specific ticket': '/tickets/<str:pk>',
    }

    return Response(api_urls)


@api_view(['GET', 'POST'])
def ticketList(request):

    if request.method == 'GET':
        tickets = Ticket.objects.all()
        
        tickets_serializer = TicketSerializer(tickets, many=True)
        return JsonResponse(tickets_serializer.data, safe=False)

    elif request.method == 'POST':
        ticket_data = JSONParser().parse(request)
        ticket_serializer = TicketSerializer(data=ticket_data)
        if ticket_serializer.is_valid():
            ticket_serializer.save()
            return JsonResponse(ticket_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(ticket_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


@api_view(['GET', 'PUT', 'DELETE'])
def ticketDetail(request, pk):
    # find ticket by pk (id)
    try:
        ticket = Ticket.objects.get(pk=pk)
    except Ticket.DoesNotExist:
        return JsonResponse({'message': 'The ticket does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET':
        ticket_serializer = TicketSerializer(ticket)
        return JsonResponse(ticket_serializer.data)
    
    elif request.method == 'PUT':
        ticket_data = JSONParser().parse(request)
        ticket_serializer = TicketSerializer(ticket, data=ticket_data)
        if ticket_serializer.is_valid():
            ticket_serializer.save()
            return JsonResponse(ticket_serializer.data)
        return JsonResponse(ticket_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    elif request.method == 'DELETE':
        ticket.delete()
        return JsonResponse({'message': 'Ticket deleted with success'}, status=status.HTTP_204_NO_CONTENT)

