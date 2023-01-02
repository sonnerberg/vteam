"""Tests for bikeBrain"""
from unittest.mock import MagicMock
from unittest import IsolatedAsyncioTestCase
import time
import aiohttp
import bikeBrain
import user as UserClass


class TestUser(IsolatedAsyncioTestCase):
    """
    Tests the user
    """

    async def test_creating_user(self):
        """Tests creation of user instance"""
        async with aiohttp.ClientSession() as session:
            session = MagicMock()
            position = {
                "properties": {
                    "whole": 1,
                    "batteryWarning": 0,
                    "batteryDepleted": 0,
                    "rented": 0,
                    "username": "1",
                    "charging": 0,
                    "blocked": 0,
                    "coordinates": [16.5, 59.5],
                }
            }

            _id = 1
            bike_token = "1"
            start_time = time.time()
            brain = bikeBrain.Brain(_id, session, bike_token, start_time, position)

            user_id = 1
            travel_plan = [[16, 19], [17, 18]]

            user = UserClass.User(user_id, brain, travel_plan)
            self.assertIsInstance(user, UserClass.User)

    async def test_start_journey(self):
        """Tests start journey"""
        async with aiohttp.ClientSession() as session:
            session = MagicMock()
            position = {
                "properties": {
                    "whole": 1,
                    "batteryWarning": 0,
                    "batteryDepleted": 0,
                    "rented": 0,
                    "username": "1",
                    "charging": 0,
                    "blocked": 0,
                    "coordinates": [16.5, 59.5],
                }
            }

            _id = 1
            bike_token = "1"
            start_time = time.time()
            brain = bikeBrain.Brain(_id, session, bike_token, start_time, position)

            user_id = 1
            travel_plan = [[16, 19], [17, 18]]

            user = UserClass.User(user_id, brain, travel_plan)
            await user.begin_journey()
            self.assertFalse(brain.get_is_locked())

    async def test_move(self):
        """Tests start journey"""
        async with aiohttp.ClientSession() as session:
            session = MagicMock()
            position = {
                "geometry": {
                    "coordinates": [16.5, 59.5],
                },
                "properties": {
                    "whole": 1,
                    "batteryWarning": 0,
                    "batteryDepleted": 0,
                    "rented": 0,
                    "username": "1",
                    "charging": 0,
                    "blocked": 0,
                },
            }

            _id = 1
            bike_token = "1"
            start_time = time.time()
            brain = bikeBrain.Brain(_id, session, bike_token, start_time, position)

            user_id = 1
            travel_plan = [[16, 19], [17, 18]]

            user = UserClass.User(user_id, brain, travel_plan)
            await user.begin_journey()
            time.sleep(1)
            await user.move()
            position = brain.get_position()
            coords = position["geometry"]["coordinates"]
            self.assertEqual(coords, travel_plan[0])
