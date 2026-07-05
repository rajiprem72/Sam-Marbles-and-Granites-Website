/******************************************************************************
Project      : Premanandhan Web Framework (PWF)
Website      : Sam Marbles & Granites
File         : theme.js
Purpose      : Theme Management Engine
Author       : Premanandhan Narayanan
Version      : 1.0
******************************************************************************/

"use strict";

/*------------------------------------------------------------------------------
CREATE THEME MODULE
------------------------------------------------------------------------------*/

PWF.theme = {

    /*--------------------------------------------------------------------------
    CURRENT THEME
    --------------------------------------------------------------------------*/

    current : null,

    /*--------------------------------------------------------------------------
    AVAILABLE THEMES

    Sunday to Saturday

    --------------------------------------------------------------------------*/

    themes : {

        sunday    : "gold",

        monday    : "blue",

        tuesday   : "green",

        wednesday : "purple",

        thursday  : "orange",

        friday    : "maroon",

        saturday  : "teal"

    },

    /*--------------------------------------------------------------------------
    INITIALIZE

    --------------------------------------------------------------------------*/

    async init(){

        PWF.log("Initializing Theme Module...");

        this.load();

    },

    /*--------------------------------------------------------------------------
    LOAD THEME

    --------------------------------------------------------------------------*/

    load(){

        const settings = PWF.loader.get("settings");

        if(!settings){

            PWF.warn(

                "settings.json not loaded."

            );

            return;

        }

        this.applyTheme();

    }

};


/*------------------------------------------------------------------------------
REGISTER MODULE
------------------------------------------------------------------------------*/

PWF.registerModule(

    "theme",

    PWF.theme

);


/*------------------------------------------------------------------------------
THEME READY EVENT
------------------------------------------------------------------------------*/

document.addEventListener(

    "PWF:ThemeChanged",

    function(event){

        PWF.log(

            `Theme Changed : ${event.detail.theme}`

        );

    }

);


/******************************************************************************
END OF PART 1

NEXT PART

AUTO DAY DETECTION

DAILY THEME

MANUAL THEME

DEFAULT THEME

******************************************************************************/
/******************************************************************************
PART 2

AUTO DAY DETECTION

DAILY THEME

MANUAL THEME

DEFAULT THEME

******************************************************************************/

/*------------------------------------------------------------------------------
GET TODAY'S DAY

Returns:
sunday
monday
...

------------------------------------------------------------------------------*/

