/******************************************************************************
Project      : Premanandhan Web Framework (PWF)
Website      : Sam Marbles & Granites
File         : gallery.js
Purpose      : Gallery Management Module
Author       : Premanandhan Narayanan
Version      : 1.0
******************************************************************************/

"use strict";

/*------------------------------------------------------------------------------
CREATE GALLERY MODULE
------------------------------------------------------------------------------*/

PWF.gallery = {

    /*--------------------------------------------------------------------------
    DATA
    --------------------------------------------------------------------------*/

    images : [],

    filteredImages : [],

    categories : [],

    currentCategory : "all",

    currentImageIndex : -1,

    /*--------------------------------------------------------------------------
    DOM ELEMENTS
    --------------------------------------------------------------------------*/

    container : null,

    categoryContainer : null,

    totalImages : null,

    lightbox : null,

    lightboxImage : null,

    /*--------------------------------------------------------------------------
    INITIALIZE
    --------------------------------------------------------------------------*/

    async init(){

        PWF.log("Initializing Gallery Module...");

        this.cacheElements();

        this.loadImages();

        this.bindEvents();

    }

};


/*------------------------------------------------------------------------------
REGISTER MODULE
------------------------------------------------------------------------------*/

PWF.registerModule(

    "gallery",

    PWF.gallery

);


/*------------------------------------------------------------------------------
CACHE DOM ELEMENTS
------------------------------------------------------------------------------*/

PWF.gallery.cacheElements = function(){

    this.container =

        PWF.utils.$("#gallery-container");

    this.categoryContainer =

        PWF.utils.$("#gallery-categories");

    this.totalImages =

        PWF.utils.$("#total-images");

    this.lightbox =

        PWF.utils.$("#gallery-lightbox");

    this.lightboxImage =

        PWF.utils.$("#lightbox-image");

};


/*------------------------------------------------------------------------------
LOAD IMAGES

------------------------------------------------------------------------------*/

PWF.gallery.loadImages = function(){

    const data =

        PWF.loader.get("gallery");

    if(!data){

        PWF.warn(

            "gallery.json not loaded."

        );

        return;

    }

    this.images = data.images || [];

    this.filteredImages =

        [...this.images];

    PWF.log(

        `${this.images.length} gallery images loaded.`
    );

};


/*------------------------------------------------------------------------------
BIND EVENTS

------------------------------------------------------------------------------*/

PWF.gallery.bindEvents = function(){

    window.addEventListener(

        "keydown",

        (event)=>{

            if(event.key === "Escape"){

                this.closeLightbox();

            }

        }

    );

};


/*------------------------------------------------------------------------------
GALLERY READY

------------------------------------------------------------------------------*/

document.addEventListener(

    "PWF:GalleryReady",

    function(){

        PWF.log(

            "Gallery Module Ready."

        );

    }

);


/******************************************************************************
END OF PART 1

NEXT PART

LOAD CATEGORIES

RENDER GALLERY

IMAGE CARDS

IMAGE COUNT

******************************************************************************/
/******************************************************************************
PART 2

LOAD CATEGORIES

RENDER GALLERY

IMAGE CARDS

IMAGE COUNT

******************************************************************************/

/*------------------------------------------------------------------------------
LOAD CATEGORIES

------------------------------------------------------------------------------*/

PWF.gallery.loadCategories = function(){

    const categories = new Set();

    categories.add("all");

    this.images.forEach(image => {

        if(image.category){

            categories.add(image.category);

        }

    });

    this.categories = [...categories];

};


/*------------------------------------------------------------------------------
RENDER CATEGORY BUTTONS

------------------------------------------------------------------------------*/

PWF.gallery.renderCategories = function(){

    if(!this.categoryContainer){

        return;

    }

    this.categoryContainer.innerHTML = "";

    this.categories.forEach(category => {

        const button = PWF.utils.createElement(

            "button",

            "gallery-category-button",

            PWF.utils.titleCase(category)

        );

        button.dataset.category = category;

        if(category === this.currentCategory){

            button.classList.add("active");

        }

        button.addEventListener(

            "click",

            () => this.filterByCategory(category)

        );

        this.categoryContainer.appendChild(button);

    });

};


