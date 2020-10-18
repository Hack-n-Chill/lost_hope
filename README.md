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

## Folders

### Mobile-app

This folder contains the UI files created using react-native.
Running instructions
```
$ npm install

Open an android emulator through your AVD manager or connect your physical device for the debug APK to be installed


Open a terminal and
$ npx react-native start

Open another terminal and 
$ npx react-native run-android


```

### Decontraction Regex

Contains files for decontracting and predicting nearest words based on our model

### Detection Recognition

Contains the models used in object detection and handwritten text recognition. All the running details are in Dockerfile.

### audio 

Contains the files for our TTS model for converting text to speech. All the models are *containerized* for deployment.



## Team members

* Shuvayan Ghosh Dastidar
* Bisakh Mondal 
* Satyam Kumar
