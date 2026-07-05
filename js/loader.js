/******************************************************************************
Project      : Premanandhan Web Framework (PWF)
Website      : Sam Marbles & Granites
File         : loader.js
Purpose      : Data Loading & Cache Manager
Author       : Premanandhan Narayanan
Version      : 1.0
******************************************************************************/

"use strict";

/*------------------------------------------------------------------------------
CREATE LOADER MODULE
------------------------------------------------------------------------------*/

PWF.loader = {

    /*--------------------------------------------------------------------------
    DATA STORE

    Stores all loaded JSON data

    --------------------------------------------------------------------------*/

    data : {},

    /*--------------------------------------------------------------------------
    LOADING STATUS

    --------------------------------------------------------------------------*/

    loading : false,

    loaded : false,

    totalFiles : 0,

    loadedFiles : 0,

    failedFiles : 0,

    /*--------------------------------------------------------------------------
    INITIALIZE LOADER

    --------------------------------------------------------------------------*/

    async init(){

        PWF.log("Initializing Loader Module...");

        this.loading = true;

        this.loaded = false;

        this.loadedFiles = 0;

        this.failedFiles = 0;

        this.totalFiles = Object.keys(

            PWF.config.dataFiles

        ).length;

        PWF.log(

            `JSON Files : ${this.totalFiles}`

        );

    },

    /*--------------------------------------------------------------------------
    RESET LOADER

    --------------------------------------------------------------------------*/

    reset(){

        this.data = {};

        this.loading = false;

        this.loaded = false;

        this.loadedFiles = 0;

        this.failedFiles = 0;

    }

};


/*------------------------------------------------------------------------------
REGISTER LOADER

------------------------------------------------------------------------------*/

PWF.registerModule(

    "loader",

    PWF.loader

);


/*------------------------------------------------------------------------------
LOADER READY EVENT

------------------------------------------------------------------------------*/

document.addEventListener(

    "PWF:LoaderReady",

    () => {

        PWF.log(

            "Loader Ready."

        );

    }

);


/******************************************************************************
END OF PART 1

NEXT PART

Load company.json

Load products.json

Load testimonials.json

Load settings.json

******************************************************************************/
/******************************************************************************
PART 2

LOAD JSON FILES

company.json

products.json

testimonials.json

settings.json

******************************************************************************/

/*------------------------------------------------------------------------------
LOAD SINGLE JSON FILE

------------------------------------------------------------------------------*/

PWF.loader.load = async function(name, file){

    try{

        PWF.log(`Loading ${name}...`);

        const data = await PWF.utils.fetchJSON(file);

        if(data === null){

            throw new Error(`Unable to load ${file}`);

        }

        this.data[name] = data;

        this.loadedFiles++;

        PWF.log(`${name} loaded successfully.`);

        return true;

    }

    catch(error){

        this.failedFiles++;

        PWF.error(

            `Failed to load ${name}`,

            error

        );

        return false;

    }

};


/*------------------------------------------------------------------------------
LOAD ALL JSON FILES

------------------------------------------------------------------------------*/

PWF.loader.loadAll = async function(){

    PWF.log("Loading JSON Files...");

    const files = PWF.config.dataFiles;

    for(const [name,file] of Object.entries(files)){

        await this.load(name,file);

    }

    this.loading = false;

    this.loaded = true;

    document.dispatchEvent(

        new CustomEvent(

            "PWF:LoaderReady"

        )

    );

};


/*------------------------------------------------------------------------------
LOAD DEFAULT DATA FILES

------------------------------------------------------------------------------*/

PWF.loader.loadDefaults = async function(){

    await this.loadAll();

};


/*------------------------------------------------------------------------------
UPDATE init()

Replace

PWF.log(`JSON Files : ${this.totalFiles}`);

with

------------------------------------------------------------------------------*/

// Automatically load all JSON files

await this.loadDefaults();


