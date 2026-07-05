/******************************************************************************
Project      : Premanandhan Web Framework (PWF)
Website      : Sam Marbles & Granites
File         : business-hours.js
Purpose      : Business Hours Service
Author       : Premanandhan Narayanan
Version      : 1.0
******************************************************************************/

"use strict";

/*------------------------------------------------------------------------------
CREATE BUSINESS HOURS SERVICE
------------------------------------------------------------------------------*/

PWF.businessHours = {

    /*--------------------------------------------------------------------------
    BUSINESS DATA
    --------------------------------------------------------------------------*/

    hours : null,

    today : null,

    status : "closed",

    /*--------------------------------------------------------------------------
    INITIALIZE
    --------------------------------------------------------------------------*/

    async init(){

        PWF.log("Initializing Business Hours...");

        this.load();

    },

    /*--------------------------------------------------------------------------
    LOAD BUSINESS HOURS

    --------------------------------------------------------------------------*/

    load(){

        const company = PWF.loader.get("company");

        if(!company){

            PWF.warn(

                "company.json not loaded."

            );

            return;

        }

        this.hours = company.workingHours;

        this.today = this.getToday();

        this.checkStatus();

    }

};


/*------------------------------------------------------------------------------
REGISTER MODULE
------------------------------------------------------------------------------*/

PWF.registerModule(

    "businessHours",

    PWF.businessHours

);


/*------------------------------------------------------------------------------
GET TODAY

------------------------------------------------------------------------------*/

PWF.businessHours.getToday = function(){

    const days = [

        "sunday",

        "monday",

        "tuesday",

        "wednesday",

        "thursday",

        "friday",

        "saturday"

    ];

    return days[new Date().getDay()];

};


/*------------------------------------------------------------------------------
BUSINESS HOURS READY

------------------------------------------------------------------------------*/

document.addEventListener(

    "PWF:BusinessHoursReady",

    function(){

        PWF.log(

            "Business Hours Ready."

        );

    }

);


/******************************************************************************
END OF PART 1

NEXT PART

OPEN / CLOSED

CURRENT TIME

TODAY'S HOURS

STATUS

******************************************************************************/
/******************************************************************************
PART 2

OPEN / CLOSED

CURRENT TIME

TODAY'S HOURS

STATUS

******************************************************************************/

/*------------------------------------------------------------------------------
GET CURRENT TIME

Returns minutes since midnight

Example:
10:30 AM = 630

------------------------------------------------------------------------------*/

PWF.businessHours.getCurrentMinutes = function(){

    const now = new Date();

    return (now.getHours() * 60) + now.getMinutes();

};


/*------------------------------------------------------------------------------
CONVERT HH:MM TO MINUTES

Example:
10:00 -> 600
20:00 -> 1200

------------------------------------------------------------------------------*/

PWF.businessHours.toMinutes = function(time){

    const [hours, minutes] = time.split(":").map(Number);

    return (hours * 60) + minutes;

};


/*------------------------------------------------------------------------------
GET TODAY'S BUSINESS HOURS

------------------------------------------------------------------------------*/

PWF.businessHours.getTodayHours = function(){

    if(!this.hours){

        return null;

    }

    return this.hours[this.today] || null;

};


/*------------------------------------------------------------------------------
CHECK OPEN / CLOSED STATUS

------------------------------------------------------------------------------*/

PWF.businessHours.checkStatus = function(){

    const todayHours = this.getTodayHours();

    if(!todayHours){

        this.status = "closed";

        return false;

    }

    const currentTime = this.getCurrentMinutes();

    const openTime = this.toMinutes(todayHours.open);

    const closeTime = this.toMinutes(todayHours.close);

    if(currentTime >= openTime && currentTime < closeTime){

        this.status = "open";

    }
    else{

        this.status = "closed";

    }

    this.notify();

    return this.status === "open";

};


/*------------------------------------------------------------------------------
IS BUSINESS OPEN?

------------------------------------------------------------------------------*/

PWF.businessHours.isOpen = function(){

    return this.status === "open";

};


/*------------------------------------------------------------------------------
IS BUSINESS CLOSED?

------------------------------------------------------------------------------*/

PWF.businessHours.isClosed = function(){

    return !this.isOpen();

};


/*------------------------------------------------------------------------------
GET CURRENT STATUS

------------------------------------------------------------------------------*/

