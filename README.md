[Link to the app](https://secret-headland-35100.herokuapp.com/)  
[An example .csv file](https://drive.google.com/open?id=1vMAGcrWITRreCzNdjL7SSa0z4mNGpzun)  
[An another example .csv file](https://drive.google.com/open?id=14Lwz4KM8BBbsx6dbPd1EZz4NPukjOiTz)  

## Payday
[![Build Status](https://travis-ci.org/xbexbex/Payday.svg?branch=master)](https://travis-ci.org/xbexbex/Payday) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/e763b76edf454227a3c863ab5ee521b6)](https://www.codacy.com/app/xbexbex/Payday?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=xbexbex/Payday&amp;utm_campaign=Badge_Grade)

A simple csv parser for wage calculations. 

##Usage:
* Drag a file into the page or click to download, and it will create a .csv file with the monthly salaries.

##Wage specifications:
* Hourly wage is $3.75
* Evening bonus is $1.15/hour between 18:00 - 06:00.
* Overtime:
** First 2 Hours > 8 Hours = Hourly Wage + 25% 
** Next 2 Hours = Hourly Wage + 50% 
** After That = Hourly Wage + 100% 


Tested with Chrome and Firefox on Linux and Windows.
