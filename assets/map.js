
let classIsArray;
let mapHasSizes;

//******* Selectors *******//

//** Map Styles **//

// Custom Map Style Options
let styleSelector = document.querySelectorAll('.style-option'); 
// Get Active Map Style
let currentStyle = document.getElementsByClassName('active-style');
// Hidden Radio Buttons for Map Styles
let mapRadioButtons = document.querySelectorAll('#radio-maps input');

let mapLabelsSelect = document.getElementById('map-labels');
let mapRoadMapsSelect = document.getElementById('map-roadmaps');

//** Sizing Buttons **//

// Get all sizing buttons
let sizeButtons = document.querySelectorAll('.swatch-element input');
let sizeCurrentButton = document.querySelector('.size-button');
let sizeButtonActive = document.getElementsByClassName('size-button-active');

let sizeTagVertical = document.querySelector('.vertical i');
let sizeTagHorizontal = document.querySelector('.horizontal');

////////////////////////////////////////////////////

//** Theme Buttons & Layout **//

// Get all sizing buttons
let currentTheme = document.getElementsByClassName('theme-button-active');
let themeButtons = document.querySelectorAll('button.theme-button');
let mapLayout = document.querySelector('.layout');

let themeLayouts = [
	'layout-0',
    'layout-1',
    'layout-2',
    'layout-3',
    'layout-4',
    'layout-5'
];

let mapSizes = [
  	'poster-12-18',
	'poster-18-24',
  	'poster-30-40',
  	'poster-50-70',
];
  
let mapWidths = [
	'900px',
  	'1350px',
  	'825px',
  	'1425px'
];

let mapHeights = [
  	'1350px',
  	'1800px',
  	'1125px',
  	'2025px'
];

let mapTransform = [
	'scale(0.599171)',
  	'scale(0.599447)',
  	'scale(0.653641)',
  	'scale(0.578423)'
];

////////////////////////////////////////////////////


let fontSizeButtons = document.querySelectorAll('.text-button');

let posterTitle = document.querySelector('.citymap-poster-title');
let posterSubtitle = document.querySelector('.citymap-poster-subtitle');
let posterTagline = document.querySelector('.citymap-poster-tagline');

let posterFontList = [
        'select-b612',
        'select-bebas',
        'select-comic',
        'select-inconsolata',
        'select-another-hand',
        'select-down-here',
        'select-major',
        'select-merienda',
        'select-merienda-one',
        'select-marker',
        'select-raleway',
        'select-roboto',
        'select-varela-rd',
        'select-varela',
        'select-yellow-tail',
]

let titleInput = document.getElementById('mapTitle');
let subtitleInput = document.getElementById('mapLabel');
let taglineInput = document.getElementById('mapCoordinates');


let mapSelector = document.querySelector('.map');

let defaultOrientation = 'orientation-portrait';
let defaultLayout = 'poster-12-18';

var detector = new MobileDetect(window.navigator.userAgent);

// Border Editor
let mainPoster = document.querySelector('.poster');
let mainPosterLabel = document.querySelector('.citymap-poster-label');
let posterBorder = document.querySelector('.border-1');
let posterBorderTwo = document.querySelector('.border-2');
let posterBorderThree = document.querySelector('.border-3');
let posterCircle = document.querySelector('.map-circle-svg');
let circleContent = document.querySelector('#map-circle');



// Editor containers
let mainPosterContainer = document.querySelector('.main-poster');
let mainPosterBtContainer = document.querySelector('.main-bottom-poster');
let mainPosterBOneContainer = document.querySelector('.main-border-1');
let mainPosterBTwoContainer = document.querySelector('.main-border-2');
let mainPosterBThreeContainer = document.querySelector('.main-border-3');
let mainPosterCircle = document.querySelector('.main-circle');

