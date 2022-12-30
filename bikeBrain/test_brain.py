"""Tests for bikeBrain"""
from unittest.mock import MagicMock
from unittest import IsolatedAsyncioTestCase
import time
import aiohttp
import bikeBrain


class TestBrain(IsolatedAsyncioTestCase):
    """
    Tests the brain
    """

    async def test_creating_brain(self):
        """Tests creation of brain instance"""
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
            self.assertIsInstance(brain, bikeBrain.Brain)
            self.assertEqual(brain.get_id(), 1)
            # await brain.report_position()

    async def test_unlock(self):
        """Tests unlocking"""
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

            user_id = 1

            _id = 1
            bike_token = "1"
            start_time = time.time()
            brain = bikeBrain.Brain(_id, session, bike_token, start_time, position)
            await brain.unlock(user_id)
            self.assertFalse(brain.get_is_locked())
            # await brain.report_position()

    async def test_lock(self):
        """Tests locking"""
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

            user_id = 1

            _id = 1
            bike_token = "1"
            start_time = time.time()
            brain = bikeBrain.Brain(_id, session, bike_token, start_time, position)
            self.assertEqual(brain.get_id(), 1)
            await brain.unlock(user_id)
            await brain.lock()
            self.assertTrue(brain.get_is_locked())

    async def test_move(self):
        """Tests move"""
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

            coordinates = [16, 17]

            user_id = 1

            _id = 1
            bike_token = "1"
            start_time = time.time()
            brain = bikeBrain.Brain(_id, session, bike_token, start_time, position)
            await brain.unlock(user_id)
            await brain.move(coordinates)
            position = brain.get_position()
            new_coords = position["geometry"]["coordinates"]
            self.assertEqual(coordinates, new_coords)
