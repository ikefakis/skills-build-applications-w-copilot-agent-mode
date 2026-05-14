from rest_framework import generics
from .models import User, Team, Activity, Leaderboard, Workout
from octofit_tracker.serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer

class UserList(generics.ListCreateAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer

class TeamList(generics.ListCreateAPIView):
	queryset = Team.objects.all()
	serializer_class = TeamSerializer

class ActivityList(generics.ListCreateAPIView):
	queryset = Activity.objects.all()
	serializer_class = ActivitySerializer

class LeaderboardList(generics.ListCreateAPIView):
	queryset = Leaderboard.objects.all()
	serializer_class = LeaderboardSerializer

class WorkoutList(generics.ListCreateAPIView):
	queryset = Workout.objects.all()
	serializer_class = WorkoutSerializer
