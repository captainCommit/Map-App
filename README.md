# MapApp
A lightweight application on the Mean Stack to view spatial and temporal variations of fauna all over India.

## Development server for UI (Angular)
Run ng serve --open
Browser will open at https://localhost:4200/

## Description

This application currently works on dummy data to find various people over the Earth that existed in a given time period.
However the main objective is to find the state-wise distribution of various fauna all over India, and provide the user with
data about the data collected in the wild by researchers. Moreover future updates will include a state specific search of various species and finally a taxonomical search on the basis of phylum genus species and order of animals all over India.
This project will also have mobile version.

## Requirements
The map used in the application is Leaflet version - latest at the time of development of application

## Data File
data.json

## Import Database
mongoimport --jsonArray --db mapdb --collection data --file <path to filename>

## To Run the App
Open Browser at http://localhost:3000/

1.  RUN NPM INSTALL
2.  RUN NPM START

## Issues
1. Map is not Completely Dynamic
2. There is a commented out tree search in the app.component.html (Can't Implement it.... Help is needed)

## TODO
1. Chart Implementation in Future Versions(Species Count)
2. Different markers showing different intensity of occurrences
3. Proper implementation of tree view
