/******************************************************************************
Project      : Premanandhan Web Framework (PWF)
Website      : Sam Marbles & Granites
File         : config.js
Purpose      : Global Configuration
Author       : Premanandhan Narayanan
Version      : 1.0
******************************************************************************/

"use strict";

/*==============================================================================
FRAMEWORK CONFIGURATION
==============================================================================*/

const CONFIG = {

    /*--------------------------------------------------------------------------
    FRAMEWORK
    --------------------------------------------------------------------------*/

    framework: {

        name: "Premanandhan Web Framework",

        shortName: "PWF",

        version: "1.0.0",

        author: "Premanandhan Narayanan",

        company: "Premanandhan Narayanan Digital Solutions"

    },

    /*--------------------------------------------------------------------------
    WEBSITE
    --------------------------------------------------------------------------*/

    website: {

        name: "Sam Marbles & Granites",

        version: "1.0",

        language: "en",

        timezone: "Asia/Kolkata"

    },

    /*--------------------------------------------------------------------------
    DEVELOPMENT
    --------------------------------------------------------------------------*/

    development: {

        debug: true,

        logLevel: "verbose",

        cache: false,

        showPerformance: true

    },

    /*--------------------------------------------------------------------------
    APPLICATION
    --------------------------------------------------------------------------*/

    app: {

        initialized: false,

        offlineMode: false,

        lazyLoading: true,

        preloadImages: true,

        smoothScrolling: true

    },

    /*--------------------------------------------------------------------------
    PATHS
    --------------------------------------------------------------------------*/

    paths: {

        images: "images/",

        css: "css/",

        js: "js/",

        data: "data/",

        icons: "assets/icons/",

        uploads: "uploads/"

    },

    /*--------------------------------------------------------------------------
    JSON FILES
    --------------------------------------------------------------------------*/

    dataFiles: {

        company: "data/company.json",

        products: "data/products.json",

        testimonials: "data/testimonials.json",

        settings: "data/settings.json"

    }

};

/******************************************************************************
END OF PART 1

NEXT PART

THEMES

ANIMATIONS

BUSINESS HOURS

PWA

SEO

******************************************************************************
/******************************************************************************
PART 2

THEMES

ANIMATIONS

BUSINESS HOURS

PWA

SEO

******************************************************************************/

/*------------------------------------------------------------------------------
THEME SETTINGS
------------------------------------------------------------------------------*/

PWF.config.theme = {

    enabled: true,

    defaultTheme: "auto",

    allowUserSelection: true,

    dailyThemeEnabled: true,

    transitionDuration: 300,

    storageKey: "pwf-theme"

};


/*------------------------------------------------------------------------------
ANIMATION SETTINGS
------------------------------------------------------------------------------*/

PWF.config.animation = {

    enabled: true,

    duration: 600,

    staggerDelay: 120,

    lazyReveal: true,

    scrollOffset: 120,

    easing: "ease"

};


/*------------------------------------------------------------------------------
BUSINESS SETTINGS
------------------------------------------------------------------------------*/

PWF.config.business = {

    showBusinessStatus: true,

    autoDetectStatus: true,

    timezone: "Asia/Kolkata",

    todayHighlight: true,

    holidaySupport: true,

    specialHoursSupport: true

};


/*------------------------------------------------------------------------------
SEARCH SETTINGS
------------------------------------------------------------------------------*/

PWF.config.search = {

    enabled: true,

    minimumCharacters: 2,

    liveSearch: true,

    debounceTime: 300,

    searchProducts: true,

    searchTestimonials: false

};


/*------------------------------------------------------------------------------
LAZY LOADING
------------------------------------------------------------------------------*/

PWF.config.lazyLoad = {

    enabled: true,

    rootMargin: "100px",

    threshold: 0.1,

    imagePlaceholder: "images/loading.svg"

};


/*------------------------------------------------------------------------------
PWA SETTINGS
------------------------------------------------------------------------------*/

PWF.config.pwa = {

    enabled: true,

    installPrompt: true,

    offlineSupport: true,

    updateNotification: true,

    cacheVersion: "1.0.0"

};


/*------------------------------------------------------------------------------
SEO
------------------------------------------------------------------------------*/

PWF.config.seo = {

    structuredData: true,

    autoMetaTags: true,

    openGraph: true,

    twitterCards: true,

    canonicalURL: true

};


/*------------------------------------------------------------------------------
GOOGLE SERVICES
------------------------------------------------------------------------------*/

PWF.config.google = {

    analytics: false,

    analyticsId: "",

    tagManager: "",

    mapsApiKey: ""

};


