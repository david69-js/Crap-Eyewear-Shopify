/*
 	Has Class
	
	Returns true/false if element has classname.
-------------------------------------------------- */
const hasClass = (element, cls)=>{
	return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
};



/*
 	Element Preload
	
	Assumes you're loading a background image unless
	you set isImgTag to true. Store preloaded image
	in a data attribute according to size.

	(e.g. data-img-large or data-img-mobile)
-------------------------------------------------- */
const preload = (element, size, type = null, callback = null)=>{

	let preloadURL = element.getAttribute("data-preload-" + size);

	/* ----- If there is no URL defined, return clean ----- */
	if(!preloadURL || preloadURL === ""){
		
		element.className += " preloaded";
		callback(true);

		return;
	}

	switch(type){
		case "video":

			let source = document.createElement("source");

			source.setAttribute("src", preloadURL);

			element.appendChild(source);
			element.load();
			element.play();

			let checkVideoLoad = setInterval(()=>{
				if(element.readyState > 3){
					// video loaded
					element.className += " preloaded";
					clearInterval(checkVideoLoad);
					callback(true);
				}
			}, 25);

			break;

		case "img":

			// wait for img tag to load
			element.onload = ()=>{
				// add preloaded class
				element.className += " preloaded";
				callback(true);
			};
			// img tag
			element.src = preloadURL;

			break;

		case "bg":
			/* falls through */
		default:

			// background-image
			let image = new Image();
			image.onload = ()=>{
				element.style.backgroundImage = 'url(' + preloadURL + ')';
				element.className += " preloaded";
				callback(true);
			};
			image.src = preloadURL;

			break;
	}
};

/*
	Preload fire function
-------------------------------------------------- */
const preloadFire = (elem, size, callback = null)=>{

	const tag = elem.tagName.toLowerCase();

	switch(tag){
		case "video":

			preload(elem, size, "video", ()=>{
				if(callback && typeof callback === "function"){
					callback();
				}
			});

			break;

		case "img":

			preload(elem, size, "img", ()=>{
				if(callback && typeof callback === "function"){
					callback();
				}
			});

			break;

		case "div":
			/* falls through */
		default:

			preload(elem, size, "bg", ()=>{
				if(callback && typeof callback === "function"){
					callback();
				}
			});

			break;
	}
};



const runImageCycle = (criticalItems, criticalLength, items, size, callback) => {
	if(criticalLength > 0){

		let count = 0;

		// Run critical preloads
		Array.prototype.slice.call(criticalItems).forEach((item)=>{

			if(hasClass(item, "preloaded")){
				return;
			}

			preloadFire(item, size, ()=>{

				count++;

				if(criticalLength === count){

					// Critial Area done
					if(callback && typeof callback === "function"){
						callback(true);
					}

					// Run other preloads
					Array.prototype.slice.call(items).forEach((item)=>{

						if(hasClass(item, "preloaded")){
							return;
						}

						preloadFire(item, size);
					});
				}
			});
		});

	} else {

		// Fire callback, there are no critical images
		if(callback && typeof callback == "function"){
			callback(true);
		}

		// Run preloads
		Array.prototype.slice.call(items).forEach((item)=>{

			if(hasClass(item, "preloaded")){
				return;
			}

			preloadFire(item, size);
		});
	}
}


const preloadHomeCycle = (size, callback = null) => {
	let criticalItems;
	let criticalLength;
	let items;
	let loadSections = document.querySelectorAll(".hp-load-section");
	let saleBanner = document.querySelector(".sale-banner");
	let initialCycles;
	let totalCycles = loadSections.length;
	let allCyclesFired = false;
	let scrollPosition = 0;

	if(saleBanner) {
		initialCycles = 3;
	} else {
		initialCycles = 2;
	}

	if(window.scrollY > 0) {
		initialCycles = totalCycles;
	}

	/* --- initial cycles --- */

	for(let i = 0; i < initialCycles; i++) {
		criticalItems = loadSections[i].querySelectorAll(".preload-critical:not(.preloaded)");
		criticalLength = criticalItems.length;
		items = loadSections[i].querySelectorAll(".preload:not(.preloaded)");
	
		runImageCycle(criticalItems, criticalLength, items, size, callback);
	}

	document.addEventListener("scroll", ()=>{
		if(allCyclesFired) { return }
		scrollPosition = window.scrollY;
		if(scrollPosition > 500) {
			allCyclesFired = true;
			for(let i = initialCycles; i < totalCycles; i++) {
				criticalItems = loadSections[i].querySelectorAll(".preload-critical:not(.preloaded)");
				criticalLength = criticalItems.length;
				items = loadSections[i].querySelectorAll(".preload:not(.preloaded)");
			
				runImageCycle(criticalItems, criticalLength, items, size, callback);
			}
		}
	});


}

