from django.db import models

# Create your models here.


class Event(models.Model):
    date = models.DateTimeField()
    ensemble = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    conductor = models.CharField(max_length=50)
    artists = models.TextField(max_length=100)
    composers = models.TextField(max_length=100)
    pieces = models.TextField(max_length=100)



    def __str__(self):
        return str([self.ensemble, self.conductor, self.pieces])
    


