import bikeBrain
import user as UserClass
import time
import requests
import aiohttp
import asyncio
import sys
import errno


async def main():
    async with aiohttp.ClientSession() as session:
        nr_of_users = 2
        nr_of_bikes = 2
        report_dict = {}
        users = []
        bikes = []
        bikes_start_positions = []
        user_travel_plans = []
        start_time = time.time()
        report_start_time = time.time()
        report_interval = 5

        # Set start positions for bikes, need to be replaced with real coordinates/geojson
        for i in range(nr_of_bikes):

            _id = i + 1

            coordinates = [16.31480402957339 + i / 100, 59.41137659373528 + i / 100]

            position = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": coordinates,
                    "properties": {
                        "id": _id,
                        "status": [0, 0],
                        "batterywarning": 0,
                        "userid": None,
                        "featureType": "bikes",
                    },
                },
            }

            bikes_start_positions.append(position)

        # Create bikes and append to bikes list
        for i in range(nr_of_bikes):
            bikes.append(
                bikeBrain.Brain(
                    i + 1, session, start_time, bikes_start_positions[i], 100, [0, 0]
                )
            )

        # Post all bikes to db
        for i in range(nr_of_bikes):
            position = bikes[i].get_position()
            _id = bikes[i].get_id()
            payload = {"id": _id, "position": position}
            r = requests.post("http://server:3000/bikes/", json=payload)

        # Set the users travel plans need to be replaced with real coordinates/geojson
        for i in range(nr_of_users):
            position1 = bikes[i].get_position()
            position2 = position1.copy()
            position2["geometry"]["coordinates"][0] = (
                position2["geometry"]["coordinates"][0] + 1
            )
            position2["geometry"]["coordinates"][1] = (
                position2["geometry"]["coordinates"][1] + 1
            )
            position3 = position2.copy()
            position3["geometry"]["coordinates"][0] = (
                position3["geometry"]["coordinates"][0] + 2
            )
            position3["geometry"]["coordinates"][1] = (
                position3["geometry"]["coordinates"][1] + 2
            )

            user_travel_plans.append([position1, position2, position3])

        # Create users and append them to the user list
        for i in range(nr_of_users):
            users.append(UserClass.User(i, bikes[i], user_travel_plans[i]))

        # Decides if program loop runs
        run = True

        # Loop through users and begin journeys (unlock bikes)
        for user in users:
            user.begin_journey()

        while run:
            try:
                # Loop through users and move them according to plan (users move in intervals see UserClass.move)
                for user in users:
                    user.move()

                ## Loop through bikes and have them report their position (bikes report their position in intervals)
                for bike in bikes:
                    # Have all bikes report their position (will only send request if the right interval has passed)
                    await bike.report_position()

                    # Build a dict with all bike positions
                    report_dict[bike.get_id()] = bike.get_position()

                # PUT the report to db
                current_time = time.time()
                if current_time - report_start_time > report_interval:
                    payload = {"report": report_dict}
                    # r = requests.put("http://server:3000/reports/1", json=payload)
                    report_start_time = current_time
            except IOError as e:
                if e.errno == errno.EPIPE:
                    pass


if __name__ == "__main__":
    asyncio.run(main())