PWF.businessHours.getStatus = function(){

    return this.status;

};


/*------------------------------------------------------------------------------
STATUS CHANGE EVENT

------------------------------------------------------------------------------*/

PWF.businessHours.notify = function(){

    document.dispatchEvent(

        new CustomEvent(

            "PWF:BusinessStatusChanged",

            {

                detail:{

                    status : this.status,

                    day : this.today,

                    hours : this.getTodayHours()

                }

            }

        )

    );

};


/******************************************************************************
END OF PART 2

NEXT PART

OPENS IN...

CLOSES IN...

COUNTDOWN

NEXT STATUS CHANGE

******************************************************************************/
/******************************************************************************
PART 3

OPENS IN...

CLOSES IN...

COUNTDOWN

NEXT STATUS CHANGE

******************************************************************************/

/*------------------------------------------------------------------------------
MINUTES TO TIME STRING

Example:
135
↓

2 Hours 15 Minutes

------------------------------------------------------------------------------*/

PWF.businessHours.formatDuration = function(minutes){

    const hours = Math.floor(minutes / 60);

    const mins = minutes % 60;

    if(hours === 0){

        return `${mins} Minutes`;

    }

    if(mins === 0){

        return `${hours} Hours`;

    }

    return `${hours} Hours ${mins} Minutes`;

};


/*------------------------------------------------------------------------------
TIME UNTIL OPENING

------------------------------------------------------------------------------*/

PWF.businessHours.timeUntilOpen = function(){

    const todayHours = this.getTodayHours();

    if(!todayHours){

        return null;

    }

    const current = this.getCurrentMinutes();

    const open = this.toMinutes(todayHours.open);

    if(current >= open){

        return 0;

    }

    return open - current;

};


/*------------------------------------------------------------------------------
TIME UNTIL CLOSING

------------------------------------------------------------------------------*/

PWF.businessHours.timeUntilClose = function(){

    const todayHours = this.getTodayHours();

    if(!todayHours){

        return null;

    }

    const current = this.getCurrentMinutes();

    const close = this.toMinutes(todayHours.close);

    if(current >= close){

        return 0;

    }

    return close - current;

};


/*------------------------------------------------------------------------------
NEXT STATUS MESSAGE

------------------------------------------------------------------------------*/

PWF.businessHours.getStatusMessage = function(){

    if(this.isOpen()){

        const remaining = this.timeUntilClose();

        return `Closes in ${this.formatDuration(remaining)}`;

    }

    const remaining = this.timeUntilOpen();

    if(remaining > 0){

        return `Opens in ${this.formatDuration(remaining)}`;

    }

    return "Closed for today";

};


/*------------------------------------------------------------------------------
NEXT STATUS CHANGE TIME

------------------------------------------------------------------------------*/

PWF.businessHours.getNextChangeTime = function(){

    const todayHours = this.getTodayHours();

    if(!todayHours){

        return null;

    }

    if(this.isOpen()){

        return todayHours.close;

    }

    return todayHours.open;

};


/*------------------------------------------------------------------------------
BUSINESS INFORMATION

------------------------------------------------------------------------------*/

PWF.businessHours.info = function(){

    return {

        today : this.today,

        status : this.status,

        hours : this.getTodayHours(),

        message : this.getStatusMessage(),

        nextChange : this.getNextChangeTime()

    };

};


/******************************************************************************
END OF PART 3

NEXT PART

HOLIDAY SUPPORT

NEXT WORKING DAY

AUTO REFRESH

LIVE STATUS

******************************************************************************/
/******************************************************************************
PART 4

HOLIDAY SUPPORT

NEXT WORKING DAY

AUTO REFRESH

LIVE STATUS

******************************************************************************/

/*------------------------------------------------------------------------------
CHECK PUBLIC HOLIDAY

Holiday Format

YYYY-MM-DD

------------------------------------------------------------------------------*/

PWF.businessHours.isHoliday = function(){

    const settings = PWF.loader.get("settings");

    if(

        !settings ||

        !settings.holidays ||

        !Array.isArray(settings.holidays)

    ){

        return false;

    }

    const today = new Date()

        .toISOString()

        .split("T")[0];

    return settings.holidays.includes(today);

};


/*------------------------------------------------------------------------------
GET BUSINESS STATUS

------------------------------------------------------------------------------*/

