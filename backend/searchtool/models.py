from django.db import models

# Create your models here.


class Event(models.Model):
    date = models.DateTimeField()
    city = models.CharField(max_length=50)
    composers = models.JSONField(max_length=200)
    pieces = models.JSONField(max_length=300)
    link = models.TextField(max_length=200)
    musicians = models.JSONField(max_length=300)




    def __str__(self):
        return str([self.musicians, self.pieces, self.composers])
    