/*------------------------------------------------------------------------------
RENDER GALLERY

------------------------------------------------------------------------------*/

PWF.gallery.renderGallery = function(){

    if(!this.container){

        return;

    }

    this.container.innerHTML = "";

    this.filteredImages.forEach((image,index)=>{

        this.container.appendChild(

            this.createImageCard(

                image,

                index

            )

        );

    });

    this.updateImageCount();

};


/*------------------------------------------------------------------------------
CREATE IMAGE CARD

------------------------------------------------------------------------------*/

PWF.gallery.createImageCard = function(image,index){

    const card = PWF.utils.createElement(

        "article",

        "gallery-card"

    );

    card.innerHTML = `

        <picture>

            <img

                src="${image.thumbnail || image.image}"

                alt="${image.alt || image.title}"

                loading="lazy"

            >

        </picture>

        <div class="gallery-overlay">

            <h3>${image.title}</h3>

            <p>${image.category}</p>

        </div>

    `;

    card.addEventListener(

        "click",

        ()=>{

            this.openLightbox(index);

        }

    );

    return card;

};


/*------------------------------------------------------------------------------
UPDATE IMAGE COUNT

------------------------------------------------------------------------------*/

PWF.gallery.updateImageCount = function(){

    if(!this.totalImages){

        return;

    }

    this.totalImages.textContent =

        `${this.filteredImages.length} Images`;

};


/*------------------------------------------------------------------------------
UPDATE loadImages()

Add these lines at the END

------------------------------------------------------------------------------*/

// Load Categories

this.loadCategories();

// Render Category Buttons

this.renderCategories();

// Render Gallery

this.renderGallery();


/******************************************************************************
END OF PART 2

NEXT PART

CATEGORY FILTER

LIGHTBOX

NEXT IMAGE

PREVIOUS IMAGE

******************************************************************************/
/******************************************************************************
PART 3

CATEGORY FILTER

LIGHTBOX

NEXT IMAGE

PREVIOUS IMAGE

******************************************************************************/

/*------------------------------------------------------------------------------
FILTER BY CATEGORY

------------------------------------------------------------------------------*/

PWF.gallery.filterByCategory = function(category){

    this.currentCategory = category;

    if(category === "all"){

        this.filteredImages = [...this.images];

    }
    else{

        this.filteredImages = this.images.filter(image =>

            image.category === category

        );

    }

    this.updateCategoryButtons();

    this.renderGallery();

};


/*------------------------------------------------------------------------------
UPDATE CATEGORY BUTTONS

------------------------------------------------------------------------------*/

PWF.gallery.updateCategoryButtons = function(){

    const buttons =

        PWF.utils.$$(".gallery-category-button");

    buttons.forEach(button => {

        button.classList.toggle(

            "active",

            button.dataset.category === this.currentCategory

        );

    });

};


/*------------------------------------------------------------------------------
OPEN LIGHTBOX

------------------------------------------------------------------------------*/

PWF.gallery.openLightbox = function(index){

    if(

        !this.lightbox ||

        !this.lightboxImage

    ){

        return;

    }

    this.currentImageIndex = index;

    const image =

        this.filteredImages[index];

    this.lightboxImage.src = image.image;

    this.lightboxImage.alt =

        image.alt || image.title;

    this.lightbox.classList.add("show");

};


/*------------------------------------------------------------------------------
CLOSE LIGHTBOX

------------------------------------------------------------------------------*/

PWF.gallery.closeLightbox = function(){

    if(this.lightbox){

        this.lightbox.classList.remove("show");

    }

};


/*------------------------------------------------------------------------------
NEXT IMAGE

------------------------------------------------------------------------------*/

PWF.gallery.nextImage = function(){

    if(

        this.currentImageIndex <

        this.filteredImages.length - 1

    ){

        this.currentImageIndex++;

    }
    else{

        this.currentImageIndex = 0;

    }

    this.openLightbox(

        this.currentImageIndex

    );

};


