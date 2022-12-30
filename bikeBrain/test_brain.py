"""Tests for bikeBrain"""

import unittest
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
            bike_token = ("1",)
            start_time = time.time()
            brain = bikeBrain.Brain(_id, session, bike_token, start_time, position)
            self.assertIsInstance(brain, bikeBrain.Brain)
            self.assertEqual(brain.get_id(), 1)
            await brain.lock()
            # await brain.report_position()