//******* Map Settings *******//
mapboxgl.accessToken = 'pk.eyJ1IjoiY3V0bWFwcyIsImEiOiJjanlzZnc1eGUwanF2M21tbHdndTVjcnlxIn0.iXn0-mmiZQCdhtUfWSKv1w';
let defaultMapStyle = 'cutmaps/ckdjt9bz40i041jpkn0pc111i';
let defaultMapOptions = {
	container: 'map_canvas',
    style: 'mapbox://styles/' + defaultMapStyle,
    center: [-79.4512, 43.6568],
    zoom: 3,
  	attributionControl: false
};
let map = new mapboxgl.Map(defaultMapOptions);

////////////////////////////////


// Initialize On Load
init = () => {
	initializeLoader();  
	initMapSettings();
  	initGeocoder();
 	initMapStyle();
    initFontSelect();
    colorPickerReference('.color-picker-title', 'nano', posterTitle, 'font-color');
  	colorPickerReference('.color-picker-sub', 'nano', posterSubtitle, 'font-color');
  	colorPickerReference('.color-picker-tag', 'nano', posterTagline, 'font-color');
    colorPickerReference('.color-picker-poster', 'nano', mainPoster, 'background-color');
  	colorPickerReference('.color-picker-poster-label', 'nano', mainPosterLabel, 'background-color');
  	colorPickerReference('.color-picker-border-one', 'nano', posterBorder, 'border-color');
    colorPickerReference('.color-picker-border-two', 'nano', posterBorderTwo, 'border-color');
    colorPickerReference('.color-picker-border-three', 'nano', posterBorderThree, 'border-color');
    colorPickerReference('.color-picker-circle', 'nano', circleContent, 'circle-color');
}

initializeLoader = () => {
  document.onreadystatechange = function() { 
      if (document.readyState !== "complete") { 
          document.querySelector("body").style.visibility = "hidden"; 
          document.querySelector(".pin").style.visibility = "visible"; 
          document.querySelector(".pulse").style.visibility = "visible";
          document.querySelector(".loader-body").style.visibility = "visible";
      } else { 

          document.querySelector(".loader-body").style.display = "none"; 
          document.querySelector(".pin").style.display = "none"; 
          document.querySelector(".pulse").style.display = "none"; 
          document.querySelector("body").style.visibility = "visible"; 
      } 
  };
}

initMapStyle = () =>{
  	mapLayout.classList.add(defaultLayout);
  	mapLayout.classList.add(defaultOrientation);
}

initMapSettings = () => {
  
  	let mapNav = new mapboxgl.NavigationControl({
        showCompass: false,
        showZoom: true,
    });
  
    map.addControl(mapNav, 'top-left');
}

initGeocoder = () => {
    
  	let geocoder = new MapboxGeocoder({
    	accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      	marker: false,
      	zoom: 5,
    });
  
  	geocoder.on('result', function(results) {
      	let geoResult = results.result;
      	changeLocationGeocoder(geoResult.text, geoResult.context[1]['text'], geoResult.geometry['coordinates'][0], geoResult.geometry['coordinates'][1] );
	})
   	
  	let geoElement = document.getElementById('geocoder')
    geoElement.appendChild(geocoder.onAdd(map));
  	
	// Extra Attributes needed for mapbox input
	let geoInput = document.querySelector('.mapboxgl-ctrl-geocoder--input');
    geoInput.classList.add('required');
  	geoInput.id = 'map-location';
  	geoInput.required = true;
  	geoInput.name = "properties[Map Location]";
  	geoInput.placeholder = 'Enter a city or place here';

}

