# Map-App
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

Node version - 8.12.0
MongoDB version - v4.0.2
Leaflet - 1.3.4
Follow installation docs to install the above mentioned software
The map used in the application is LeafletJS latest at the time of development of application

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
2. Although Chart is implemented the data till now is static, we need to add a count service to change the data of the chart dynamically, but it does not seem to work in canvasjs.

## TODO
1. Different markers showing different intensity of occurrences
2. Layer control option to be added

## Update 0.0.1
1. Implemnted tree based search on classes and phylums

## Update 0.0.2
1. Added static chart at the slider in bottom

## Problem
The map api used is Open street maps. The Bhuvan API is not linking with the current versions
The map container using leaflet does not allow dynamic re rendering when data is changed.
The container API used in the model website is a paid one called mapbox, So we cannot use it
