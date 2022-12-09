from random import seed
from random import randrange
import time
import requests


class Brain:
    """Class for bike brain"""

    def __init__(self, _id, session, start_time, position, battery_capacity, status):
        """Init"""
        self._position = position
        self._battery_capacity = battery_capacity
        self._speed = 0
        self._acceleration_rate = 1
        self._brake_rate = 1
        self._status = status
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
        self._is_rentable = true

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

    def set_battery_decrease(self, _battery_decrease):
        self._battery_decrease = battery_decrease

    def get_position(self):
        """Gets position"""
        return self._position

    def set_position(self, position):
        """Sets postion"""
        self._position = position

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
        self._position["geometry"]["properties"]["user"] = self.get_current_user()
        print(self.get_current_user())
        print(self._position["geometry"]["properties"]["user"])

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

    def get_health_status(self):
        """Gets health status"""
        return self._status[1]

    def set_health_status(self, status):
        """Sets status"""
        self._status[1] = status
        self._position["geometry"]["properties"]["status"][
            1
        ] = self.get_health_status()[1]

    def get_rented_status(self):
        """Gets rented status"""
        return self._status[0]

    def set_rented_status(self, status):
        """Sets rented status"""
        self._status[0] = status
        self._position["geometry"]["properties"]["status"][0] = self.get_rented_status()

    # Consider only have one probability for breaking, dont specify tyres and lamps
    def check_health(self):
        """Check health"""
        if self.get_health_status() == 0:
            if self.get_battery_capacity() < 20:
                self.battery_warning()
            elif self.get_battery_capacity() <= 0:
                self.set_speed(0)
                self.set_health_status(1)
                # lock the bike
                # set bike as not rentable
                # check for not rentable when
                # when trying to unlock bike
            elif randrange(1, 100) <= self._breaking_tyre_probability:
                self.set_speed(0)
                self.set_health_status(1)
            elif randrange(1, 100) <= self._breaking_lamp_probability:
                self.set_health_status(1)

    async def battery_warning(self):
        """Issue warning"""
        # print("Warning: battery capacity low")
        payload = {"batterywarning": 1}
        # async with self._session.put(f"http://server:3000/bikes/{self.get_id()}", json=payload) as resp:
        # result = await resp.json()

    def move(self, position):
        """Moves the bike to new position"""
        if not self.get_is_locked():
            self.set_position(position)
            self.set_battery_capacity(
                self.get_battery_capacity() - self._battery_decrease
            )
            self.check_health()
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
                # print(result)

    def unlock(self, user_id):
        """Unlock"""
        if self._is_rentable:
            self.set_is_locked(False)
            self.set_report_interval(self._moving_report_interval)
            self.set_log_start_time(time.time())
            self.set_log_start_position(self.get_position())
            # Seems not to work -
            self.set_current_user(user_id)
            self.set_rented_status(1)


    def lock(self):
        """Lock"""
        self.set_is_locked(True)
        self.set_rented_status(0)
        self.set_report_interval(self._default_report_interval)
        self.set_log_end_time(time.time())
        self.set_log_end_position(self.get_position())
        """  print(f"Id: {self.get_id()}, \
            startposition: {self.get_log_start_position()}\
            endposition: {self.get_position()},\
            user: {self.get_current_user()},\
            start time: {self.get_log_start_time()},\
            end time: {self.get_log_end_time()}") """
        _id = self.get_id()

        start_position = self.get_log_start_position()
        end_position = self.get_position()
        start_time = self.get_start_time()
        end_time = time.time()

        payload = {
            "startpostion": start_position,
            "endposition": end_position,
            "starttime": start_time,
            "endtime": end_time,
        }
        # r = requests.post(f"http://server:3000/trips/", json=payload)
        self.set_current_user(None)
