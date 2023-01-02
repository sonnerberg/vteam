""""Bikebrain simulation"""
import time
import asyncio
import errno
import json
import requests
import aiohttp
import user as UserClass
import glob
import os
import bikeBrain

# pylint: disable=locally-disabled, too-many-locals
async def main():
    """main"""
    print("bikeBrain starting")

    async with aiohttp.ClientSession() as session:

        # Log in to get token
        payload = {"email": "email@example.com", "password": "12345678"}
        response = requests.post("http://admin-api:3000/v1/auth/login", json=payload)

        result = response.json()

        admin_token = result["data"]["token"]
        print("Logged in")

        # nr_of_users = 300
        # nr_of_bikes = 300
        users = []
        bikes = []
        start_time = time.time()

        travel_plans = []
        travel_plans.append([])
        index = 0

        file_list = glob.glob(os.path.join(os.getcwd(), "trips", "*.geojson"))

        for file_path in file_list:
            comp_id = 0
            with open(file_path, encoding="utf-8") as file:
                data = json.load(file)
                features = data["features"]

                for feature in features:
                    if feature["properties"]["COMP_ID"] == comp_id:
                        travel_plans[index].append(feature["geometry"]["coordinates"])
                    else:
                        index = index + 1
                        travel_plans.append([])
                        comp_id = feature["properties"]["COMP_ID"]
                        travel_plans[index].append(feature["geometry"]["coordinates"])
        # Remove empty lists from travel_plans
        travel_plans = list(filter(None, travel_plans))

        # Set start positions (coordinates) for bikes
        for i, travel_plan in enumerate(travel_plans):
            # Get the coordinates for the starting point
            # from the travel_plans list
            coordinates = [16.0, 59.0]
            if i < len(travel_plans):
                coordinates = travel_plan[0]

            # print(coordinates)

            # Post bike to db
            latitude = coordinates[0]
            longitude = coordinates[1]

            # create header with admin token
            headers = {"Authorization": f"Bearer {admin_token}"}
            payload = {"latitude": latitude, "longitude": longitude}

            response = requests.post(
                "http://admin-api:3000/v1/bikes/new",
                json=payload,
                headers=headers,
                timeout=100000,
            )

            print("Bike created")

            # Get the new bike id and token
            json_response = response.json()
            # print(json_response)
            _id = json_response["data"]["id"]
            # bike_token = json_response["data"]["token"]

            # Get the new bike
            response = requests.get(
                f"http://admin-api:3000/v1/bikes/{_id}", headers=headers, timeout=100000
            )

            position = response.json()["data"][0]["position"]

            # Create bike replace token when backend is ready for bike_token
            bikes.append(
                bikeBrain.Brain(_id, session, admin_token, start_time, position)
            )

        # Create users and append them to the user list,
        # users get id:s from 1 -
        for i, travel_plan in enumerate(travel_plans):
            users.append(UserClass.User(i + 1, bikes[i], travel_plan))

        # Decides if program loop runs
        run = True

        # Loop through users and begin journeys (unlock bikes)
        for user in users:

            try:
                await user.begin_journey()
            except IOError as error:
                if error.errno == errno.EPIPE:
                    pass

        while run:
            try:
                # Loop through users and move them according to plan (users move in intervals see UserClass.move)
                for user in users:
                    await user.move()

                ## Loop through bikes and have them report their position (bikes report their position in intervals)
                for bike in bikes:
                    # Have all bikes report their position (will only send request if the right interval has passed)
                    await bike.report_position()

            except IOError as error:
                if error.errno == errno.EPIPE:
                    pass


if __name__ == "__main__":
    asyncio.run(main())