/******************************************************************************
END OF PART 2

NEXT PART

API SETTINGS

SOCIAL MEDIA

ERROR HANDLING

LOGGING

FRAMEWORK CONSTANTS

******************************************************************************
/******************************************************************************
PART 3

API SETTINGS

SOCIAL MEDIA

ERROR HANDLING

LOGGING

FRAMEWORK CONSTANTS

******************************************************************************/

/*------------------------------------------------------------------------------
API SETTINGS
------------------------------------------------------------------------------*/

PWF.config.api = {

    enabled: false,

    baseURL: "",

    timeout: 10000,

    retryAttempts: 3,

    retryDelay: 1000,

    useCache: true,

    cacheDuration: 3600

};


/*------------------------------------------------------------------------------
SOCIAL MEDIA
------------------------------------------------------------------------------*/

PWF.config.social = {

    facebook: "",

    instagram: "",

    youtube: "",

    twitter: "",

    linkedin: "",

    pinterest: "",

    whatsapp: ""

};


/*------------------------------------------------------------------------------
ERROR HANDLING
------------------------------------------------------------------------------*/

PWF.config.errors = {

    showFriendlyMessages: true,

    logErrors: true,

    notifyAdministrator: false,

    displayStackTrace: false,

    defaultMessage: "Something went wrong. Please try again."

};


/*------------------------------------------------------------------------------
LOGGING
------------------------------------------------------------------------------*/

PWF.config.logging = {

    enabled: true,

    level: "info",

    showTimestamp: true,

    showModuleName: true,

    logToConsole: true,

    logPerformance: true

};


/*------------------------------------------------------------------------------
FRAMEWORK CONSTANTS
------------------------------------------------------------------------------*/

PWF.constants = {

    DAYS: [

        "Sunday",

        "Monday",

        "Tuesday",

        "Wednesday",

        "Thursday",

        "Friday",

        "Saturday"

    ],

    MONTHS: [

        "January",

        "February",

        "March",

        "April",

        "May",

        "June",

        "July",

        "August",

        "September",

        "October",

        "November",

        "December"

    ],

    STATUS: {

        SUCCESS: "success",

        ERROR: "error",

        WARNING: "warning",

        INFO: "info"

    }

};


/*------------------------------------------------------------------------------
SUPPORTED LANGUAGES
------------------------------------------------------------------------------*/

PWF.config.languages = {

    default: "en",

    supported: [

        "en",

        "ta"

    ]

};


/*------------------------------------------------------------------------------
LOCAL STORAGE KEYS
------------------------------------------------------------------------------*/

PWF.storageKeys = {

    THEME: "pwf_theme",

    LANGUAGE: "pwf_language",

    SETTINGS: "pwf_settings",

    PRODUCTS: "pwf_products",

    SEARCH: "pwf_search",

    LAST_VISIT: "pwf_last_visit"

};


/******************************************************************************
END OF PART 3

NEXT PART

CACHE

EVENTS

SECURITY

DEFAULT SETTINGS

MODULE REGISTRATION

******************************************************************************/
/******************************************************************************
PART 4

CACHE

EVENTS

SECURITY

DEFAULT SETTINGS

MODULE REGISTRATION

******************************************************************************/

/*------------------------------------------------------------------------------
CACHE SETTINGS
------------------------------------------------------------------------------*/

PWF.config.cache = {

    enabled: true,

    version: "1.0.0",

    useLocalStorage: true,

    useSessionStorage: false,

    expirationHours: 24,

    clearOnVersionChange: true

};


/*------------------------------------------------------------------------------
EVENT SETTINGS
------------------------------------------------------------------------------*/

PWF.config.events = {

    enableCustomEvents: true,

    enableLogging: false,

    maxListeners: 50

};


/*------------------------------------------------------------------------------
SECURITY
------------------------------------------------------------------------------*/

PWF.config.security = {

    sanitizeHTML: true,

    escapeOutput: true,

    allowExternalScripts: false,

    allowInlineScripts: false,

    validateJSON: true

};


/*------------------------------------------------------------------------------
DEFAULT SETTINGS
------------------------------------------------------------------------------*/

PWF.defaults = {

    currency: "INR",

    currencySymbol: "₹",

    dateFormat: "DD-MM-YYYY",

    timeFormat: "12",

    language: "en",

    country: "India"

};


/*------------------------------------------------------------------------------
FRAMEWORK MODULES
------------------------------------------------------------------------------*/

PWF.modules = {

    loader: null,

    navigation: null,

    theme: null,

    products: null,

    gallery: null,

    showroom: null,

    testimonials: null,

    contact: null,

    businessHours: null,

    holidays: null,

    search: null,

    pwa: null

};


