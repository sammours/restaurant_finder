# Restaurant Finder
This project gets the current position of the mobile device and searches for the restaurants near to the location. It also provides the ability to add a restaurant to the favourite list, change the distance of the searching range and change the sorting types.

It displays the restaurant information like type, name, address, photo and shows also the reviews and the rating.

### Why is the application suitable for mobile?
---
It happened very often that we are walking on the street and hungry but we don't know where to go. We can still go to google maps and search manually but we still see lots of features that we don't really need, besides, the design is not optimal for the purpose.

Our laptop is not always available with you, especially if you are walking on the street with friends and you just want to search for restaurants with an easy and fast way and less traffic.

The application offers an easy and efficient way to search for restaurants near to your location with as fewer clicks as possible.

### The designing for mobile use
---
This application is developed under ionic 4 and angular 7 which they both are javascript base frameworks with help from bootstrap 4 for a better UX.

Ionic provides many features like loading components, alerts, tabs and plugins to give a more mobile-feel design.

This application called Hybrid applications based on javascript and for that,there is a need for a backend that has been separately developed under .NET Web API.

Ionic can be deployed on both ios and android devices after setting the platforms and can also display the output using emulators. The application can be packed later on to an executable file (.apk for android and .ipa for ios) to be installed and used in on devices.

### How it works
---
The application uses Angular 7 and lazy load the modules. (Each tab is a module)

The tabs module is the module that will be started at the beginning and lazy load the three other modules (finder, favourite, settings)

![Getting Started](./readme_images/modules.png)

The models folder contains the model classes and the services are caring about calling the backend and requesting the data.


### Startup
---
To install the necessary packages, the following command should be used:
>npm install

The following command is enough to start up the ionic application after installing all the packages:
>ionic serve

This will start a browser instance (default browser) when ready and will start the app.

To start the emulator, there is a need to install the correct sdk for both android and ios and then start the wanted emulator using one of these commands:
>ionic cordova emulate android

>ionic cordova emulate ios

The backend should be started separately.



