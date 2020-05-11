from django.db import models


class Ticket(models.Model):
    numberID = models.IntegerField(primary_key=True)
    impactedUser = models.CharField(
        max_length=200, default='', blank=True, null=True)
    subclass = models.CharField(
        max_length=200, default='', blank=True, null=True)
    category = models.CharField(
        max_length=200, default='', blank=True, null=True)
    state = models.CharField(
        max_length=200, default='', blank=True, null=True)
    summary = models.CharField(
        max_length=200, default='', blank=True, null=True)
    causingCI = models.CharField(
        max_length=200, default='', blank=True, null=True)
    assignedTo = models.CharField(
        max_length=200, default='', blank=True, null=True)
    openDate = models.DateTimeField(
        default='2020-01-01 00:00', blank=True, null=True)
    assignedDate = models.DateTimeField(
        default='2020-01-01 00:00', blank=True, null=True)
    resolutionDate = models.DateTimeField(
        default='2020-01-01 00:00', blank=True, null=True)
    closedDate = models.DateTimeField(
        default='2020-01-01 00:00', blank=True, null=True)
    escalationDate = models.DateTimeField(
        default='2020-01-01 00:00', blank=True, null=True)
    notes = models.CharField(
        max_length=200, default='', blank=True, null=True)

    def __str__(self):
        return self.numberID
