from sklearn.externals import joblib
import numpy as np
from scipy import misc
import flask
from flask import Flask, render_template,request
from obspy.core import read
from obspy.signal.trigger import z_detect
from obspy.signal.trigger import ar_pick
from obspy import UTCDateTime
from obspy.signal.trigger import recursive_sta_lta, trigger_onset
from obspy.signal.invsim import simulate_seismometer, corn_freq_2_paz
import glob, os
import datetime
app = Flask(__name__)
r_model = joblib.load('randomforest.pkl')
d_model = joblib.load('decisiontree.pkl')
s_model = joblib.load('svm.pkl')
@app.route("/")
def main():
    #print(model)
    return "Hello World"
@app.route('/predictinput/<sacfile>/<algo>',methods=['GET'])
def predictinput(sacfile,algo):
	#print(input_path)
	bhnfile=read("/home/shilpa/Desktop/earthquakeproject/files/"+sacfile)
	bhn_tr=bhnfile[0]
	df = bhn_tr.stats.sampling_rate
	bhn_trigger=recursive_sta_lta(bhn_tr.data, int(5 * df), int(10 * df))
	bhnonoff=trigger_onset(bhn_trigger,1.2,0.5)
	p_pick, s_pick = ar_pick(bhnfile[0].data, bhnfile[0].data, bhnfile[0].data, df,1.0, 20.0, 1.0, 0.1, 4.0, 1.0, 2, 8, 0.1, 0.2)
	data=[]
	temp=[]
	temp.append(200)
	temp.append(p_pick)
	temp.append(s_pick)
	temp.append(int(bhnonoff[0][1])-int(bhnonoff[0][0]))
	data.append(temp)
	print(data)
	if algo=="decisiontree":
		prediction = d_model.predict(data)
	elif algo=="randomforest":
		prediction = r_model.predict(data)
	elif algo=="svm":
		prediction = r_model.predict(data)
	result=" ";
	if(prediction[0]==1):
		result="an Earthquake"
	else:
		result="No Earthquake"
	return result

@app.route('/predict/<algo>/<starttime>/<endtime>/<p_pick>/<s_pick>/<npts>', methods=['GET'])
def predict(algo,starttime,endtime,p_pick,s_pick,npts):
    print("chandra")
    if request.method=='GET':
        print("chandra")
    input_d=[]
    data=[]
    data.append(npts)
    data.append(p_pick)
    data.append(s_pick)
    data.append(int(endtime)-int(starttime))
    print(data)
    input_d.append(data)
    print(s_model)
    if algo=="decisiontree":
    	prediction = d_model.predict(input_d)
    elif algo=="randomforest":
    	prediction = r_model.predict(input_d)
    elif algo=="svm":
    	prediction = r_model.predict(input_d)
    result="";
    if(prediction[0]==1):
    	result="an Earthquake"
    else:
    	result="Not Earthquake"
    return result

if __name__ == "__main__":
	port=int(os.environ.get("PORT",5000))
	app.run(host='0.0.0.0',port=port)
