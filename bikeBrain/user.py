import time
from random import seed


class User:
    """Class for user"""

    def __init__(self, _id, bike, travel_plan):
        """Init"""
        self._id = _id
        self.bike = bike
        self._travel_plan = travel_plan
        self._travel_plan_index = 0
        self._journey_start_time = 0
        self._move_interval = 1

        seed(self._id)

    def get_journey_start_time(self):
        """Get journey start time"""
        return self._journey_start_time

    def set_journey_start_time(self, a_time):
        """Set journey start time"""
        self._journey_start_time = a_time

    def set_move_interval(self):
        """Sets move interval based on speed and distance to next position"""
        # Calculate distance to next point in travel plan
        # Calculate the amount of time to reach next point based on current speed
        # Adjust move_interval

    async def begin_journey(self):
        """Begins journey"""
        await self.bike.unlock(self._id)
        print(self.bike.get_current_user())
        self.set_journey_start_time(time.time())
        self.bike.set_speed(15)

    async def move(self):
        """Moves to next point in travel plan"""
        if self.bike:
            if not self.bike.get_is_blocked():
                current_time = time.time()
                if current_time - self.get_journey_start_time() > self._move_interval:
                    print("user moving")
                    if self._travel_plan_index < len(self._travel_plan):
                        await self.bike.move(self._travel_plan[self._travel_plan_index])
                        self._travel_plan_index = self._travel_plan_index + 1
                        self._journey_start_time = current_time
                    else:
                        await self.bike.lock()
                        self.bike = None
            else:
                self.bike = None
