""""Bikebrain simulation"""
import time
import asyncio
import errno
import json
import requests
import aiohttp
import user as UserClass
import bikeBrain


async def main():
    """main"""
    async with aiohttp.ClientSession() as session:
        nr_of_users = 10
        nr_of_bikes = 10
        report_dict = {}
        users = []
        bikes = []
        bikes_start_positions = []
        start_time = time.time()
        report_start_time = time.time()
        report_interval = 5

        with open("punkter_for_resa.geojson", encoding="utf-8") as file:
            data = json.load(file)

        features = data["features"]
        travel_plans = []

        # Create a list for each feature
        # in the travel_plans list
        # This makes no presumptions about the
        # nr of points in a journey but the list
        # will probably be too long as there is
        # one "row" for each feature (a journey could be just)
        # one point, therefore this gets cleaned up below
        for i in range(len(features)):
            travel_plans.append([])

        # Append the coordinates to the
        # list at the right index in travel_plans
        for i in range(len(features)):
            # Check which index should be used based
            # on the journeys id
            index = int(features[i]["properties"]["id"]) - 1

            # Append the coordinates to the list at the correct
            # index
            travel_plans[index].append(features[i]["geometry"]["coordinates"])

        # Remove empty lists from travel_plans
        travel_plans = list(filter(None, travel_plans))

        # Set start positions (geojson object) for bikes
        for i in range(nr_of_bikes):

            _id = i + 1

            # Get the coordinates for the starting point
            # from the travel_plans list
            coordinates = travel_plans[i][0]

            # Create the position, add the coordinates
            position = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": coordinates,
                },
                "properties": {
                    "id": _id,  # Ta bort
                    "whole": True,
                    "charging": False,
                    "blocked": False,
                    "batterywarning": False,
                    "batterydepleted": False,
                    "rented": True,
                    "userid": None,
                    "featureType": "bikes",
                },
            }

            bikes_start_positions.append(position)

        # Create bikes and append to bikes list
        for i in range(nr_of_bikes):
            bikes.append(
                bikeBrain.Brain(
                    i + 1, session, start_time, bikes_start_positions[i], 100
                )
            )

        # Post all bikes to db
        for i in range(nr_of_bikes):
            position = bikes[i].get_position()
            _id = bikes[i].get_id()
            payload = {"id": _id, "position": position}  #
            r = requests.post("http://server:3000/bikes/", json=payload)
            # Sätt cykelns id och token

        # Create users and append them to the user list,
        # users get id:s from 1 -
        for i in range(nr_of_users):
            users.append(UserClass.User(i + 1, bikes[i], travel_plans[i]))

        # Decides if program loop runs
        run = True

        # Loop through users and begin journeys (unlock bikes)
        for user in users:
            user.begin_journey()

        while run:
            try:
                # Loop through users and move them according to plan (users move in intervals see UserClass.move)
                for user in users:
                    await user.move()

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
            except IOError as error:
                if error.errno == errno.EPIPE:
                    pass


if __name__ == "__main__":
    asyncio.run(main())