initFontSelect = () =>{
  new SlimSelect({
    select: '#slim-select-top',
    onChange: (info) => {
    	changeFont(info);
  	},
    data: [
    	{
          placeholder: true, 
          text: 'Select a font',
        },
    	{
          text: 'B612',
          value: 'select-b612',
          class: 'top-font select-b612',
          css: 'font-family: B612, sans-serif',
        },
    	{
          text: 'Bebas Neue',
          value: 'select-bebas',
          class: 'top-font select-bebas',
          css: 'font-family: Bebas Neue, cursive',
        },
    	{
          text: 'Comic Neue',
          value: 'select-comic',
          class: 'top-font select-comic',
          css: 'font-family: Comic Neue, cursive',
        },
        {
          text: 'Inconsolata',
          value: 'select-inconsolata',
          class: 'top-font select-inconsolata',
          css: 'font-family: Inconsolata, monospace',
        },
    	{
          text: 'Just Another Hand',
          value: 'select-another-hand',
          class: 'top-font select-another-hand',
          css: 'font-family: Just Another Hand, cursive',
        },
    	{
          text: 'Just Me Again Down Here',
          value: 'select-down-here',
          class: 'top-font select-down-here',
          css: 'font-family: Just Me Again Down Here, cursive',
        },
    	{
          text: 'Major Mono Display',
          value: 'select-major',
          class: 'top-font select-major',
          css: 'font-family: Major Mono Display, monospace',
        },
    	{
          text: 'Merienda',
          value: 'select-merienda',
          class: 'top-font select-merienda',
          css: 'font-family: Merienda, cursive',
        },
    	{
          text: 'Merienda One',
          value: 'select-merienda-one',
          class: 'top-font select-merienda-one',
          css: 'font-family: Merienda One, cursive',
        },
        {
          text: 'Permanent Marker',
          value: 'select-marker',
          class: 'top-font select-marker',
          css: 'font-family: Permanent Marker, cursive',
        },
    	{
          text: 'Raleway',
          value: 'select-raleway',
          class: 'top-font select-raleway',
          css: 'font-family: Raleway, sans-serif',
        },
              {
          text: 'Roboto',
          value: 'select-roboto',
          class: 'top-font select-roboto',
          css: 'font-family: Roboto, sans-serif',
        },
    	{
          text: 'Varela Round',
          value: 'select-varela-rd',
          class: 'top-font select-varela-rd',
          css: 'font-family: Varela Round, sans-serif',
        },
        {
          text: 'Varela',
          value: 'select-varela',
          class: 'top-font select-varela',
          css: 'font-family: Varela, sans-serif',
        },
    	{
          text: 'Yellowtail',
          value: 'select-yellow-tail',
          class: 'top-font select-yellow-tail',
          css: 'font-family: Yellowtail, cursive',
        },
  	],
  });
  new SlimSelect({
    select: '#slim-select-middle',
    onChange: (info) => {
    	changeFont(info);
  	},
    data: [
    	{
          placeholder: true, 
          text: 'Select a font',
        },
    	{
          text: 'B612',
          value: 'select-b612',
          class: 'middle-font select-b612',
          css: 'font-family: B612, sans-serif',
        },
    	{
          text: 'Bebas Neue',
          value: 'select-bebas',
          class: 'middle-font select-bebas',
          css: 'font-family: Bebas Neue, cursive',
        },
    	{
          text: 'Comic Neue',
          value: 'select-comic',
          class: 'middle-font select-comic',
          css: 'font-family: Comic Neue, cursive',
        },
        {
          text: 'Inconsolata',
          value: 'select-inconsolata',
          class: 'middle-font select-inconsolata',
          css: 'font-family: Inconsolata, monospace',
        },
    	{
          text: 'Just Another Hand',
          value: 'select-another-hand',
          class: 'middle-font select-another-hand',
          css: 'font-family: Just Another Hand, cursive',
        },
    	{
          text: 'Just Me Again Down Here',
          value: 'select-down-here',
          class: 'middle-font select-down-here',
          css: 'font-family: Just Me Again Down Here, cursive',
        },
    	{
          text: 'Major Mono Display',
          value: 'select-major',
          class: 'middle-font select-major',
          css: 'font-family: Major Mono Display, monospace',
        },
    	{
          text: 'Merienda',
          value: 'select-merienda',
          class: 'middle-font select-merienda',
          css: 'font-family: Merienda, cursive',
        },
    	{
          text: 'Merienda One',
          value: 'select-merienda-one',
          class: 'middle-font select-merienda-one',
          css: 'font-family: Merienda One, cursive',
        },
        {
          text: 'Permanent Marker',
          value: 'select-marker',
          class: 'middle-font select-marker',
          css: 'font-family: Permanent Marker, cursive',
        },
    	{
          text: 'Raleway',
          value: 'select-raleway',
          class: 'middle-font select-raleway',
          css: 'font-family: Raleway, sans-serif',
        },
              {
          text: 'Roboto',
          value: 'select-roboto',
          class: 'middle-font select-roboto',
          css: 'font-family: Roboto, sans-serif',
        },
    	{
          text: 'Varela Round',
          value: 'select-varela-rd',
          class: 'middle-font select-varela-rd',
          css: 'font-family: Varela Round, sans-serif',
        },
        {
          text: 'Varela',
          value: 'select-varela',
          class: 'middle-font select-varela',
          css: 'font-family: Varela, sans-serif',
        },
    	{
          text: 'Yellowtail',
          value: 'select-yellow-tail',
          class: 'middle-font select-yellow-tail',
          css: 'font-family: Yellowtail, cursive',
        },
  	],
  });
  new SlimSelect({
    select: '#slim-select-bottom',
    onChange: (info) => {
    	changeFont(info);
  	},
    data: [
    	{
          placeholder: true, 
          text: 'Select a font',
        },
    	{
          text: 'B612',
          value: 'select-b612',
          class: 'bottom-font select-b612',
          css: 'font-family: B612, sans-serif',
        },
    	{
          text: 'Bebas Neue',
          value: 'select-bebas',
          class: 'bottom-font select-bebas',
          css: 'font-family: Bebas Neue, cursive',
        },
    	{
          text: 'Comic Neue',
          value: 'select-comic',
          class: 'bottom-font select-comic',
          css: 'font-family: Comic Neue, cursive',
        },
        {
          text: 'Inconsolata',
          value: 'select-inconsolata',
          class: 'bottom-font select-inconsolata',
          css: 'font-family: Inconsolata, monospace',
        },
    	{
          text: 'Just Another Hand',
          value: 'select-another-hand',
          class: 'bottom-font select-another-hand',
          css: 'font-family: Just Another Hand, cursive',
        },
    	{
          text: 'Just Me Again Down Here',
          value: 'select-down-here',
          class: 'bottom-font select-down-here',
          css: 'font-family: Just Me Again Down Here, cursive',
        },
    	{
          text: 'Major Mono Display',
          value: 'select-major',
          class: 'bottom-font select-major',
          css: 'font-family: Major Mono Display, monospace',
        },
    	{
          text: 'Merienda',
          value: 'select-merienda',
          class: 'bottom-font select-merienda',
          css: 'font-family: Merienda, cursive',
        },
    	{
          text: 'Merienda One',
          value: 'select-merienda-one',
          class: 'bottom-font select-merienda-one',
          css: 'font-family: Merienda One, cursive',
        },
        {
          text: 'Permanent Marker',
          value: 'select-marker',
          class: 'bottom-font select-marker',
          css: 'font-family: Permanent Marker, cursive',
        },
    	{
          text: 'Raleway',
          value: 'select-raleway',
          class: 'bottom-font select-raleway',
          css: 'font-family: Raleway, sans-serif',
        },
              {
          text: 'Roboto',
          value: 'select-roboto',
          class: 'bottom-font select-roboto',
          css: 'font-family: Roboto, sans-serif',
        },
    	{
          text: 'Varela Round',
          value: 'select-varela-rd',
          class: 'bottom-font select-varela-rd',
          css: 'font-family: Varela Round, sans-serif',
        },
        {
          text: 'Varela',
          value: 'select-varela',
          class: 'bottom-font select-varela',
          css: 'font-family: Varela, sans-serif',
        },
    	{
          text: 'Yellowtail',
          value: 'select-yellow-tail',
          class: 'bottom-font select-yellow-tail',
          css: 'font-family: Yellowtail, cursive',
        },
  	],
  });
}

