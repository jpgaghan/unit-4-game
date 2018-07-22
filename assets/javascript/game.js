var charDiv, oppDiv, character, opponent

var gameContent =

    {
        char0: [100, 10, 200],
        char1: [4, 5, 40],
        char2: [3, 15, 25],
        char3: [5, 16, 20],
        wins: 0,
        opponentstartHealth: 0,
        characterstartHealth: 0,

        attackNow: function () {
            this.opponentstartHealth = opponent[2];
            this.characterstartHealth = character[2];
            character[2] = character[2] - opponent[1];
            opponent[2] = opponent[2] - character[0];
            character[0]=character[0]*2;
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

        progressbarCalculation: function(osH, csH) {
            console.log(this.characterstartHealth)
            charhealthPerc = character[2] / this.characterstartHealth * 100;
            charhealthPerc = Math.round(charhealthPerc * 100) / 100
            console.log(charhealthPerc)
            opphealthPerc = opponent[2]/this.opponentstartHealth * 100;
            opphealthPerc = Math.round(opphealthPerc * 100) / 100
            $("#prog" + charDiv[4]).removeAttr("style");
            $("#prog" + charDiv[4]).css("width", charhealthPerc + "%");
            $("#prog" + charDiv[4]).text(charhealthPerc + "%")
            $("#prog" + oppDiv[4]).removeAttr("style");
            $("#prog" + oppDiv[4]).css("width", opphealthPerc + "%");
            $("#prog" + oppDiv[4]).text(opphealthPerc + "%");
            this.winloseTest();     
        },

        attackResult: function() {
            
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


