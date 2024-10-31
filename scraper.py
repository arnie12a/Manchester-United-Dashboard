import pandas as pd

print(len(pd.read_html('https://fbref.com/en/squads/19538871/2022-2023/Manchester-United-Stats')))


df = pd.read_html('https://fbref.com/en/squads/19538871/2022-2023/Manchester-United-Stats')[0]

print(df.columns)