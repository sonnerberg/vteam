""""Bikebrain simulation"""
import time
import asyncio
import errno
import json
import requests
import aiohttp
import user as UserClass
import bikeBrain

# pylint: disable=locally-disabled, too-many-locals
async def main():
    """main"""
    print("bikeBrain starting")

    async with aiohttp.ClientSession() as session:

        # Log in to get token
        payload = {"email": "email@examples.com", "password": "12345678"}
        async with session.post(
            "http://admin-api:3000/v1/admin/login",
            json=payload,
        ) as resp:
            # result = await resp.json()
            print("Logged in")

        nr_of_users = 2
        nr_of_bikes = 2
        users = []
        bikes = []
        start_time = time.time()

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
        for i, feature in enumerate(features):
            # Check which index should be used based
            # on the journeys id
            index = int(feature["properties"]["id"]) - 1

            # Append the coordinates to the list at the correct
            # index
            travel_plans[index].append(feature["geometry"]["coordinates"])

        # Remove empty lists from travel_plans
        travel_plans = list(filter(None, travel_plans))

        # Set start positions (coordinates) for bikes
        for i in range(nr_of_bikes):
            # Get the coordinates for the starting point
            # from the travel_plans list
            coordinates = [16.0, 59.0]
            if i < len(travel_plans):
                coordinates = travel_plans[i][0]

            # Post bike to db
            latitude = coordinates[0]
            longitude = coordinates[1]

            # create header with admin token
            headers = {"Authorization": "Bearer {token}"}
            payload = {"latitude": latitude, "longitude": longitude}

            response = requests.post(
                "http://admin-api:3000/v1/bikes/new",
                json=payload,
                headers=headers,
                timeout=100000,
            )

            # Get the new bike id and token
            json_response = response.json()
            # print(json_response)
            _id = json_response["data"]["id"]
            bike_token = json_response["data"]["token"]

            # Get the new bike
            response = requests.get(
                f"http://admin-api:3000/v1/bikes/{_id}", timeout=100000
            )

            position = response.json()["data"][0]["position"]

            # Create bike
            bikes.append(
                bikeBrain.Brain(_id, session, bike_token, start_time, position)
            )

        # Create users and append them to the user list,
        # users get id:s from 1 -
        for i in range(nr_of_users):
            users.append(UserClass.User(i + 1, bikes[i], travel_plans[i]))

        # Decides if program loop runs
        run = True

        # Loop through users and begin journeys (unlock bikes)
        for user in users:
            await user.begin_journey()

        while run:
            try:
                # Loop through users and move them according to plan (users move in intervals see UserClass.move)
                for user in users:
                    await user.move()

                ## Loop through bikes and have them report their position (bikes report their position in intervals)
                for bike in bikes:
                    # Have all bikes report their position (will only send request if the right interval has passed)
                    await bike.report_position()

                # PUT the report to db
            except IOError as error:
                if error.errno == errno.EPIPE:
                    pass


if __name__ == "__main__":
    asyncio.run(main())
