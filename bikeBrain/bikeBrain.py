from random import seed
from random import randrange
import time

# import requests


class Brain:
    """Class for bike brain"""

    def __init__(self, _id, session, start_time, position, battery_capacity):
        """Init"""
        self._position = position
        self._battery_capacity = battery_capacity
        self._speed = 0
        # self._acceleration_rate = 1
        # self._brake_rate = 1
        self._whole = True
        self._charging = False
        self._is_blocked = False
        self._is_rented = False
        self._is_warning_battery = False
        self._is_battery_depleted = False
        self._id = _id
        self._battery_decrease = 5
        self._breaking_lamp_probability = 5
        self._breaking_tyre_probability = 3
        self._report_interval = 10
        self._is_locked = True
        self._start_time = start_time
        self._current_time = 0.0
        self._log_start_position = position
        self._log_end_position = position
        self._log_start_time = 0.0
        self._log_end_time = 0.0
        self._current_user = None
        self._session = session
        self._default_report_interval = 10
        self._moving_report_interval = 5
        # Replace with new status [2, 2]
        # Maybe also a charging status [3, 3]?
        # self._is_rentable = true

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
        return self._battery_capacity

    def set_battery_capacity(self, battery_capacity):
        self.batteryCapacity = battery_capacity

    def get_battery_decrease(self):
        return self._battery_decrease

    def set_battery_decrease(self, battery_decrease):
        self._battery_decrease = battery_decrease

    def get_position(self):
        """Gets position"""
        return self._position

    def set_position(self, coordinates):
        """Sets position"""
        self._position["geometry"]["coordinates"] = coordinates

    def get_speed(self):
        """Gets speed"""
        return self._speed

    def set_speed(self, speed):
        """Sets speed"""
        self._speed = speed

    def get_acceleration_rate(self):
        """Gets acceleration rate"""
        return self._acceleration_rate

    def set_acceleration_rate(self, acceleration_rate):
        """Sets acceleration rate"""
        self._acceleration_rate = acceleration_rate

    def increase_speed(self):
        """Increase speed"""
        self.setSpeed(self.get_speed() + self.get_acceleration_rate)

    def get_brake_rate(self):
        """Gets brake rate"""
        return self._brake_rate

    def set_brake_rate(self, brake_rate):
        """Sets brake rate"""
        self._brake_rate = brake_rate

    def brake(self):
        """Decrease speed"""
        self.setSpeed(self.get_speed() - self.get_brake_rate)

    def stop(self):
        """Full stop"""
        self.set_speed(0)

    def get_log_start_position(self):
        """Get start position"""
        return self._log_start_position

    def set_log_start_position(self, position):
        """Set log for startposition"""
        self._log_start_position = position

    def get_log_end_position(self):
        """Get start position"""
        return self._log_end_position

    def set_log_end_position(self, position):
        """Set log for startposition"""
        self._log_end_position = position

    def set_log_start_time(self, time):
        """Set log start time"""
        self._log_start_time = time

    def get_log_start_time(self):
        """Get log start time"""
        return self._log_start_time

    def set_log_end_time(self, time):
        """Set log start time"""
        self._log_end_time = time

    def get_log_end_time(self):
        """Get log start time"""
        return self._log_end_time

    def report_status(self):
        """Reports status"""
        # print(f"Id: {self.get_id()}, status: {self.get_status()}")

    def set_current_user(self, user_id):
        """Set current user"""
        self._current_user = user_id
        self._position["geometry"]["properties"]["userid"] = user_id

    def get_current_user(self):
        """Get current user"""
        return self._current_user

    def set_start_time(self, a_time):
        """Set start time"""
        self._start_time = a_time

    def get_start_time(self):
        """Get start time"""
        return self._start_time

    def set_current_time(self, a_time):
        """Set current time"""
        self._current_time = a_time

    def get_current_time(self):
        """Get current time"""
        return self._current_time

    def get_report_interval(self):
        """Gets report interval"""
        return self._report_interval

    def set_report_interval(self, value):
        """Sets report interval"""
        self._report_interval = value

    def get_is_whole(self):
        """Gets is_whole"""
        return self._is_whole

    def set_is_whole(self, status):
        """Sets is_whole"""
        self._is_whole = status
        self._position["geometry"]["properties"]["whole"] = status

    def get_is_charging(self):
        """Gets is_charging"""
        return self._is_charging

    def set_is_charging(self, status):
        """Sets i_charging"""
        self._is_charging = status
        self._position["geometry"]["properties"]["charging"] = status

    def get_is_blocked(self):
        """Gets is_blocked"""
        return self._is_blocked

    def set_is_blocked(self, status):
        """Sets is_blocked"""
        self._is_blocked = status
        self._position["geometry"]["properties"]["blocked"] = status

    def get_is_warning_battery(self):
        """Sets _is_warning_battery"""
        return self._is_warning_battery

    def set_is_warning_battery(self, status):
        """Sets _is_warning_battery"""
        self._is_warning_battery = status
        self._position["geometry"]["properties"]["batterywarning"] = status

    def get_is_battery_depleted(self):
        """Get _is_battery_depleted"""
        return self._is_battery_depleted

    def set_is_battery_depleted(self, status):
        """Sets _is_battery_depleted"""
        self._is_battery_depleted = status
        self._position["geometry"]["properties"]["batterydepleted"] = status

    def get_rented(self):
        """Gets rented status"""
        return self._is_rented

    def set_rented(self, status):
        """Sets rented status"""
        self._is_rented = status
        self._position["geometry"]["properties"]["rented"] = status

    # Consider only have one probability for breaking, dont specify tyres and lamps
    async def check_health(self):
        """Check health"""
        if self.get_battery_capacity() < 20:
            self.set_is_warning_battery(True)
        elif self.get_battery_capacity() <= 0:
            self.set_speed(0)
            self.set_is_blocked(True)
            self.set_is_battery_depleted(True)
            await self.lock()

        if randrange(1, 100) <= self._breaking_tyre_probability:
            self.set_speed(0)
            self.set_is_blocked(True)
            self.set_is_whole(False)
            await self.lock()

        if randrange(1, 100) <= self._breaking_lamp_probability:
            self.set_speed(0)
            self.set_is_blocked(True)
            self.set_is_whole(False)
            await self.lock()

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

    async def report_position(self):
        """Reports position"""
        self.set_current_time(time.time())
        interval = self.get_current_time() - self.get_start_time()
        if interval > self.get_report_interval():
            self.set_start_time(self.get_current_time())
            position = self.get_position()
            payload = {"position": position}
            # r = requests.put(f"http://server:3000/bikes/{self.get_id()}", json=payload)
            async with self._session.put(
                f"http://server:3000/bikes/{self.get_id()}", json=payload
            ) as resp:
                result = await resp.json()
                # handle result eg. set status to blocked depending on
                # selfs status or position or likewise set is rented

    def unlock(self, user_id):
        """Unlock"""
        # if self._is_rentable:
        if not self.get_is_blocked():
            self.set_is_locked(False)
            self.set_report_interval(self._moving_report_interval)
            self.set_log_start_time(time.time())
            self.set_log_start_position(self.get_position())
            self.set_current_user(user_id)
            self.set_rented(True)

    async def lock(self):
        """Lock"""
        self.set_is_locked(True)
        self.set_rented(False)
        self.set_report_interval(self._default_report_interval)
        self.set_log_end_time(time.time())
        self.set_log_end_position(self.get_position())
        start_position = self.get_log_start_position()
        end_position = self.get_position()
        start_time = self.get_start_time()
        end_time = time.time()
        payload = {
            "startpostion": start_position,
            "endposition": end_position,
            "starttime": start_time,
            "endtime": end_time,
            "user-id": self.get_current_user(),
            "bike-id": self.get_id(),
        }
        async with self._session.post(
            f"http://server:3000/trips/", json=payload
        ) as resp:
            result = await resp.json()
            # Handle result if necessary
        self.set_current_user(None)
        print("Travel done")
