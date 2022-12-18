#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# Pre-requisite - Import the DictWriter class from csv  module
from csv import DictWriter
from random import randint

# The list of column names as mentioned in the CSV file
headersCSV = [
    "surname",
    "lastname",
    "adress",
    "billing_adress",
    "username",
    "password",
    "email",
    "balance",
    "status",
]
# The data assigned to the dictionary
list_of_dictionaries = [{"ID": "04", "NAME": "John", "SUBJECT": "Mathematics"}]
rowDict = {}

# Pre-requisite - The CSV file should be manually closed before running this code.

# First, open the old CSV file in append mode, hence mentioned as 'a'
# Then, for the CSV file, create a file object
with open("users.csv", "a", newline="\n", encoding="utf-8") as f_object:
    for username in range(1, 5000 + 1):
        rowDict = {
            "surname": f"Förnamn{username}",
            "lastname": f"Efternamn{username}",
            "adress": "",
            "billing_adress": "",
            "username": username,
            "password": "",
            "email": f"Förnamn{username}@Efternamn{username}.se",
            "balance": randint(100, 10000),
            "status": "online",
        }
        # Pass the CSV  file object to the Dictwriter() function
        # Result - a DictWriter object
        dictwriter_object = DictWriter(f_object, fieldnames=headersCSV)
        # Pass the data in the dictionary as an argument into the writerow() function
        dictwriter_object.writerow(rowDict)
        # Close the file object
    f_object.close()
