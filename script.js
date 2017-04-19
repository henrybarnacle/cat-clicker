

 $(document).ready(function() {

$("#photos, #photo-titles").hide();


$("li a").click(function () {

    $("#photos, #photo-titles, #photo-counters, .hide").hide(); // Hide everything every time
    var c = $(this).attr('class').split(' ')[0]; // Get first class of link
    $("." + c).parent().show(); // Show the parent div
    $("." + c).fadeIn(); // Show the object you want to show
    });
});

var counter1 = 0;
var counter2 = 0;
var counter3 = 0;

$("#photo1").click(function(e){
	counter1++;
	$("#clicks1").text(counter1);
});

$("#photo2").click(function(e){
	counter2++;
	$("#clicks2").text(counter2);
}); 

$("#photo3").click(function(e){
	counter3++;
	$("#clicks3").text(counter3);
});



