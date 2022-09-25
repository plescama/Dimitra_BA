//===========================//
//BACHELORARBEIT TSIAPOU 2022//
//===========================//

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------

PennController.AddHost("https://amor.cms.hu-berlin.de/~tsiapoud/BA_DT_Photos/"); // loads pictures from external server

// FOR REAL PARTICIPANTS; check: # of trials, DebugOff, DELETE results file!

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------

//// DEFINE PICK-FUNCTION ==========================================================================================================================================

// This function simply picks a number of trials from a fully randomized set of trials,
// and then picks another chunk of trials from that same set. The trick here is that
// you’ll store the set in a variable, so you can reference it when you call pick again,
// instead of recreating a brand new set with randomize("ListeW").

function Pick(set,n) {
    assert(set instanceof Object, "First argument of pick cannot be a plain string" );
    n = Number(n);
    if (isNaN(n) || n<0) n = 0;
    this.args = [set];
    set.remainingSet = null;
    this.run = function(arrays){
        if (set.remainingSet===null) set.remainingSet = arrays[0];
        const newArray = [];
        for (let i = 0; i < n && set.remainingSet.length; i++)
            newArray.push( set.remainingSet.shift() );
        return newArray;
    }
}
function pick(set, n) { return new Pick(set,n); }

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------

//// SEQUENCE =======================================================================================================================================================
PennController.ResetPrefix(null);
PennController.Sequence("welcome",
                        "demographics",
                        "instructions",
                        "practice_trials",
                        "end_practice",
                        pick(liste=randomize("experimental_trials"), 8),
                        "break1",
                        pick(liste, 8),
                        "attentionCheck1",
                        pick(liste, 8),
                        "break2",
                        pick(liste, 8)
                        "end_exp",
                        "post_quest",
                        "send", 
                        "final")
    
//PennController.DebugOff()

var progressBarText = "Fortschritt";   

//Remove command prefix ============================================================================================================================================

PennController.ResetPrefix(null)
    
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------

/////// WELCOME ====================================================================================================================================================

PennController("welcome",

        defaultText
            .print()
        ,
    
        newText("text1", "<h2>Herzlich willkommen!</h2>")
        .settings.center()
        .settings.css("font-size", "large")
        .settings.css("font-family","times new roman")
        
        ,
        newText("text2", "Danke, dass Du Dir die Zeit nimmst, an diesem Experiment teilzunehmen. Das Experiment ist Teil meiner Bacheloarbeit und wird deswegen nicht vergütet.</br>")
        .settings.center()
        .settings.css("font-size", "large")
        .settings.css("font-family","times new roman")
        ,
        
         newText("text3", "<p>Ich bitte Dich darum, das Experiment nur am <b>PC oder Laptop</b> und in <b>Mozilla Firefox</b> oder <b>Google Chrome</b> auszuf&uuml;hren.")
        .settings.center()
        .settings.css("font-size", "large")
        .settings.css("font-family","times new roman")
         ,
        
        newText("text4", "Wähle einen ruhigen Platz und lass Dich für die nächsten 15 Minuten bitte nicht stören.")
        .settings.center()
        .settings.css("font-size", "large")
        .settings.css("font-family","times new roman")
        ,
    
       newCanvas("empty canvas", 1, 40)
       .print()
        ,
        
         newText("text5", "<p>Humboldt Universit&auml;t zu Berlin, Institut f&uuml;r deutsche Sprache und Linguistik </p>")
        .settings.center()
        .settings.css("font-style","italic")
    .settings.css("font-family","times new roman")
        ,
    
        newButton("button1", "Weiter")
        .settings.css("font-family", "calibri").settings.css("font-size", "12px")
        .settings.center()
        .settings.css("font-family","times new roman")
        .print()
        .wait()
        ,
    
        getText("text1")
        .remove()
        ,
        getText("text2")
        .remove()
        ,
        getText("text3")
        .remove()
        ,
        getText("text4")
        .remove()
        ,
        getText("text5")
        .remove()
        ,
        getButton("button1")
        .remove())
            
.setOption("countsForProgressBar", false)   // no need to see the progress bar in the intro phase
.setOption("hideProgressBar", true);
    
    
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------
   
   //// DEMOGRAPHICS ===============================================================================================================================================

