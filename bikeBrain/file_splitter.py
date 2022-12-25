""""File splitter"""
import glob
import os
import json


# pylint: disable=locally-disabled, too-many-locals
def main():
    """main"""
    file_list = glob.glob(os.path.join(os.getcwd(), "files", "*.geojson"))

    file_dir = "./trips/"

    file_name = 0

    for file_path in file_list:
        with open(file_path, encoding="utf-8") as file:
            data = json.load(file)
            features = data["features"]
            file_features = []
            comp_id = features[0]["properties"]["COMP_ID"]

            for feature in features:
                if feature["properties"]["COMP_ID"] == comp_id:
                    file_features.append(feature)
                else:
                    with open(
                        f"{file_dir}{str(file_name)}.geojson", "w", encoding="utf-8"
                    ) as file:

                        file.write(json.dumps({"features": file_features}))
                    comp_id = feature["properties"]["COMP_ID"]
                    file_name = file_name + 1
                    file_features = []


if __name__ == "__main__":
    main()