const preloadCollectionCycle = (size, callback = null) => {

	let criticalItems;
	let criticalLength;
	let items;

	let cycleIndex = 1;

	let hero;
	let heroSlider = null;
	let mobilePnpSections = null;
	let desktopPnpSections = null;
	let desktopBadge = null;
	let pnpOffscreenSections = document.querySelectorAll("#pnp-offscreen-wrapper .pnp-slide-deck");
	let collectionSections = document.querySelectorAll(".collection-section");
	let imgLoadSections = document.querySelectorAll(".img-load-section");


	if(size == "mobile") {
		mobilePnpSections = document.querySelectorAll("#zero-mobile-pnp .pnp-video");
		heroSlider = document.querySelector("#zero-mobile-header-slider");
		hero = document.querySelector(".collection-header");
	} else {
		hero = document.querySelector(".collection-header");
		desktopPnpSections = document.querySelectorAll("#pnp-images-wrapper .pnp-feature");
		desktopBadge = document.querySelector("#pnp-images-wrapper .hero-badge");
	}



	let totalCycles = collectionSections.length;
	let allCyclesFired = false;
	let scrollPosition = 0;



	/* ---- initial cycles ---- */

	/* hero */
	criticalItems = hero.querySelectorAll(".preload-critical:not(.preloaded)");
	criticalLength = criticalItems.length;
	items = hero.querySelectorAll(".preload:not(.preloaded)");

	runImageCycle(criticalItems, criticalLength, items, size, callback);

	/* hero-slider on mobile */
	if(size == "mobile") {
		criticalItems = heroSlider.querySelectorAll(".preload-critical:not(.preloaded)");
		criticalLength = criticalItems.length;
		items = heroSlider.querySelectorAll(".preload:not(.preloaded)");
		
		runImageCycle(criticalItems, criticalLength, items, size, callback);
	}


	/* PNP sections */
	if(size == "mobile") {
		criticalItems = mobilePnpSections[0].querySelectorAll(".preload-critical:not(.preloaded)");
		criticalLength = criticalItems.length;
		items = mobilePnpSections[0].querySelectorAll(".preload:not(.preloaded)");
	
		runImageCycle(criticalItems, criticalLength, items, size, callback);
	} else {
		criticalItems = desktopPnpSections[0].querySelectorAll(".preload-critical:not(.preloaded)");
		criticalLength = criticalItems.length;
		items = desktopPnpSections[0].querySelectorAll(".preload:not(.preloaded)");
	
		runImageCycle(criticalItems, criticalLength, items, size, callback);
		preloadFire(desktopBadge, size);
	}

	/* collection sections */
	criticalItems = collectionSections[0].querySelectorAll(".preload-critical:not(.preloaded)");
	criticalLength = criticalItems.length;
	items = collectionSections[0].querySelectorAll(".preload:not(.preloaded)");

	runImageCycle(criticalItems, criticalLength, items, size, callback);


	/* PNP offscreen */
	if(size == "mobile") {
		criticalItems = pnpOffscreenSections[0].querySelectorAll(".preload-critical:not(.preloaded)");
		criticalLength = criticalItems.length;
		items = pnpOffscreenSections[0].querySelectorAll(".preload:not(.preloaded)");
	
		runImageCycle(criticalItems, criticalLength, items, size, callback);
	}


	/* Bottom of section */
	if(imgLoadSections[0]) {
		criticalItems = imgLoadSections[0].querySelectorAll(".preload-critical:not(.preloaded)");
		criticalLength = criticalItems.length;
		items = imgLoadSections[0].querySelectorAll(".preload:not(.preloaded)");
	
		runImageCycle(criticalItems, criticalLength, items, size, callback);
	}

	// check to see if this is a page refresh, in which case load all

	if(window.scrollY && window.scrollY > 0) {
		for(let i = 1; i < collectionSections.length; i++) {
			/* PNP sections */
					if(mobilePnpSections) {
						criticalItems = mobilePnpSections[cycleIndex].querySelectorAll(".preload-critical:not(.preloaded)");
						criticalLength = criticalItems.length;
						items = mobilePnpSections[cycleIndex].querySelectorAll(".preload:not(.preloaded)");
					
						runImageCycle(criticalItems, criticalLength, items, size, callback);
					} else {
						criticalItems = desktopPnpSections[cycleIndex].querySelectorAll(".preload-critical:not(.preloaded)");
						criticalLength = criticalItems.length;
						items = desktopPnpSections[cycleIndex].querySelectorAll(".preload:not(.preloaded)");
					
						runImageCycle(criticalItems, criticalLength, items, size, callback);
					}
		
					/* collection sections */
					criticalItems = collectionSections[cycleIndex].querySelectorAll(".preload-critical:not(.preloaded)");
					criticalLength = criticalItems.length;
					items = collectionSections[cycleIndex].querySelectorAll(".preload:not(.preloaded)");
		
					runImageCycle(criticalItems, criticalLength, items, size, callback);
		
		
					/* PNP offscreen */
					criticalItems = pnpOffscreenSections[cycleIndex].querySelectorAll(".preload-critical:not(.preloaded)");
					criticalLength = criticalItems.length;
					items = pnpOffscreenSections[cycleIndex].querySelectorAll(".preload:not(.preloaded)");
		
					runImageCycle(criticalItems, criticalLength, items, size, callback);
		
					/* Bottom of section */
					if(imgLoadSections[cycleIndex]) {
						criticalItems = imgLoadSections[cycleIndex].querySelectorAll(".preload-critical:not(.preloaded)");
						criticalLength = criticalItems.length;
						items = imgLoadSections[cycleIndex].querySelectorAll(".preload:not(.preloaded)");
					
						runImageCycle(criticalItems, criticalLength, items, size, callback);
					}
		
					/* -- set for next cycle or break if end of doc -- */
					cycleIndex += 1;
					if(cycleIndex == collectionSections.length) {
						allCyclesFired = true;
					} 
		}

	}


	/* --- grab all our screen measurements for following sections --- */

	let sectionMarkers = [];
	let collectionBounds;
	for(let i = 0; i < collectionSections.length; i++) {
		collectionBounds = collectionSections[i].getBoundingClientRect();
		sectionMarkers.push(collectionBounds.top - 1200);
	}

	
	

	document.addEventListener("scroll", ()=>{
		if(allCyclesFired) { return }
		scrollPosition = window.scrollY;

		if(scrollPosition > sectionMarkers[cycleIndex]) {

			/* PNP sections */
			if(mobilePnpSections) {
				criticalItems = mobilePnpSections[cycleIndex].querySelectorAll(".preload-critical:not(.preloaded)");
				criticalLength = criticalItems.length;
				items = mobilePnpSections[cycleIndex].querySelectorAll(".preload:not(.preloaded)");
			
				runImageCycle(criticalItems, criticalLength, items, size, callback);
			} else {
				criticalItems = desktopPnpSections[cycleIndex].querySelectorAll(".preload-critical:not(.preloaded)");
				criticalLength = criticalItems.length;
				items = desktopPnpSections[cycleIndex].querySelectorAll(".preload:not(.preloaded)");
			
				runImageCycle(criticalItems, criticalLength, items, size, callback);
			}

			/* collection sections */
			criticalItems = collectionSections[cycleIndex].querySelectorAll(".preload-critical:not(.preloaded)");
			criticalLength = criticalItems.length;
			items = collectionSections[cycleIndex].querySelectorAll(".preload:not(.preloaded)");

			runImageCycle(criticalItems, criticalLength, items, size, callback);


			/* PNP offscreen */
			criticalItems = pnpOffscreenSections[cycleIndex].querySelectorAll(".preload-critical:not(.preloaded)");
			criticalLength = criticalItems.length;
			items = pnpOffscreenSections[cycleIndex].querySelectorAll(".preload:not(.preloaded)");

			runImageCycle(criticalItems, criticalLength, items, size, callback);

			/* Bottom of section */
			if(imgLoadSections[cycleIndex]) {
				criticalItems = imgLoadSections[cycleIndex].querySelectorAll(".preload-critical:not(.preloaded)");
				criticalLength = criticalItems.length;
				items = imgLoadSections[cycleIndex].querySelectorAll(".preload:not(.preloaded)");
			
				runImageCycle(criticalItems, criticalLength, items, size, callback);
			}

			/* -- set for next cycle or break if end of doc -- */
			cycleIndex += 1;
			if(cycleIndex == sectionMarkers.length) {
				allCyclesFired = true;
			} 
		}
	});

	
}



/*
	Image Preload Cycle
	
	Start with critical load elements.

	Usable for barba view loads, checks for a loaded
	image, if it hasn't been loaded, load it.
-------------------------------------------------- */
const preloadInit = (size, callback = null)=>{

	const zeroCollection = document.getElementById("collection-zero");

	if(zeroCollection) {
		preloadCollectionCycle(size);
		return;
	}
	
	const homePage = document.querySelector(".template-index");

	if(homePage) {
		preloadHomeCycle(size);
		return;
	}

	const criticalItems = document.querySelectorAll(".preload-critical:not(.preloaded)");
	const criticalLength = criticalItems.length;
	const items = document.querySelectorAll(".preload:not(.preloaded)");

	runImageCycle(criticalItems, criticalLength, items, size, callback);
	
};

let imageLoadFired = false;

window.addEventListener('DOMContentLoaded', (event) => {
	let windowWidth = window.innerWidth > 1024 ? "desktop" : "mobile";
	preloadInit(windowWidth);
});


if(document.readyState !== "loading" && imageLoadFired == false){
  imageLoadFired = true;
	let windowWidth = window.innerWidth > 1024 ? "desktop" : "mobile";
	preloadInit(windowWidth);
}