PennController("demographics",
                   newText("demo", "<b>Personenbezogene Daten</b> <p>Ich brauche einige Angaben zu Deiner Person. Diese werden anonymisiert gespeichert und eine spätere Zuordnung zu Dir wird nicht möglich sein. Bitte nimm Dir beim Ausfüllen der Felder Zeit.<p>")              
        .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
               ,
               
               newCanvas("democanvas", 1000,120)
               .settings.add(0,0, getText("demo"))
               .print()
               ,
               
               newText("sex", "1. Geschlecht:")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               
               newDropDown("sex", "Bitte eine Option ausw&auml;hlen")
               .settings.add("Weiblich", "M&auml;nnlich", "Divers")
               .settings.log()
               ,
               
               newCanvas("sexcanvas", 1000, 40)
               .settings.add(0, 0, getText("sex"))
               .settings.add(450,3, getDropDown("sex"))
               .print()
               ,
               
               newCanvas("empty canvas", 1, 40)
              .print()
              ,
               
               newDropDown("age", "Bitte eine Option ausw&auml;hlen")
               .settings.add("18" , "19" , "20", "21" , "22" , "23", "24" , "25" , "26", "27" , "28" , "29", "30" , "31", "32", "33" ,"34", "35", "35+")
               .settings.log()
               ,
               
               newText("agetext", "2. Alter:")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               
               newCanvas("agecanvas", 1000, 40)
               .settings.add(0,0,getText("agetext"))
               .settings.add(450,2, getDropDown("age"))
               .print()
               ,
               
               newCanvas("empty canvas", 1, 40)
              .print()
               , 
        
               newText("Muttersprache", "3. Was ist Deine Muttersprache?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               
               newTextInput("Muttersprache", "")
               .log()
               .size(200, 40)
               .print()
               ,
               
               newCanvas("Muttersprache_canv", 1000, 75)
               .settings.add(0, 40, getText("Muttersprache"))
               .settings.add(680,30, getTextInput("Muttersprache"))
               .print()   
               ,
               
               newCanvas("empty canvas", 1, 40)
              .print()
               ,
               
               newText("bilingual", "4. Bist du bilingual aufgewachsen?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               
               newDropDown("bilingual", "Bitte eine Option ausw&auml;hlen")
               .settings.add("Ja", "Nein")
               .settings.log()
               ,
               
               newCanvas("bilingualcanvas", 1000, 40)
               .settings.add(0, 0, getText("bilingual"))
               .settings.add(450,3, getDropDown("bilingual"))
               .print()
               ,
               
               newCanvas("empty canvas", 1, 40)
               .print()
               ,
             
               newText("Wohnort", "5. Wo wohnst du gerade?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               
               newTextInput("Wohnort", "")
               .log()
               .size(200, 40)
               .print()
               ,
               
               newCanvas("Wohnort_canv", 1000, 75)
               .settings.add(0, 40, getText("Wohnort"))
               .settings.add(680,30, getTextInput("Wohnort"))
               .print()   
               ,
               
               newCanvas("empty canvas", 1, 40)
              .print()
               ,
               
                newText("Sprachenkentnisse", "<b>6. Welche anderen Sprachen sprichst Du und auf welchem Niveau?  </b><br><small>(Skala von 1 = 'schlecht' bis 5 = 'fließend')</small>")
               .settings.css("font-size", "18px")
               ,
               
                newTextInput("Sprachenkentnisse", "")
               .log()
               .size(200, 40)
               .print()
               ,
               
               newCanvas("Sprachenkentnisse_canv", 1000, 75)
               .settings.add(0, 40, getText("Sprachenkentnisse"))
               .settings.add(680,30, getTextInput("Sprachenkentnisse"))
               .print()   
               ,
               
               newCanvas("empty canvas", 1, 40)
              .print()
               ,
              
               newText("Alltag", "<b>7. Welche Sprachen sprichst Du in Deinem Alltag und zu wie viel Prozent? </b><br><small>(Die Summe sollte 100% sein)</small>")
               .settings.css("font-size", "18px")
               ,
               
                newTextInput("Alltag", "")
               .log()
               .size(200, 40)
               .print()
               ,
               
               newCanvas("Alltag_canv", 1000, 75)
               .settings.add(0, 40, getText("Alltag"))
               .settings.add(680,30, getTextInput("Alltag"))
               .print()   
               ,
               
               newCanvas("empty canvas", 1, 40)
               .print()
               ,
               
               newText("deutschkurs", "<b>8. Lernst du noch aktiv Deutsch (z.B. besuchst Du einen Deutschkurs o.Ä.)?</b><br><small>(Wenn nicht, wie lange hast Du Deutsch gelernt?)</small>")
               .settings.css("font-size", "18px")
              ,
               
               newTextInput("current_deutschkurs", "")
               .settings.log()
               .settings.size(200,30)
               .settings.hidden()
               ,
               
               newText("current_deutschkurs_input", "")
               .settings.after(getTextInput("current_deutschkurs"))
               ,
               
               newDropDown("current_deutsch", "Bitte eine Option ausw&auml;hlen")
               .settings.add("Ja", "Nein")
               .settings.log()
               .settings.size(200,40)
               .settings.after(getText("current_deutschkurs_input"))
               .settings.callback(
                   
                   getDropDown("current_deutsch")
                   
                    .test.selected("Ja")
                   .success(getTextInput("current_deutschkurs").settings.hidden())
                   
                   
                   .test.selected("Nein")
                   .success(getTextInput("current_deutschkurs").settings.visible())  
               )
               ,
               
               newCanvas("current_deutschkurs_canvas", 1000, 75)
               .settings.add(0, 40, getText("deutschkurs"))
               .settings.add(680,40, getDropDown("current_deutsch"))
               .print()   
               ,
               
               newCanvas("empty canvas", 1, 40)
               .print()
               ,

                newText("deutschraum", "9. Seit wann lebst Du im deutschsprachigen Raum?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               
               newTextInput("deutschraum", "")
               .log()
               .size(200, 40)
               .print()
               ,
               
               newCanvas("deutschraum_canv", 1000, 75)
               .settings.add(0, 40, getText("deutschraum"))
               .settings.add(680,30, getTextInput("deutschraum"))
               .print()   
               ,
               
               newCanvas("empty canvas", 1, 40)
               .print()
               ,
               
               newDropDown("schwiergkeit", "<br>Bitte eine Option ausw&auml;hlen")
               .settings.add("1" , "2" , "3", "4" , "5" , "6", "7" , "8" , "9", "10")
               .settings.log()
               ,
               
               newText("schwiergkeittext", "<b>10. Wie schwer ist Dir das Deutschlernen gefallen <br> bzw. fällt Dir das Deutschlernen? </b><br><small>(Skala von 1 = 'sehr einfach' bis 10 = 'sehr schwierig')</small> ")
               .settings.css("font-size", "18px")
              ,
               
               newCanvas("schwiergkeitcanvas", 1000, 40)
               .settings.add(0,0,getText("schwiergkeittext"))
               .settings.add(450,2, getDropDown("schwiergkeit"))
               .print()
               ,
               
               newCanvas("empty canvas", 1, 40)
               .print()
               ,
                
               newDropDown("niveau", "<br>Bitte eine Option ausw&auml;hlen")
               .settings.add("A1" , "A2" , "B1", "B2" , "C1" , "C2")
               .settings.log()
               ,
               
               newText("niveautext", "11. Welches ist Dein aktuelles Deutschniveau?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               
               newCanvas("niveaucanvas", 1000, 40)
               .settings.add(0,0,getText("niveautext"))
               .settings.add(450,2, getDropDown("niveau"))
               .print()
               ,
               
               newCanvas("empty canvas", 1, 40)
              .print()
               ,
              
               newButton("continue", "Weiter")
               .settings.css("font-family", "calibri").settings.css("font-size", "12px")
               .settings.center()
               .settings.log()
               .print()
               .wait(
               newFunction('dummy', ()=>true).test.is(true)
           
            // age
            .and( getDropDown("sex").test.selected()
                    .failure( newText('errorsex', "Bitte gib Dein Geschlecht an.").color("red").print() )
           
            // sex
            ).and( getDropDown("age").test.selected()
                    .failure( newText('errorage', "Bitte gib Dein Alter an.").color("red").print() )
            
            // muttersprache
            ).and(getTextInput("Muttersprache").test.printed())
                    .success(getTextInput("Muttersprache")
                        .test.text(/^.*/) // testing if at 0 or more words were written in the input box
                         .failure(
                             newText("Mutterspracheerr","Bitte gib Informationen &uuml;ber Deine Muttersprache an.")
                             .settings.color("red")
                             .print()
                ) //end success
            
            // bilingual
            ) .and( getDropDown("bilingual").test.selected()
                    .failure( newText('errorbilingual', "Bitte gib an, ob Du bilingual oder monolingual aufgewachsen bist.").color("red").print() )
           
            // wohnort
            ).and(getTextInput("Wohnort").test.printed())
                    .success(getTextInput("Wohnort")
                        .test.text(/^.*/) // testing if at 0 or more words were written in the input box
                         .failure(
                             newText("Wohnorterr","Bitte gib Informationen &uuml;ber Deinen Wohnort an.")
                             .settings.color("red")
                             .print()
                ) //end success
                
            // Sprachenkentnisse
             ).and(getTextInput("Sprachenkentnisse").test.printed())
                    .success(getTextInput("Sprachenkentnisse")
                        .test.text(/^.*/) // testing if at 0 or more words were written in the input box
                         .failure(
                             newText("Sprachenkentnisseerr","Bitte gib Informationen &uuml;ber Deine Sprachenkentnisse an.")
                             .settings.color("red")
                             .print()
                ) //end success
                
            // alltag
             ).and(getTextInput("Alltag").test.printed())
                    .success(getTextInput("Alltag")
                        .test.text(/^.*/) // testing if at 0 or more words were written in the input box
                         .failure(
                             newText("Alltagerr","Bitte gib Informationen &uuml;ber die Sprachen, die Du in Deinem Alltag sprichst, an.")
                             .settings.color("red")
                             .print()
                ) //end success
            
            //deutschkurs
             ) .and( getDropDown("current_deutsch").test.selected()
                    .failure( newText('errorcurrentdeutsch', "Bitte gib an, ob Du aktuell Deutsch lernst oder nicht.").color("red").print() )
           
            //deutschraum    
            ).and(
              getTextInput("deutschraum").test.printed()

               .success(getTextInput("deutschraum")
                        .test.text(/^.*/) // testing if at 0 or more words were written in the input box
                         .failure(
                             newText("deutschraumerr","Bitte gib Informationen &uuml;ber Deinen Aufenthalt im deutschsprachigen Raum.")
                             .settings.color("red")
                             .print() )
           
                ) //end success
                
                 //schwiergkeit
             ) .and( getDropDown("schwiergkeit").test.selected()
                    .failure( newText('errorschwierigkeit', "Bitte gib an, wie schwer Dir das Deutschlernen gefallen ist bzw. fällt.").color("red").print() )
           
           //niveau
             ) .and( getDropDown("niveau").test.selected()
                    .failure( newText('errorniveau', "Bitte gib an, welches Dein aktuelles Deutschniveau ist.").color("red").print())
           
                 )  )
    
               ,     
               getDropDown("age").wait("first")
               ,
               getDropDown("sex").wait("first")
               ,
               getDropDown("bilingual").wait("first")
               ,
               getDropDown("current_deutsch").wait("first")
               ,
               getDropDown("schwiergkeit").wait("first")
               ,
               getDropDown("niveau").wait("first")
               ,
    
              
               getButton("continue")
               .remove()
               
               ,
               newText("<p>")
               .print()           
)

.setOption("countsForProgressBar", false)   // no need to see the progress bar in the intro phase
.setOption("hideProgressBar", true);

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------
               
//// INSTRUCTIONS ==================================================================================================================================================
    
        PennController("instructions",

newText("intro", "<p><b>Danke für Deine Antworten!</b><p> "
                        + "In diesem Experiment werden Dir Fotos und die dazugehörigen Wörter angezeigt. Deine Aufgabe besteht darin, <b> so schnell wie möglich</b>, den richtigen definiten Artikel auszuwählen."
                        + "Bitte verwennde dabei <b> keine </b> externe Hilfe! <p><p> "
                        + "Drücke die <b>Leertaste</b> um fortzufahren.<p><p>")
                .settings.css("font-size", "20px")
                ,
                newCanvas("introcanvas",900, 450)
                .settings.add(0,0, getText("intro"))
                .print()   
                ,
                newKey("intro"," ")
                .wait()
                ,
                getCanvas("introcanvas")
                .remove()
                ,
                newTimer("intro", 500)
                .start()
                .wait()
                ,                
                newText("set-up", "<p>Das Experiment dauert ungefähr <b>15 Minuten</b>. Lass Dich während dieser Zeit bitte nicht ablenken. Sobald Du auf die Leertaste drückst, wechselt Dein Bildschirm in den Vollbildmodus. Behalte diesen bitte für die <br>Dauer des Experiments bei.")
                .settings.css("font-size", "20px")
                ,
                newCanvas("set-upcanvas",900, 450)
                .settings.add(0,0, getText("set-up"))
                .print()   
                ,
                newKey("set-up"," ")
                .wait()
                ,     
                fullscreen()
                ,
                getCanvas("set-upcanvas")
                .remove()
                ,
                newTimer("intro", 1500)
                .start()
                .wait()
                , 
                
                newText("intro1", "Weil <b>dies ein Experiment ist,</b> bitte ich Dich, folgende Schritte einzuhalten, um Deine Konzentration zu gew&auml;hrleisten: <p><t>&nbsp;&nbsp;&nbsp;&bull;  <b>Schalte jegliche Musik/Audio aus</b>, die Du vielleicht h&ouml;rst.<p>&nbsp;&nbsp;&nbsp;&bull;  <b>Verzichte darauf, w&auml;hrend des Experiments zu chatten</b> oder anderweitig zu multitasken.<p><t>&nbsp;&nbsp;&nbsp;&bull;  Stell Dein <b>Handy auf lautlos</b> und lass es mit dem Bildschirm nach unten oder au&szlig;er Reichweite liegen.<p><t>&nbsp;&nbsp;&nbsp;&bull;  K&uuml;mmere Dich um das Experiment, bis es vorbei ist (es gibt kurze Pausen).<p><t>&nbsp;&nbsp;&nbsp;&bull;  Verhalte Dich generell so, als w&auml;rst Du im Labor! <p>Diese Schritte werden dazu beitragen, dass die Daten, die ich von Dir sammel, von hoher Qualit&auml;t sind. Bitte <b>drücke <i>die Leertaste</i></b>, wenn Du diesen Schritten zustimmst.")
                .settings.css("font-size", "20px")
                ,
                newCanvas("introcanvas1",900, 450)
                .settings.add(0,0, getText("intro1"))
                .print()   
                ,
                newKey("intro1"," ")
                .wait()
                ,
                getCanvas("introcanvas1")
                .remove()
                ,
                
                newText("comp1_1", "<p>Das folgende Experiment besteht aus 3 Teilen: eine kurze &Uuml;bungsrunde, das tats&auml;chliche Experiment und ein Post-Experiment Fragebogen:</b>")
                .settings.css("font-size", "20px")
                ,        
                newText("comp1_2", "Bitte lege Deine Finger auf <b>F</b>, <b>J</b> und die <b>Leertaste</b>."
                        + "<p> Drücke <b>F</b>, wenn Du denkst, dass der richtige definite Artikel <b>DER</b> ist."
                        + "<p>Drücke <b>J</b>, wenn Du denkst, dass der richtige definite Artikel <b>DIE</b> ist. "
                        + "<p>Drücke die <b>Leertaste</b>, wenn Du denkst, dass der richtige definite Artikel <b>DAS</b> ist.")
                .settings.css("font-size", "20px")
                ,
                newCanvas("compCanv", 1000, 450)
                .settings.add(0,0, getText("comp1_1"))
                .settings.add(0,100, getText("comp1_2")  )
                .print()   
                ,
                newButton("compStart", "Zur Übungsrunde!")
                .settings.center()
                .print()
                .wait()
               )
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true)
        
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------        
        
///// PRACTICE TRIALS===============================================================================================================================================

        
PennController("practice_trials"
,

newText("instruct1", "<i>Bitte drücke 'F' für 'DER', 'J' für 'DIE' oder die 'Leertaste' für 'DAS'</i>")
.settings.css ("font-size", "20px")
.settings.center()
.settings.css("font-family","courrier")
.print("center at 50%", "middle at 18%")
,

newImage("trial1", "trial1.jpg")
.size(400, 400)
.css("border", "solid 1px black")
.print("center at 50%", "middle at 45%")
,
newText("noun1", "<b>Frau</b>")
.settings.css ("font-size", "50px")
.settings.center()
.settings.css("font-family","courrier")
.print("center at 50%", "middle at 73%")
    ,
    
           newText("F_text1", "<b>'F'</b>")
           .settings.css("font-size", "24px")
           .settings.color("blue")
           .print("center at 40%", "middle at 80%")
                    ,
    
                    newText("der_text1", "<b>DER</b>")
                    .settings.css("font-size", "24px")
                    .settings.color("blue")
                    .print("center at 40%", "middle at 84%")
                    ,
    
                    newText("J_text1", "<b>'J'</b>")
                   .settings.css("font-size", "24px")
                   .settings.color("red")
                   .print("center at 50%", "middle at 80%")
                    ,
    
                    newText("die_text1", "<b>DIE</b>")
                    .settings.css("font-size", "24px")
                    .settings.color("red")
                    .print("center at 50%", "middle at 84%")
                     ,
    
            newText("spacebar_text1", "<b>'___'</b>")
           .settings.css("font-size", "24px")
           .settings.color("green")
           .print("center at 60%", "middle at 80%")
            ,
    
                    newText("das_text1", "<b>DAS</b>")
                    .settings.css("font-size", "24px")
                    .settings.color("green")
                    .print("center at 60%", "middle at 84%")
                     ,                  

      newKey("key1","FJ"," ")
      .callback( getTimer("time_out1").stop() )
      .log("all")
       ,
    
                    newTimer("time_out1", 5000)
                    .start()
                    .log()
                    .wait()
                    ,
                    

// clear everything

getText("instruct1")
.remove(),
getImage("trial1")
.remove(),
getText("noun1")
.remove(),
getText("F_text1")
.remove(),
getText("der_text1")
.remove(),
getText("J_text1")
.remove(),
getText("die_text1")
.remove(),
getText("spacebar_text1")
.remove(),
getText("das_text1")
.remove(),


      getKey("key1")
     .test.pressed()
                    .failure(
                    newText("time-out1", "Hoppla! Sei bitte schneller!")
                    .settings.css("font-size", "20px")
                    .settings.css("font-family","courier")
                    .settings.color("red")
                    .settings.center()
                    .print("40vh"))
                      ,

                     newText("continue_1", "<i>Dr&uuml;cke die Leertaste um fortzufahren</i>")
                      .settings.css("font-size", "23px")
                      .settings.css("font-family","courier")
                      .print("center at 50%", "middle at 50%")
                     ,
                      newKey("Continue1", " ")
                      .wait()
                      .log(),
    
getKey("key1")
.remove,
getText("time-out1") 
.remove,                      
getText("continue_1")
.remove,

newText("instruct2", "<i>Bitte drücke 'F' für 'DER', 'J' für 'DIE' oder die 'Leertaste' für 'DAS'</i>")
.settings.css ("font-size", "20px")
.settings.center()
.settings.css("font-family","courrier")
.print("center at 50%", "middle at 18%")
,

newImage("trial2", "trial2.jpg")
.size(400, 400)
.css("border", "solid 1px black")
.print("center at 50%", "middle at 45%")
,
newText("noun2", "<b>Mann</b>")
.settings.css ("font-size", "50px")
.settings.center()
.settings.css("font-family","courrier")
.print("center at 50%", "middle at 73%")
    ,
    
newText("F_text2", "<b>'F'</b>")
           .settings.css("font-size", "24px")
           .settings.color("blue")
           .print("center at 40%", "middle at 80%")
           
                    ,
                    newText("der_text2", "<b>DER</b>")
                    .settings.css("font-size", "24px")
                    .settings.color("blue")
                    .print("center at 40%", "middle at 84%")
                    ,
                    newText("J_text2", "<b>'J'</b>")
           .settings.css("font-size", "24px")
           .settings.color("red")
           .print("center at 50%", "middle at 80%")
           
                    ,
                    newText("die_text2", "<b>DIE</b>")
                    .settings.css("font-size", "24px")
                    .settings.color("red")
                    .print("center at 50%", "middle at 84%")
        ,
        newText("spacebar_text2", "<b>'___'</b>")
           .settings.css("font-size", "24px")
           .settings.color("green")
           .print("center at 60%", "middle at 80%")
           
                    ,
                    newText("das_text2", "<b>DAS</b>")
                    .settings.css("font-size", "24px")
                    .settings.color("green")
                    .print("center at 60%", "middle at 84%")
  ,                  

 newKey("key2","FJ"," ")
      .callback( getTimer("time_out2").stop() )
                    .log("all")
                    ,
                    newTimer("time_out2", 5000)
                    .start()
                    .log()
                    .wait()
                    ,
                    

// clear everything

getText("instruct2")
.remove(),
getImage("trial2")
.remove(),
getText("noun2")
.remove(),
getText("F_text2")
.remove(),
getText("der_text2")
.remove(),
getText("J_text2")
.remove(),
getText("die_text2")
.remove(),
getText("spacebar_text2")
.remove(),
getText("das_text2")
.remove(),


      getKey("key2")
     .test.pressed()
                    .failure(
                    newText("time-out2", "Hoppla! Sei bitte schneller!")
                    .settings.css("font-size", "20px")
                    .settings.css("font-family","courier")
                    .settings.color("red")
                    .settings.center()
                    .print("40vh"))
                      ,

                     newText("continue_2", "<i>Dr&uuml;cke die Leertaste um fortzufahren</i>")
                      .settings.css("font-size", "23px")
                      .settings.css("font-family","courier")
                      .print("center at 50%", "middle at 50%")
                     ,
                      newKey("Continue2", " ")
                      .wait()
                      .log(),
getKey("key2")
.remove,
getText("time-out2") 
.remove,
getText("continue_2")
.remove,

newText("instruct3", "<i>Bitte drücke 'F' für 'DER', 'J' für 'DIE' oder die 'Leertaste' für 'DAS'</i>")
.settings.css ("font-size", "20px")
.settings.center()
.settings.css("font-family","courrier")
.print("center at 50%", "middle at 18%")
,

newImage("trial3", "trial3.jpg")
.size(400, 400)
.css("border", "solid 1px black")
.print("center at 50%", "middle at 45%")
,
newText("noun3", "<b>Kind</b>")
.settings.css ("font-size", "50px")
.settings.center()
.settings.css("font-family","courrier")
.print("center at 50%", "middle at 73%")
    ,
    
newText("F_text3", "<b>'F'</b>")
           .settings.css("font-size", "24px")
           .settings.color("blue")
           .print("center at 40%", "middle at 80%")
           
                    ,
                    newText("der_text3", "<b>DER</b>")
                    .settings.css("font-size", "24px")
                    .settings.color("blue")
                    .print("center at 40%", "middle at 84%")
                    ,
                    newText("J_text3", "<b>'J'</b>")
           .settings.css("font-size", "24px")
           .settings.color("red")
           .print("center at 50%", "middle at 80%")
           
                    ,
                    newText("die_text3", "<b>DIE</b>")
                    .settings.css("font-size", "24px")
                    .settings.color("red")
                    .print("center at 50%", "middle at 84%")
        ,
        newText("spacebar_text3", "<b>'___'</b>")
           .settings.css("font-size", "24px")
           .settings.color("green")
           .print("center at 60%", "middle at 80%")
           
                    ,
                    newText("das_text3", "<b>DAS</b>")
                    .settings.css("font-size", "24px")
                    .settings.color("green")
                    .print("center at 60%", "middle at 84%")
  ,                  

 newKey("key3","FJ"," ")
      .callback( getTimer("time_out3").stop() )
                    .log("all")
                    ,
                    newTimer("time_out3", 5000)
                    .start()
                    .log()
                    .wait()
                    ,
                    

// clear everything

getText("instruct3")
.remove(),
getImage("trial3")
.remove(),
getText("noun3")
.remove(),
getText("F_text3")
.remove(),
getText("der_text3")
.remove(),
getText("J_text3")
.remove(),
getText("die_text3")
.remove(),
getText("spacebar_text3")
.remove(),
getText("das_text3")
.remove(),


      getKey("key3")
     .test.pressed()
                    .failure(
                    newText("time-out3", "Hoppla! Sei bitte schneller!")
                    .settings.css("font-size", "20px")
                    .settings.css("font-family","courier")
                    .settings.color("red")
                    .settings.center()
                    .print("40vh"))
                      ,

                     newText("continue_3", "<i>Dr&uuml;cke die Leertaste um fortzufahren</i>")
                      .settings.css("font-size", "23px")
                      .settings.css("font-family","courier")
                      .print("center at 50%", "middle at 50%")
                     ,
                      newKey("Continue3", " ")
                      .wait()
                      .log(),
getKey("key3")
.remove,
getText("time-out3") 
.remove,
getText("continue_3")
.remove);

// -----------------------------------------------------------------------------------------------------------------------------------------------------------                      

//// END OF PRACTICE==========================================================================================================================================

PennController( "end_practice" ,
                
                newText("end_practice", "<p> <i>Das ist das Ende der &Uuml;bungsphase! Das Experiment beginnt, sobald Du die Leertaste dr&uuml;ckst!</i> </p>")
                .settings.css("font-family","times new roman") .settings.css("font-size", "25px")
                .settings.center()
                .print()
                
                ,
                
                newKey("end_pract", " ")
                .wait()
                .log()
                ,  
                
                getText("end_practice")
                .remove()
                
               )   
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);


// -----------------------------------------------------------------------------------------------------------------------------------------------------------                      

//// EXPERIMENTAL TRIALS=======================================================================================================================================


PennController.Template( PennController.GetTable( "List_Items.csv")
                         .filter("trial_type", "Experimental")
                         ,
                         variable => ["experimental_trials",
                                      "PennController", PennController(
                                          defaultText
                                          .settings.css("font-family","courier")
                                          ,
                                          
                          newText("instruct", "<i>Bitte drücke 'F' für 'DER', 'J' für 'DIE' oder die 'Leertaste' für 'DAS'</i>")
.settings.css ("font-size", "20px")
.settings.center()
.settings.css("font-family","courrier")
.print("center at 50%", "middle at 18%")
,

newImage("photo", variable.file_name)
.size(400, 400)
.css("border", "solid 1px black")
.print("center at 50%", "middle at 45%")
,
newText("noun", variable.noun)
.settings.css ("font-size", "50px")
.settings.center()
.settings.css("font-family","courrier")
.print("center at 50%", "middle at 73%")
    ,
    
           newText("F_text", "<b>'F'</b>")
           .settings.css("font-size", "24px")
           .settings.color("blue")
           .print("center at 40%", "middle at 80%")
                    ,
    
                    newText("der_text", "<b>DER</b>")
                    .settings.css("font-size", "24px")
                    .settings.color("blue")
                    .print("center at 40%", "middle at 84%")
                    ,
    
                    newText("J_text", "<b>'J'</b>")
                   .settings.css("font-size", "24px")
                   .settings.color("red")
                   .print("center at 50%", "middle at 80%")
                    ,
    
                    newText("die_text", "<b>DIE</b>")
                    .settings.css("font-size", "24px")
                    .settings.color("red")
                    .print("center at 50%", "middle at 84%")
                     ,
    
            newText("spacebar_text", "<b>'___'</b>")
           .settings.css("font-size", "24px")
           .settings.color("green")
           .print("center at 60%", "middle at 80%")
            ,
    
                    newText("das_text", "<b>DAS</b>")
                    .settings.css("font-size", "24px")
                    .settings.color("green")
                    .print("center at 60%", "middle at 84%")
                     ,                  

      newKey("key","FJ"," ")
      .callback( getTimer("time_out").stop() )
      .log("all")
       ,
    
                    newTimer("time_out", 5000)
                    .start()
                    .log()
                    .wait()
                    ,
                                          
      newVar("key") // this will create a new variable "rating"
                                         
      .set(getKey("key") ),
                  

// clear everything

getText("instruct")
.remove(),
getImage("trial")
.remove(),
getText("noun")
.remove(),
getText("F_text")
.remove(),
getText("der_text")
.remove(),
getText("J_text")
.remove(),
getText("die_text")
.remove(),
getText("spacebar_text")
.remove(),
getText("das_text")
.remove(),


      getKey("key")
     .test.pressed()
                    .failure(
                    newText("time-out", "Hoppla! Sei bitte schneller!")
                    .settings.css("font-size", "20px")
                    .settings.css("font-family","courier")
                    .settings.color("red")
                    .settings.center()
                    .print("40vh"))
                      ,

                     newText("continue_", "<i>Dr&uuml;cke die Leertaste um fortzufahren</i>")
                      .settings.css("font-size", "23px")
                      .settings.css("font-family","courier")
                      .print("center at 50%", "middle at 50%")
                     ,
                      newKey("Continue1", " ")
                      .wait()
                      .log(),
    
getKey("key")
.remove(),
getText("time-out")
.remove(),                      
getText("continue_")
.remove()
)

                                              
                                      .log("item_id", variable.item_id)
                                      .log("item_type", variable.item_type)
                                      .log("trial_type",variable.trial_type)
                                      .log("noun",variable.noun)
                                      .log("article_correct",variable.article)
                                      .log("regular",variable.regular)
                                      .log("greek_congruent",variable.greek)
                                      .log("photo", variable.file_name)
                                      .log("key", variable.key)
                                      
                                      ]
                                      );

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------                          
              
//// BREAKS=========================================================================================================================================================
 

// Break 1
PennController( "break1" ,
                newText("break_text", "<p><b>Zeit f&uuml;r eine kleine Pause!</b> <br><p>Dr&uuml;cke die Leertaste, um fortzufahren, oder entspann Dich und nimm kurz die Augen vom Bildschirm.<br><p><b>Das Experiment geht nach 20 Sekunden automatisch weiter.</br></b><p>")
                .settings.css("font-family","times new roman") .settings.css("font-size", "20px")
                .settings.center()
                .print()    
                ,
                newTimer("break_timer", 20000)
                .start()                
                ,
                newKey("continue_exp", " ")                 
                .callback( getTimer("break_timer").stop() )   
                ,
                getTimer("break_timer")
                .wait("first")
                ,
                getText("break_text")
                .remove()                
                ,
                getKey("continue_exp")
                .remove()   
                ,
                newText("instructions_key2", "<br>Drücke die Leertaste, um mit dem Experiment fortzufahren.</br>")
                .settings.css("font-family","times new roman") .settings.css("font-size", "20px")
                .settings.center()
                .print()
                ,
                newKey("continue_Ja", " ")
                .wait()
                ,  
                getText("instructions_key2")
                .remove()                  
                ,
                newTimer(1000)
                .start()
                .wait()             
               )    
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

PennController( "break2" ,
                newText("break_text", "<p><b>Fast geschafft, Zeit f&uuml;r eine kleine Pause!</b> <br><p>Dr&uuml;cke die Leertaste, um fortzufahren, oder entspann Dich und nimm kurz die Augen vom Bildschirm.<br><p><b>Das Experiment geht nach 20 Sekunden automatisch weiter.</br></b><p>")
                .settings.css("font-family","times new roman") .settings.css("font-size", "20px")
                .settings.center()
                .print()    
                ,
                newTimer("break_timer", 20000)
                .start()                
                ,
                newKey("continue_exp", " ")                 
                .callback( getTimer("break_timer").stop() )   
                ,
                getTimer("break_timer")
                .wait("first")
                ,
                getText("break_text")
                .remove()                
                ,
                getKey("continue_exp")
                .remove()   
                ,
                newText("instructions_key2", "<br>Drücke die Leertaste, um mit dem Experiment fortzufahren.</br>")
                .settings.css("font-family","times new roman") .settings.css("font-size", "20px")
                .settings.center()
                .print()
                ,
                newKey("continue_Ja", " ")
                .wait()
                ,  
                getText("instructions_key2")
                .remove()                  
                ,
                newTimer(1000)
                .start()
                .wait()             
               )    
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------

//// ATTENTIONCHECK=================================================================================================================================================


//  Attentioncheck 1
PennController("attentionCheck1",
    newText("attentionCheck1", "Bitte w&auml;hle auf der untenstehenden </br>Skala fünfzehn aus:")
    .settings.center()
    .settings.css("font-family","times new roman") .settings.css("font-size", "20px")
    .print()
   
     ,
    
    newCanvas("empty canvas", 1, 30)
          .print()
    ,
               
     newScale("attentionslider1","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40" ,"41","42","43","44","45","46","47","48","49", "50")
.settings.center()
.settings.size (1100)
.settings.labelsPosition("bottom")
.print()
.settings.log()
.wait()
    ,

newCanvas("empty canvas", 1, 40)
          .print()
    ,
               
     newButton("okay", "Best&auml;tigen")
        .settings.css("font-family", "calibri").settings.css("font-size", "12px")
        .settings.center()
        .print()
        .wait()
        .remove()
    ,
   
    getText("attentionCheck1")
        .remove()
    ,   
    getScale("attentionslider1")
        .remove()
    
    );                          
                          
                          
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------        
       
//// END OF THE EXPERIMENT==========================================================================================================================================


 //// END OF THE EXPERIMENT==========================================================================================================================================


PennController("end_exp" ,
                newText("end_exp","<p> Das ist das Ende der Experimentphase! Als n&auml;chstes kommt einen kurzen Post-Experiment Fragebogen. </p>")
                .settings.css("font-family","times new roman") .settings.css("font-size", "25px")
                .settings.center()
                .print()
                
                ,
                
                newKey("end_exp", " ")
                .wait()
                .log()
                ,  
                
                getText("end_exp")
                .remove())
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------        
       
//// POST-EXPERIMENT QUESTIONNAIRE==========================================================================================================================================
   
                          
     PennController("post_quest",
  
              newText("unbekannte", "<b>1. Gab es unbekannte Wörter? Wenn ja, welche? </b><br><small>(Falls Du Dich erinnern kannst.)</small>")
               .settings.css("font-size", "18px")

               ,
               newTextInput("unbekannte_wörter", "")
               .settings.log()
               .settings.size(200,30)
               .settings.hidden()
               ,
               newText("unbekannte_wörter_input", "")
               .settings.after(getTextInput("unbekannte_wörter"))
               ,
               newDropDown("unbekannte_w", "Bitte eine Option ausw&auml;hlen")
               .settings.add("Ja", "Nein")
               .settings.log()
               .settings.after(getText("unbekannte_wörter_input"))
               .settings.callback(
                   
                   getDropDown("unbekannte_w")
                   
                   .test.selected("Ja")
                   .success(getTextInput("unbekannte_wörter").settings.visible())
                   
                    .test.selected("Nein")
                   .success(getTextInput("unbekannte_wörter").settings.hidden())
                  
               )
               ,
               newCanvas("unbekannte_wörter_canvas", 1000, 75)
               .settings.add(0, 40, getText("unbekannte"))
               .settings.add(680,40, getDropDown("unbekannte_w"))
               .print("center at 50%", "middle at 30%")
               ,
               
               newText("strategien", "2. Welche Strategien – falls zutreffend – hast Du während des Experiments verwendet?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newTextInput("strategien", "")
               .log()
               .size(200, 40)
               .print()
               ,
               newCanvas("strategien_canv", 1000, 75)
               .settings.add(0, 40, getText("strategien"))
               .settings.add(680,30, getTextInput("strategien"))
               .print("center at 50%", "middle at 50%")
               ,   
                    
                    
                 newText("kommentare", "3. Hast Du weitere Kommentare bzw. Anmerkungen zum Experiment?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newTextInput("kommentare", "")
               .log()
               .size(200, 40)
               .print()
               ,
               newCanvas("kommentare_canv", 1000, 75)
               .settings.add(0, 40, getText("kommentare"))
               .settings.add(680,30, getTextInput("kommentare"))
               .print("center at 50%", "middle at 70%")
               ,  

 getDropDown("unbekannte_w").wait("first"),
           
      newButton("next4", "Weiter")
               .settings.css("font-family", "calibri").settings.css("font-size", "12px")
               .settings.center()
               .print("center at 50%", "middle at 85%")
               .wait());   
            

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------        
       
//// SEND============================================================================================================================================================


PennController.SendResults( "send" ); // send results to the server before participants see the actual end of the experiment
                          
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------        
       
//// FINAL===========================================================================================================================================================
       
                 
     PennController("final",
        newText("<p>Vielen Dank f&uuml;r Deine Teilnahme! Die Studie ist hiermit beendet. </p>")
            .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
            .settings.center()
            .print()
        ,
  
        newText ("<p>Du kannst das Fenster jetzt schließen.")
            .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
            .settings.center()
            .print()
        ,
        newButton("void")
            .wait()
   )   
         
