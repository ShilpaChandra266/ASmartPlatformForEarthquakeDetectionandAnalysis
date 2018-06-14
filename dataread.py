import random
import StringIO
import matplotlib.pyplot as plt
import os
from obspy import read
from flask import Flask, make_response,request
from obspy.clients.fdsn import Client
from obspy import UTCDateTime
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import obspy
import obspy.signal
import numpy as np
import matplotlib.patheffects as path_effects

app = Flask(__name__)


@app.route('/plot.png')
def plot():
    fig = plt.figure(figsize=(5,2),tight_layout=True)
    try:
        client = Client("IRIS")
        start= request.args['startDate']
        end=request.args['endDate']
        station=request.args['station']
        channel=request.args['channel']
        loc=request.args['location']
        st = client.get_waveforms("NC", station,loc,channel,start, end)
        fig = plt.figure(figsize=(5,2),tight_layout=True)
        st[0].plot(fig=fig)
    except:
        fig = plt.figure(figsize=(5,1.5))
        text = fig.text(0.5, 0.5, 'No Data  '
                          '\nPlease try another time window or station',
                ha='center', va='center', size=16)
        text.set_path_effects([path_effects.Normal()])  
    finally:
        canvas = FigureCanvas(fig)
        output = StringIO.StringIO()
        canvas.print_png(output)
        response = make_response(output.getvalue())
        response.mimetype = 'image/png'
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

@app.route('/lowpassplot.png')

def lowplot():
    fig = plt.figure(figsize=(4,3),tight_layout=True)

    try:
        client = Client("IRIS")
        start= request.args['startDate']
        end=request.args['endDate']
        station=request.args['station']
        channel=request.args['channel']
        loc=request.args['location']
        st = client.get_waveforms("NC", station,loc,channel,start, end)
        st = client.get_waveforms("NC", station,loc,channel,start, end)
        data = st[0].data
        npts = st[0].stats.npts
        samprate = st[0].stats.sampling_rate
        tr = st[0]
        fig = plt.figure(figsize=(4,3),tight_layout=True)
        tr_filt = tr.copy()
        tr_filt.filter('lowpass',freq = 10,corners=2, zerophase=True)
        t = np.arange(0, tr.stats.npts / tr.stats.sampling_rate, tr.stats.delta)
        ax=fig.add_subplot(211)
        ax.plot(t, tr.data, 'k')
        ax.set_ylabel('Raw Data')
        bx=fig.add_subplot(212)
        bx.plot(t, tr_filt.data, 'k')
        bx.set_ylabel('Lowpassed Data')
    except:
        fig = plt.figure(figsize=(5,1.5))
        text = fig.text(0.5, 0.5, 'No Data  '
                          '\nPlease try another time window or station',
                ha='center', va='center', size=16)
        text.set_path_effects([path_effects.Normal()])  
    finally:
        canvas = FigureCanvas(fig)
        output = StringIO.StringIO()
        canvas.print_png(output)
        response = make_response(output.getvalue())
        response.mimetype = 'image/png'
        response.headers.add('Access-Control-Allow-Origin', '*')
       
        return response

@app.route('/highpassplot.png')
def highplot():
    fig = plt.figure(figsize=(4,3),tight_layout=True)

    try:
        client = Client("IRIS")
        start= request.args['startDate']
        end=request.args['endDate']
        station=request.args['station']
        channel=request.args['channel']
        loc=request.args['location']
        st = client.get_waveforms("NC", station,loc,channel,start, end)
        data = st[0].data
        npts = st[0].stats.npts
        samprate = st[0].stats.sampling_rate
        tr = st[0]
        fig = plt.figure(figsize=(4,3),tight_layout=True)
        tr_filt = tr.copy()
        tr_filt.filter('highpass',freq = 10,corners=2, zerophase=True)
        t = np.arange(0, tr.stats.npts / tr.stats.sampling_rate, tr.stats.delta)
        ax=fig.add_subplot(211)
        ax.plot(t, tr.data, 'k')
        ax.set_ylabel('Raw Data')
        bx=fig.add_subplot(212)
        bx.plot(t, tr_filt.data, 'k')
        bx.set_ylabel('Highpassed Data')
    except:
        fig = plt.figure(figsize=(5,1.5))
        text = fig.text(0.5, 0.5, 'No Data '
                          '\nPlease try another time window or station',
                ha='center', va='center', size=16)
        text.set_path_effects([path_effects.Normal()])  
    finally:
        canvas = FigureCanvas(fig)
        output = StringIO.StringIO()
        canvas.print_png(output)
        response = make_response(output.getvalue())
        response.mimetype = 'image/png'
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
@app.route('/bandpassplot.png')
def bandplot():
    fig = plt.figure(figsize=(4,3),tight_layout=True)

    try:
        client = Client("IRIS")
        start= request.args['startDate']
        end=request.args['endDate']
        station=request.args['station']
        channel=request.args['channel']
        loc=request.args['location']
        st = client.get_waveforms("NC", station,loc,channel,start, end)
        data = st[0].data
        npts = st[0].stats.npts
        samprate = st[0].stats.sampling_rate
        tr = st[0]
        fig = plt.figure(figsize=(4,3),tight_layout=True)
        tr_filt = tr.copy()
        tr_filt.filter('bandpass',freqmin = 1,freqmax=20,corners=2, zerophase=True)
        t = np.arange(0, tr.stats.npts / tr.stats.sampling_rate, tr.stats.delta)
        ax=fig.add_subplot(211)
        ax.plot(t, tr.data, 'k')
        ax.set_ylabel('Raw Data')
        bx=fig.add_subplot(212)
        bx.plot(t, tr_filt.data, 'k')
        bx.set_ylabel('Bandpassed Data')
    except:
        fig = plt.figure(figsize=(5,1.5))
        text = fig.text(0.5, 0.5, 'No Data  '
                          '\nPlease try another time window or station',
                ha='center', va='center', size=16)
        text.set_path_effects([path_effects.Normal()])  
    finally:
        canvas = FigureCanvas(fig)
        output = StringIO.StringIO()
        canvas.print_png(output)
        response = make_response(output.getvalue())
        response.mimetype = 'image/png'
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

if __name__ == '__main__':
    port=int(os.environ.get("PORT",3001))
    app.run(debug=False,threaded=True,host='0.0.0.0',port=port)
