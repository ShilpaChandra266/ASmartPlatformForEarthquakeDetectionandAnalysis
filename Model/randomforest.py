import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn import tree
from sklearn import svm
from sklearn.externals import joblib



class predict:
	input_file = pd.read_csv('sample30DataAllInt.csv')
	dataframe = pd.DataFrame(input_file)
	dataframe['diff']=dataframe['endtime']-dataframe['starttime']
	dataframe=dataframe.drop('station',axis=1)
	dataframe=dataframe.drop('starttime',axis=1)
	dataframe=dataframe.drop('endtime',axis=1)
	dataframe=dataframe.drop('Status',axis=1)
	dataframe=dataframe.drop('channel',axis=1)
	print(dataframe)
	y = input_file['Status']
	X_train, X_test, y_train, y_test = train_test_split(dataframe, y, random_state=1)
	random_forest = RandomForestClassifier(n_estimators=30, max_depth=10, random_state=1)
	random_forest=random_forest.fit(X_train, y_train)
	y_predict = random_forest.predict(X_test)
	joblib.dump(random_forest, 'randomforest.pkl')
	print(y_predict)
	s=[[460,5.01,9.60,60]]
	accuracy_score(y_test, y_predict)
	

