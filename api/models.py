from django.db import models


class Ticket(models.Model):
    numberID = models.IntegerField(primary_key=True)
    subclass = models.CharField(
        max_length=200, default='', blank=True, null=True)
    category = models.CharField(
        max_length=200, default='', blank=True, null=True)
    lifecycle = models.CharField(
        max_length=200, default='', blank=True, null=True)
    description = models.CharField(
        max_length=200, default='', blank=True, null=True)
    incorpDate = models.DateTimeField(
        default='2020-01-01 00:00', blank=True, null=True)
    releaseDate = models.DateTimeField(
        default='2020-01-01 00:00', blank=True, null=True)
    effectivityDate = models.DateTimeField(
        default='2020-01-01 00:00', blank=True, null=True)
    complianceCalculatedDate = models.DateTimeField(
        default='2020-01-01 00:00', blank=True, null=True)
    overallCompliance = models.CharField(
        max_length=200, default='', blank=True, null=True)
    levelComplianceIndicator = models.CharField(
        max_length=200, default='', blank=True, null=True)
    complianceRollUp = models.CharField(
        max_length=200, default='', blank=True, null=True)
    productHierarchy = models.CharField(
        max_length=200, default='', blank=True, null=True)
    user = models.CharField(max_length=200, default='', blank=True, null=True)

    def __str__(self):
        return self.numberID
