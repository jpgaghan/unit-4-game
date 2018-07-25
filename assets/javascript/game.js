var charDiv, oppDiv, character, opponent

var gameContent =

    {
        char0: [5, 4, 40, new Audio ("assets/sound/trex.mp3")],
        char1: [4, 5, 40, new Audio("assets/sound/raptor.mp3")],
        char2: [3, 8, 40, new Audio ("assets/sound/fish.mp3")],
        char3: [5, 9, 40, new Audio("assets/sound/pterodactyl.mp3")],
        backgroundsong: new Audio("assets/sound/jpark.mp3"),
        wins: 0,
        opponentstartHealth: 0,
        characterstartHealth: 0,

        attackNow: function () {
            character[3].currentTime = 0
            character[3].play();
            if (this.characterstartHealth<=0) {
                this.opponentstartHealth = opponent[2];
                this.characterstartHealth = character[2];
            } else if (this.opponentstartHealth<=0) {
                this.opponentstartHealth = opponent[2];  
            }
            character[2] = character[2] - opponent[1];
            opponent[2] = opponent[2] - character[0];
            this.progressbarCalculation();
        },

        winloseTest: function() {
            if (character[2]<=0) {
                $("#" + charDiv).remove().clone().appendTo("." + charDiv);
                $("#" + oppDiv).appendTo("." + oppDiv);
                $("#" + oppDiv).remove().clone().appendTo("#opponentwin");
                $("#fightstage").hide();
                $(".progress").hide();
                $("#prog" + charDiv[4]).removeAttr("style");
                $("#prog" + charDiv[4]).css("width", "100%");
                $("#prog" + charDiv[4]).text("100%");
                $("#prog" + oppDiv[4]).removeAttr("style");
                $("#prog" + oppDiv[4]).css("width", "100%");
                $("#prog" + oppDiv[4]).text("100%");
                $("h1").text("You Lost!");
                $("#navbar").show();
                $("#lose").show();
            } 
            else if (opponent[2]<=0) {
                $("#" + oppDiv).remove().clone().appendTo("." + oppDiv);
                $("#prog" + oppDiv[4]).removeAttr("style");
                $("#prog" + oppDiv[4]).css("width", "100%");
                $("#prog" + oppDiv[4]).text("100%");
                $("." + oppDiv).hide();
                $("#fightstage").hide();
                $(".progress").hide();
                this.wins +=1;
                if (this.wins !== 3) {
                $("#selectionscreen").show();
                $(".progress").hide();
                }   else {
                        $("#" + charDiv).remove().clone().appendTo("#characterwin");
                        $("h1").text("You Won!");
                        $("#win").show();
                        $(".progress").hide();}
            }
        },

        progressbarCalculation: function() {
            charhealthPerc = character[2] / this.characterstartHealth * 100;
            charhealthPerc = Math.round(charhealthPerc * 100) / 100
            opphealthPerc = opponent[2]/this.opponentstartHealth * 100;
            opphealthPerc = Math.round(opphealthPerc * 100) / 100
            $("#prog" + charDiv[4]).removeAttr("style");
            $("#prog" + charDiv[4]).css("width", charhealthPerc + "%");
            $("#prog" + charDiv[4]).text(charhealthPerc + "%")
            $("#prog" + oppDiv[4]).removeAttr("style");
            $("#prog" + oppDiv[4]).css("width", opphealthPerc + "%");
            $("#prog" + oppDiv[4]).text(opphealthPerc + "%");
            this.attackResult();
            this.winloseTest();     
        },

        attackResult: function() {
            if (character[2] > 0 && opponent[2] > 0) {$("#attackresults").html("Your current health is: " + character[2] +"hp<br>Your attack damage: " + character[0] +"hp<br>Opponents current health is: " + opponent[2] +"hp<br>Opponents attack damage:" + opponent[1] +"hp");
            character[0]=character[0]*2;}
            else  {$("#attackresults").html("");
            character[0]=character[0]*2}
        }
    }

$(document).ready(function () {
    $(document).on('click','.char',function () {
        console.log("I was clicked");
        if (charDiv===undefined) {
            gameContent.backgroundsong.play();
            charDiv = this.id;
            character = gameContent[this.id];
            console.log(character)
            $("#" + this.id).remove().clone().appendTo("#character");
        } else { 
            oppDiv = this.id;
            opponent = gameContent[this.id];
            $("#" + this.id).remove().clone().appendTo("#opponent");
            $("#selectionscreen").hide();
            $("#fightstage").show();
            $(".progress").show();
        }
    });

    $(".attack").click(function () {
        gameContent.attackNow();
    })

    $("#resetl").click(function () {
        $("#" +oppDiv).remove().clone().appendTo("." + oppDiv);
        $("#lose").hide();
        $("#navbar").hide();
        $("#selectionscreen").show();
        $("#selectionscreen .character").show();
        gameContent.characterstartHealth= 0
        gameContent.opponentstartHealth= 0
        gameContent.wins=0
        charDiv=undefined
        oppDiv=undefined
        gameContent.char0 = [5, 4, 40, new Audio ("assets/sound/trex.mp3")]
        gameContent.char1 = [4, 5, 40, new Audio("assets/sound/raptor.mp3")]
        gameContent.char2 = [3, 8, 25, new Audio ("assets/sound/fish.mp3")]
        gameContent.char3 = [5, 9, 40, new Audio("assets/sound/pterodactyl.mp3")]
    })
    
    $("#resetw").click(function () {
        $("#" +charDiv).remove().clone().appendTo("." + charDiv);
        $("#prog" + charDiv[4]).removeAttr("style");
        $("#prog" + charDiv[4]).css("width", "100%");
        $("#prog" + charDiv[4]).text("100%");
        $("#win").hide();
        $("#navbar").hide();
        $("#selectionscreen").show();
        $("#selectionscreen .character").show();
        gameContent.characterstartHealth= 0
        gameContent.opponentstartHealth= 0
        gameContent.wins=0
        charDiv=undefined
        oppDiv=undefined
        gameContent.char0 = [5, 4, 40, new Audio ("assets/sound/trex.mp3")]
        gameContent.char1 = [4, 5, 40, new Audio("assets/sound/raptor.mp3")]
        gameContent.char2 = [3, 8, 40, new Audio ("assets/sound/fish.mp3")]
        gameContent.char3 = [5, 9, 40, new Audio("assets/sound/pterodactyl.mp3")]
    })
})


