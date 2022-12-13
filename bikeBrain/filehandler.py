import json


def main():
    with open("punkter_for_resa.geojson") as file:
        data = json.load(file)

    features = data["features"]
    travel_plans = []

    # This makes no presumptions about the
    # nr of points in a trip but the list
    # will probably be too long as there is
    # one "row" for each feature (a trip could be just)
    # one point

    # Create a list for each feature
    # in the travel_plans list
    for i in range(len(features)):
        travel_plans.append([])

    # Append the coordinates to the
    # list at the right index in travel_plans
    for i in range(len(features)):
        # Check which index should be used based
        # on the trips id
        index = int(features[i]["properties"]["id"]) - 1

        # Append the coordinates to the list at the correct
        # index
        travel_plans[index].append(features[i]["geometry"]["coordinates"])

    # Remove empty lists from travel_plans
    travel_plans = list(filter(None, travel_plans))

    for i in range(len(travel_plans)):
        print(travel_plans[i][0])
        print(len(travel_plans))


if __name__ == "__main__":
    main()
