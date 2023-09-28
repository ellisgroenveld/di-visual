import pandas as pd

df = pd.read_excel('data/mergedfile.xlsx')

df.to_csv('data/mergeddata.csv', na_rep='NULL')