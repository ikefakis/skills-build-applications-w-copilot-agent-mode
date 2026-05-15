from datetime import date

from django.core.management.base import BaseCommand

from octofit_tracker.models import Activity, Leaderboard, Team, User, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()

        users = [
            User(username='clarkkent', email='superman@dc.com', first_name='Clark', last_name='Kent'),
            User(username='brucewayne', email='batman@dc.com', first_name='Bruce', last_name='Wayne'),
            User(username='dianaprince', email='wonderwoman@dc.com', first_name='Diana', last_name='Prince'),
            User(username='tonystark', email='ironman@marvel.com', first_name='Tony', last_name='Stark'),
            User(username='steverogers', email='captain@marvel.com', first_name='Steve', last_name='Rogers'),
            User(username='peterparker', email='spiderman@marvel.com', first_name='Peter', last_name='Parker'),
        ]
        User.objects.bulk_create(users)

        Team.objects.bulk_create([
            Team(name='marvel', members=['tonystark', 'steverogers', 'peterparker']),
            Team(name='dc', members=['clarkkent', 'brucewayne', 'dianaprince']),
        ])

        Activity.objects.bulk_create([
            Activity(user='clarkkent', type='Flight', duration=60, date=date(2026, 5, 1)),
            Activity(user='brucewayne', type='Martial Arts', duration=45, date=date(2026, 5, 2)),
            Activity(user='tonystark', type='Engineering', duration=120, date=date(2026, 5, 3)),
        ])

        Leaderboard.objects.bulk_create([
            Leaderboard(user='tonystark', score=300),
            Leaderboard(user='clarkkent', score=250),
            Leaderboard(user='brucewayne', score=200),
        ])

        Workout.objects.bulk_create([
            Workout(name='Super Strength', description='Power-focused workout for upper and lower body.', difficulty='advanced'),
            Workout(name='Web Agility', description='Agility and mobility circuit with plyometric intervals.', difficulty='intermediate'),
            Workout(name='Shield Conditioning', description='Endurance and core workout with interval training.', difficulty='beginner'),
        ])

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
