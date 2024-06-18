from datetime import timedelta, datetime
import random


def generate_time_intervals(start_time, end_time, interval_minutes):
    times = []
    current_time = start_time
    while current_time < end_time:
        times.append(current_time)
        current_time += timedelta(minutes=interval_minutes)

    res = [f'{t.hour:02d}:{t.minute:02d}' for t in times]
    return res


def gen_work_day():
    start_time = datetime.strptime('08:30', '%H:%M')
    end_time = datetime.strptime('20:00', '%H:%M')

    interval_minutes = 90
    return generate_time_intervals(start_time, end_time, interval_minutes)


def gen_random_day():
    start_time = datetime.strptime('08:30', '%H:%M')
    end_time = datetime.strptime('20:00', '%H:%M')

    max_int = 90
    min_int = 30
    return generate_random_time_intervals(start_time, end_time, min_int, max_int)


def generate_random_time_intervals(start_datetime, end_datetime, min_interval, max_interval):
    times = []
    current_datetime = start_datetime
    while current_datetime < end_datetime:
        times.append(current_datetime)
        interval_minutes = random.randint(min_interval, max_interval)
        current_datetime += timedelta(minutes=interval_minutes)
    return [f'{t.hour:02d}:{t.minute:02d}' for t in times]
