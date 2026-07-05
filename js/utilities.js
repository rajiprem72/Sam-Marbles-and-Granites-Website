/******************************************************************************
Project      : Premanandhan Web Framework (PWF)
Website      : Generic Framework Utilities
File         : utilities.js
Purpose      : Common Utility Functions
Author       : Premanandhan Narayanan
Version      : 1.0
******************************************************************************/

"use strict";

/*------------------------------------------------------------------------------
CREATE UTILITIES OBJECT
------------------------------------------------------------------------------*/

PWF.utils = {};


/*------------------------------------------------------------------------------
DOM SELECTORS
------------------------------------------------------------------------------*/

/**
 * Select first matching element
 */

PWF.utils.$ = function(selector, parent = document){

    return parent.querySelector(selector);

};


/**
 * Select all matching elements
 */

PWF.utils.$$ = function(selector, parent = document){

    return [...parent.querySelectorAll(selector)];

};


/*------------------------------------------------------------------------------
ELEMENT CREATION
------------------------------------------------------------------------------*/

/**
 * Create HTML Element
 */

PWF.utils.createElement = function(

    tag,

    className = "",

    text = ""

){

    const element = document.createElement(tag);

    if(className){

        element.className = className;

    }

    if(text){

        element.textContent = text;

    }

    return element;

};


/*------------------------------------------------------------------------------
ELEMENT EXISTENCE
------------------------------------------------------------------------------*/

PWF.utils.exists = function(selector){

    return document.querySelector(selector) !== null;

};


/*------------------------------------------------------------------------------
SHOW / HIDE ELEMENT
------------------------------------------------------------------------------*/

PWF.utils.show = function(element){

    if(!element){

        return;

    }

    element.style.display = "";

};


PWF.utils.hide = function(element){

    if(!element){

        return;

    }

    element.style.display = "none";

};


/*------------------------------------------------------------------------------
TOGGLE VISIBILITY
------------------------------------------------------------------------------*/

PWF.utils.toggle = function(element){

    if(!element){

        return;

    }

    const display = getComputedStyle(element).display;

    element.style.display =

        display === "none"

        ? ""

        : "none";

};


/*------------------------------------------------------------------------------
CLASS HELPERS
------------------------------------------------------------------------------*/

PWF.utils.addClass = function(

    element,

    className

){

    if(!element){

        return;

    }

    element.classList.add(className);

};


PWF.utils.removeClass = function(

    element,

    className

){

    if(!element){

        return;

    }

    element.classList.remove(className);

};


PWF.utils.toggleClass = function(

    element,

    className

){

    if(!element){

        return;

    }

    element.classList.toggle(className);

};


PWF.utils.hasClass = function(

    element,

    className

){

    if(!element){

        return false;

    }

    return element.classList.contains(className);

};


/*------------------------------------------------------------------------------
ATTRIBUTE HELPERS
------------------------------------------------------------------------------*/

PWF.utils.getAttribute = function(

    element,

    attribute

){

    return element?.getAttribute(attribute);

};


PWF.utils.setAttribute = function(

    element,

    attribute,

    value

){

    if(!element){

        return;

    }

    element.setAttribute(attribute, value);

};


/******************************************************************************
END OF PART 1

NEXT PART

STRING UTILITIES

Capitalize

Title Case

Slug

Trim

Escape HTML

Random String

******************************************************************************/
/******************************************************************************
PART 2

STRING UTILITIES

Capitalize

Title Case

Slug

Trim

Escape HTML

Random String

******************************************************************************/

/*------------------------------------------------------------------------------
CAPITALIZE FIRST LETTER
------------------------------------------------------------------------------*/

PWF.utils.capitalize = function(text){

    if(!text){

        return "";

    }

    return text.charAt(0).toUpperCase() + text.slice(1);

};


/*------------------------------------------------------------------------------
TITLE CASE
------------------------------------------------------------------------------*/

PWF.utils.titleCase = function(text){

    if(!text){

        return "";

    }

    return text
        .toLowerCase()
        .split(" ")
        .map(word => PWF.utils.capitalize(word))
        .join(" ");

};


/*------------------------------------------------------------------------------
SLUG GENERATOR

Example:
Sam Marbles & Granites
↓

sam-marbles-granites

------------------------------------------------------------------------------*/

PWF.utils.slugify = function(text){

    if(!text){

        return "";

    }

    return text
        .toLowerCase()
        .trim()
        .replace(/&/g,"and")
        .replace(/[^\w\s-]/g,"")
        .replace(/\s+/g,"-")
        .replace(/-+/g,"-");

};


