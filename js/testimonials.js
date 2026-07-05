/******************************************************************************
Project      : Premanandhan Web Framework (PWF)
Website      : Sam Marbles & Granites
File         : testimonials.js
Purpose      : Testimonials Management Module
Author       : Premanandhan Narayanan
Version      : 1.0
******************************************************************************/

"use strict";

/*------------------------------------------------------------------------------
CREATE TESTIMONIALS MODULE
------------------------------------------------------------------------------*/

PWF.testimonials = {

    /*--------------------------------------------------------------------------
    DATA
    --------------------------------------------------------------------------*/

    testimonials : [],

    filteredTestimonials : [],

    featuredTestimonials : [],

    currentIndex : 0,

    autoPlayTimer : null,

    /*--------------------------------------------------------------------------
    DOM ELEMENTS
    --------------------------------------------------------------------------*/

    container : null,

    slider : null,

    previousButton : null,

    nextButton : null,

    indicators : null,

    totalTestimonials : null,

    /*--------------------------------------------------------------------------
    INITIALIZE
    --------------------------------------------------------------------------*/

    async init(){

        PWF.log(

            "Initializing Testimonials Module..."

        );

        this.cacheElements();

        this.loadTestimonials();

        this.bindEvents();

    }

};


/*------------------------------------------------------------------------------
REGISTER MODULE
------------------------------------------------------------------------------*/

PWF.registerModule(

    "testimonials",

    PWF.testimonials

);


/*------------------------------------------------------------------------------
CACHE DOM ELEMENTS
------------------------------------------------------------------------------*/

PWF.testimonials.cacheElements = function(){

    this.container =

        PWF.utils.$("#testimonials-container");

    this.slider =

        PWF.utils.$("#testimonials-slider");

    this.previousButton =

        PWF.utils.$("#testimonial-prev");

    this.nextButton =

        PWF.utils.$("#testimonial-next");

    this.indicators =

        PWF.utils.$("#testimonial-indicators");

    this.totalTestimonials =

        PWF.utils.$("#total-testimonials");

};


/*------------------------------------------------------------------------------
LOAD TESTIMONIALS

------------------------------------------------------------------------------*/

PWF.testimonials.loadTestimonials = function(){

    const data =

        PWF.loader.get("testimonials");

    if(!data){

        PWF.warn(

            "testimonials.json not loaded."

        );

        return;

    }

    this.testimonials =

        data.testimonials || [];

    this.filteredTestimonials =

        [...this.testimonials];

    this.featuredTestimonials =

        this.testimonials.filter(

            testimonial =>

            testimonial.featured === true

        );

    PWF.log(

        `${this.testimonials.length} testimonials loaded.`

    );

};


/*------------------------------------------------------------------------------
BIND EVENTS

------------------------------------------------------------------------------*/

PWF.testimonials.bindEvents = function(){

    if(this.previousButton){

        this.previousButton.addEventListener(

            "click",

            () => this.previous()

        );

    }

    if(this.nextButton){

        this.nextButton.addEventListener(

            "click",

            () => this.next()

        );

    }

};


/*------------------------------------------------------------------------------
TESTIMONIALS READY

------------------------------------------------------------------------------*/

document.addEventListener(

    "PWF:TestimonialsReady",

    function(){

        PWF.log(

            "Testimonials Module Ready."

        );

    }

);


/******************************************************************************
END OF PART 1

NEXT PART

RENDER TESTIMONIALS

TESTIMONIAL CARD

STAR RATING

INDICATORS

******************************************************************************/
/******************************************************************************
PART 2

RENDER TESTIMONIALS

TESTIMONIAL CARD

STAR RATING

INDICATORS

******************************************************************************/

/*------------------------------------------------------------------------------
RENDER TESTIMONIALS

------------------------------------------------------------------------------*/