/******************************************************************************
END OF PART 2

NEXT PART

CACHE

GET()

HAS()

REMOVE()

RELOAD()

******************************************************************************/
/******************************************************************************
PART 3

CACHE MANAGER

GET()

HAS()

REMOVE()

RELOAD()

CLEAR CACHE

******************************************************************************/

/*------------------------------------------------------------------------------
GET DATA

Returns JSON data from memory

Example

const products = PWF.loader.get("products");

------------------------------------------------------------------------------*/

PWF.loader.get = function(name){

    return this.data[name] || null;

};


/*------------------------------------------------------------------------------
CHECK DATA EXISTS

------------------------------------------------------------------------------*/

PWF.loader.has = function(name){

    return Object.prototype.hasOwnProperty.call(

        this.data,

        name

    );

};


/*------------------------------------------------------------------------------
REMOVE DATASET

------------------------------------------------------------------------------*/

PWF.loader.remove = function(name){

    if(this.has(name)){

        delete this.data[name];

        PWF.log(`${name} removed from cache.`);

        return true;

    }

    return false;

};


/*------------------------------------------------------------------------------
CLEAR CACHE

------------------------------------------------------------------------------*/

PWF.loader.clear = function(){

    this.data = {};

    this.loadedFiles = 0;

    this.failedFiles = 0;

    this.loaded = false;

    PWF.log("Loader cache cleared.");

};


/*------------------------------------------------------------------------------
RELOAD A SINGLE DATASET

------------------------------------------------------------------------------*/

PWF.loader.reload = async function(name){

    const file = PWF.config.dataFiles[name];

    if(!file){

        PWF.warn(

            `${name} is not configured.`

        );

        return false;

    }

    this.remove(name);

    return await this.load(name,file);

};


/*------------------------------------------------------------------------------
RELOAD ALL DATA

------------------------------------------------------------------------------*/

PWF.loader.reloadAll = async function(){

    PWF.log("Reloading all JSON files...");

    this.clear();

    await this.loadAll();

};


/*------------------------------------------------------------------------------
GET LOADED DATASETS

------------------------------------------------------------------------------*/

PWF.loader.list = function(){

    return Object.keys(this.data);

};


/*------------------------------------------------------------------------------
CACHE STATISTICS

------------------------------------------------------------------------------*/

PWF.loader.statistics = function(){

    return {

        totalFiles : this.totalFiles,

        loadedFiles : this.loadedFiles,

        failedFiles : this.failedFiles,

        cachedItems : Object.keys(this.data).length,

        loading : this.loading,

        loaded : this.loaded

    };

};


/******************************************************************************
END OF PART 3

NEXT PART

LOADING PROGRESS

CUSTOM EVENTS

PROGRESS BAR

COMPLETION

******************************************************************************/
/******************************************************************************
PART 4

LOADING PROGRESS

CUSTOM EVENTS

PROGRESS BAR

COMPLETION

******************************************************************************/

/*------------------------------------------------------------------------------
GET LOADING PROGRESS

Returns Percentage

------------------------------------------------------------------------------*/

PWF.loader.getProgress = function(){

    if(this.totalFiles === 0){

        return 0;

    }

    return Math.round(

        (this.loadedFiles / this.totalFiles) * 100

    );

};


/*------------------------------------------------------------------------------
UPDATE PROGRESS

------------------------------------------------------------------------------*/

PWF.loader.updateProgress = function(){

    const progress = this.getProgress();

    PWF.log(

        `Loading Progress : ${progress}%`

    );

    document.dispatchEvent(

        new CustomEvent(

            "PWF:LoaderProgress",

            {

                detail:{

                    progress,

                    loadedFiles : this.loadedFiles,

                    totalFiles : this.totalFiles,

                    failedFiles : this.failedFiles

                }

            }

        )

    );

};


/*------------------------------------------------------------------------------
SHOW LOADER

------------------------------------------------------------------------------*/

PWF.loader.show = function(){

    const loader = PWF.utils.$("#loader");

    if(loader){

        PWF.utils.show(loader);
    }

};


