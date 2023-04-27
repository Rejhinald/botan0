from django.db import models
from django.conf import settings
import os, random
# Create your models here.

def get_filename_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext

def upload_image_path(instance, filename):
    new_filename = random.randint(1, 2541781232)
    name, ext = get_filename_ext(filename)
    final_name = '{new_filename}{ext}'.format(new_filename=new_filename, ext=ext)
    return "plants/{new_filename}/{final_name}".format(new_filename=new_filename, final_name=final_name)


class Plant(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=200, null=True, blank=True)
    season = models.CharField(max_length=200, null=True, blank=True)
    local_areas = models.TextField(null=True, blank=True)
    _id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.name

# class Subscription():