PWF.theme.getToday = function(){

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
GET CURRENT THEME

------------------------------------------------------------------------------*/

PWF.theme.getCurrentTheme = function(){

    return this.current;

};


/*------------------------------------------------------------------------------
APPLY DAILY THEME

------------------------------------------------------------------------------*/

PWF.theme.applyTheme = function(){

    const settings = PWF.loader.get("settings");

    if(!settings){

        PWF.warn("Settings not available.");

        return;

    }

    if(!settings.dailyThemes){

        PWF.warn("Daily themes not configured.");

        return;

    }

    const today = this.getToday();

    const theme = settings.dailyThemes[today];

    if(!theme){

        PWF.warn(

            `No theme configured for ${today}.`

        );

        return;

    }

    this.setTheme(theme);

};


/*------------------------------------------------------------------------------
SET THEME

------------------------------------------------------------------------------*/

PWF.theme.setTheme = function(theme){

    this.current = theme;

    document.documentElement.setAttribute(

        "data-theme",

        theme

    );

    PWF.log(

        `Current Theme : ${theme}`

    );

    document.dispatchEvent(

        new CustomEvent(

            "PWF:ThemeChanged",

            {

                detail:{

                    theme : theme,

                    day : this.getToday()

                }

            }

        )

    );

};


/*------------------------------------------------------------------------------
RESET TO DAILY THEME

------------------------------------------------------------------------------*/

PWF.theme.reset = function(){

    this.applyTheme();

};


/******************************************************************************
END OF PART 2

NEXT PART

THEME TRANSITIONS

LOCAL STORAGE

MANUAL THEME SELECTION

RESTORE PREVIOUS THEME

******************************************************************************/
/******************************************************************************
PART 3

THEME TRANSITIONS

LOCAL STORAGE

MANUAL THEME SELECTION

RESTORE PREVIOUS THEME

******************************************************************************/

/*------------------------------------------------------------------------------
SAVE CURRENT THEME

------------------------------------------------------------------------------*/

PWF.theme.save = function(){

    PWF.utils.saveStorage(

        PWF.storageKeys.THEME,

        this.current

    );

};


/*------------------------------------------------------------------------------
LOAD SAVED THEME

------------------------------------------------------------------------------*/

PWF.theme.loadSavedTheme = function(){

    return PWF.utils.loadStorage(

        PWF.storageKeys.THEME,

        null

    );

};


/*------------------------------------------------------------------------------
APPLY THEME TRANSITION

------------------------------------------------------------------------------*/

PWF.theme.enableTransition = function(){

    document.documentElement.style.setProperty(

        "--theme-transition",

        "all 0.30s ease"

    );

};


/*------------------------------------------------------------------------------
DISABLE THEME TRANSITION

------------------------------------------------------------------------------*/

PWF.theme.disableTransition = function(){

    document.documentElement.style.removeProperty(

        "--theme-transition"

    );

};


/*------------------------------------------------------------------------------
SET MANUAL THEME

------------------------------------------------------------------------------*/

PWF.theme.setManualTheme = function(theme){

    this.setTheme(theme);

    this.save();

    PWF.log(

        `Manual Theme Selected : ${theme}`

    );

};


/*------------------------------------------------------------------------------
RESTORE PREVIOUS THEME

------------------------------------------------------------------------------*/

PWF.theme.restore = function(){

    const savedTheme = this.loadSavedTheme();

    if(savedTheme){

        this.setTheme(savedTheme);

        PWF.log(

            `Restored Theme : ${savedTheme}`

        );

        return true;

    }

    return false;

};


/*------------------------------------------------------------------------------
USE DAILY THEME

------------------------------------------------------------------------------*/

PWF.theme.useDailyTheme = function(){

    PWF.utils.removeStorage(

        PWF.storageKeys.THEME

    );

    this.applyTheme();

};


/******************************************************************************
END OF PART 3

NEXT PART

THEME VALIDATION

AVAILABLE THEMES

CHANGE EVENTS

THEME PREVIEW

******************************************************************************/
/******************************************************************************
PART 4

THEME VALIDATION

AVAILABLE THEMES

CHANGE EVENTS

THEME PREVIEW

******************************************************************************/

/*------------------------------------------------------------------------------
CHECK WHETHER A THEME EXISTS

------------------------------------------------------------------------------*/

PWF.theme.exists = function(theme){

    const settings = PWF.loader.get("settings");

    if(!settings || !settings.theme){

        return false;

    }

    const themes = settings.theme.dailyThemes;

    return Object.values(themes).includes(theme);

};


/*------------------------------------------------------------------------------
GET ALL AVAILABLE THEMES

------------------------------------------------------------------------------*/

PWF.theme.getThemes = function(){

    const settings = PWF.loader.get("settings");

    if(!settings || !settings.theme){

        return [];

    }

    return Object.values(

        settings.theme.dailyThemes

    );

};


/*------------------------------------------------------------------------------
GET TODAY'S THEME

------------------------------------------------------------------------------*/

PWF.theme.getTodayTheme = function(){

    const settings = PWF.loader.get("settings");

    if(!settings || !settings.theme){

        return null;

    }

    const today = this.getToday();

    return settings.theme.dailyThemes[today];

};


/*------------------------------------------------------------------------------
PREVIEW A THEME

Temporary Preview

Does NOT save

------------------------------------------------------------------------------*/

PWF.theme.preview = function(theme){

    if(!this.exists(theme)){

        PWF.warn(

            `Unknown theme : ${theme}`

        );

        return;

    }

    document.documentElement.setAttribute(

        "data-theme",

        theme

    );

};


/*------------------------------------------------------------------------------
RESTORE AFTER PREVIEW

------------------------------------------------------------------------------*/

PWF.theme.restorePreview = function(){

    if(this.current){

        this.setTheme(

            this.current

        );

    }

};


/*------------------------------------------------------------------------------
CHANGE EVENT

------------------------------------------------------------------------------*/

PWF.theme.notify = function(){

    document.dispatchEvent(

        new CustomEvent(

            "PWF:ThemeChanged",

            {

                detail:{

                    theme:this.current,

                    day:this.getToday(),

                    timestamp:new Date()

                }

            }

        )

    );

};


/*------------------------------------------------------------------------------
UPDATE setTheme()

Replace

document.dispatchEvent(...)

with

------------------------------------------------------------------------------*/

// Notify Framework

this.notify();


/*------------------------------------------------------------------------------
THEME INFORMATION

------------------------------------------------------------------------------*/

PWF.theme.info = function(){

    return {

        current:this.current,

        today:this.getToday(),

        available:this.getThemes()

    };

};


/******************************************************************************
END OF PART 4

NEXT PART

AUTO MODE

MANUAL MODE

RESET

DEBUG

FRAMEWORK SUMMARY

END OF theme.js

******************************************************************************/
/******************************************************************************
PART 5

AUTO MODE

MANUAL MODE

RESET

DEBUG

FRAMEWORK SUMMARY

END OF THEME.JS

******************************************************************************/

/*------------------------------------------------------------------------------
AUTO MODE

Use Theme Based On Current Day

------------------------------------------------------------------------------*/

PWF.theme.enableAutoMode = function(){

    PWF.log("Automatic Theme Mode Enabled.");

    PWF.utils.removeStorage(

        PWF.storageKeys.THEME

    );

    this.applyTheme();

};


/*------------------------------------------------------------------------------
MANUAL MODE

------------------------------------------------------------------------------*/

PWF.theme.enableManualMode = function(theme){

    if(!this.exists(theme)){

        PWF.warn(

            `Invalid Theme : ${theme}`

        );

        return false;

    }

    this.setManualTheme(theme);

    return true;

};


/*------------------------------------------------------------------------------
RESET THEME

------------------------------------------------------------------------------*/

PWF.theme.reset = function(){

    PWF.log("Resetting Theme...");

    this.enableAutoMode();

};


/*------------------------------------------------------------------------------
DEBUG INFORMATION

------------------------------------------------------------------------------*/

PWF.theme.debug = function(){

    console.group(

        "%cTheme Debug",

        "color:#6f42c1;font-weight:bold;"

    );

    console.table({

        "Current Theme" : this.current,

        "Today"         : this.getToday(),

        "Auto Mode"     : true,

        "Saved Theme"   : this.loadSavedTheme(),

        "Available"     : this.getThemes().join(", ")

    });

    console.groupEnd();

};


/*------------------------------------------------------------------------------
FRAMEWORK SUMMARY

------------------------------------------------------------------------------*/

PWF.theme.summary = function(){

    PWF.log("--------------------------------");

    PWF.log("Theme Engine");

    PWF.log("--------------------------------");

    PWF.log(`Today's Day     : ${this.getToday()}`);

    PWF.log(`Current Theme   : ${this.current}`);

    PWF.log(`Available Theme : ${this.getThemes().length}`);

};


/*------------------------------------------------------------------------------
INITIALIZATION UPDATE

Replace

this.load();

with

------------------------------------------------------------------------------*/

// Restore Manual Theme

if(!this.restore()){

    this.applyTheme();

}

this.summary();


/*------------------------------------------------------------------------------
FRAMEWORK READY

------------------------------------------------------------------------------*/

PWF.flags.themeLoaded = true;


/******************************************************************************
END OF FILE

theme.js

Premanandhan Web Framework

Version 1.0

Theme Engine Completed

******************************************************************************/
