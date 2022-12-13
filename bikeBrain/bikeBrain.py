from random import seed
from random import randrange
import time
import json

# import requests


class Brain:
    """Class for bike brain"""

    def __init__(self, _id, session, start_time, position, battery_capacity):
        """Init"""
        self._id = _id
        self._session = session
        self._start_time = start_time
        self._position = position
        self._battery_capacity = battery_capacity

        self._speed = 0
        self._is_locked = True
        self._is_whole = True
        self._is_charging = False
        self._is_blocked = False
        self._is_rented = False
        self._is_warning_battery = False
        self._is_battery_depleted = False

        self._battery_decrease = 5
        self._breaking_probability = 5

        self._journey_log_start_position = position
        self._journey_log_start_time = 0.0

        self._report_interval = 10
        self._default_report_interval = 10
        self._moving_report_interval = 5

        self._current_user = None

        seed(self._id)

    def get_id(self):
        """Gets _id"""
        return self._id

    def get_is_locked(self):
        """Gets is locked status"""
        return self._is_locked

    def set_is_locked(self, is_locked):
        """Sets is locked status"""
        self._is_locked = is_locked

    def get_battery_capacity(self):
        """Gets battery capacity"""
        return self._battery_capacity

    def set_battery_capacity(self, battery_capacity):
        """Sets battery capacity"""
        self._battery_capacity = battery_capacity

    def get_battery_decrease(self):
        """Gets battery decrease value"""
        return self._battery_decrease

    def set_battery_decrease(self, battery_decrease):
        """Sets battery decrease value"""
        self._battery_decrease = battery_decrease

    def get_position(self):
        """Gets position"""
        return self._position

    def set_position(self, coordinates):
        """Sets position"""
        self._position["coordinates"] = coordinates

    def get_speed(self):
        """Gets speed"""
        return self._speed

    def set_speed(self, speed):
        """Sets speed"""
        self._speed = speed

    def get_journey_log_start_position(self):
        """Get start position"""
        return self._journey_log_start_position

    def set_journey_log_start_position(self, position):
        """Set log for startposition"""
        self._journey_log_start_position = position

    def set_journey_log_start_time(self, a_time):
        """Set log start time"""
        self._journey_log_start_time = a_time

    def get_journey_log_start_time(self):
        """Get log start time"""
        return self._journey_log_start_time

    def set_current_user(self, user_id):
        """Set current user"""
        self._current_user = user_id
        self._position["properties"]["userid"] = user_id

    def get_current_user(self):
        """Get current user"""
        return self._current_user

    def set_start_time(self, a_time):
        """Set start time"""
        self._start_time = a_time

    def get_start_time(self):
        """Get start time"""
        return self._start_time

    def get_report_interval(self):
        """Gets report interval"""
        return self._report_interval

    def set_report_interval(self, value):
        """Sets report interval"""
        self._report_interval = value

    # Statuses
    def get_is_whole(self):
        """Gets is_whole"""
        return self._is_whole

    def set_is_whole(self, status):
        """Sets is_whole"""
        self._is_whole = status
        self._position["properties"]["whole"] = status

    def get_is_charging(self):
        """Gets is_charging"""
        return self._is_charging

    def set_is_charging(self, status):
        """Sets i_charging"""
        self._is_charging = status
        self._position["properties"]["charging"] = status

    def get_is_blocked(self):
        """Gets is_blocked"""
        return self._is_blocked

    def set_is_blocked(self, status):
        """Sets is_blocked"""
        self._is_blocked = status
        self._position["properties"]["blocked"] = status

    def get_is_warning_battery(self):
        """Sets _is_warning_battery"""
        return self._is_warning_battery

    def set_is_warning_battery(self, status):
        """Sets _is_warning_battery"""
        self._is_warning_battery = status
        self._position["properties"]["batterywarning"] = status

    def get_is_battery_depleted(self):
        """Get _is_battery_depleted"""
        return self._is_battery_depleted

    def set_is_battery_depleted(self, status):
        """Sets _is_battery_depleted"""
        self._is_battery_depleted = status
        self._position["properties"]["batterydepleted"] = status

    def get_rented(self):
        """Gets rented status"""
        return self._is_rented

    def set_rented(self, status):
        """Sets rented status"""
        self._is_rented = status
        self._position["properties"]["rented"] = status

    # Is bike breaking down during move?
    async def check_health(self):
        """Check health"""
        if self.get_battery_capacity() < 20:
            self.set_is_warning_battery(True)
        elif self.get_battery_capacity() <= 0:
            self.set_speed(0)
            self.set_is_blocked(True)
            self.set_is_battery_depleted(True)
            await self.lock()

        if randrange(1, 100) <= self._breaking_probability:
            print("Breaking tyre")
            self.set_speed(0)
            self.set_is_blocked(True)
            self.set_is_whole(False)
            await self.lock()

    # Move the bike to new coordinates
    async def move(self, coordinates):
        """Moves the bike to new position"""
        if not self.get_is_locked():
            if not self.get_is_blocked():
                self.set_position(coordinates)
                self.set_battery_capacity(
                    self.get_battery_capacity() - self._battery_decrease
                )
                await self.check_health()
        else:
            self.set_report_interval(self._moving_report_interval)

    # Report bike's position
    async def report_position(self):
        """Reports position"""
        interval = time.time() - self.get_start_time()
        if interval > self.get_report_interval():
            # Set start_time to begin counting against the interval again
            self.set_start_time(time.time())

            position = self.get_position()

            payload = {"position": position}

            async with self._session.put(
                f"http://server:3000/bikes/{self.get_id()}", json=payload
            ) as resp:
                result = await resp.json()
                # handle result eg. set status to blocked depending on
                # selfs status or position

            return payload

    # Unlock the bike and set statuses for new journey
    def unlock(self, user_id):
        """Unlock"""
        if not self.get_is_blocked():
            self.set_is_locked(False)
            self.set_report_interval(self._moving_report_interval)
            self.set_journey_log_start_time(time.time())
            pos_dict = json.loads(json.dumps(self.get_position()))
            self.set_journey_log_start_position(pos_dict)
            self.set_current_user(user_id)
            self.set_rented(True)

    # Lock the bike and report the journey
    async def lock(self):
        """Lock"""
        self.set_is_locked(True)
        self.set_rented(False)
        self.set_report_interval(self._default_report_interval)

        payload = {
            "startpostion": self.get_journey_log_start_position(),
            "endposition": self.get_position(),
            "starttime": self.get_journey_log_start_time(),
            "endtime": time.time(),
            "user-id": self.get_current_user(),
            "bike-id": self.get_id(),
        }

        async with self._session.post(
            "http://server:3000/trips/", json=payload
        ) as resp:
            result = await resp.json()
            # Handle result if necessary

        self.set_current_user(None)
        print("Travel done")
