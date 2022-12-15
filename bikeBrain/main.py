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
    print("bikeBrain starting")
    # Log in to get token
    token = "asdf"

    async with aiohttp.ClientSession() as session:
        nr_of_users = 1
        nr_of_bikes = 1
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

        # Set start positions (coordinates) for bikes
        for i in range(nr_of_bikes):
            # Get the coordinates for the starting point
            # from the travel_plans list
            coordinates = travel_plans[i][0]

            # Post bike to db
            latitude = coordinates[0]
            longitude = coordinates[1]

            # create header with admin token
            headers = {f"Authorization: `Bearer {token}`,"}
            payload = {"latitude": latitude, "longitude": longitude}

            response = requests.post(
                "http://admin-api:3000/v1/bikes/new", json=payload, headers=headers
            )

            # Get the new bike id and token
            json_response = response.json()
            _id = json_response.data.id
            bike_token = json_response.data.token

            # Get the new bike
            response = requests.get(f"http://admin-api:3000/v1/bikes/{_id}")

            bike_properties = response.json()

            # Create the position, with bike_properties add the coordinates
            """  position = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": coordinates,
                },
                "properties": {
                    "whole": True,
                    "charging": False,
                    "blocked": False,
                    "batterywarning": False,
                    "batterydepleted": False,
                    "rented": True,
                    "userid": None,
                    "featureType": "bikes",
                },
            } """

            # Create bike
            bikes[i] = bikeBrain.Brain(
                i + 1, session, bike_token, start_time, position, 100
            )

            # Request på cykel med id, skapa cykeln och lägg i lista
            # bikes[i].set_id(r.data.id)
            # bikes[i].set_token(r.data.token)

            # bikes_start_positions.append()

        # Create users and append them to the user list,
        # users get id:s from 1 -
        for i in range(nr_of_users):
            users.append(UserClass.User(i + 1, bikes[i], travel_plans[i]))

        # Decides if program loop runs
        run = False

        # Loop through users and begin journeys (unlock bikes)
        # for user in users:
        # user.begin_journey()

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