/*------------------------------------------------------------------------------
GLOBAL SELECTORS
------------------------------------------------------------------------------*/

PWF.selectors = {

    loader: "#loader",

    navbar: "#navbar",

    hero: "#hero",

    products: "#products",

    showroom: "#showroom",

    testimonials: "#testimonials",

    contact: "#contact",

    footer: "#footer"

};


/*------------------------------------------------------------------------------
FRAMEWORK FLAGS
------------------------------------------------------------------------------*/

PWF.flags = {

    initialized: false,

    dataLoaded: false,

    themeLoaded: false,

    animationsReady: false,

    pwaReady: false

};


/*------------------------------------------------------------------------------
VERSION INFORMATION
------------------------------------------------------------------------------*/

PWF.version = {

    framework: "1.0.0",

    css: "1.0.0",

    javascript: "1.0.0",

    api: "1.0.0"

};


/******************************************************************************
END OF PART 4

NEXT PART

INITIALIZATION

FREEZE CONFIGURATION

FRAMEWORK VALIDATION

BOOTSTRAP

END OF CONFIG.JS

******************************************************************************/
/******************************************************************************
PART 5

INITIALIZATION

FREEZE CONFIGURATION

FRAMEWORK VALIDATION

BOOTSTRAP

END OF CONFIG.JS

Project : Premanandhan Web Framework (PWF)

******************************************************************************/

/*------------------------------------------------------------------------------
FEATURE TOGGLES
------------------------------------------------------------------------------*/

PWF.features = {

    loader              : true,

    navigation          : true,

    hero                : true,

    products            : true,

    showroom            : true,

    testimonials        : true,

    contact             : true,

    search              : true,

    businessHours       : true,

    holidays            : true,

    dailyThemes         : true,

    lazyLoading         : true,

    animations          : true,

    pwa                 : true

};


/*------------------------------------------------------------------------------
FRAMEWORK METHODS
------------------------------------------------------------------------------*/

PWF.initialize = function(){

    console.log(

        `%c${this.config.framework.name} v${this.config.framework.version}`,

        "color:#0B5ED7;font-size:16px;font-weight:bold;"

    );

    this.flags.initialized = true;

    return true;

};


/*------------------------------------------------------------------------------
VALIDATE CONFIGURATION
------------------------------------------------------------------------------*/

PWF.validate = function(){

    const required = [

        "framework",

        "website",

        "paths",

        "dataFiles"

    ];

    for(const item of required){

        if(!this.config[item]){

            console.error(

                `Missing configuration : ${item}`

            );

            return false;

        }

    }

    return true;

};


/*------------------------------------------------------------------------------
REGISTER MODULE
------------------------------------------------------------------------------*/

PWF.registerModule = function(name,module){

    this.modules[name] = module;

};


/*------------------------------------------------------------------------------
GET MODULE
------------------------------------------------------------------------------*/

PWF.getModule = function(name){

    return this.modules[name];

};


/*------------------------------------------------------------------------------
IS FEATURE ENABLED
------------------------------------------------------------------------------*/

PWF.isEnabled = function(feature){

    return !!this.features[feature];

};


/*------------------------------------------------------------------------------
DEBUG LOGGER
------------------------------------------------------------------------------*/

PWF.log = function(message,...data){

    if(!this.config.development.debug){

        return;

    }

    console.log(

        `[PWF] ${message}`,

        ...data

    );

};


/*------------------------------------------------------------------------------
WARNING LOGGER
------------------------------------------------------------------------------*/

PWF.warn = function(message,...data){

    if(!this.config.development.debug){

        return;

    }

    console.warn(

        `[PWF Warning] ${message}`,

        ...data

    );

};


/*------------------------------------------------------------------------------
ERROR LOGGER
------------------------------------------------------------------------------*/

PWF.error = function(message,...data){

    console.error(

        `[PWF Error] ${message}`,

        ...data

    );

};


/*------------------------------------------------------------------------------
FREEZE CONSTANT OBJECTS
------------------------------------------------------------------------------*/

Object.freeze(PWF.constants);

Object.freeze(PWF.storageKeys);

Object.freeze(PWF.defaults);


/*------------------------------------------------------------------------------
VALIDATE CONFIGURATION
------------------------------------------------------------------------------*/

if(PWF.validate()){

    PWF.initialize();

}else{

    console.error(

        "Framework initialization failed."

    );

}


/******************************************************************************
END OF FILE

FILE

config.js

Approximate Size

450+ Lines

FRAMEWORK

Premanandhan Web Framework

Version 1.0

CONFIGURATION MODULE COMPLETED

******************************************************************************/