colorPickerReference = (element, theme, currentSelector, type) =>{
    const pickr = Pickr.create({
        el: element,
        theme: theme, // or 'monolith', or 'nano'
    
        swatches: [
            'rgba(244, 67, 54, 1)',
            'rgba(233, 30, 99, 0.95)',
            'rgba(156, 39, 176, 0.9)',
            'rgba(103, 58, 183, 0.85)',
            'rgba(63, 81, 181, 0.8)',
            'rgba(33, 150, 243, 0.75)',
            'rgba(3, 169, 244, 0.7)',
            'rgba(0, 188, 212, 0.7)',
            'rgba(0, 150, 136, 0.75)',
            'rgba(76, 175, 80, 0.8)',
            'rgba(139, 195, 74, 0.85)',
            'rgba(205, 220, 57, 0.9)',
            'rgba(255, 235, 59, 0.95)',
            'rgba(255, 193, 7, 1)'
        ],
    
        components: {
    
            // Main components
            preview: true,
            opacity: true,
            hue: true,
    
            // Input / output Options
            interaction: {
                hex: true,
                rgba: true,
                hsla: true,
                hsva: true,
                cmyk: true,
                input: true,
                clear: true,
                save: true
            }
        }
    });
    
    pickr.on('save', (color, instance) => {
      	if (type === 'font-color'){
        	currentSelector.style.color = color.toHEXA().toString();
        } else if ( type === 'border-color'){
        	currentSelector.style.borderColor = color.toHEXA().toString();
        } else if (type === 'background-color'){
           currentSelector.style.backgroundColor = color.toHEXA().toString();
        } else if (type === 'circle-color'){
          currentSelector.setAttribute("fill", color.toHEXA().toString()); 
        }
        console.log('save', color.toHEXA().toString(), instance);  
    })
}
      