/*------------------------------------------------------------------------------
PREVIOUS IMAGE

------------------------------------------------------------------------------*/

PWF.gallery.previousImage = function(){

    if(this.currentImageIndex > 0){

        this.currentImageIndex--;

    }
    else{

        this.currentImageIndex =

            this.filteredImages.length - 1;

    }

    this.openLightbox(

        this.currentImageIndex

    );

};


/*------------------------------------------------------------------------------
UPDATE bindEvents()

Add these lines inside bindEvents()

------------------------------------------------------------------------------*/

const nextButton =

    PWF.utils.$("#gallery-next");

if(nextButton){

    nextButton.addEventListener(

        "click",

        () => this.nextImage()

    );

}


const previousButton =

    PWF.utils.$("#gallery-prev");

if(previousButton){

    previousButton.addEventListener(

        "click",

        () => this.previousImage()

    );

}


const closeButton =

    PWF.utils.$("#gallery-close");

if(closeButton){

    closeButton.addEventListener(

        "click",

        () => this.closeLightbox()

    );

}


if(this.lightbox){

    this.lightbox.addEventListener(

        "click",

        (event)=>{

            if(event.target === this.lightbox){

                this.closeLightbox();

            }

        }

    );

}


/******************************************************************************
END OF PART 3

NEXT PART

KEYBOARD NAVIGATION

TOUCH SWIPE

SLIDESHOW

AUTO PLAY

******************************************************************************/
/******************************************************************************
PART 4

KEYBOARD NAVIGATION

TOUCH SWIPE

SLIDESHOW

AUTO PLAY

******************************************************************************/

/*------------------------------------------------------------------------------
SLIDESHOW SETTINGS

------------------------------------------------------------------------------*/

PWF.gallery.slideShowTimer = null;

PWF.gallery.touchStartX = 0;

PWF.gallery.touchEndX = 0;


/*------------------------------------------------------------------------------
KEYBOARD NAVIGATION

------------------------------------------------------------------------------*/

PWF.gallery.handleKeyboard = function(event){

    if(!this.lightbox ||

       !this.lightbox.classList.contains("show")){

        return;

    }

    switch(event.key){

        case "ArrowRight":

            this.nextImage();

            break;

        case "ArrowLeft":

            this.previousImage();

            break;

        case "Escape":

            this.closeLightbox();

            break;

    }

};


/*------------------------------------------------------------------------------
START SLIDESHOW

------------------------------------------------------------------------------*/

PWF.gallery.startSlideShow = function(){

    this.stopSlideShow();

    this.slideShowTimer = setInterval(

        () => {

            this.nextImage();

        },

        3000

    );

};


/*------------------------------------------------------------------------------
STOP SLIDESHOW

------------------------------------------------------------------------------*/

PWF.gallery.stopSlideShow = function(){

    if(this.slideShowTimer){

        clearInterval(this.slideShowTimer);

        this.slideShowTimer = null;

    }

};


/*------------------------------------------------------------------------------
TOUCH EVENTS

------------------------------------------------------------------------------*/

PWF.gallery.touchStart = function(event){

    this.touchStartX =

        event.changedTouches[0].screenX;

};


PWF.gallery.touchEnd = function(event){

    this.touchEndX =

        event.changedTouches[0].screenX;

    this.handleSwipe();

};


/*------------------------------------------------------------------------------
HANDLE SWIPE

------------------------------------------------------------------------------*/

PWF.gallery.handleSwipe = function(){

    const distance =

        this.touchEndX - this.touchStartX;

    if(distance > 60){

        this.previousImage();

    }

    if(distance < -60){

        this.nextImage();

    }

};


/*------------------------------------------------------------------------------
UPDATE bindEvents()

Add the following inside bindEvents()

------------------------------------------------------------------------------*/

// Keyboard Navigation

document.addEventListener(

    "keydown",

    (event)=>this.handleKeyboard(event)

);


// Touch Support

