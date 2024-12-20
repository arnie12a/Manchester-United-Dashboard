def getDataForYear(year):
    import pandas as pd
    df = pd.read_html(f'https://fbref.com/en/squads/19538871/{str(year)}-{str(year+1)}/Manchester-United-Stats')[0]
    df.columns = pd.MultiIndex.from_tuples(
    [('About' if 'Unnamed' in level_0 else level_0, level_1) 
        for level_0, level_1 in df.columns],
            names=df.columns.names
    )
    df_combined = pd.concat([df['About'], df['Playing Time'], df['Performance']], axis=1)
    columns_to_keep = ['Player', 'Nation', 'Pos', 'Age', 'MP', 'Min', 'Gls', 'Ast', 'G+A', 'PK']
    df_combined = df_combined[columns_to_keep]
    return df_combined


def createOutputFolder():
    import os
    if not os.path.exists("data"):
        os.mkdir("data")
    
def createCSV(df, year):
    lowerYear = str(year)
    upperYear = str(year+1)
    df.to_csv(f'./data/ManchesterUnited{lowerYear}-{upperYear}.csv', index=False)
    return 

def getDataForYearPremierLeagueTable(year):
    import pandas as pd
    df = pd.read_html(f'https://fbref.com/en/comps/9/{str(year)}-{str(year+1)}/{str(year)}-{str(year+1)}-Premier-League-Stats')[0]
    columns_to_keep = ['Rk', 'Squad', 'MP', 'W', 'L', 'GF', 'GA', 'GD', 'Pts', 'Pts/MP', 'Top Team Scorer', 'Notes']
    df = df[columns_to_keep]
    return df

def createCSVPremierLeagueTable(df, year):
    lowerYear = str(year)
    upperYear = str(year+1)
    df.to_csv(f'./data/seasonTeamData/{lowerYear}-{upperYear}.csv', index=False)
    return 