PWF.testimonials.render = function(){

    if(!this.container){

        return;

    }

    this.container.innerHTML = "";

    this.filteredTestimonials.forEach((testimonial,index)=>{

        this.container.appendChild(

            this.createCard(

                testimonial,

                index

            )

        );

    });

    this.createIndicators();

    this.updateCount();

};


/*------------------------------------------------------------------------------
CREATE TESTIMONIAL CARD

------------------------------------------------------------------------------*/

PWF.testimonials.createCard = function(testimonial,index){

    const card =

        PWF.utils.createElement(

            "article",

            "testimonial-card"

        );

    card.dataset.index = index;

    card.innerHTML = `

        <div class="testimonial-header">

            <img

                src="${testimonial.image}"

                alt="${testimonial.name}"

                loading="lazy"

                class="testimonial-photo"

            >

            <div>

                <h3>${testimonial.name}</h3>

                <p>${testimonial.location || ""}</p>

            </div>

        </div>

        <div class="testimonial-rating">

            ${this.createStars(testimonial.rating)}

        </div>

        <blockquote>

            "${testimonial.review}"

        </blockquote>

    `;

    return card;

};


/*------------------------------------------------------------------------------
CREATE STAR RATING

------------------------------------------------------------------------------*/

PWF.testimonials.createStars = function(rating){

    let stars = "";

    for(let i=1;i<=5;i++){

        stars +=

            i <= rating

            ? "★"

            : "☆";

    }

    return stars;

};


/*------------------------------------------------------------------------------
CREATE INDICATORS

------------------------------------------------------------------------------*/

PWF.testimonials.createIndicators = function(){

    if(!this.indicators){

        return;

    }

    this.indicators.innerHTML = "";

    this.filteredTestimonials.forEach((item,index)=>{

        const dot =

            PWF.utils.createElement(

                "button",

                "testimonial-dot"

            );

        if(index === this.currentIndex){

            dot.classList.add("active");

        }

        dot.addEventListener(

            "click",

            ()=>{

                this.goTo(index);

            }

        );

        this.indicators.appendChild(dot);

    });

};


/*------------------------------------------------------------------------------
UPDATE TESTIMONIAL COUNT

------------------------------------------------------------------------------*/

PWF.testimonials.updateCount = function(){

    if(!this.totalTestimonials){

        return;

    }

    this.totalTestimonials.textContent =

        `${this.filteredTestimonials.length} Testimonials`;

};


/*------------------------------------------------------------------------------
UPDATE loadTestimonials()

Add these lines at the END

------------------------------------------------------------------------------*/

// Render Testimonials

this.render();


/******************************************************************************
END OF PART 2

NEXT PART

SLIDER

NEXT

PREVIOUS

AUTO PLAY

******************************************************************************/
/******************************************************************************
PART 3

SLIDER

NEXT

PREVIOUS

AUTO PLAY

******************************************************************************/

/*------------------------------------------------------------------------------
GO TO SPECIFIC TESTIMONIAL

------------------------------------------------------------------------------*/

PWF.testimonials.goTo = function(index){

    if(index < 0 ||

       index >= this.filteredTestimonials.length){

        return;

    }

    this.currentIndex = index;

    this.updateSlider();

};


/*------------------------------------------------------------------------------
NEXT TESTIMONIAL

------------------------------------------------------------------------------*/

PWF.testimonials.next = function(){

    this.currentIndex++;

    if(this.currentIndex >= this.filteredTestimonials.length){

        this.currentIndex = 0;

    }

    this.updateSlider();

};


/*------------------------------------------------------------------------------
PREVIOUS TESTIMONIAL

------------------------------------------------------------------------------*/

PWF.testimonials.previous = function(){

    this.currentIndex--;

    if(this.currentIndex < 0){

        this.currentIndex =

            this.filteredTestimonials.length - 1;

    }

    this.updateSlider();

};


/*------------------------------------------------------------------------------
UPDATE SLIDER

------------------------------------------------------------------------------*/

