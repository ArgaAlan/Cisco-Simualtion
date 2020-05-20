from rest_framework import serializers
from .models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('id',
                    'numberID',
                    'impactedUser',
                    'subclass',
                    'category',
                    'state',
                    'summary',
                    'causingCI',
                    'assignedTo',
                    'openDate',
                    'assignedDate',
                    'closedDate',
                    'scalationDate',
                    'notes',
                    'issueCategory',
                    'issueReason')
    