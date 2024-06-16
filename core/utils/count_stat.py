import json
import os
import sys
import math
from datetime import datetime, timedelta

def create_directory_if_not_exists(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def time_difference(start_time, end_time):
    start_hours, start_minutes, start_seconds = map(int, start_time.split(':'))
    end_hours, end_minutes, end_seconds = map(int, end_time.split(':'))

    start_total_seconds = start_hours * 3600 + start_minutes * 60 + start_seconds
    end_total_seconds = end_hours * 3600 + end_minutes * 60 + end_seconds

    if end_total_seconds >= start_total_seconds:
        diff_seconds = end_total_seconds - start_total_seconds
    else:
        diff_seconds = (24 * 3600 - start_total_seconds) + end_total_seconds

    return diff_seconds

def seconds_to_time(input_secs):
    hours = (input_secs // 3600) % 24
    minutes = (input_secs // 60) % 60
    seconds = input_secs % 60

    return f'{hours:02}:{minutes:02}:{seconds:02}'

def read_json(path):
    with open(path, 'r', encoding='utf-8') as file:
        return json.load(file)

def write_json(path, data):
    with open(path, 'w', encoding='utf-8') as file:
        file.write(json.dumps(data, ensure_ascii=False, indent=4))

def time_to_seconds(time_string):
    hours, minutes, seconds = map(int, time_string.split(':'))
    return hours * 3600 + minutes * 60 + seconds

def find_path_time(data, start, end):
    return data[start - 1][end - 1]['time']

def calculate_mean(numbers):
    return sum(numbers) / len(numbers)

def calculate_median(numbers):
    sorted_numbers = sorted(numbers)
    mid = len(sorted_numbers) // 2

    if len(sorted_numbers) % 2 == 0:
        return (sorted_numbers[mid - 1] + sorted_numbers[mid]) / 2
    else:
        return sorted_numbers[mid]

dir_path = sys.argv[1] if len(sys.argv) > 1 else False
debug = sys.argv[2] if len(sys.argv) > 2 else False

if dir_path:
    create_directory_if_not_exists(dir_path)

# Чтение данных из файла
db = read_json('bids.json')

# Фильтрация и обработка данных
done = [req for req in db if req['status'] == 'Заявка закончена']
db_with_time = []

for req in done:
    real_time_secs = time_difference(req['time3'], req['time4'])
    req['real_time_secs'] = real_time_secs
    req['real_time'] = seconds_to_time(real_time_secs)
    db_with_time.append(req)

common_graph = read_json('common_graph.json')
special_graph = read_json('special_graph.json')

diffs = []
for req in db_with_time:
    new_req = {}
    new_req['cat'] = req['cat_pas']
    new_req['id'] = req['id']
    
    if req['cat_pas'] == "ИК" or req['cat_pas'] == "ДИ" or req['cat_pas'] == "ИО" or req['cat_pas'] == "ПЛ" or req['cat_pas'] == "ОВ":
        path_time = find_path_time(special_graph, int(req['id_st1']), int(req['id_st2']))
    else:
        path_time = find_path_time(common_graph, int(req['id_st1']), int(req['id_st2']))
    
    real_time = time_to_seconds(req['real_time'])
    new_req['diff'] = real_time - path_time
    diffs.append(new_req)

# Группировка по категориям
categories = {}
for d in diffs:
    if d['cat'] not in categories:
        categories[d['cat']] = [d['diff']]
    else:
        categories[d['cat']].append(d['diff'])


prefix = dir_path + '/' if dir_path else ''
# Запись категорий в файл
if debug:
    write_json(f'{prefix}requests_with_real_time.json', db_with_time)
    write_json(f'{prefix}diffs.json', diffs)
    write_json(f'{prefix}categories.json', categories)

# Вычисление статистики по категориям
result = {}
for cat, values in categories.items():
    mean = math.ceil(calculate_mean(values))
    median = math.ceil(calculate_median(values))
    result[cat] = {'mean': mean, 'median': median}

# Запись статистики в файл
write_json(f'{prefix}statistic_2.json', result)
