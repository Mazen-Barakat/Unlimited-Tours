from django.contrib import admin
from . import models

# Register your models here.

admin.site.register(models.Tours)
admin.site.register(models.Destinations)
admin.site.register(models.TourFacilitiesIncluded)
admin.site.register(models.TourFacilities)
admin.site.register(models.TourPrograms)
admin.site.register(models.Gallery)
