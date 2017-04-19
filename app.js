var model = {
	
	"currentCat": null,

	"cats": [{
		"catName": "Fluffy",
		"catImage": 'images/fluffy.png',
		"clickCount": 0
	},
	{
		"catName": "Ruby",
		"catImage": 'images/ruby.png',
		"clickCount": 0
	},
	{
		"catName": "Lucky",
		"catImage": 'images/lucky.png',
		"clickCount": 0

	}]
};

var octopus = {

		init: function() {
				model.currentCat = model.cats[0];

				listView.init();
				galleryView.init();
				adminView.init();
				
			},

		getCats: function() {
		return model.cats;
  		},

  		getCurrentCat: function() {
  			return model.currentCat;
  		},
  		setCurrentCat: function(cat){
  			model.currentCat = cat;
  		},

  		incrementCounter: function() {
  			model.currentCat.clickCount ++;
  			galleryView.render();
  		},

  		inputCat: function() {
  			   	var currentCat = octopus.getCurrentCat();

    	currentCat.catName= document.getElementById("adminCatName").value;
    	currentCat.catImage = document.getElementById("adminCatImage").value;
    	currentCat.clickCount = document.getElementById("adminClicks").value;
 		listView.render();
 		galleryView.render();

    	$('#content').toggle('hide');
    	$('#save').hide();
    	$('#cancel').hide();
  		}

  	

  	}

var listView = {

	init: function() {

		this.catListElem = document.getElementById('catList');
		
		this.render();
	},

	render: function() {
	
// render list of cat names
// add click function to each which clears view area places clicked cat in to the view area
var cat, elem, i;

var cats = octopus.getCats();

this.catListElem.innerHTML = '';

for (i = 0; i < cats.length; i++) {

cat = cats[i];

elem = document.createElement('li');
elem.textContent = cat.catName;


 // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
  elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    galleryView.render();
                    adminView.render();
                };
            })(cat));

            this.catListElem.appendChild(elem);

}
}
};



var galleryView = {
	init: function() {
		this.catElem = document.getElementById('cat');
		this.catNameElem = document.getElementById('catName');
		this.catImageElem = document.getElementById('catImage');
		this.countElem = document.getElementById('clicks');

		this.catImageElem.addEventListener('click', function() {
			octopus.incrementCounter();
		});

		 this.render();

	},
		
		//add event listener to current cat's image which will increment currentCat's catclicks

	// add click counter to cat image
	//display cat name, image and click counter

	render: function() {

		var currentCat = octopus.getCurrentCat();
		this.countElem.textContent = currentCat.clickCount;
		this.catNameElem.textContent = currentCat.catName;
		this.catImageElem.src = currentCat.catImage;



	}
};

var adminView = {

	init: function() {
		
		this.adminCatNameElem = document.getElementById('adminCatName');
		this.adminCatImageElem = document.getElementById('adminCatImage');
		this.adminCountElem = document.getElementById('adminClicks');
		
	},

	render: function() {
		
		var currentCat = octopus.getCurrentCat();

		this.adminCountElem.value = currentCat.clickCount;
		this.adminCatNameElem.value = currentCat.catName;
		this.adminCatImageElem.value = currentCat.catImage;

	}

}

$(document).ready(function(){
	//hide input boxes and save/cancel buttons
	$('#content').hide();
	$('#cancel').hide();
	$('#save').hide();
	//click admin button to show admin content
    $('#admin').on('click', function(event) {        
         $('#content').toggle('show');
         $('#cancel').show();
         $('#save').show();
         adminView.render();
    });
 //hide admin content on cancel
    $('#cancel').on('click', function(event) {
    	$('#content').toggle('hide');
    	$('#save').hide();
    	$('#cancel').hide();
    });
});
    // save button click saves the input information to the current cat
    $('#save').on('click', function(event) {
    	octopus.inputCat();
 
    });



octopus.init();
