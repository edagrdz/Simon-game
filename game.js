
var buttonColours = ["red", "blue", "green", "yellow"]; 
var gamePattern = []; 
var userClickedPattern = []; 


// trigger next sequence -----------------

function nextSequence() {    

    userClickedPattern = [];    
    level++; 
    $("#level-title").text("Level " + level); 

    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);  
    
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  
    playSound(randomChosenColour);  

}

// button clicks ----------------

$(".btn").click(function() {
    
    var userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour);    
      
    playSound(userChosenColour); 
    animatePress(userChosenColour);     
    
    checkAnswer(userClickedPattern.length-1); 
    
});


// button animations -------------

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed"); 
    setTimeout (function () { 
        $("#" + currentColour).removeClass("pressed");    
    },100);

}

// first time keydown -----------------

var started = false;  
var level = 0;   

$(document).keypress(function() {       

    if (!started) {
        
        $("#level-title").text("Level "+ level);  
        nextSequence();
        started = true;     

    }    

});

// Check answer a.k.a The Real Boss fight -----------

function checkAnswer(currentLevel) {    

    // Check if the LAST button clicked is right
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        console.log("success");        
        
        if (userClickedPattern.length === gamePattern.length) {
                        
            setTimeout(function () {
                nextSequence();
            },1000);

        } 

        // otherwise, it's wrong and trigger Game Over
    } else {

        console.log("wrong"); 

        playSound("wrong");

        $("body").addClass("game-over");        
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart"); 

        startOver();

    }
    
}

// Sounds to play ------------------

function playSound(name) {

    switch(name) { 
        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;

        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;

        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;

        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;

        case "wrong":
            var wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
            break;

        default: 

    }

}

// Reset every variable -------------

function startOver() {

    level = 0;
    gamePattern = [];
    started = false;

}


