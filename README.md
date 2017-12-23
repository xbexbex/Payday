[Link to the app](https://payday-assignment.herokuapp.com/)  
[An example .csv file](https://drive.google.com/open?id=1vMAGcrWITRreCzNdjL7SSa0z4mNGpzun)  
[An another example .csv file](https://drive.google.com/open?id=14Lwz4KM8BBbsx6dbPd1EZz4NPukjOiTz)  

## Payday
[![Build Status](https://travis-ci.org/xbexbex/Payday.svg?branch=master)](https://travis-ci.org/xbexbex/Payday) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/e763b76edf454227a3c863ab5ee521b6)](https://www.codacy.com/app/xbexbex/Payday?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=xbexbex/Payday&amp;utm_campaign=Badge_Grade)

A simple csv parser for wage calculations. Uses React + Typescript. Bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app).

### Usage:
* Drag a file into the page or click to download, and it will create a .csv file with the monthly salaries.

### Installation:
* Install npm package manager if not installed
* Clone the repository
* In the cloned directory, run command "npm install"

### Wage specifications:
* Hourly wage is $3.75
* Evening bonus is $1.15/hour between 18:00 - 06:00.
* Overtime:
  * First 2 hours after 8 hours: +25% of hourly Wage
  * Next 2 hours: +50% of hourly wage
  * After that: +100% of hourly wage


Tested with Chrome and Firefox on Linux and Windows.
