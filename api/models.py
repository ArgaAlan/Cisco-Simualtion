from django.db import models


class Ticket(models.Model):
    numberID = models.CharField(max_length=15)
    impactedUser = models.CharField(max_length=200, blank=True)
    subclass = models.CharField(max_length=200, blank=True)
    category = models.CharField(max_length=200, blank=True)
    state = models.CharField(max_length=200, blank=True)
    summary = models.CharField(max_length=200, blank=True)
    causingCI = models.CharField(max_length=200, blank=True)
    assignedTo = models.CharField(max_length=200, blank=True)
    openDate = models.DateTimeField(null=True)
    assignedDate = models.DateTimeField(null=True)
    resolutionDate = models.DateTimeField(null=True)
    closedDate = models.DateTimeField(null=True)
    scalationDate = models.DateTimeField(null=True)
    notes = models.CharField(max_length=200, blank=True)
    issueCategory = models.CharField(max_length=200, blank=True)
    issueReason = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.numberID