PWF.testimonials.updateSlider = function(){

    if(!this.slider){

        return;

    }

    this.slider.style.transform =

        `translateX(-${this.currentIndex * 100}%)`;

    this.updateIndicators();

};


/*------------------------------------------------------------------------------
UPDATE INDICATORS

------------------------------------------------------------------------------*/

PWF.testimonials.updateIndicators = function(){

    const dots =

        PWF.utils.$$(".testimonial-dot");

    dots.forEach((dot,index)=>{

        dot.classList.toggle(

            "active",

            index === this.currentIndex

        );

    });

};


/*------------------------------------------------------------------------------
START AUTO PLAY

------------------------------------------------------------------------------*/

PWF.testimonials.startAutoPlay = function(){

    this.stopAutoPlay();

    this.autoPlayTimer = setInterval(

        ()=>{

            this.next();

        },

        5000

    );

};


/*------------------------------------------------------------------------------
STOP AUTO PLAY

------------------------------------------------------------------------------*/

PWF.testimonials.stopAutoPlay = function(){

    if(this.autoPlayTimer){

        clearInterval(

            this.autoPlayTimer

        );

        this.autoPlayTimer = null;

    }

};


/*------------------------------------------------------------------------------
UPDATE bindEvents()

Add these lines at the END

------------------------------------------------------------------------------*/

if(this.slider){

    this.slider.addEventListener(

        "mouseenter",

        ()=>this.stopAutoPlay()

    );

    this.slider.addEventListener(

        "mouseleave",

        ()=>this.startAutoPlay()

    );

}


/*------------------------------------------------------------------------------
UPDATE loadTestimonials()

Add this after

this.render();

------------------------------------------------------------------------------*/

// Start Auto Play

this.startAutoPlay();


/******************************************************************************
END OF PART 3

NEXT PART

TOUCH SWIPE

KEYBOARD SUPPORT

STATISTICS

DEBUG

******************************************************************************/
/******************************************************************************
PART 4

TOUCH SWIPE

KEYBOARD SUPPORT

STATISTICS

DEBUG

******************************************************************************/

/*------------------------------------------------------------------------------
TOUCH SETTINGS

------------------------------------------------------------------------------*/

PWF.testimonials.touchStartX = 0;

PWF.testimonials.touchEndX = 0;


/*------------------------------------------------------------------------------
TOUCH START

------------------------------------------------------------------------------*/

PWF.testimonials.touchStart = function(event){

    this.touchStartX =

        event.changedTouches[0].screenX;

};


/*------------------------------------------------------------------------------
TOUCH END

------------------------------------------------------------------------------*/

PWF.testimonials.touchEnd = function(event){

    this.touchEndX =

        event.changedTouches[0].screenX;

    this.handleSwipe();

};


/*------------------------------------------------------------------------------
HANDLE SWIPE

------------------------------------------------------------------------------*/

PWF.testimonials.handleSwipe = function(){

    const distance =

        this.touchEndX - this.touchStartX;

    if(distance > 60){

        this.previous();

    }

    if(distance < -60){

        this.next();

    }

};


/*------------------------------------------------------------------------------
KEYBOARD NAVIGATION

------------------------------------------------------------------------------*/

PWF.testimonials.handleKeyboard = function(event){

    switch(event.key){

        case "ArrowLeft":

            this.previous();

            break;

        case "ArrowRight":

            this.next();

            break;

    }

};


/*------------------------------------------------------------------------------
MODULE STATISTICS

------------------------------------------------------------------------------*/

PWF.testimonials.statistics = function(){

    return{

        totalTestimonials :

            this.testimonials.length,

        filteredTestimonials :

            this.filteredTestimonials.length,

        featuredTestimonials :

            this.featuredTestimonials.length,

        currentIndex :

            this.currentIndex

    };

};


/*------------------------------------------------------------------------------
DEBUG INFORMATION

------------------------------------------------------------------------------*/