if(this.lightbox){

    this.lightbox.addEventListener(

        "touchstart",

        (event)=>this.touchStart(event)

    );

    this.lightbox.addEventListener(

        "touchend",

        (event)=>this.touchEnd(event)

    );

}


// Slideshow Buttons

const playButton =

    PWF.utils.$("#gallery-play");

if(playButton){

    playButton.addEventListener(

        "click",

        ()=>this.startSlideShow()

    );

}


const stopButton =

    PWF.utils.$("#gallery-stop");

if(stopButton){

    stopButton.addEventListener(

        "click",

        ()=>this.stopSlideShow()

    );

}


/******************************************************************************
END OF PART 4

NEXT PART

IMAGE PRELOADING

DEBUG

SUMMARY

FRAMEWORK READY

END OF gallery.js

******************************************************************************/
/******************************************************************************
PART 5

IMAGE PRELOADING

DEBUG

SUMMARY

FRAMEWORK READY

END OF GALLERY.JS

******************************************************************************/

/*------------------------------------------------------------------------------
PRELOAD ADJACENT IMAGES

------------------------------------------------------------------------------*/

PWF.gallery.preloadAdjacent = function(){

    if(this.filteredImages.length === 0){

        return;

    }

    const previousIndex =

        this.currentImageIndex === 0

        ? this.filteredImages.length - 1

        : this.currentImageIndex - 1;

    const nextIndex =

        this.currentImageIndex === this.filteredImages.length - 1

        ? 0

        : this.currentImageIndex + 1;

    [

        previousIndex,

        nextIndex

    ].forEach(index => {

        const image = new Image();

        image.src =

            this.filteredImages[index].image;

    });

};


/*------------------------------------------------------------------------------
UPDATE openLightbox()

Add this after

this.lightbox.classList.add("show");

------------------------------------------------------------------------------*/

// Preload Previous & Next Images

this.preloadAdjacent();


/*------------------------------------------------------------------------------
GALLERY STATISTICS

------------------------------------------------------------------------------*/

PWF.gallery.statistics = function(){

    return{

        totalImages : this.images.length,

        filteredImages : this.filteredImages.length,

        totalCategories : this.categories.length,

        currentCategory : this.currentCategory

    };

};


/*------------------------------------------------------------------------------
DEBUG INFORMATION

------------------------------------------------------------------------------*/

PWF.gallery.debug = function(){

    console.group(

        "%cGallery Debug",

        "color:#6610f2;font-weight:bold;"

    );

    console.table(

        this.statistics()

    );

    console.groupEnd();

};


/*------------------------------------------------------------------------------
MODULE SUMMARY

------------------------------------------------------------------------------*/

PWF.gallery.summary = function(){

    PWF.log("--------------------------------");

    PWF.log("Gallery Module");

    PWF.log("--------------------------------");

    PWF.log(

        `Images      : ${this.images.length}`

    );

    PWF.log(

        `Categories  : ${this.categories.length}`

    );

    PWF.log(

        `Current     : ${this.currentCategory}`

    );

};


/*------------------------------------------------------------------------------
MODULE INFORMATION

------------------------------------------------------------------------------*/

PWF.gallery.info = function(){

    return{

        images : this.images.length,

        filtered : this.filteredImages.length,

        categories : this.categories.length,

        currentCategory : this.currentCategory

    };

};


/*------------------------------------------------------------------------------
REFRESH GALLERY

------------------------------------------------------------------------------*/

PWF.gallery.refresh = function(){

    this.renderGallery();

};


/*------------------------------------------------------------------------------
INITIALIZATION UPDATE

Add these lines at the END of init()

------------------------------------------------------------------------------*/

// Print Summary

this.summary();

// Framework Ready

PWF.flags.galleryReady = true;

// Notify Framework

document.dispatchEvent(

    new CustomEvent(

        "PWF:GalleryReady",

        {

            detail : this.info()

        }

    )

);


/******************************************************************************
END OF FILE

gallery.js

Premanandhan Web Framework

Version 1.0

Gallery Module Completed

******************************************************************************/
