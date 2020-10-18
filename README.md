# Scan n Listen

<p align="center">
	<img src="/assets/logo.jpg">
</p>


An cross-platform app to listen to your handwritten notes with the magic of deeplearning.


Tired of reading gibberish, exam is near, have to grasp a huge amount of notes, Scan n Listen is here. We are providing a feasible solution so that you can listen your notes on the go.

#### Language/Frameworks used

* React Native ( for frontend app ) 
* Pytorch ( for the deep-learning magic ! )
* Python for handling APIs (Flask)
* Golang for decontraction regex (cross language c-shared build)
* Dockerfile for building our custom trained TTS and Img2Txt services.

## Folders

### Mobile-app

This folder contains the UI files created using react-native.
Running instructions
```bash
$ npm install

Open an android emulator through your AVD manager or connect your physical device for the debug APK to be installed


Open a terminal and
$ npx react-native start

Open another terminal and 
$ npx react-native run-android


```

### Decontraction Regex

Contains files for decontracting and predicting nearest words based on our model.

### Detection Recognition

Contains the models used in object detection and handwritten text recognition. All the running details are in Dockerfile.
This api takes a pdf and return the processed audio after the following steps
* pdf processing and whole content alignment after rotating a certain degrees
* Object detection module to get a bounding box around text clusture
* OCR to perform recognition
* Decontraction and language modelling to find the highest probability word that are one or two edits away from the original word.
* TTS module to convert text to speech.

To help the build locally we have provided the necessary instruction in dockerfile, for runnning the bulild and creating a container try,
```bash
cd detection+recognition/

#For building the image.
docker build -t "img2txt:v1" -f Dockerfile .

#running the container on local port 8090
docker container run --name img1 -d -p 8090:5000 img2txt:v1

```
### audio 

Contains the files for our TTS model for converting text to speech. All the models are *containerized* for deployment.
```bash
cd audio/

#For building the image.
docker build -t "tts:v1" -f Dockerfile .

#running the container on local port 8091
docker container run --name ttsC -d -p 8091:5000 tts:v1

```
## Endpoints
* TTS [http://35.188.7.160/](http://35.188.7.160/)
* Img2Txt [http://34.123.55.155/](http://34.123.55.155/)

## Team members

* Shuvayan Ghosh Dastidar
* Bisakh Mondal 
* Satyam Kumar