/*------------------------------------------------------------------------------
HIDE LOADER

------------------------------------------------------------------------------*/

PWF.loader.hide = function(){

    const loader = PWF.utils.$("#loader");

    if(loader){

        PWF.utils.hide(loader);
    }

};


/*------------------------------------------------------------------------------
LOADING COMPLETED

------------------------------------------------------------------------------*/

PWF.loader.complete = function(){

    this.loading = false;

    this.loaded = true;

    this.hide();

    PWF.log("All JSON files loaded successfully.");

    document.dispatchEvent(

        new CustomEvent(

            "PWF:LoaderCompleted",

            {

                detail: this.statistics()

            }

        )

    );

};


/*------------------------------------------------------------------------------
UPDATE load()

Add this just before

return true;

------------------------------------------------------------------------------*/

// Update Progress

this.updateProgress();


/*------------------------------------------------------------------------------
UPDATE loadAll()

Replace

this.loading = false;

this.loaded = true;

document.dispatchEvent(...)

with

------------------------------------------------------------------------------*/

this.complete();


/******************************************************************************
END OF PART 4

NEXT PART

ERROR HANDLING

RETRY

DEVELOPER TOOLS

LOADER SUMMARY

END OF loader.js

******************************************************************************/
/******************************************************************************
PART 5

ERROR HANDLING

RETRY

DEVELOPER TOOLS

LOADER SUMMARY

END OF LOADER.JS

******************************************************************************/

/*------------------------------------------------------------------------------
RETRY LOADING

------------------------------------------------------------------------------*/

PWF.loader.retry = async function(name){

    PWF.log(`Retrying ${name}...`);

    return await this.reload(name);

};


/*------------------------------------------------------------------------------
HAS ERRORS

------------------------------------------------------------------------------*/

PWF.loader.hasErrors = function(){

    return this.failedFiles > 0;

};


/*------------------------------------------------------------------------------
GET FAILED FILE COUNT

------------------------------------------------------------------------------*/

PWF.loader.failedCount = function(){

    return this.failedFiles;

};


/*------------------------------------------------------------------------------
LOADER SUMMARY

------------------------------------------------------------------------------*/

PWF.loader.summary = function(){

    console.group(

        "%cLoader Summary",

        "color:#198754;font-weight:bold;"

    );

    console.table({

        "Total Files"  : this.totalFiles,

        "Loaded Files" : this.loadedFiles,

        "Failed Files" : this.failedFiles,

        "Progress"     : this.getProgress() + "%",

        "Status"       : this.hasErrors()

                            ? "Completed With Errors"

                            : "Completed Successfully"

    });

    console.groupEnd();

};


/*------------------------------------------------------------------------------
PRINT CACHE

Developer Tool

------------------------------------------------------------------------------*/

PWF.loader.printCache = function(){

    console.log(

        "PWF Loader Cache"

    );

    console.table(this.data);

};


/*------------------------------------------------------------------------------
GET FILE SIZE

Approximate JSON Size

------------------------------------------------------------------------------*/

PWF.loader.size = function(){

    return JSON.stringify(this.data).length;

};


/*------------------------------------------------------------------------------
EXPORT CACHE

Useful For Debugging

------------------------------------------------------------------------------*/

PWF.loader.exportCache = function(){

    return JSON.parse(

        JSON.stringify(this.data)

    );

};


/*------------------------------------------------------------------------------
UPDATE COMPLETE()

Add these lines at the END of complete()

------------------------------------------------------------------------------*/

// Print Summary

this.summary();

// Update Framework Flag

PWF.flags.dataLoaded = true;


/*------------------------------------------------------------------------------
FRAMEWORK READY CHECK

------------------------------------------------------------------------------*/

PWF.loader.isReady = function(){

    return (

        this.loaded &&

        !this.loading &&

        this.failedFiles === 0

    );

};


/******************************************************************************
END OF FILE

loader.js

Premanandhan Web Framework

Version 1.0

Loader Module Completed

******************************************************************************/
