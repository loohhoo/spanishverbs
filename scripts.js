$(document).ready(function() {

	$("#show-verbs").click(function() {
		var verbs = [];
		$.getJSON("http://people.emich.edu/lhicks16/spanishapp/verbs.json", function(data) {
			$.each(data.verblist, function() {
				var This = this;
				verbs.push(this.infinitive);
			});
		}).promise().done(function() {
				verbs.sort();
				for(var i = 0; i < verbs.length-1; i++) {
					$("#verbs").append("<li class='verb'>"+verbs[i]+"</li>");

					$("li .verb").click(function() {
						alert("hi");
					});
				}
		});
	});



	$("#search").click(function() {
		var searchItem = ($("#search-item").val()).toLowerCase();
		var foundItem = false;
		$.getJSON("http://people.emich.edu/lhicks16/spanishapp/verbs.json", function(data) {
			$.each(data.verblist, function() {	
				var This = this;
				var infinitive = This.infinitive;
				var english = This.english;
				if(infinitive == searchItem) {
					foundItem = true;
					$(".yo, .tu, .el, .nosotros, .vosotros, .ellos").removeClass("irr");
					var regular = This.regular;
					var vType = This.type; 
					var stem = This.stem;
					var cfstem = This.cfstem;
					var flags = This.flags;

					var present = This.present;
					var preterite = This.preterite;
					var imperfect = This.imperfect;
					var future = This.future;
					var conditional = This.conditional;
					var subjunctivepresent = This.subjunctivepresent;
					var subjunctivera = This.subjunctivera;
					var subjunctivese = This.subjunctivese;
					var subjunctivefuture = This.subjunctivefuture;
					var imperative = This.imperative;
					var notes = This.notes;

					var presentparticiple;
					var pastparticiple;

					$("#english").html(english);

					if(notes != undefined) {
						$(".note").html("<ul>");
						for(var i = 0; i < notes.length; i++) {
							$(".note").append("<li>"+notes[i]+"</li>");
						}
						$(".note").append("</ul>");
					}

					//Define the present participle
					//Does it exist in the file?

					if(This.presentparticiple != undefined) {
						presentparticiple = This.presentparticiple;
					}

					//Regular present participle, generate
					else {
						if(vType == "ar") {
							presentparticiple = stem+"ando";
						}

						else if(vType == "er" || vType == "ir") {
							presentparticiple = stem+"iendo";
						}
					}

					//Define the past participle
					//Does it exist in the file? 

					if(This.pastparticiple != undefined) {
						pastparticiple = This.pastparticiple;
					}

					//Regular past participle, generate
					else {
						if(vType == "ar") {
							pastparticiple = stem+"ado";
						}

						else if(vType == "er" || vType == "ir") {
							pastparticiple = stem+"ido";
						}
					}

					if(regular != "regular") {		
						
						if(regular == "o>ue" || regular == "e>ie" || regular == "e>i" || regular == "ser" || regular == "estar") {
							$("#present .yo").html("<span class='irr'>"+present[0].yo+"</span>");
							$("#present .tu").html("<span class='irr'>"+present[0].tu+"</span>");
							$("#present .el").html("<span class='irr'>"+present[0].el+"</span>");
							$("#present .nosotros").html(present[0].nosotros);
							$("#present .vosotros").html(present[0].vosotros);
							$("#present .ellos").html("<span class='irr'>"+present[0].ellos+"</span>");
						
							if(vType == "ir") {
								$("#preterite .yo").html(preterite[0].yo);
								$("#preterite .tu").html(preterite[0].tu);
								$("#preterite .el").html("<span class='irr'>"+preterite[0].el+"</span>");
								$("#preterite .nosotros").html(preterite[0].nosotros);
								$("#preterite .vosotros").html(preterite[0].vosotros);
								$("#preterite .ellos").html("<span class='irr'>"+preterite[0].ellos+"</span>");

								$("#subjunctive-imperfect-ra .yo").html("<span class='irr'>"+subjunctivera[0].yo+"</span>");
							$("#subjunctive-imperfect-ra .tu").html("<span class='irr'>"+subjunctivera[0].tu+"</span>");
							$("#subjunctive-imperfect-ra .el").html("<span class='irr'>"+subjunctivera[0].el+"</span>");
							$("#subjunctive-imperfect-ra .nosotros").html("<span class='irr'>"+subjunctivera[0].nosotros+"</span>");
							$("#subjunctive-imperfect-ra .vosotros").html("<span class='irr'>"+subjunctivera[0].vosotros+"</span>");
							$("#subjunctive-imperfect-ra .ellos").html("<span class='irr'>"+subjunctivera[0].ellos+"</span>");

							$("#subjunctive-imperfect-se .yo").html("<span class='irr'>"+subjunctivese[0].yo+"</span>");
							$("#subjunctive-imperfect-se .tu").html("<span class='irr'>"+subjunctivese[0].tu+"</span>");
							$("#subjunctive-imperfect-se .el").html("<span class='irr'>"+subjunctivese[0].el+"</span>");
							$("#subjunctive-imperfect-se .nosotros").html("<span class='irr'>"+subjunctivese[0].nosotros+"</span>");
							$("#subjunctive-imperfect-se .vosotros").html("<span class='irr'>"+subjunctivese[0].vosotros+"</span>");
							$("#subjunctive-imperfect-se .ellos").html("<span class='irr'>"+subjunctivese[0].ellos+"</span>");

							$("#subjunctive-future .yo").html("<span class='irr'>"+subjunctivefuture[0].yo+"</span>");
							$("#subjunctive-future .tu").html("<span class='irr'>"+subjunctivefuture[0].tu+"</span>");
							$("#subjunctive-future .el").html("<span class='irr'>"+subjunctivefuture[0].el+"</span>");
							$("#subjunctive-future .nosotros").html("<span class='irr'>"+subjunctivefuture[0].nosotros+"</span>");
							$("#subjunctive-future .vosotros").html("<span class='irr'>"+subjunctivefuture[0].vosotros+"</span>");
							$("#subjunctive-future .ellos").html("<span class='irr'>"+subjunctivefuture[0].ellos+"</span>");


							$(".present-participle").html("<span class='irr'>"+presentparticiple+"</span>");

							$(".past-participle").html(pastparticiple);

							}

							else if(vType == "ar" || vType == "er") {
								$("#preterite .yo").html(preterite[0].yo);
								$("#preterite .tu").html(preterite[0].tu);
								$("#preterite .el").html(preterite[0].el);
								$("#preterite .nosotros").html(preterite[0].nosotros);
								$("#preterite .vosotros").html(preterite[0].vosotros);
								$("#preterite .ellos").html(preterite[0].ellos);

								$("#gerund")

								if(subjunctivera != undefined) {
									$("#subjunctive-imperfect-ra .yo").html(subjunctivera[0].yo);
									$("#subjunctive-imperfect-ra .tu").html(subjunctivera[0].tu);
									$("#subjunctive-imperfect-ra .el").html(subjunctivera[0].el);
									$("#subjunctive-imperfect-ra .nosotros").html(subjunctivera[0].nosotros);
									$("#subjunctive-imperfect-ra .vosotros").html(subjunctivera[0].vosotros);
									$("#subjunctive-imperfect-ra .ellos").html(subjunctivera[0].ellos);
								}

								else {
									$("#subjunctive-imperfect-ra .yo").html(stem + "ara");
									$("#subjunctive-imperfect-ra .tu").html(stem + "aras");
									$("#subjunctive-imperfect-ra .el").html(stem + "ara");
									$("#subjunctive-imperfect-ra .nosotros").html(stem + "áramos");
									$("#subjunctive-imperfect-ra .vosotros").html(stem + "arais");
									$("#subjunctive-imperfect-ra .ellos").html(stem + "aran");
								}

								if(subjunctivese != undefined) {	
									$("#subjunctive-imperfect-se .yo").html(subjunctivese[0].yo);
									$("#subjunctive-imperfect-se .tu").html(subjunctivese[0].tu);
									$("#subjunctive-imperfect-se .el").html(subjunctivese[0].el);
									$("#subjunctive-imperfect-se .nosotros").html(subjunctivese[0].nosotros);
									$("#subjunctive-imperfect-se .vosotros").html(subjunctivese[0].vosotros);
									$("#subjunctive-imperfect-se .ellos").html(subjunctivese[0].ellos);
								}

								else {
									$("#subjunctive-imperfect-se .yo").html(stem + "ase");
									$("#subjunctive-imperfect-se .tu").html(stem + "ases");
									$("#subjunctive-imperfect-se .el").html(stem + "ase");
									$("#subjunctive-imperfect-se .nosotros").html(stem + "ásemos");
									$("#subjunctive-imperfect-se .vosotros").html(stem + "aseis");
									$("#subjunctive-imperfect-se .ellos").html(stem + "asen");
								}
							
								if(subjunctivefuture != undefined) {
									$("#subjunctive-future .yo").html(subjunctivefuture[0].yo);
									$("#subjunctive-future .tu").html(subjunctivefuture[0].tu);
									$("#subjunctive-future .el").html(subjunctivefuture[0].el);
									$("#subjunctive-future .nosotros").html(subjunctivefuture[0].nosotros);
									$("#subjunctive-future .vosotros").html(subjunctivefuture[0].vosotros);
									$("#subjunctive-future .ellos").html(subjunctivefuture[0].ellos);
								}

								else {
									$("#subjunctive-future .yo").html(stem + "are");
									$("#subjunctive-future .tu").html(stem + "ares");
									$("#subjunctive-future .el").html(stem + "are");
									$("#subjunctive-future .nosotros").html(stem + "áremos");
									$("#subjunctive-future .vosotros").html(stem + "areis");
									$("#subjunctive-future .ellos").html(stem + "aren");
								}

								$(".present-participle").html(presentparticiple);
								$(".past-participle").html(pastparticiple);

								if(flags != undefined) {
									if(flags[0].zar == "zar") {
										$("#preterite .yo").addClass("irr");
									}
								}
							}
						
							$("#subjunctive-present .yo").html("<span class='irr'>"+subjunctivepresent[0].yo+"</span>");
							$("#subjunctive-present .tu").html("<span class='irr'>"+subjunctivepresent[0].tu+"</span>");
							$("#subjunctive-present .el").html("<span class='irr'>"+subjunctivepresent[0].el+"</span>");
							$("#subjunctive-present .nosotros").html("<span class='irr'>"+subjunctivepresent[0].nosotros+"</span>");
							$("#subjunctive-present .vosotros").html("<span class='irr'>"+subjunctivepresent[0].vosotros+"</span>");
							$("#subjunctive-present .ellos").html("<span class='irr'>"+subjunctivepresent[0].ellos+"</span>");

							
							$("#imperative .tu").html("<span class='irr'>"+imperative[0].tu+"</span>");
							$("#imperative .el").html("<span class='irr'>"+imperative[0].el+"</span>");
							$("#imperative .nosotros").html("<span class='irr'>"+imperative[0].nosotros+"</span>");
							$("#imperative .vosotros").html(imperative[0].vosotros);
							$("#imperative .ellos").html("<span class='irr'>"+imperative[0].ellos+"</span>");

							if(regular == "estar") {
								$("#imperative .nosotros span, #subjunctive-present .nosotros span, #subjunctive-present .vosotros span, .present-participle span").removeClass("irr");
							}
						}
						
						
						$("#future .yo").html(cfstem + "é");
						$("#future .tu").html(cfstem + "ás");
						$("#future .el").html(cfstem + "á");
						$("#future .nosotros").html(cfstem + "emos");
						$("#future .vosotros").html(cfstem + "éis");
						$("#future .ellos").html(cfstem + "án");
						
						$("#conditional .yo").html(cfstem + "ía");
						$("#conditional .tu").html(cfstem + "ías");
						$("#conditional .el").html(cfstem + "ía");
						$("#conditional .nosotros").html(cfstem + "íamos");
						$("#conditional .vosotros").html(cfstem + "íais");
						$("#conditional .ellos").html(cfstem + "ían");
					}
					

					else if (regular == "regular") {
						if(vType == "ar") {
							$(".note").html("<a href='http://people.emich.edu/lhicks16/spanishapp/learn/present-regular-verbs.php'>Regular -AR Verb</a>");

							$("#present .yo").html(stem + "o");
							$("#present .tu").html(stem + "as");
							$("#present .el").html(stem + "a");
							$("#present .nosotros").html(stem + "amos");
							$("#present .vosotros").html(stem + "áis");
							$("#present .ellos").html(stem + "an");
							
							$("#preterite .yo").html(stem + "é");
							$("#preterite .tu").html(stem + "aste");
							$("#preterite .el").html(stem + "ó");
							$("#preterite .nosotros").html(stem + "amos");
							$("#preterite .vosotros").html(stem + "asteis");
							$("#preterite .ellos").html(stem + "aron");

							$("#subjunctive-present .yo").html(stem + "e");
							$("#subjunctive-present .tu").html(stem + "es");
							$("#subjunctive-present .el").html(stem + "e");
							$("#subjunctive-present .nosotros").html(stem + "emos");
							$("#subjunctive-present .vosotros").html(stem + "éis");
							$("#subjunctive-present .ellos").html(stem + "en");

							$("#subjunctive-imperfect-ra .yo").html(stem + "ara");
							$("#subjunctive-imperfect-ra .tu").html(stem + "aras");
							$("#subjunctive-imperfect-ra .el").html(stem + "ara");
							$("#subjunctive-imperfect-ra .nosotros").html(stem + "áramos");
							$("#subjunctive-imperfect-ra .vosotros").html(stem + "arais");
							$("#subjunctive-imperfect-ra .ellos").html(stem + "aran");

							$("#subjunctive-imperfect-se .yo").html(stem + "ase");
							$("#subjunctive-imperfect-se .tu").html(stem + "ases");
							$("#subjunctive-imperfect-se .el").html(stem + "ase");
							$("#subjunctive-imperfect-se .nosotros").html(stem + "ásemos");
							$("#subjunctive-imperfect-se .vosotros").html(stem + "aseis");
							$("#subjunctive-imperfect-se .ellos").html(stem + "asen");

							$("#subjunctive-future .yo").html(stem + "are");
							$("#subjunctive-future .tu").html(stem + "ares");
							$("#subjunctive-future .el").html(stem + "are");
							$("#subjunctive-future .nosotros").html(stem + "áremos");
							$("#subjunctive-future .vosotros").html(stem + "areis");
							$("#subjunctive-future .ellos").html(stem + "aren");

							$("#imperative .tu").html(stem+"a");
							$("#imperative .el").html(stem+"e");
							$("#imperative .nosotros").html(stem+"emos");
							$("#imperative .vosotros").html(stem+"ad");
							$("#imperative .ellos").html(stem+"en");

							$(".present-participle").html(stem+"ando");
							$(".past-participle").html(stem+"ado");

							if(flags != undefined) {
								if(flags[0].qu == "qu" || flags[0].gu == "gu") {
									$("#preterite .yo").html("<span class='irr'>"+preterite[0].yo+"</span>");
							
									$("#subjunctive-present .yo").html("<span class='irr'>"+subjunctivepresent[0].yo+"</span>");
									$("#subjunctive-present .tu").html("<span class='irr'>"+subjunctivepresent[0].tu+"</span>");
									$("#subjunctive-present .el").html("<span class='irr'>"+subjunctivepresent[0].el+"</span>");
									$("#subjunctive-present .nosotros").html("<span class='irr'>"+subjunctivepresent[0].nosotros+"</span>");
									$("#subjunctive-present .vosotros").html("<span class='irr'>"+subjunctivepresent[0].vosotros+"</span>");
									$("#subjunctive-present .ellos").html("<span class='irr'>"+subjunctivepresent[0].ellos+"</span>");

									$("#imperative .el").html("<span class='irr'>"+imperative[0].el+"</span>");
									$("#imperative .nosotros").html("<span class='irr'>"+imperative[0].nosotros+"</span>");
									$("#imperative .ellos").html("<span class='irr'>"+imperative[0].ellos+"</span>");
								}
							}
						}
						
						else if(vType == "er") {
							$(".note").html("<a href='http://people.emich.edu/lhicks16/spanishapp/learn/present-regular-verbs.php'>Regular -ER Verb</a>");

							$("#present .yo").html(stem + "o");
							$("#present .tu").html(stem + "es");
							$("#present .el").html(stem + "e");
							$("#present .nosotros").html(stem + "emos");
							$("#present .vosotros").html(stem + "éis");
							$("#present .ellos").html(stem + "en");
							
							$("#preterite .yo").html(stem + "í");
							$("#preterite .tu").html(stem + "iste");
							$("#preterite .el").html(stem + "ió");
							$("#preterite .nosotros").html(stem + "imos");
							$("#preterite .vosotros").html(stem + "isteis");
							$("#preterite .ellos").html(stem + "ieron");

							$("#subjunctive-present .yo").html(stem + "a");
							$("#subjunctive-present .tu").html(stem + "as");
							$("#subjunctive-present .el").html(stem + "a");
							$("#subjunctive-present .nosotros").html(stem + "amos");
							$("#subjunctive-present .vosotros").html(stem + "áis");
							$("#subjunctive-present .ellos").html(stem + "an");

							$("#subjunctive-imperfect-ra .yo").html(stem + "iera");
							$("#subjunctive-imperfect-ra .tu").html(stem + "ieras");
							$("#subjunctive-imperfect-ra .el").html(stem + "iera");
							$("#subjunctive-imperfect-ra .nosotros").html(stem + "iéramos");
							$("#subjunctive-imperfect-ra .vosotros").html(stem + "ierais");
							$("#subjunctive-imperfect-ra .ellos").html(stem + "ieran");

							$("#subjunctive-imperfect-se .yo").html(stem + "iese");
							$("#subjunctive-imperfect-se .tu").html(stem + "ieses");
							$("#subjunctive-imperfect-se .el").html(stem + "iese");
							$("#subjunctive-imperfect-se .nosotros").html(stem + "iésemos");
							$("#subjunctive-imperfect-se .vosotros").html(stem + "ieseis");
							$("#subjunctive-imperfect-se .ellos").html(stem + "iesen");

							$("#subjunctive-future .yo").html(stem + "iere");
							$("#subjunctive-future .tu").html(stem + "ieres");
							$("#subjunctive-future .el").html(stem + "iere");
							$("#subjunctive-future .nosotros").html(stem + "iéremos");
							$("#subjunctive-future .vosotros").html(stem + "iereis");
							$("#subjunctive-future .ellos").html(stem + "ieren");

							$("#imperative .tu").html(stem+"e");
							$("#imperative .el").html(stem+"a");
							$("#imperative .nosotros").html(stem+"amos");
							$("#imperative .vosotros").html(stem+"ed");
							$("#imperative .ellos").html(stem+"an");

							$(".present-participle").html(stem+"iendo");
							$(".past-participle").html(stem+"ido");

							if(flags != undefined) {
								if(flags[0].zc == "zc" || flags[0].j == "j") {
									$("#present .yo").html("<span class='irr'>"+present[0].yo+"</span>");
							
									$("#subjunctive-present .yo").html("<span class='irr'>"+subjunctivepresent[0].yo+"</span>");
									$("#subjunctive-present .tu").html("<span class='irr'>"+subjunctivepresent[0].tu+"</span>");
									$("#subjunctive-present .el").html("<span class='irr'>"+subjunctivepresent[0].el+"</span>");
									$("#subjunctive-present .nosotros").html("<span class='irr'>"+subjunctivepresent[0].nosotros+"</span>");
									$("#subjunctive-present .vosotros").html("<span class='irr'>"+subjunctivepresent[0].vosotros+"</span>");
									$("#subjunctive-present .ellos").html("<span class='irr'>"+subjunctivepresent[0].ellos+"</span>");

									$("#imperative .el").html("<span class='irr'>"+imperative[0].el+"</span>");
									$("#imperative .nosotros").html("<span class='irr'>"+imperative[0].nosotros+"</span>");
									$("#imperative .ellos").html("<span class='irr'>"+imperative[0].ellos+"</span>");
								}
							}
						}
						
						else if(vType == "ir") {
							$(".note").html("<a href='http://people.emich.edu/lhicks16/spanishapp/learn/present-regular-verbs.php'>Regular -IR Verb</a>");
							
							$("#present .yo").html(stem + "o");
							$("#present .tu").html(stem + "es");
							$("#present .el").html(stem + "e");
							$("#present .nosotros").html(stem + "imos");
							$("#present .vosotros").html(stem + "ís");
							$("#present .ellos").html(stem + "en");
							
							$("#preterite .yo").html(stem + "í");
							$("#preterite .tu").html(stem + "iste");
							$("#preterite .el").html(stem + "ió");
							$("#preterite .nosotros").html(stem + "imos");
							$("#preterite .vosotros").html(stem + "isteis");
							$("#preterite .ellos").html(stem + "ieron");

							$("#subjunctive-present .yo").html(stem + "a");
							$("#subjunctive-present .tu").html(stem + "as");
							$("#subjunctive-present .el").html(stem + "a");
							$("#subjunctive-present .nosotros").html(stem + "amos");
							$("#subjunctive-present .vosotros").html(stem + "áis");
							$("#subjunctive-present .ellos").html(stem + "an");
							
							$("#subjunctive-imperfect-ra .yo").html(stem + "iera");
							$("#subjunctive-imperfect-ra .tu").html(stem + "ieras");
							$("#subjunctive-imperfect-ra .el").html(stem + "iera");
							$("#subjunctive-imperfect-ra .nosotros").html(stem + "iéramos");
							$("#subjunctive-imperfect-ra .vosotros").html(stem + "ierais");
							$("#subjunctive-imperfect-ra .ellos").html(stem + "ieran");

							$("#subjunctive-imperfect-se .yo").html(stem + "iese");
							$("#subjunctive-imperfect-se .tu").html(stem + "ieses");
							$("#subjunctive-imperfect-se .el").html(stem + "iese");
							$("#subjunctive-imperfect-se .nosotros").html(stem + "iésemos");
							$("#subjunctive-imperfect-se .vosotros").html(stem + "ieseis");
							$("#subjunctive-imperfect-se .ellos").html(stem + "iesen");

							$("#subjunctive-future .yo").html(stem + "iere");
							$("#subjunctive-future .tu").html(stem + "ieres");
							$("#subjunctive-future .el").html(stem + "iere");
							$("#subjunctive-future .nosotros").html(stem + "iéremos");
							$("#subjunctive-future .vosotros").html(stem + "iereis");
							$("#subjunctive-future .ellos").html(stem + "ieren");

							$("#imperative .tu").html(stem+"e");
							$("#imperative .el").html(stem+"a");
							$("#imperative .nosotros").html(stem+"amos");
							$("#imperative .vosotros").html(stem+"id");
							$("#imperative .ellos").html(stem+"an");

							$(".present-participle").html(stem+"iendo");
							$(".past-participle").html(stem+"ido");

							if(flags != undefined) {
								if(flags[0].zc == "zc" || flags[0].j == "j" || flags[0].g == "g") {
									$("#present .yo").html("<span class='irr'>"+present[0].yo+"</span>");
							
									$("#subjunctive-present .yo").html("<span class='irr'>"+subjunctivepresent[0].yo+"</span>");
									$("#subjunctive-present .tu").html("<span class='irr'>"+subjunctivepresent[0].tu+"</span>");
									$("#subjunctive-present .el").html("<span class='irr'>"+subjunctivepresent[0].el+"</span>");
									$("#subjunctive-present .nosotros").html("<span class='irr'>"+subjunctivepresent[0].nosotros+"</span>");
									$("#subjunctive-present .vosotros").html("<span class='irr'>"+subjunctivepresent[0].vosotros+"</span>");
									$("#subjunctive-present .ellos").html("<span class='irr'>"+subjunctivepresent[0].ellos+"</span>");

									$("#imperative .el").html("<span class='irr'>"+imperative[0].el+"</span>");
									$("#imperative .nosotros").html("<span class='irr'>"+imperative[0].nosotros+"</span>");
									$("#imperative .ellos").html("<span class='irr'>"+imperative[0].ellos+"</span>");
								}
							}
						}

						if(flags != undefined) {
							if(flags[0].preterite == "irr") {

								$("#preterite .yo").html("<span class='irr'>"+preterite[0].yo+"</span>");
								$("#preterite .tu").html("<span class='irr'>"+preterite[0].tu+"</span>");
								$("#preterite .el").html("<span class='irr'>"+preterite[0].el+"</span>");
								$("#preterite .nosotros").html("<span class='irr'>"+preterite[0].nosotros+"</span>");
								$("#preterite .vosotros").html("<span class='irr'>"+preterite[0].vosotros+"</span>");
								$("#preterite .ellos").html("<span class='irr'>"+preterite[0].ellos+"</span>");

								$("#subjunctive-imperfect-ra .yo").html("<span class='irr'>"+subjunctivera[0].yo+"</span>");
								$("#subjunctive-imperfect-ra .tu").html("<span class='irr'>"+subjunctivera[0].tu+"</span>");
								$("#subjunctive-imperfect-ra .el").html("<span class='irr'>"+subjunctivera[0].el+"</span>");
								$("#subjunctive-imperfect-ra .nosotros").html("<span class='irr'>"+subjunctivera[0].nosotros+"</span>");
								$("#subjunctive-imperfect-ra .vosotros").html("<span class='irr'>"+subjunctivera[0].vosotros+"</span>");
								$("#subjunctive-imperfect-ra .ellos").html("<span class='irr'>"+subjunctivera[0].ellos+"</span>");

								$("#subjunctive-imperfect-se .yo").html("<span class='irr'>"+subjunctivese[0].yo+"</span>");
								$("#subjunctive-imperfect-se .tu").html("<span class='irr'>"+subjunctivese[0].tu+"</span>");
								$("#subjunctive-imperfect-se .el").html("<span class='irr'>"+subjunctivese[0].el+"</span>");
								$("#subjunctive-imperfect-se .nosotros").html("<span class='irr'>"+subjunctivese[0].nosotros+"</span>");
								$("#subjunctive-imperfect-se .vosotros").html("<span class='irr'>"+subjunctivese[0].vosotros+"</span>");
								$("#subjunctive-imperfect-se .ellos").html("<span class='irr'>"+subjunctivese[0].ellos+"</span>");

								$("#subjunctive-future .yo").html("<span class='irr'>"+subjunctivefuture[0].yo+"</span>");
								$("#subjunctive-future .tu").html("<span class='irr'>"+subjunctivefuture[0].tu+"</span>");
								$("#subjunctive-future .el").html("<span class='irr'>"+subjunctivefuture[0].el+"</span>");
								$("#subjunctive-future .nosotros").html("<span class='irr'>"+subjunctivefuture[0].nosotros+"</span>");
								$("#subjunctive-future .vosotros").html("<span class='irr'>"+subjunctivefuture[0].vosotros+"</span>");
								$("#subjunctive-future .ellos").html("<span class='irr'>"+subjunctivefuture[0].ellos+"</span>");

							}
						}

					}
					
					//Tenses that are completely regular across almost all verbs
					if(vType == "ar") {
						if(imperfect == undefined) {
							$("#imperfect .yo").html(stem + "aba");
							$("#imperfect .tu").html(stem + "abas");
							$("#imperfect .el").html(stem + "aba");
							$("#imperfect .nosotros").html(stem + "ábamos");
							$("#imperfect .vosotros").html(stem + "ábais");
							$("#imperfect .ellos").html(stem + "aban");
						}

						else {
							$("#imperfect .yo").html("<span class='irr'>"+imperfect[0].yo+"</span>");
							$("#imperfect .tu").html("<span class='irr'>"+imperfect[0].tu+"</span>");
							$("#imperfect .el").html("<span class='irr'>"+imperfect[0].el+"</span>");
							$("#imperfect .nosotros").html("<span class='irr'>"+imperfect[0].nosotros+"</span>");
							$("#imperfect .vosotros").html("<span class='irr'>"+imperfect[0].vosotros+"</span>");
							$("#imperfect .ellos").html("<span class='irr'>"+imperfect[0].ellos+"</span>");
						}
						
						$("#future .yo").html(cfstem + "é");
						$("#future .tu").html(cfstem + "ás");
						$("#future .el").html(cfstem + "á");
						$("#future .nosotros").html(cfstem + "emos");
						$("#future .vosotros").html(cfstem + "éis");
						$("#future .ellos").html(cfstem + "án");
						
						$("#conditional .yo").html(cfstem + "ía");
						$("#conditional .tu").html(cfstem + "ías");
						$("#conditional .el").html(cfstem + "ía");
						$("#conditional .nosotros").html(cfstem + "íamos");
						$("#conditional .vosotros").html(cfstem + "íais");
						$("#conditional .ellos").html(cfstem + "ían");
					}
					
					else if(vType == "er") {

						if(imperfect == undefined) {
							$("#imperfect .yo").html(stem + "ía");
							$("#imperfect .tu").html(stem + "ías");
							$("#imperfect .el").html(stem + "ía");
							$("#imperfect .nosotros").html(stem + "íamos");
							$("#imperfect .vosotros").html(stem + "íais");
							$("#imperfect .ellos").html(stem + "ían");

						}

						else {
							$("#imperfect .yo").html("<span class='irr'>"+imperfect[0].yo+"</span>");
							$("#imperfect .tu").html("<span class='irr'>"+imperfect[0].tu+"</span>");
							$("#imperfect .el").html("<span class='irr'>"+imperfect[0].el+"</span>");
							$("#imperfect .nosotros").html("<span class='irr'>"+imperfect[0].nosotros+"</span>");
							$("#imperfect .vosotros").html("<span class='irr'>"+imperfect[0].vosotros+"</span>");
							$("#imperfect .ellos").html("<span class='irr'>"+imperfect[0].ellos+"</span>");
						}
						
						$("#future .yo").html(cfstem + "é");
						$("#future .tu").html(cfstem + "ás");
						$("#future .el").html(cfstem + "á");
						$("#future .nosotros").html(cfstem + "emos");
						$("#future .vosotros").html(cfstem + "éis");
						$("#future .ellos").html(cfstem + "án");
						
						$("#conditional .yo").html(cfstem + "ía");
						$("#conditional .tu").html(cfstem + "ías");
						$("#conditional .el").html(cfstem + "ía");
						$("#conditional .nosotros").html(cfstem + "íamos");
						$("#conditional .vosotros").html(cfstem + "íais");
						$("#conditional .ellos").html(cfstem + "ían");
					}
					
					else if(vType == "ir") {

						if(imperfect == undefined) {
							$("#imperfect .yo").html(stem + "ía");
							$("#imperfect .tu").html(stem + "ías");
							$("#imperfect .el").html(stem + "ía");
							$("#imperfect .nosotros").html(stem + "íamos");
							$("#imperfect .vosotros").html(stem + "íais");
							$("#imperfect .ellos").html(stem + "ían");
						}

						else {
							$("#imperfect .yo").html("<span class='irr'>"+imperfect[0].yo+"</span>");
							$("#imperfect .tu").html("<span class='irr'>"+imperfect[0].tu+"</span>");
							$("#imperfect .el").html("<span class='irr'>"+imperfect[0].el+"</span>");
							$("#imperfect .nosotros").html("<span class='irr'>"+imperfect[0].nosotros+"</span>");
							$("#imperfect .vosotros").html("<span class='irr'>"+imperfect[0].vosotros+"</span>");
							$("#imperfect .ellos").html("<span class='irr'>"+imperfect[0].ellos+"</span>");
						}
						
						$("#future .yo").html(cfstem + "é");
						$("#future .tu").html(cfstem + "ás");
						$("#future .el").html(cfstem + "á");
						$("#future .nosotros").html(cfstem + "emos");
						$("#future .vosotros").html(cfstem + "éis");
						$("#future .ellos").html(cfstem + "án");
						
						$("#conditional .yo").html(cfstem + "ía");
						$("#conditional .tu").html(cfstem + "ías");
						$("#conditional .el").html(cfstem + "ía");
						$("#conditional .nosotros").html(cfstem + "íamos");
						$("#conditional .vosotros").html(cfstem + "íais");
						$("#conditional .ellos").html(cfstem + "ían");

					}

					if (regular == "irregular") {
						$("#present .yo").html(present[0].yo);
						$("#present .tu").html(present[0].tu);
						$("#present .el").html(present[0].el);
						$("#present .nosotros").html(present[0].nosotros);
						$("#present .vosotros").html(present[0].vosotros);
						$("#present .ellos").html(present[0].ellos);

						/*
						$("#imperfect .yo").html(imperfect[0].yo);
						$("#imperfect .tu").html(imperfect[0].tu);
						$("#imperfect .el").html(imperfect[0].el);
						$("#imperfect .nosotros").html(imperfect[0].nosotros);
						$("#imperfect .vosotros").html(imperfect[0].vosotros);
						$("#imperfect .ellos").html(imperfect[0].ellos);
						*/

						$("#preterite .yo").html(preterite[0].yo);
						$("#preterite .tu").html(preterite[0].tu);
						$("#preterite .el").html(preterite[0].el);
						$("#preterite .nosotros").html(preterite[0].nosotros);
						$("#preterite .vosotros").html(preterite[0].vosotros);
						$("#preterite .ellos").html(preterite[0].ellos);

						$("#subjunctive-present .yo").html(subjunctivepresent[0].yo);
						$("#subjunctive-present .tu").html(subjunctivepresent[0].tu);
						$("#subjunctive-present .el").html(subjunctivepresent[0].el);
						$("#subjunctive-present .nosotros").html(subjunctivepresent[0].nosotros);
						$("#subjunctive-present .vosotros").html(subjunctivepresent[0].vosotros);
						$("#subjunctive-present .ellos").html(subjunctivepresent[0].ellos);

						$("#subjunctive-imperfect-ra .yo").html(subjunctivera[0].yo);
						$("#subjunctive-imperfect-ra .tu").html(subjunctivera[0].tu);
						$("#subjunctive-imperfect-ra .el").html(subjunctivera[0].el);
						$("#subjunctive-imperfect-ra .nosotros").html(subjunctivera[0].nosotros);
						$("#subjunctive-imperfect-ra .vosotros").html(subjunctivera[0].vosotros);
						$("#subjunctive-imperfect-ra .ellos").html(subjunctivera[0].ellos);

						$("#subjunctive-imperfect-se .yo").html(subjunctivese[0].yo);
						$("#subjunctive-imperfect-se .tu").html(subjunctivese[0].tu);
						$("#subjunctive-imperfect-se .el").html(subjunctivese[0].el);
						$("#subjunctive-imperfect-se .nosotros").html(subjunctivese[0].nosotros);
						$("#subjunctive-imperfect-se .vosotros").html(subjunctivese[0].vosotros);
						$("#subjunctive-imperfect-se .ellos").html(subjunctivese[0].ellos);

						$("#subjunctive-future .yo").html(subjunctivefuture[0].yo);
						$("#subjunctive-future .tu").html(subjunctivefuture[0].tu);
						$("#subjunctive-future .el").html(subjunctivefuture[0].el);
						$("#subjunctive-future .nosotros").html(subjunctivefuture[0].nosotros);
						$("#subjunctive-future .vosotros").html(subjunctivefuture[0].vosotros);
						$("#subjunctive-future .ellos").html(subjunctivefuture[0].ellos);

						$("#imperative .tu").html(imperative[0].tu);
						$("#imperative .el").html(imperative[0].el);
						$("#imperative .nosotros").html(imperative[0].nosotros);
						$("#imperative .vosotros").html(imperative[0].vosotros);
						$("#imperative .ellos").html(imperative[0].ellos);

						$(".present-participle").html(presentparticiple);
						$(".past-participle").html(pastparticiple);
					}

					$(".infinitive").html(infinitive);

					$("#present-perfect .yo").html("he "+pastparticiple);
					$("#present-perfect .tu").html("has "+pastparticiple);
					$("#present-perfect .el").html("ha "+pastparticiple);
					$("#present-perfect .nosotros").html("hemos "+pastparticiple);
					$("#present-perfect .vosotros").html("habéis "+pastparticiple);
					$("#present-perfect .ellos").html("han "+pastparticiple);

					$("#preterite-perfect .yo").html("hube "+pastparticiple);
					$("#preterite-perfect .tu").html("hubiste "+pastparticiple);
					$("#preterite-perfect .el").html("hubo "+pastparticiple);
					$("#preterite-perfect .nosotros").html("hubimos "+pastparticiple);
					$("#preterite-perfect .vosotros").html("hubisteis "+pastparticiple);
					$("#preterite-perfect .ellos").html("hubieron "+pastparticiple);

					$("#past-perfect .yo").html("había "+pastparticiple);
					$("#past-perfect .tu").html("habías "+pastparticiple);
					$("#past-perfect .el").html("había "+pastparticiple);
					$("#past-perfect .nosotros").html("habíamos "+pastparticiple);
					$("#past-perfect .vosotros").html("habíais "+pastparticiple);
					$("#past-perfect .ellos").html("habían "+pastparticiple);

					$("#conditional-perfect .yo").html("habría "+pastparticiple);
					$("#conditional-perfect .tu").html("habrías "+pastparticiple);
					$("#conditional-perfect .el").html("habría "+pastparticiple);
					$("#conditional-perfect .nosotros").html("habríamos "+pastparticiple);
					$("#conditional-perfect .vosotros").html("habríais "+pastparticiple);
					$("#conditional-perfect .ellos").html("habrían "+pastparticiple);

					$("#future-perfect .yo").html("habré "+pastparticiple);
					$("#future-perfect .tu").html("habrás "+pastparticiple);
					$("#future-perfect .el").html("habrá "+pastparticiple);
					$("#future-perfect .nosotros").html("habremos "+pastparticiple);
					$("#future-perfect .vosotros").html("habréis "+pastparticiple);
					$("#future-perfect .ellos").html("habrán "+pastparticiple);

					$("#subjunctive-present-perfect .yo").html("haya "+pastparticiple);
					$("#subjunctive-present-perfect .tu").html("hayas "+pastparticiple);
					$("#subjunctive-present-perfect .el").html("haya "+pastparticiple);
					$("#subjunctive-present-perfect .nosotros").html("hayamos "+pastparticiple);
					$("#subjunctive-present-perfect .vosotros").html("hayáis "+pastparticiple);
					$("#subjunctive-present-perfect .ellos").html("hayan "+pastparticiple);

					$("#subjunctive-past-perfect .yo").html("hubiera "+pastparticiple);
					$("#subjunctive-past-perfect .tu").html("hubieras "+pastparticiple);
					$("#subjunctive-past-perfect .el").html("hubiera "+pastparticiple);
					$("#subjunctive-past-perfect .nosotros").html("hubiéramos "+pastparticiple);
					$("#subjunctive-past-perfect .vosotros").html("hubierais "+pastparticiple);
					$("#subjunctive-past-perfect .ellos").html("hubieran "+pastparticiple);

					$("#subjunctive-future-perfect .yo").html("hubiere "+pastparticiple);
					$("#subjunctive-future-perfect .tu").html("hubieres "+pastparticiple);
					$("#subjunctive-future-perfect .el").html("hubiere "+pastparticiple);
					$("#subjunctive-future-perfect .nosotros").html("hubiéremos "+pastparticiple);
					$("#subjunctive-future-perfect .vosotros").html("hubiereis "+pastparticiple);
					$("#subjunctive-future-perfect .ellos").html("hubieren "+pastparticiple);
				}
			});
		}).promise().done(function() {
				if(foundItem == false) {
					$("#message").html("A verb could not be found.");

					$(".yo").html("");
					$(".tu").html("");
					$(".el").html("");
					$(".nosotros").html("");
					$(".vosotros").html("");
					$(".ellos").html("");

					$("td .infinitive").html("");
					$("td .past-participle").html("");
					$("td .present-participle").html("");
					$(".note").html("");

					$("#heading, #verb").css("display", "none");
				}

				else if(foundItem == true) {
					$("#verb-box, #heading, #verb, #reset").css("display", "block");
					$("#search-area").css("display", "none");
					$("#message").html("Text in <span style='color:red'>red</span> indicates an irregular conjugation.");
				}
			});
	}); 

	$("#reset").click(function() {
		$(".yo").html("");
		$(".tu").html("");
		$(".el").html("");
		$(".nosotros").html("");
		$(".vosotros").html("");
		$(".ellos").html("");

		$("td .infinitive").html("");
		$("td .past-participle").html("");
		$("td .present-participle").html("");
		$(".note").html("");

		$("#heading, #verb, #reset").css("display", "none");
		$("#search-area").css("display", "block");
		$("#message").html("");
	});
});