changeFont = ( fontLayer ) => {
	const value = fontLayer.value;
	const fontClass = fontLayer.class;
	const topFont = 'top-font';
	const middleFont = 'middle-font';
    const bottomFont = 'bottom-font';
    
    if (fontClass.includes(topFont)){
        removeStyles(posterTitle, posterFontList, null, 'fonts');
		posterTitle.classList.add(value);
    } else if (fontClass.includes(middleFont)){
        removeStyles(posterSubtitle, posterFontList, null, 'fonts');
        posterSubtitle.classList.add(value);
    } else if (fontClass.includes(bottomFont)){
        removeStyles(posterTagline, posterFontList, null, 'fonts');
        posterTagline.classList.add(value);
    }
}   

changeLocationGeocoder = (city, country, lat, long) => {
  	posterTitle.innerText = city;
  	posterSubtitle.innerText = country;
  	posterTagline.innerText = lat + ' / ' + long;
  	titleInput.value = city;
	subtitleInput.value = country;
	taglineInput.value = lat + ' / ' + long;
}

selectSize = (button) => {
  		console.log(button.target);
  		let activeButton = button.target;
    	let getAttribute = activeButton.value;
    	let textObject;
  
        if(getAttribute == '12x18 inches'){
            textObject = { 'vertical' : '18 inch', 'horizontal' : '12 inch' };
            removeStyles(mapLayout, mapSizes, null, 'map-sizes');
            setMapSize(mapSizes[0], mapWidths[0], mapHeights[0], mapTransform[0], textObject );
        } else if (getAttribute == '18x24 inches') {
            textObject = { 'vertical' : '24 inch', 'horizontal' : '18 inch' };
            removeStyles(mapLayout, mapSizes, null, 'map-sizes');
            setMapSize(mapSizes[1], mapWidths[1], mapHeights[1], mapTransform[1], textObject );
        } else if (getAttribute == '30x40 cm'){
            textObject = { 'vertical' : '30 cm', 'horizontal' : '40 cm' };
            removeStyles(mapLayout, mapSizes, null, 'map-sizes');
            setMapSize(mapSizes[2], mapWidths[2], mapHeights[2], mapTransform[2], textObject );
        }	else if (getAttribute == '50 x 70 cm'){
            textObject = { 'vertical' : '50 cm', 'horizontal' : '70 cm' };
            removeStyles(mapLayout, mapSizes, null, 'map-sizes');
            setMapSize(mapSizes[3], mapWidths[3], mapHeights[3], mapTransform[3], textObject );
        }
}