/*------------------------------------------------------------------------------
TRIM EXTRA SPACES
------------------------------------------------------------------------------*/

PWF.utils.cleanString = function(text){

    if(!text){

        return "";

    }

    return text.replace(/\s+/g," ").trim();

};


/*------------------------------------------------------------------------------
ESCAPE HTML
------------------------------------------------------------------------------*/

PWF.utils.escapeHTML = function(text){

    if(!text){

        return "";

    }

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

};


/*------------------------------------------------------------------------------
REMOVE HTML TAGS
------------------------------------------------------------------------------*/

PWF.utils.stripHTML = function(text){

    if(!text){

        return "";

    }

    const div = document.createElement("div");

    div.innerHTML = text;

    return div.textContent || div.innerText || "";

};


/*------------------------------------------------------------------------------
TRUNCATE STRING
------------------------------------------------------------------------------*/

PWF.utils.truncate = function(

    text,

    length = 100

){

    if(!text){

        return "";

    }

    if(text.length <= length){

        return text;

    }

    return text.substring(0,length) + "...";

};


/*------------------------------------------------------------------------------
RANDOM STRING
------------------------------------------------------------------------------*/

PWF.utils.randomString = function(

    length = 10

){

    const chars =

        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";

    for(let i=0;i<length;i++){

        result += chars.charAt(

            Math.floor(Math.random()*chars.length)

        );

    }

    return result;

};


/*------------------------------------------------------------------------------
REPEAT STRING
------------------------------------------------------------------------------*/

PWF.utils.repeat = function(

    text,

    count = 1

){

    return String(text).repeat(count);

};


/*------------------------------------------------------------------------------
STARTS WITH
------------------------------------------------------------------------------*/

PWF.utils.startsWith = function(

    text,

    value

){

    return String(text).startsWith(value);

};


/*------------------------------------------------------------------------------
ENDS WITH
------------------------------------------------------------------------------*/

PWF.utils.endsWith = function(

    text,

    value

){

    return String(text).endsWith(value);

};


/******************************************************************************
END OF PART 2

NEXT PART

NUMBER UTILITIES

Currency

Percentage

Random Number

Unique ID

Date Formatting

******************************************************************************/
/******************************************************************************
PART 3

NUMBER UTILITIES

Currency

Percentage

Random Number

Unique ID

Date Formatting

******************************************************************************/

/*------------------------------------------------------------------------------
FORMAT CURRENCY
------------------------------------------------------------------------------*/

PWF.utils.formatCurrency = function(

    amount,

    locale = "en-IN",

    currency = "INR"

){

    return new Intl.NumberFormat(

        locale,

        {

            style: "currency",

            currency: currency

        }

    ).format(amount);

};


/*------------------------------------------------------------------------------
FORMAT NUMBER
------------------------------------------------------------------------------*/

PWF.utils.formatNumber = function(

    number,

    decimals = 0

){

    return Number(number).toLocaleString(

        "en-IN",

        {

            minimumFractionDigits: decimals,

            maximumFractionDigits: decimals

        }

    );

};


/*------------------------------------------------------------------------------
FORMAT PERCENTAGE
------------------------------------------------------------------------------*/

PWF.utils.formatPercentage = function(

    value,

    decimals = 2

){

    return Number(value).toFixed(decimals) + "%";

};


/*------------------------------------------------------------------------------
RANDOM NUMBER
------------------------------------------------------------------------------*/

PWF.utils.randomNumber = function(

    min,

    max

){

    return Math.floor(

        Math.random() * (max - min + 1)

    ) + min;

};


/*------------------------------------------------------------------------------
UNIQUE ID
------------------------------------------------------------------------------*/

PWF.utils.uniqueId = function(

    prefix = "pwf"

){

    return (

        prefix +

        "_" +

        Date.now() +

        "_" +

        Math.floor(Math.random() * 10000)

    );

};


/*------------------------------------------------------------------------------
CURRENT DATE
------------------------------------------------------------------------------*/

PWF.utils.today = function(){

    return new Date();

};


/*------------------------------------------------------------------------------
FORMAT DATE
------------------------------------------------------------------------------*/

PWF.utils.formatDate = function(

    date,

    locale = "en-IN"

){

    return new Date(date).toLocaleDateString(

        locale,

        {

            day: "2-digit",

            month: "long",

            year: "numeric"

        }

    );

};


