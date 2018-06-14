import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
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
	svm = svm.SVC()
	svm=svm.fit(X_train, y_train)
	y_predict = svm.predict(X_test)
	joblib.dump(svm, 'svm.pkl')
	print(y_predict)
	s=[[460,34567,876545678765,60]]
	accuracy_score(y_test, y_predict)
	