PWF.testimonials.debug = function(){

    console.group(

        "%cTestimonials Debug",

        "color:#fd7e14;font-weight:bold;"

    );

    console.table(

        this.statistics()

    );

    console.groupEnd();

};


/*------------------------------------------------------------------------------
UPDATE bindEvents()

Add these lines at the END

------------------------------------------------------------------------------*/

// Keyboard Navigation

document.addEventListener(

    "keydown",

    (event)=>this.handleKeyboard(event)

);


// Touch Support

if(this.slider){

    this.slider.addEventListener(

        "touchstart",

        (event)=>this.touchStart(event)

    );

    this.slider.addEventListener(

        "touchend",

        (event)=>this.touchEnd(event)

    );

}


/******************************************************************************
END OF PART 4

NEXT PART

SUMMARY

FRAMEWORK READY

HEALTH CHECK

END OF testimonials.js

******************************************************************************/
/******************************************************************************
PART 5

SUMMARY

FRAMEWORK READY

HEALTH CHECK

END OF TESTIMONIALS.JS

******************************************************************************/

/*------------------------------------------------------------------------------
MODULE SUMMARY

------------------------------------------------------------------------------*/

PWF.testimonials.summary = function(){

    PWF.log("--------------------------------");

    PWF.log("Testimonials Module");

    PWF.log("--------------------------------");

    PWF.log(

        `Total Testimonials : ${this.testimonials.length}`

    );

    PWF.log(

        `Featured           : ${this.featuredTestimonials.length}`

    );

    PWF.log(

        `Current Slide      : ${this.currentIndex + 1}`

    );

};


/*------------------------------------------------------------------------------
MODULE INFORMATION

------------------------------------------------------------------------------*/

PWF.testimonials.info = function(){

    return{

        totalTestimonials :

            this.testimonials.length,

        filteredTestimonials :

            this.filteredTestimonials.length,

        featuredTestimonials :

            this.featuredTestimonials.length,

        currentSlide :

            this.currentIndex + 1,

        autoPlay :

            this.autoPlayTimer !== null

    };

};


/*------------------------------------------------------------------------------
REFRESH MODULE

------------------------------------------------------------------------------*/

PWF.testimonials.refresh = function(){

    this.render();

    this.updateSlider();

};


/*------------------------------------------------------------------------------
HEALTH CHECK

------------------------------------------------------------------------------*/

PWF.testimonials.healthCheck = function(){

    return{

        loaded :

            this.testimonials.length > 0,

        sliderReady :

            this.slider !== null,

        indicatorsReady :

            this.indicators !== null,

        autoPlayRunning :

            this.autoPlayTimer !== null,

        moduleReady :

            PWF.flags.testimonialsReady

    };

};


/*------------------------------------------------------------------------------
FINAL SUMMARY

------------------------------------------------------------------------------*/

PWF.testimonials.finalSummary = function(){

    console.group(

        "%cTestimonials Module Completed",

        "color:#198754;font-weight:bold;"

    );

    console.table({

        "Testimonials" :

            this.testimonials.length,

        "Featured" :

            this.featuredTestimonials.length,

        "Current Slide" :

            this.currentIndex + 1,

        "Module Ready" :

            PWF.flags.testimonialsReady

    });

    console.groupEnd();

};


/*------------------------------------------------------------------------------
UPDATE INITIALIZATION

Add these lines at the END of init()

------------------------------------------------------------------------------*/

// Print Summary

this.summary();

// Framework Ready

PWF.flags.testimonialsReady = true;

// Final Summary

this.finalSummary();

// Notify Framework

document.dispatchEvent(

    new CustomEvent(

        "PWF:TestimonialsReady",

        {

            detail : this.info()

        }

    )

);


/******************************************************************************
END OF FILE

testimonials.js

Premanandhan Web Framework

Version 1.0

Testimonials Module Completed

******************************************************************************/
