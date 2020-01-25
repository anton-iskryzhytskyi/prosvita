import os
import pandas as pd
from pathlib import Path

root_app_path = path = Path(__file__).absolute().parent.parent

def find_files():
    files = []
    for entry in os.scandir(root_app_path.joinpath('./store')):
        if entry.is_file() and entry.path.endswith('.csv'):
            files.append(entry.name)

    return files


def load_data(files):
    data_frames = []
    for file_name in files:
        data_frames.append(pd.read_csv(root_app_path.joinpath('./store/%s' % file_name)))

    return data_frames


files = find_files()
data_frames = load_data(files)


for i, df in enumerate(data_frames):
    print({
        'Name': files[i],
        'Count': df['Sold'].count(),
        'Min': df['Sold'].min(),
        'Max': df['Sold'].max(),
        'Mean': df['Sold'].mean(),
        'Median': df['Sold'].median(),
        'Standart Deviation': df['Sold'].std(),
        'Range': df['Sold'].max() - df['Sold'].min(),
    })

