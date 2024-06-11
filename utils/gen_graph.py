import sys
import json

file_transfer_station = "time_transfer_station.json"
file_path_station = "time_path_station.json"
file_station = "station.json"

arguments = sys.argv

if len(arguments) != 2:
    print('Choose one generate graph argument: Common | Special')
    exit()

if arguments[1].lower() == 'special':
    special = True
elif arguments[1].lower() == 'common':
    special = False
else:
    print('Choose one generate graph argument: Common | Special')
    exit()

with open(file_station, 'r') as file:
    station = json.load(file)

cnt_station = 0

for st in station:
    cnt_station = max(cnt_station, int(st['id']))

graph = [[0 for _ in range(cnt_station)] for _ in range(cnt_station)]

for i in range(cnt_station):
    for j in range(cnt_station):
        if i == j:
            graph[i][j] = 0
        else:    
            graph[i][j] = float('inf')


with open(file_transfer_station, 'r') as file:
    transfer_station = json.load(file)


for item in transfer_station:
    id1 = int(item['id1'])
    id2 = int(item['id2'])
    time = float(item['time'])
    graph[id1 - 1][id2 - 1] = int(time) * 60
    
    if special == True:
        graph[id1 - 1][id2 - 1] += 5 * 60


with open(file_path_station, 'r') as file:
    path_station = json.load(file)


for item in path_station:
    id1 = int(item['id_st1'])
    id2 = int(item['id_st2'])

    time = str(item['time']).split(',')
    if len(time) == 1:
        graph[id1 - 1][id2 - 1] = int(time[0]) * 60
        graph[id2 - 1][id1- 1] = int(time[0]) * 60
    elif len(time) == 2:
        graph[id1 - 1][id2 - 1] = int(time[0]) * 60 + int(time[1]) * 10
        graph[id2 - 1][id1 - 1] = int(time[0]) * 60 + int(time[1]) * 10


# Применение алгоритма Флойда-Уоршалла
def floyd_warshall(graph):
    num_vertices = len(graph)
    
    # Инициализация матрицы расстояний весами ребер графа
    distances = [row[:] for row in graph]

    # Инициализация матрицы предшественников
    predecessors = [[None if distances[i][j] == float('inf') else i for j in range(num_vertices)] for i in range(num_vertices)]

    # Применение алгоритма Флойда-Уоршалла
    for k in range(num_vertices):
        for i in range(num_vertices):
            for j in range(num_vertices):
                if distances[i][k] + distances[k][j] < distances[i][j]:
                    distances[i][j] = distances[i][k] + distances[k][j]
                    predecessors[i][j] = predecessors[k][j]

    return distances, predecessors


def reconstruct_path(predecessors, start, end):
    path = []
    while start != end:
        if predecessors[start][end] is None:
            return None  # Нет пути между start и end
        path.append(end)
        end = predecessors[start][end]
    path.append(start)
    return list(reversed(path))


# Применение алгоритма Флойда-Уоршалла
shortest_distances, predecessors = floyd_warshall(graph)
shortest_path = reconstruct_path(predecessors, 1, 2)

with open(str(arguments[1].lower()) + '_' + 'graph.json', 'w') as file:
    res = [[0 for _ in range(cnt_station)] for _ in range(cnt_station)]
    for i in range(cnt_station):
        for j in range(cnt_station):
            path = reconstruct_path(predecessors, i, j)
            if path != None:
                path = list(map(lambda n: n + 1, path))
            else:
                path = []

            res[i][j] = {'id1': i + 1, 'id2': j + 1, 'time': shortest_distances[i][j], 'path': path}
    
    json.dump(res, file, indent=4, ensure_ascii=False)

