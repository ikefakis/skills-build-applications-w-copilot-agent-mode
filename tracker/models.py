from django.db import models

class User(models.Model):
	username = models.CharField(max_length=150)
	email = models.EmailField()
	first_name = models.CharField(max_length=30, blank=True)
	last_name = models.CharField(max_length=30, blank=True)

class Team(models.Model):
	name = models.CharField(max_length=100)
	members = models.JSONField(default=list, blank=True)

class Activity(models.Model):
	user = models.CharField(max_length=150)
	type = models.CharField(max_length=50)
	duration = models.IntegerField()
	date = models.DateField()

class Leaderboard(models.Model):
	user = models.CharField(max_length=150)
	score = models.IntegerField()

class Workout(models.Model):
	name = models.CharField(max_length=100)
	description = models.TextField()
	difficulty = models.CharField(max_length=20)
