from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Team, Activity, Leaderboard, Workout

User = get_user_model()

class APIRootTest(APITestCase):
	def test_api_root(self):
		url = reverse('api-root')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

class UserTest(APITestCase):
	def test_list_users(self):
		url = reverse('user-list')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

class TeamTest(APITestCase):
	def test_list_teams(self):
		url = reverse('team-list')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

class ActivityTest(APITestCase):
	def test_list_activities(self):
		url = reverse('activity-list')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

class LeaderboardTest(APITestCase):
	def test_list_leaderboard(self):
		url = reverse('leaderboard-list')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

class WorkoutTest(APITestCase):
	def test_list_workouts(self):
		url = reverse('workout-list')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