selectStyle = (layer) => {
  	let selectedLayer = layer.target;
  	let selectedMapAttribute = selectedLayer.getAttribute('data-map-id');
    checkRadioButton(selectedLayer);
    removeStyles(currentStyle, null, 'active-style', null);
    selectedLayer.classList.add('active-style');
  	switchLayer(selectedMapAttribute);
  	console.log('Im done');
}

selectTheme = (themeLayer) => {

  	themeLayer.preventDefault();
	
 	let currentThemeSelector = themeLayer.target;
  	let currentThemeAttribute = currentThemeSelector.getAttribute('data-layout-id');
    
    removeStyles(mapLayout, themeLayouts, 'layout-', classIsArray);
  	removeStyles(currentTheme, null, 'theme-button-active', null);
    
    if (currentThemeAttribute === 'layout-0' ){
        mainPosterBOneContainer.style.display = 'none';
        mainPosterBTwoContainer.style.display = 'none';
        mainPosterBThreeContainer.style.display = 'none';
      	mainPosterCircle.style.display = 'none';
    } else if ( currentThemeAttribute === 'layout-1' ) {
        mainPosterBOneContainer.style.display = 'flex';
        mainPosterBTwoContainer.style.display = 'flex';
        mainPosterBThreeContainer.style.display = 'flex';
      	mainPosterCircle.style.display = 'none';
    } else if ( currentThemeAttribute === 'layout-2' ) {
        mainPosterBOneContainer.style.display = 'flex';
        mainPosterBTwoContainer.style.display = 'none';
        mainPosterBThreeContainer.style.display = 'none';
      	mainPosterCircle.style.display = 'none';
    } else if ( currentThemeAttribute === 'layout-3' ) {
        mainPosterBOneContainer.style.display = 'none';
        mainPosterBTwoContainer.style.display = 'none';
        mainPosterBThreeContainer.style.display = 'none';
      	mainPosterCircle.style.display = 'none';
    } else if ( currentThemeAttribute === 'layout-4' ) {
        mainPosterBOneContainer.style.display = 'none';
        mainPosterBTwoContainer.style.display = 'none';
        mainPosterBThreeContainer.style.display = 'none';
      	mainPosterCircle.style.display = 'flex';
    } else if ( currentThemeAttribute === 'layout-5' ) {
        mainPosterBOneContainer.style.display = 'none';
        mainPosterBTwoContainer.style.display = 'none';
        mainPosterBThreeContainer.style.display = 'none';
      	mainPosterCircle.style.display = 'none';
    }

    currentThemeSelector.classList.add('theme-button-active');
    mapLayout.classList.add(currentThemeAttribute);
}

activateAllOtherOptions = () => {
    mainPosterContainer.style.display = 'flex';
    mainPosterBtContainer.style.display = 'flex';
    mainPosterBOneContainer.style.display = 'flex';
    mainPosterBTwoContainer.style.display = 'flex';
    mainPosterBThreeContainer.style.display = 'flex';
}

selectFontSize = (fontLayer) => {
  
   	fontLayer.preventDefault();
  	const currentSelector = fontLayer.target;
  	console.log(currentSelector);
  	const currentId = currentSelector.id;
  	console.log(currentId);
	const currentAttribute = currentSelector.getAttribute('data-fontsize-id');
  	setActualFontSize(currentId, currentAttribute);
}

