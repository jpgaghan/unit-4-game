var charDiv, oppDiv, character, opponent

var gameContent =

    {
        char0: [100, 10, 200, new Audio ("assets/sound/trex.mp3")],
        char1: [4, 5, 40, new Audio("assets/sound/raptor.mp3")],
        char2: [3, 15, 25, new Audio ("assets/sound/fish.mp3")],
        char3: [5, 16, 20, new Audio("assets/sound/pterodactyl.mp3")],
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
                $("#" + oppDiv).remove().clone().appendTo("#opponentwin", "." + oppDiv);
                $("#fightstage").hide();
                $(".progress").hide();
                $("#lose").show();
            } 
            else if (opponent[2]<=0) {
                $("#" + oppDiv).remove().clone().appendTo("." + oppDiv);
                $("#prog" + oppDiv[4]).css("width", "100%");
                $("." + oppDiv).hide();
                $("#fightstage").hide();
                $(".progress").hide();
                this.wins +=1;
                if (this.wins !== 3) {
                $("#selectionscreen").show();
                $(".progress").hide();
                }   else {$("#" + charDiv).remove().clone().appendTo("#characterwin", "." + charDiv);
                        $("#prog" + charDiv[4]).css("width", "100%");
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
            $("#attackresults").html("Your current health is: " + character[2] +"hp<br>Your attack damage: " + character[0] +"hp<br>Opponents current health is: " + opponent[2] +"hp<br>Opponents attack damage:" + opponent[1] +"hp");
            character[0]=character[0]*2;
        }
    }

$(document).ready(function () {
    $(".char").click(function () {
        if (charDiv===undefined) {
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
})


