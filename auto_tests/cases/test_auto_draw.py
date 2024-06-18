import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import seaborn as sns
from sqlalchemy import create_engine
import argparse


parser = argparse.ArgumentParser(description='Draw bids from db.')
parser.add_argument('date', type=str, help='Date')
args = parser.parse_args()


def time_to_minutes(t):
    return t.hour * 60 + t.minute


pd.set_option('display.max_rows', None)

db_username = 'admin'
db_password = 'password'
db_host = 'localhost'
db_port = '8002'
db_name = 'metro'

engine = create_engine(f'postgresql+psycopg2://{db_username}:{db_password}@{db_host}:{db_port}/{db_name}')

req = ('select id_employee, id_bid, bid_time as start,'
       '(bid_time::interval + time_predict::interval)::time AS end, surname_name as surname '
       'from assigned_bids ab '
       'join bids b on ab.id_bid = b.id '
       'join employee e on ab.id_employee = e.id '
       f"where bid_date = '{args.date}';")

# create graph
sns.set(style="whitegrid")
fig, ax = plt.subplots(figsize=(10, 6))


def fetch_data():
    global df
    df = pd.read_sql_query(req, engine)
    df['start_minutes'] = df['start'].apply(lambda x: time_to_minutes(x))
    df['end_minutes'] = df['end'].apply(lambda x: time_to_minutes(x))
    df['duration_minutes'] = df['end_minutes'] - df['start_minutes']


global df
fetch_data()
empl_req = 'select e.last_name as surname, id_employee from work_week_hours wh join employee e on e.id = wh.id_employee where fri is not null;'
empls = pd.read_sql_query(empl_req, engine)
palette = sns.color_palette("hsv", len(empls))

ax.set_yticks(range(len(empls)))
ax.set_yticklabels(empls['surname'])
ax.set_xticks(range(0, 1440, 60))
ax.set_xticklabels([f'{i // 60:02d}:{i % 60:02d}' for i in range(0, 1440, 60)], rotation=45)
ax.set_xlabel('Расписание')
ax.set_ylabel('Работники')
ax.set_title('Расписания заявок на сутки')


def renew_deps():
    global empls
    global palette
    empls = df.drop_duplicates(subset=['surname', 'id_employee'])[['surname', 'id_employee']]
    palette = sns.color_palette("hsv", len(empls))

def init():
    for idx, (employee_id, group) in enumerate(df.groupby('id_employee')):
        ax.broken_barh(
            [(row.start_minutes, row.duration_minutes) for row in group.itertuples()],
            (idx - 0.4, 0.8),
            facecolors=palette[idx]
        )
    return []


def update(frame):
    global df
    global palette
    fetch_data()
    renew_deps()
    for patch in ax.patches:
        patch.clear()

    for idx, (employee_id, group) in enumerate(df.groupby('id_employee')):
        ax.broken_barh(
            [(row.start_minutes, row.duration_minutes) for row in group.itertuples()],
            (idx - 0.4, 0.8),
            facecolors=palette[idx]
        )

    return ax.patches


ani = animation.FuncAnimation(fig, update, init_func=init, frames=100, interval=1000, blit=False)

# Показ графика
plt.show()