setActualFontSize = (id, attribute) => {
  
	const defaultTop = '0.9em';
 	const defaultMiddle = '0.42em';
  	const defaultBottom = '.22em';
  
	if (id == 'top'){
    	if (attribute === 'large'){
    		posterTitle.style.fontSize = '2em';
    	} else if ( attribute == 'medium'){
    		posterTitle.style.fontSize = '1.5em';
    	} else {
    		posterTitle.style.fontSize = defaultTop;
    	}
  	} else if (id == 'middle'){
		if (attribute === 'large'){
    		posterSubtitle.style.fontSize = '1.2em';
    	} else if ( attribute == 'medium'){
    		posterSubtitle.style.fontSize = '0.7em';
    	} else {
    		posterSubtitle.style.fontSize = defaultMiddle;
    	}
    } else {
    	if (attribute === 'large'){
    		posterTagline.style.fontSize = '0.70em';
    	} else if ( attribute == 'medium'){
    		posterTagline.style.fontSize = '0.40em';
    	} else {
    		posterTagline.style.fontSize = defaultBottom;
    	}
    	
    }
}

changeMapText = (input) => {
  	const targetInput = input.target.id
  	if(targetInput == 'mapTitle'){
  		posterTitle.innerText = input.target.value;
    }else if (targetInput == 'mapLabel'){
    	posterSubtitle.innerText = input.target.value;
    } else if (targetInput == 'mapCoordinates') {
    	posterTagline.innerText = input.target.value;
    }
};

setMapSize = (mapClass, width, height, transform, sideText) => {
    mapLayout.classList.add(mapClass);
    mapSelector.style.width = width;
    mapSelector.style.height= height;
    mapSelector.style.transform = transform;
    sizeTagVertical.innerText = sideText['vertical'];
    sizeTagHorizontal.innerText = sideText['horizontal'];
};

removeStyles = (selector, list, className, type ) =>{
        if (type != null){
            for(let i = 0; i < list.length; i++){
                selector.classList.remove(list[i]);
            }
            console.log('in if');
        } else if ( list != null && className != null) {
            for(let i = 0; i < list.length; i++){
                selector.classList.remove(className + [i]);
            }
          console.log('in elseif');
        } else {
            for(let i = 0; i < selector.length; i++){
                selector[i].classList.remove(className);
            }
          	console.log('in else');
        }
}

checkRadioButton = (targetLayer) => {
  	let targetLayerId = targetLayer.id
	for (var i = 0; i < mapRadioButtons.length; i++) {
      	if(mapRadioButtons[i].value === targetLayerId){
        	mapRadioButtons[i].checked = true;
        }
    }
}

switchLayer = (layer) => {
  map.setStyle('mapbox://styles/' + layer);
}

selectTitle = (title) => {
	const currentTitle = title.target
    console.log(currentTitle);
};

changeMapLabels = (button) => {
  	let selectedMapLabel = button.target;
  	  	
  	var visibility = map.getLayoutProperty('country_label', 'visibility');
  
  	if (visibility === 'visible') {
    	map.setLayoutProperty('country_label', 'visibility', 'none');
    } else {
    	map.setLayoutProperty('country_label', 'visibility', 'visible');
    }
}


changeMapRoadMaps = (button) => {
  	
  	let selectedMapLabel = button.target;
}




mapLabelsSelect.addEventListener('click', changeMapLabels);
mapRoadMapsSelect.addEventListener('click', changeMapRoadMaps);

titleInput.addEventListener('input', changeMapText);
subtitleInput.addEventListener('input', changeMapText);
taglineInput.addEventListener('input', changeMapText);

fontSizeButtons.forEach( themeButton => themeButton.addEventListener('click', selectFontSize));
themeButtons.forEach( themeButton => themeButton.addEventListener('click', selectTheme));
sizeButtons.forEach( button => button.addEventListener('click', selectSize));
styleSelector.forEach( layer => layer.addEventListener('click', selectStyle));
document.addEventListener('DOMContentLoaded', init);

