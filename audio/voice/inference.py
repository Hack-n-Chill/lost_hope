'''
@file: inference.py
@author: Bisakh Mondal

'''

from train import build_model, restore_parts, load_checkpoint
import hparams
import json
import synthesis
import train
import random
import wave
from pydub import AudioSegment

from deepvoice3_pytorch import frontend
import gc
from os.path import join
import numpy as np
from audio import save_wav
import os
import math

synthesis._frontend = getattr(frontend, "en")
train._frontend =  getattr(frontend, "en")

fs = hparams.hparams.sample_rate
hop_length = hparams.hparams.hop_size
checkpoint_path= '20180505_deepvoice3_checkpoint_step000640000.pth'


def loadModel():
    model = build_model()
    model = load_checkpoint(checkpoint_path, model, None, True)

    return model

def tts(model, text, filename, p=0, speaker_id=None, fast=True, figures=True):
    from synthesis import tts as _tts
    waveform, alignment, _ , mel = _tts(model, text, p, speaker_id, fast)
    # waveform /= np.max(np.abs(waveform))
    save_wav(waveform, filename)

def concat(filename):
    combined_wav = AudioSegment.empty()
    for f in sorted(os.listdir(filename.split('/')[0])):
        if filename.split('/')[1] in f:
            order = AudioSegment.from_wav('audio/'+f)
            combined_wav += order
    combined_wav.export(filename+'.wav', format="wav")

def predict(text,filename):
    model = loadModel()
    words = text.split(' ')
    step=math.ceil(len(words)/70)

    for i in range(step):
        txtsplit= ' '.join(words[70*i: min(70*(i+1), len(words))])
        tts(model, txtsplit, filename+str(i)+'.wav')

    concat(filename)
    del model
    gc.collect()


    # import wave
    # channels = 1
    # swidth = 2
    # multiplier = 0.8
    #
    # spf = wave.open('file.wav', 'rb')
    # fr = spf.getframerate()  # frame rate
    # signal = spf.readframes(-1)
    #
    # wf = wave.open('ship.wav', 'wb')
    # wf.setnchannels(channels)
    # wf.setsampwidth(swidth)
    # wf.setframerate(fr * multiplier)
    # wf.writeframes(signal)
    # wf.close()

if __name__=="__main__":
    predict("I am Bisakh Mondal", 'a.wav')
