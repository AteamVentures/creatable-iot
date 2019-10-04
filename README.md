### Creatable IoT

> The purpose of this mobile application is to communicate with the Creatable IoT server (based on Adafruit's cloud solution) which, in turn, controls a hardware device. This app is simply the mobile app frontend to that server.

### Technologies used for this project

* [Ionic - Hybrid Mobile App Framework]("https://ionicframework.com/docs/intro")
* [Chart.js - JavaScript Chart Library]("https://www.chartjs.org/")

### Dependency Installation

```bash
# Make sure you have Node and npm installed (https://nodejs.org/en/)
$ npm install -g ionic # Install the Ionic CLI and toolchain
# Navigate into the root directory for this project
$ npm i # install all node modules for this project
```

### Running the app in development mode

```bash
# Make sure you receive config.json from your admin
# Move config.json into this location: src/app/home/config.json
# You need the config.json file in the right location for this app to work
$ ionic serve
```

### Building the app for deployment

> I ran into some incompatibility issues with the latest version of Xcode and the Cordova framework. I resolved these issues by forcing the Cordova build system to use the legacy Xcode build system instead of the newest one. This issue is not unique to this app, and can easily be found in the Cordova forums.

```bash
$ sudo ionic cordova build ios --prod --release  -- --buildFlag="-UseModernBuildSystem=0"
# Code signing and certificates can be handled in Xcode
```

### Deploying the app for specific users

> Archive and distribute the app via Xcode (please refer to the screen shots below)

![xcode-1](/readme_files/1.png)
![xcode-2](/readme_files/2.png)
![xcode-3](/readme_files/3.png)
![xcode-4](/readme_files/4.png)
![xcode-5](/readme_files/5.png)
![xcode-6](/readme_files/6.png)
![xcode-7](/readme_files/7.png)
![xcode-8](/readme_files/8.png)
![xcode-9](/readme_files/9.png)
![xcode-10](/readme_files/10.png)
![xcode-11](/readme_files/11.png)
![xcode-12](/readme_files/12.png)
![xcode-13](/readme_files/13.png)