/*------------------------------------------------------------------------------
FORMAT TIME
------------------------------------------------------------------------------*/

PWF.utils.formatTime = function(

    date,

    locale = "en-IN"

){

    return new Date(date).toLocaleTimeString(

        locale,

        {

            hour: "2-digit",

            minute: "2-digit"

        }

    );

};


/*------------------------------------------------------------------------------
CURRENT DAY NAME
------------------------------------------------------------------------------*/

PWF.utils.getDayName = function(){

    return PWF.constants.DAYS[

        new Date().getDay()

    ];

};


/*------------------------------------------------------------------------------
CURRENT MONTH NAME
------------------------------------------------------------------------------*/

PWF.utils.getMonthName = function(){

    return PWF.constants.MONTHS[

        new Date().getMonth()

    ];

};


/*------------------------------------------------------------------------------
IS TODAY
------------------------------------------------------------------------------*/

PWF.utils.isToday = function(date){

    const today = new Date();

    const compare = new Date(date);

    return (

        today.getDate() === compare.getDate() &&

        today.getMonth() === compare.getMonth() &&

        today.getFullYear() === compare.getFullYear()

    );

};


/*------------------------------------------------------------------------------
TIME STAMP
------------------------------------------------------------------------------*/

PWF.utils.timestamp = function(){

    return Date.now();

};


/******************************************************************************
END OF PART 3

NEXT PART

LOCAL STORAGE

SESSION STORAGE

JSON HELPERS

FETCH

CLIPBOARD

******************************************************************************
/******************************************************************************
PART 4

LOCAL STORAGE

SESSION STORAGE

JSON HELPERS

FETCH

CLIPBOARD

******************************************************************************/

/*------------------------------------------------------------------------------
LOCAL STORAGE

Save Value

------------------------------------------------------------------------------*/

PWF.utils.saveStorage = function(key, value){

    try{

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

        return true;

    }

    catch(error){

        PWF.error("Unable to save Local Storage.", error);

        return false;

    }

};


/*------------------------------------------------------------------------------
LOCAL STORAGE

Read Value

------------------------------------------------------------------------------*/

PWF.utils.loadStorage = function(key, defaultValue = null){

    try{

        const value = localStorage.getItem(key);

        return value

            ? JSON.parse(value)

            : defaultValue;

    }

    catch(error){

        PWF.error("Unable to read Local Storage.", error);

        return defaultValue;

    }

};


/*------------------------------------------------------------------------------
REMOVE STORAGE

------------------------------------------------------------------------------*/

PWF.utils.removeStorage = function(key){

    localStorage.removeItem(key);

};


/*------------------------------------------------------------------------------
CLEAR STORAGE

------------------------------------------------------------------------------*/

PWF.utils.clearStorage = function(){

    localStorage.clear();

};


/*------------------------------------------------------------------------------
SESSION STORAGE

Save

------------------------------------------------------------------------------*/

PWF.utils.saveSession = function(key, value){

    sessionStorage.setItem(

        key,

        JSON.stringify(value)

    );

};


/*------------------------------------------------------------------------------
SESSION STORAGE

Read

------------------------------------------------------------------------------*/

PWF.utils.loadSession = function(key){

    const value = sessionStorage.getItem(key);

    return value

        ? JSON.parse(value)

        : null;

};


/*------------------------------------------------------------------------------
FETCH JSON

------------------------------------------------------------------------------*/

PWF.utils.fetchJSON = async function(file){

    try{

        const response = await fetch(file);

        if(!response.ok){

            throw new Error(

                `Unable to load ${file}`

            );

        }

        return await response.json();

    }

    catch(error){

        PWF.error(

            "JSON Loading Error",

            error

        );

        return null;

    }

};


/*------------------------------------------------------------------------------
FETCH TEXT

------------------------------------------------------------------------------*/

PWF.utils.fetchText = async function(file){

    try{

        const response = await fetch(file);

        return await response.text();

    }

    catch(error){

        PWF.error(

            "Text Loading Error",

            error

        );

        return "";

    }

};


/*------------------------------------------------------------------------------
COPY TO CLIPBOARD

------------------------------------------------------------------------------*/

PWF.utils.copyToClipboard = async function(text){

    try{

        await navigator.clipboard.writeText(text);

        return true;

    }

    catch(error){

        PWF.error(

            "Clipboard Error",

            error

        );

        return false;

    }

};


/*------------------------------------------------------------------------------
DOWNLOAD JSON

Useful for Export Settings

------------------------------------------------------------------------------*/