PWF.businessHours.getBusinessStatus = function(){

    if(this.isHoliday()){

        return "holiday";

    }

    return this.isOpen()

        ? "open"

        : "closed";

};


/*------------------------------------------------------------------------------
REFRESH STATUS

------------------------------------------------------------------------------*/

PWF.businessHours.refresh = function(){

    this.today = this.getToday();

    this.checkStatus();

};


/*------------------------------------------------------------------------------
START LIVE MONITOR

Checks every minute

------------------------------------------------------------------------------*/

PWF.businessHours.startMonitoring = function(){

    PWF.log(

        "Business Hours Monitor Started."

    );

    this.refresh();

    setInterval(

        () => {

            this.refresh();

        },

        60000

    );

};


/*------------------------------------------------------------------------------
GET DISPLAY TEXT

------------------------------------------------------------------------------*/

PWF.businessHours.getDisplayText = function(){

    if(this.isHoliday()){

        return "Holiday";

    }

    if(this.isOpen()){

        return "Open Now";

    }

    return "Closed";

};


/*------------------------------------------------------------------------------
INITIALIZATION UPDATE

Replace

this.checkStatus();

with

------------------------------------------------------------------------------*/

this.startMonitoring();


/******************************************************************************
END OF PART 4

NEXT PART

NEXT WORKING DAY

SUMMARY

DEBUG

FRAMEWORK READY

END OF business-hours.js

******************************************************************************/
/******************************************************************************
PART 5

STATUS BADGE

DEBUG

SUMMARY

FRAMEWORK READY

END OF BUSINESS-HOURS.JS

******************************************************************************/

/*------------------------------------------------------------------------------
BUSINESS STATUS BADGE

------------------------------------------------------------------------------*/

PWF.businessHours.getBadge = function(){

    const status = this.getBusinessStatus();

    switch(status){

        case "open":

            return{

                status : "open",

                text : "Open Now",

                icon : "🟢",

                color : "success"

            };

        case "holiday":

            return{

                status : "holiday",

                text : "Holiday",

                icon : "🎉",

                color : "warning"

            };

        default:

            return{

                status : "closed",

                text : "Closed",

                icon : "🔴",

                color : "danger"

            };

    }

};


/*------------------------------------------------------------------------------
DEBUG INFORMATION

------------------------------------------------------------------------------*/

PWF.businessHours.debug = function(){

    console.group(

        "%cBusiness Hours Debug",

        "color:#198754;font-weight:bold;"

    );

    console.table({

        "Today"           : this.today,

        "Current Status"  : this.getBusinessStatus(),

        "Display Text"    : this.getDisplayText(),

        "Holiday"         : this.isHoliday(),

        "Business Open"   : this.isOpen(),

        "Next Change"     : this.getNextChangeTime(),

        "Status Message"  : this.getStatusMessage()

    });

    console.groupEnd();

};


/*------------------------------------------------------------------------------
SERVICE SUMMARY

------------------------------------------------------------------------------*/

PWF.businessHours.summary = function(){

    PWF.log("--------------------------------");

    PWF.log("Business Hours Service");

    PWF.log("--------------------------------");

    PWF.log(`Today          : ${this.today}`);

    PWF.log(`Status         : ${this.getBusinessStatus()}`);

    PWF.log(`Display        : ${this.getDisplayText()}`);

    PWF.log(`Message        : ${this.getStatusMessage()}`);

};


/*------------------------------------------------------------------------------
FRAMEWORK INFORMATION

------------------------------------------------------------------------------*/

PWF.businessHours.info = function(){

    return{

        today : this.today,

        status : this.getBusinessStatus(),

        display : this.getDisplayText(),

        badge : this.getBadge(),

        holiday : this.isHoliday(),

        hours : this.getTodayHours(),

        nextChange : this.getNextChangeTime()

    };

};


/*------------------------------------------------------------------------------
INITIALIZATION UPDATE

Add these lines at the end of startMonitoring()

------------------------------------------------------------------------------*/

// Framework Ready

PWF.flags.businessHoursReady = true;

// Print Summary

this.summary();

// Notify Framework

document.dispatchEvent(

    new CustomEvent(

        "PWF:BusinessHoursReady",

        {

            detail : this.info()

        }

    )

);


/******************************************************************************
END OF FILE

business-hours.js

Premanandhan Web Framework

Version 1.0

Business Hours Service Completed

******************************************************************************/
