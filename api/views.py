from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TicketSerializer

from .models import Ticket

from .Markov import *
from .TicketStr import *

import logging
# Create your views here.

logger = logging.getLogger(__name__)


@api_view(['GET'])
def apiOverview(request):

    api_urls = {
        'List': '/ticket-list/',
        'Detail View': '/ticket-detail/<str:pk>',
        'Create': '/ticket-create/',
        'Update': '/ticket-update/<str:pk>/',
        'Delete': '/ticket-delete/<str:pk>/',
    }

    return Response(api_urls)


@api_view(['GET'])
def ticketList(request):
    tickets = Ticket.objects.all()
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def ticketSimulation(request):
    tickets = Ticket.objects.all()
    serializer = TicketSerializer(tickets, many=True)
    # logger.error(serializer.data[0]['lifecycle'])
    ticket_list = []
    for i in range(len(serializer.data)):
        logger.error("-------------------------------------------------")
        reason = serializer.data[i]['lifecycle']
        logger.error(reason)
        logger.error("-------------------------------------------------")
        initial_date = serializer.data[i]['incorpDate']
        logger.error(initial_date)
        logger.error("-------------------------------------------------")
        final_date = serializer.data[i]['releaseDate']
        logger.error(final_date)
        logger.error("-------------------------------------------------")
        ticket_list.append(TicketStr(reason, initial_date, final_date))
    markov = Markov("2020-10-01", 8)
    observations = markov.generate_matrix(ticket_list)
    simulation = markov.simulate(ticket_list)
    logger.error(observations)
    logger.error("-------------------------------------------------")
    logger.error(simulation)
    logger.error("-------------------------------------------------")
    return Response(simulation)


@api_view(['GET'])
def ticketDetail(request, pk):
    tickets = Ticket.objects.get(numberID=pk)
    serializer = TicketSerializer(tickets, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def ticketCreate(request):
    serializer = TicketSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['POST'])
def ticketUpdate(request, pk):
    ticket = Ticket.objects.get(numberID=pk)
    serializer = TicketSerializer(instance=ticket, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def ticketDelete(request, pk):
    ticket = Ticket.objects.get(numberID=pk)
    ticket.delete()

    return Response('Item succesfully delete!')
