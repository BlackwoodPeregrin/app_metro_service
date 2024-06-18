import requests
import json
from const import create_bid_url as url
from faker import Faker
from common import gen_random_day
from time import sleep

fake = Faker()
employees = [11, 12, 13, 16, 17, 19]

input = []
while len(input) < 200:
    input += gen_random_day()

times = {
    "2024-06-21": input,
}

data = {
    "passengerId": 33949,
    "date": "2024-06-21",
    "time": "08:55",
    "stID1": 1,
    "stID2": 6,
    "countMale": 1,
    "countFemale": 0
}


def go():
    count_added = 0
    rejected = 0

    for date, time in times.items():
        for t in time:
            sleep(0.1)
            data["date"] = date
            data["time"] = t
            data["stID1"] = fake.random_int(1, 200)
            data["stID2"] = fake.random_int(1, 200)
            data["countMale"] = fake.random_int(1, 2)
            data["countFemale"] = fake.random_int(0, 1)

            response = requests.post(url, json=data)

            if response.ok:
                res_json = json.loads(response.text)
                val = res_json.get("added")
                if val:
                    print(f'success, time = {t}')
                    count_added += 1
                else:
                    print(res_json["freeSlots"])
                    print(f'reject, time = {t}')
                    rejected += 1

    print(f"Принято {count_added}")
    print(f"Отклонено = {rejected}")
    print(f"Статистика принято/отклонено {count_added}/{count_added + rejected}")

go()