PWF.utils.downloadJSON = function(

    filename,

    object

){

    const blob = new Blob(

        [

            JSON.stringify(

                object,

                null,

                4

            )

        ],

        {

            type:"application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = filename;

    link.click();

    URL.revokeObjectURL(url);

};


/******************************************************************************
END OF PART 4

NEXT PART

DEBOUNCE

THROTTLE

SLEEP

EMAIL VALIDATION

PHONE VALIDATION

DEVICE DETECTION

BROWSER DETECTION

FRAMEWORK HELPERS

END OF utilities.js

******************************************************************************/
/******************************************************************************
PART 5

DEBOUNCE

THROTTLE

SLEEP

VALIDATION

DEVICE DETECTION

BROWSER DETECTION

FRAMEWORK HELPERS

END OF UTILITIES.JS

******************************************************************************/

/*------------------------------------------------------------------------------
DEBOUNCE

Useful for Search

------------------------------------------------------------------------------*/

PWF.utils.debounce = function(callback, delay = 300){

    let timer;

    return function(...args){

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback.apply(this, args);

        }, delay);

    };

};


/*------------------------------------------------------------------------------
THROTTLE

Useful for Scroll & Resize

------------------------------------------------------------------------------*/

PWF.utils.throttle = function(callback, limit = 250){

    let waiting = false;

    return function(...args){

        if(waiting){

            return;

        }

        callback.apply(this, args);

        waiting = true;

        setTimeout(() => {

            waiting = false;

        }, limit);

    };

};


/*------------------------------------------------------------------------------
SLEEP

------------------------------------------------------------------------------*/

PWF.utils.sleep = function(milliseconds){

    return new Promise(resolve => {

        setTimeout(resolve, milliseconds);

    });

};


/*------------------------------------------------------------------------------
EMAIL VALIDATION

------------------------------------------------------------------------------*/

PWF.utils.isValidEmail = function(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

};


/*------------------------------------------------------------------------------
PHONE VALIDATION

Indian Mobile Number

------------------------------------------------------------------------------*/

PWF.utils.isValidPhone = function(phone){

    return /^[6-9]\d{9}$/.test(

        String(phone).replace(/\D/g,"")

    );

};


/*------------------------------------------------------------------------------
IS EMPTY

------------------------------------------------------------------------------*/

PWF.utils.isEmpty = function(value){

    return (

        value === null ||

        value === undefined ||

        value === ""

    );

};


/*------------------------------------------------------------------------------
DEVICE DETECTION

------------------------------------------------------------------------------*/

PWF.utils.isMobile = function(){

    return window.innerWidth <= 768;

};


PWF.utils.isTablet = function(){

    return (

        window.innerWidth > 768 &&

        window.innerWidth <= 992

    );

};


PWF.utils.isDesktop = function(){

    return window.innerWidth > 992;

};


/*------------------------------------------------------------------------------
BROWSER DETECTION

------------------------------------------------------------------------------*/

PWF.utils.browser = function(){

    const userAgent = navigator.userAgent;

    if(userAgent.includes("Chrome")){

        return "Chrome";

    }

    if(userAgent.includes("Firefox")){

        return "Firefox";

    }

    if(userAgent.includes("Safari")){

        return "Safari";

    }

    if(userAgent.includes("Edge")){

        return "Edge";

    }

    return "Unknown";

};


/*------------------------------------------------------------------------------
SCROLL TO TOP

------------------------------------------------------------------------------*/

PWF.utils.scrollTop = function(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};


/*------------------------------------------------------------------------------
FRAMEWORK VERSION

------------------------------------------------------------------------------*/

PWF.utils.version = function(){

    return PWF.version.framework;

};


/*------------------------------------------------------------------------------
FRAMEWORK INFORMATION

------------------------------------------------------------------------------*/

PWF.utils.info = function(){

    console.table({

        Framework : PWF.config.framework.name,

        Version   : PWF.version.framework,

        Website   : PWF.config.website.name,

        Language  : PWF.config.website.language

    });

};


/******************************************************************************
END OF FILE

utilities.js

Premanandhan Web Framework

Version 1.0

DOM Utilities          ✓

String Utilities       ✓

Number Utilities       ✓

Date Utilities         ✓

Storage Utilities      ✓

Network Utilities      ✓

Validation            ✓

Device Detection      ✓

Browser Detection     ✓

Framework Helpers     ✓

******************************************************************************
