$(document).ready(function() {

	//This segment of code handles inserting accents from buttons
	$("#acc-a").click(function() {
		$("#answer").val($("#answer").val() + "á");
		$("#answer").focus();
	});
	$("#acc-e").click(function() {
		$("#answer").val($("#answer").val() + "é");
		$("#answer").focus();
	});
	$("#acc-i").click(function() {
		$("#answer").val($("#answer").val() + "í");
		$("#answer").focus();
	});
	$("#acc-o").click(function() {
		$("#answer").val($("#answer").val() + "ó");
		$("#answer").focus();
	});
	$("#acc-u").click(function() {
		$("#answer").val($("#answer").val() + "ú");
		$("#answer").focus();
	});
	$("#acc-uu").click(function() {
		$("#answer").val($("#answer").val() + "ü");
		$("#answer").focus();
	});
	$("#acc-n").click(function() {
		$("#answer").val($("#answer").val() + "ñ");
		$("#answer").focus();
	});

	//Whether or not a person is enabled
	var enabledPersons = [true, // yo
					true, // tu
					true, // el
					true, // nosotros
					true, // vosotros
					true // ellos
	];

	//Whether or not a tense is enabled
	var enabledTenses = [false, // present
						false, 	// imperfect
						false, 	// preterite
						false, 	// future
						false,	// conditional
						false,	// subjunctivepresent
						false, 	// subjunctiveimperfectra
						false, 	// subjunctiveimperfectse
						false, 	// subjunctivefuture
						false, 	// presentperfect
						false, 	// pastperfect
						false, 	// preteriteperfect
						false,	// conditionalperfect
						false,	// futureperfect
						false,	// subjunctivepresentperfect
						false,	// subjunctivepastperfect
						false,	// subjunctivefutureperfect
						false 	// imperative
	];

	//Which verb endings are enabled
	var vtypeEnabled = [true, 	//-AR
					true,		//-ER
					true		//-IR
	];

	//What kind of regular / irregular verbs are enabled
	var regEnabled = [true, //irregular
					true,	//stem changing verbs
					true,	//vowel changing verbs
					true	//regular verbs
	];

	var answer = "";
	var prevquestion = "";
	var questioncount = 0;
	var score = 0;

	//Unchecks all of the checkboxes then updates the enabled states
	function uncheckAll() {
		$("input:checkbox:checked").prop('checked',false);
		updateTensesPersons();
	}

	uncheckAll();

	//Checks all of the checkboxes then updates the enabled states
	function checkAll() {
		$("input:checkbox").prop('checked', true);
		updateTensesPersons();
	}

	//Toggles whether or not a tense, person, vtype, or regularity is enabled
	//based on whether or not their checkboxes are ticked
	function updateTensesPersons() {
			enabledTenses[0] = $("#present-tense").is(':checked'); // Present tense enabled
			enabledTenses[1] = $("#imperfect-tense").is(':checked'); // Imperfect tense enabled
			enabledTenses[2] = $("#preterite-tense").is(':checked'); // Remote past tense enabled
			enabledTenses[3] = $("#future-tense").is(':checked'); // Future simple tense enabled
			enabledTenses[4] = $("#conditional-tense").is(':checked'); // Present perfect tense enabled
			enabledTenses[5] = $("#subjunctivepresent-tense").is(':checked'); // Past perfect tense enabled
			enabledTenses[6] = $("#subjunctiveimperfectra-tense").is(':checked'); // Future perfect tense enabled
			enabledTenses[7] = $("#subjunctiveimperfectse-tense").is(':checked'); // Subjunctive present tense enabled
			enabledTenses[8] = $("#subjunctivefuture-tense").is(':checked'); // Subjunctive imperfect tense enabled
			enabledTenses[9] = $("#presentperfect-tense").is(':checked'); // Present perfect tense enabled
			enabledTenses[10] = $("#pastperfect-tense").is(':checked'); // Past perfect tense enabled
			enabledTenses[11] = $("#preteriteperfect-tense").is(':checked'); // Preterite perfect tense enabled
			enabledTenses[12] = $("#conditionalperfect-tense").is(':checked'); // Conditional perfect tense enabled
			enabledTenses[13] = $("#futureperfect-tense").is(':checked'); // Future perfect tense enabled
			enabledTenses[14] = $("#subjunctivepresentperfect-tense").is(':checked'); // Subjunctive present perfect tense enabled
			enabledTenses[15] = $("#subjunctivepastperfect-tense").is(':checked'); // Subjunctive past perfect enabled
			enabledTenses[16] = $("#subjunctivefutureperfect-tense").is(':checked'); // Subjunctive future perfect tense enabled
			enabledTenses[17] = $("#imperative-tense").is(':checked'); // Imperative tense enabled

			enabledPersons[4] = $("#vosotros-person").is(':checked'); // vosotros enabled
			
			vtypeEnabled[0] = $("#ar-verbs").is(':checked'); // -AR enabled;
			vtypeEnabled[1] = $("#er-verbs").is(':checked'); // -ER enabled;
			vtypeEnabled[2] = $("#ir-verbs").is(':checked'); // -IR enabled;

			regEnabled[0] = $("#all-irr-verbs").is(':checked'); //all irregular verbs
			regEnabled[1] = $("#spell-verbs").is(':checked');	//spelling changing verbs
			regEnabled[2] = $("#vowel-verbs").is(':checked');	//vowel changing verbs
			regEnabled[3] = $("#regular-verbs").is(':checked'); //regular verbs
	}

	//Loads up a question
	function nextQuestion() {
		//Load the verb data from json
		$.getJSON("http://people.emich.edu/lhicks16/spanishapp/practice/verbs.json", function(data) {

			//Focus the mouse into the answer box
			$("#answer").focus();
			$("#answer").val("");

			//check the selected persons and tenses before doing anything
			updateTensesPersons();

			//select a random verb, person, and tense
			var length = data.verblist.length;
			var verbNum = Math.floor(Math.random() * length);
			var person = Math.floor(Math.random() * 6);
			var tense = Math.floor(Math.random() * 18);
			var regular = data.verblist[verbNum].regular;

			//set the regularity number from file
			var regNum = 3;
			if(regular == "irregular") { regNum = 0; }
			else if(regular == "spell") { regNum = 1; }
			else if(regular == "vowel") { regNum = 2; }
			else if(regular == "regular") { regNum = 3; }

			//set the vtype from file
			var vtype = data.verblist[verbNum].vtype;

			//prevent the same question from appearing twice
			if(prevquestion == (person + "-" + tense)) {
				nextQuestion();
				return false;
			}


			//if we get a tense or person that isn't enabled, try again
			if(enabledTenses[tense] == false || enabledPersons[person] == false || vtypeEnabled[vtype] == false || regEnabled[regNum] == false) {
				nextQuestion();
				return false;
			}

			// Present Tense
			if(tense == 0 && enabledTenses[0] == true) {
				if(person == 0 && enabledPersons[0] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: yo <br />(present)");
					answer = data.verblist[verbNum].present[0].yo;
				}

				else if(person == 1 && enabledPersons[1] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: tu <br />(present)");
					answer = data.verblist[verbNum].present[0].tu;
				}

				else if(person == 2 && enabledPersons[2] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: él/ella/Ud. <br />(present)");
					answer = data.verblist[verbNum].present[0].el;
				}

				else if(person == 3 && enabledPersons[3] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: nosotros <br />(present)");
					answer = data.verblist[verbNum].present[0].nosotros;
				}

				else if(person == 4 && enabledPersons[4] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: vosotros <br />(present)");
					answer = data.verblist[verbNum].present[0].vosotros;
				}

				else if(person == 5 && enabledPersons[5] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: ellos/ellas/Uds. <br />(present)");
					answer = data.verblist[verbNum].present[0].ellos;
				}

				else {
					return false;
				}

			}

			// Imperfect Tense
			else if(tense == 1 && enabledTenses[1] == true) {
				if(person == 0 && enabledPersons[0] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: yo <br />(imperfect)");
					answer = data.verblist[verbNum].imperfect[0].yo;
				}

				else if(person == 1 && enabledPersons[1] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: tu <br />(imperfect)");
					answer = data.verblist[verbNum].imperfect[0].tu;
				}

				else if(person == 2 && enabledPersons[2] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: él/ella/Ud. <br />(imperfect)");
					answer = data.verblist[verbNum].imperfect[0].el;
				}

				else if(person == 3 && enabledPersons[3] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: nosotros <br />(imperfect)");
					answer = data.verblist[verbNum].imperfect[0].nosotros;
				}

				else if(person == 4 && enabledPersons[4] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: vosotros <br />(imperfect)");
					answer = data.verblist[verbNum].imperfect[0].vosotros;
				}

				else if(person == 5 && enabledPersons[5] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: ellos/ellas/Uds. <br />(imperfect)");
					answer = data.verblist[verbNum].imperfect[0].ellos;
				}

				else {
					return false;
				}
			}

			// Preterite Tense
			else if(tense == 2 && enabledTenses[2] == true) {
				if(person == 0 && enabledPersons[0] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: yo <br />(preterite)");
					answer = data.verblist[verbNum].preterite[0].yo;
				}

				else if(person == 1 && enabledPersons[1] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: tu <br />(preterite)");
					answer = data.verblist[verbNum].preterite[0].tu;
				}

				else if(person == 2 && enabledPersons[2] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: él/ella/Ud. <br />(preterite)");
					answer = data.verblist[verbNum].preterite[0].el;
				}

				else if(person == 3 && enabledPersons[3] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: nosotros <br />(preterite)");
					answer = data.verblist[verbNum].preterite[0].nosotros;
				}

				else if(person == 4 && enabledPersons[4] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: vosotros <br />(preterite)");
					answer = data.verblist[verbNum].preterite[0].vosotros;
				}

				else if(person == 5 && enabledPersons[5] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: ellos/ellas/Uds. <br />(preterite)");
					answer = data.verblist[verbNum].preterite[0].ellos;
				}

				else {
					return false;
				}
			}

			// Future Tense
			else if(tense == 3 && enabledTenses[3] == true) {
				if(person == 0 && enabledPersons[0] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: yo <br />(future)");
					answer = data.verblist[verbNum].future[0].yo;
				}

				else if(person == 1 && enabledPersons[1] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: tu <br />(future)");
					answer = data.verblist[verbNum].future[0].tu;
				}

				else if(person == 2 && enabledPersons[2] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: él/ella/Ud. <br />(future)");
					answer = data.verblist[verbNum].future[0].el;
				}

				else if(person == 3 && enabledPersons[3] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: nosotros <br />(future)");
					answer = data.verblist[verbNum].future[0].nosotros;
				}

				else if(person == 4 && enabledPersons[4] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: vosotros <br />(future)");
					answer = data.verblist[verbNum].future[0].vosotros;
				}

				else if(person == 5 && enabledPersons[5] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: ellos/ellas/Uds. <br />(future)");
					answer = data.verblist[verbNum].future[0].ellos;
				}

				else {
					return false;
				}
			}

			// Conditional Tense
			else if(tense == 4 && enabledTenses[4] == true) {
				if(person == 0 && enabledPersons[0] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: yo <br />(conditional)");
					answer = data.verblist[verbNum].conditional[0].yo;
				}

				else if(person == 1 && enabledPersons[1] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: tu <br />(conditional)");
					answer = data.verblist[verbNum].conditional[0].tu;
				}

				else if(person == 2 && enabledPersons[2] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: él/ella/Ud. <br />(conditional)");
					answer = data.verblist[verbNum].conditional[0].el;
				}

				else if(person == 3 && enabledPersons[3] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: nosotros <br />(conditional)");
					answer = data.verblist[verbNum].conditional[0].nosotros;
				}

				else if(person == 4 && enabledPersons[4] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: vosotros <br />(conditional)");
					answer = data.verblist[verbNum].conditional[0].vosotros;
				}

				else if(person == 5 && enabledPersons[5] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: ellos/ellas/Uds. <br />(conditional)");
					answer = data.verblist[verbNum].conditional[0].ellos;
				}

				else {
					return false;
				}
			}

			//Subjunctive Present
			else if(tense == 5 && enabledTenses[5] == true) {
				if(person == 0 && enabledPersons[0] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: yo <br />(subjunctive present)");
					answer = data.verblist[verbNum].subjunctivepresent[0].yo;
				}

				else if(person == 1 && enabledPersons[1] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: tu <br />(subjunctive present)");
					answer = data.verblist[verbNum].subjunctivepresent[0].tu;
				}

				else if(person == 2 && enabledPersons[2] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: él/ella/Ud. <br />(subjunctive present)");
					answer = data.verblist[verbNum].subjunctivepresent[0].el;
				}

				else if(person == 3 && enabledPersons[3] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: nosotros <br />(subjunctive present)");
					answer = data.verblist[verbNum].subjunctivepresent[0].nosotros;
				}

				else if(person == 4 && enabledPersons[4] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: vosotros <br />(subjunctive present)");
					answer = data.verblist[verbNum].subjunctivepresent[0].vosotros;
				}

				else if(person == 5 && enabledPersons[5] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: ellos/ellas/Uds. <br />(subjunctive present)");
					answer = data.verblist[verbNum].subjunctivepresent[0].ellos;
				}

				else {
					return false;
				}
			}

			//Subjunctive Imperfect Ra
			else if(tense == 6 && enabledTenses[6] == true) {
				if(person == 0 && enabledPersons[0] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: yo <br />(subjunctive imperfect (ra))");
					answer = data.verblist[verbNum].subjunctiveimperfectra[0].yo;
				}

				else if(person == 1 && enabledPersons[1] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: tu <br />(subjunctive imperfect (ra))");
					answer = data.verblist[verbNum].subjunctiveimperfectra[0].tu;
				}

				else if(person == 2 && enabledPersons[2] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: él/ella/Ud. <br />(subjunctive imperfect (ra))");
					answer = data.verblist[verbNum].subjunctiveimperfectra[0].el;
				}

				else if(person == 3 && enabledPersons[3] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: nosotros <br />(subjunctive imperfect (ra))");
					answer = data.verblist[verbNum].subjunctiveimperfectra[0].nosotros;
				}

				else if(person == 4 && enabledPersons[4] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: vosotros <br />(subjunctive imperfect (ra))");
					answer = data.verblist[verbNum].subjunctiveimperfectra[0].vosotros;
				}

				else if(person == 5 && enabledPersons[5] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: ellos/ellas/Uds. <br />(subjunctive imperfect (ra))");
					answer = data.verblist[verbNum].subjunctiveimperfectra[0].ellos;
				}

				else {
					return false;
				}
			}

			//Subjunctive Imperfect Se
			else if(tense == 7 && enabledTenses[7] == true) {
				if(person == 0 && enabledPersons[0] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: yo <br />(subjunctive imperfect (se))");
					answer = data.verblist[verbNum].subjunctiveimperfectse[0].yo;
				}

				else if(person == 1 && enabledPersons[1] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: tu <br />(subjunctive imperfect (se))");
					answer = data.verblist[verbNum].subjunctiveimperfectse[0].tu;
				}

				else if(person == 2 && enabledPersons[2] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: él/ella/Ud. <br />(subjunctive imperfect (se))");
					answer = data.verblist[verbNum].subjunctiveimperfectse[0].el;
				}

				else if(person == 3 && enabledPersons[3] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: nosotros <br />(subjunctive imperfect (se))");
					answer = data.verblist[verbNum].subjunctiveimperfectse[0].nosotros;
				}

				else if(person == 4 && enabledPersons[4] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: vosotros <br />(subjunctive imperfect (se))");
					answer = data.verblist[verbNum].subjunctiveimperfectse[0].vosotros;
				}

				else if(person == 5 && enabledPersons[5] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: ellos/ellas/Uds. <br />(subjunctive imperfect (se))");
					answer = data.verblist[verbNum].subjunctiveimperfectse[0].ellos;
				}

				else {
					return false;
				}
			}

			//Subjunctive Future
			else if(tense == 8 && enabledTenses[8] == true) {
				if(person == 0 && enabledPersons[0] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: yo <br />(subjunctive future)");
					answer = data.verblist[verbNum].subjunctivefuture[0].yo;
				}

				else if(person == 1 && enabledPersons[1] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: tu <br />(subjunctive future)");
					answer = data.verblist[verbNum].subjunctivefuture[0].tu;
				}

				else if(person == 2 && enabledPersons[2] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: él/ella/Ud. <br />(subjunctive future)");
					answer = data.verblist[verbNum].subjunctivefuture[0].el;
				}

				else if(person == 3 && enabledPersons[3] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: nosotros <br />(subjunctive future)");
					answer = data.verblist[verbNum].subjunctivefuture[0].nosotros;
				}

				else if(person == 4 && enabledPersons[4] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: vosotros <br />(subjunctive future)");
					answer = data.verblist[verbNum].subjunctivefuture[0].vosotros;
				}

				else if(person == 5 && enabledPersons[5] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: ellos/ellas/Uds. <br />(subjunctive future)");
					answer = data.verblist[verbNum].subjunctivefuture[0].ellos;
				}

				else {
					return false;
				}
			}


			// Present Perfect Tense
			else if (tense == 9 && enabledTenses[9] == true) {
				if(person == 0 && enabledPersons[0] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: yo <br />(present perfect)");
					answer = "he " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 1 && enabledPersons[1] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: tu <br />(present perfect)");
					answer = "has " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 2 && enabledPersons[2] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: él/ella/Ud. <br />(present perfect)");
					answer = "ha " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 3 && enabledPersons[3] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: nosotros <br />(present perfect)");
					answer = "hemos " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 4 && enabledPersons[4] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: vosotros <br />(present perfect)");
					answer = "habéis " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 5 && enabledPersons[5] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: ellos/ellas/Uds. <br />(present perfect)");
					answer = "han " + data.verblist[verbNum].participle[0].past;
				}
				
				else {
					return false;
				}	
			}

			// Past Perfect
			else if (tense == 10 && enabledTenses[10] == true) {
				if(person == 0 && enabledPersons[0] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: yo <br />(past perfect)");
					answer = "había " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 1 && enabledPersons[1] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: tu <br />(past perfect)");
					answer = "habías " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 2 && enabledPersons[2] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: él/ella/Ud. <br />(past perfect)");
					answer = "había " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 3 && enabledPersons[3] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: nosotros <br />(past perfect)");
					answer = "habíamos " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 4 && enabledPersons[4] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: vosotros <br />(past perfect)");
					answer = "habíais " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 5 && enabledPersons[5] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: ellos/ellas/Uds. <br />(past perfect)");
					answer = "habían " + data.verblist[verbNum].participle[0].past;
				}

				else {
					return false;
				}
			}

			

			// Preterite Perfect
			else if (tense == 11 && enabledTenses[11] == true) {
				if(person == 0 && enabledPersons[0] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: yo <br />(preterite perfect)");
					answer = "hube " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 1 && enabledPersons[1] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: tu <br />(preterite perfect)");
					answer = "hubiste " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 2 && enabledPersons[2] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: él/ella/Ud. <br />(preterite perfect)");
					answer = "hubo " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 3 && enabledPersons[3] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: nosotros <br />(preterite perfect)");
					answer = "hubimos " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 4 && enabledPersons[4] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: vosotros <br />(preterite perfect)");
					answer = "hubisteis " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 5 && enabledPersons[5] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: ellos/ellas/Uds. <br />(preterite perfect)");
					answer = "hubieron " + data.verblist[verbNum].participle[0].past;
				}

				else {
					return false;
				}
			}

			// Conditional Perfect
			else if (tense == 12 && enabledTenses[12] == true) {
				if(person == 0 && enabledPersons[0] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: yo <br />(conditional perfect)");
					answer = "habría " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 1 && enabledPersons[1] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: tu <br />(conditional perfect)");
					answer = "habrías " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 2 && enabledPersons[2] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: él/ella/Ud. <br />(conditional perfect)");
					answer = "habría " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 3 && enabledPersons[3] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: nosotros <br />(conditional perfect)");
					answer = "habríamos " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 4 && enabledPersons[4] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: vosotros <br />(conditional perfect)");
					answer = "habríais " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 5 && enabledPersons[5] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: ellos/ellas/Uds. <br />(conditional perfect)");
					answer = "habrían " + data.verblist[verbNum].participle[0].past;
				}

				else {
					return false;
				}
			}

			// Future Perfect
			else if (tense == 13 && enabledTenses[13] == true) {
				if(person == 0 && enabledPersons[0] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: yo <br />(future perfect)");
					answer = "habré " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 1 && enabledPersons[1] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: tu <br />(future perfect)");
					answer = "habrás " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 2 && enabledPersons[2] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: él/ella/Ud. <br />(future perfect)");
					answer = "habrá " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 3 && enabledPersons[3] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: nosotros <br />(future perfect)");
					answer = "habremos " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 4 && enabledPersons[4] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: vosotros <br />(future perfect)");
					answer = "habréis " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 5 && enabledPersons[5] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: ellos/ellas/Uds. <br />(future perfect)");
					answer = "habrán " + data.verblist[verbNum].participle[0].past;
				}

				else {
					return false;
				}
			}

			// Subjunctive Present Perfect
			else if (tense == 14 && enabledTenses[14] == true) {
				if(person == 0 && enabledPersons[0] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: yo <br />(subjunctive present perfect)");
					answer = "haya " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 1 && enabledPersons[1] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: tu <br />(subjunctive present perfect)");
					answer = "hayas " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 2 && enabledPersons[2] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: él/ella/Ud. <br />(subjunctive present perfect)");
					answer = "haya " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 3 && enabledPersons[3] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: nosotros <br />(subjunctive present perfect)");
					answer = "hayamos " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 4 && enabledPersons[4] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: vosotros <br />(subjunctive present perfect)");
					answer = "hayáis " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 5 && enabledPersons[5] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: ellos/ellas/Uds. <br />(subjunctive present perfect)");
					answer = "hayan " + data.verblist[verbNum].participle[0].past;
				}

				else {
					return false;
				}
			}

			// Subjunctive Past Perfect
			else if (tense == 15 && enabledTenses[15] == true) {
				if(person == 0 && enabledPersons[0] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: yo <br />(subjunctive past perfect)");
					answer = "hubiera " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 1 && enabledPersons[1] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: tu <br />(subjunctive past perfect)");
					answer = "hubieras " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 2 && enabledPersons[2] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: él/ella/Ud. <br />(subjunctive past perfect)");
					answer = "hubiera " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 3 && enabledPersons[3] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: nosotros <br />(subjunctive past perfect)");
					answer = "hubiéramos " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 4 && enabledPersons[4] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: vosotros <br />(subjunctive past perfect)");
					answer = "hubierais " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 5 && enabledPersons[5] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: ellos/ellas/Uds. <br />(subjunctive past perfect)");
					answer = "hubieran " + data.verblist[verbNum].participle[0].past;
				}

				else {
					return false;
				}
			}

			// Subjunctive Future Perfect
			else if (tense == 16 && enabledTenses[16] == true) {
				if(person == 0 && enabledPersons[0] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: yo <br />(subjunctive future perfect)");
					answer = "hubiere " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 1 && enabledPersons[1] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: tu <br />(subjunctive future perfect)");
					answer = "hubieres " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 2 && enabledPersons[2] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: él/ella/Ud. <br />(subjunctive future perfect)");
					answer = "hubiere " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 3 && enabledPersons[3] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: nosotros <br />(subjunctive future perfect)");
					answer = "hubiéremos " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 4 && enabledPersons[4] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: vosotros <br />(subjunctive future perfect)");
					answer = "hubiereis " + data.verblist[verbNum].participle[0].past;
				}

				else if(person == 5 && enabledPersons[5] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: ellos/ellas/Uds. <br />(subjunctive future perfect)");
					answer = "hubieren " + data.verblist[verbNum].participle[0].past;
				}

				else {
					return false;
				}
			}

			// Imperative
			else if (tense == 17 && enabledTenses[17] == true) {
				if(person == 0 && enabledPersons[0] == true) {
					nextQuestion();
				}

				else if(person == 1 && enabledPersons[1] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: tu <br />(imperative)");
					answer = data.verblist[verbNum].imperative[0].tu;
				}

				else if(person == 2 && enabledPersons[2] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: él/ella/Ud. <br />(imperative)");
					answer = data.verblist[verbNum].imperative[0].el;
				}

				else if(person == 3 && enabledPersons[3] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: nosotros <br />(imperative)");
					answer = data.verblist[verbNum].imperative[0].nosotros;
				}

				else if(person == 4 && enabledPersons[4] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: vosotros <br />(imperative)");
					answer = data.verblist[verbNum].imperative[0].vosotros;
				}

				else if(person == 5 && enabledPersons[5] == true) {
					$("#question").html("<b>"+data.verblist[verbNum].infinitive+"</b>: ellos/ellas/Uds. <br />(imperative)");
					answer = data.verblist[verbNum].imperative[0].ellos;
				}

				else {
					nextQuestion();
					return false;
				}
			}

			else {
				nextQuestion();
				return false;
			}

			prevquestion = person + "-" + tense;
			return false;

		});
	}

	function checkEnabled() {
		var hasTense = false;
		var hasVType = false;
		var hasReg = false;

		for(var i = 0; i < enabledTenses.length; i++) {
			if(enabledTenses[i] == true) {
				hasTense = true;
			}
		}


		for(var i = 0; i < vtypeEnabled.length; i++) {
			if(vtypeEnabled[i] = true) {
				hasVType = true;
			}
		}

		for(var i = 0; i < regEnabled.length; i++) {
			if(regEnabled[i] == true) {
				hasReg = true;
			}
		}

		if(hasTense == true && hasVType == true && hasReg == true) {
			return true;
		}

		else {
			return false;
		}

	}

	// if the start button is pressed
	$("#start").click(function() {
		if(checkEnabled() == true) {
			//Remove the start button
			$("#start, #search-area h2").fadeOut("300").remove();
			$("#answer, #accents, #peek, #check, #stats").css("display", "inline");
			$("#question").fadeIn("300").html("Loading next question...").delay("1000");
		    nextQuestion();
			return false;
		}

		else {
			alert("Please select at least one tense, one person, one verb ending, and one verb type.");
		}
	}); 

	// if the next button is pressed
	$("#next").click(function() {
		if(checkEnabled() == true) {
			// reset the question
			$("#answer, #check").css("display", "inline");
			$("#question").fadeIn("300").html("Loading next question...").delay("1000");
		    // hide the next button
			$("#next").fadeOut("300");

			// render the next question
			nextQuestion();
			return false;
		}

		else {
			alert("Please select at least one tense, one person, one verb ending, and one verb type.");
		}
	}); 

	// If the check button is pressed
	$("#check").click(function() {
		// and the answer is correct
		if(($("#answer").val()).toLowerCase() == answer) {
			// display the next button and the result
			$("#next").css("display", "block");
			score += 1;
	        $("#score").html(score);
			$("#result").html("<p>You got it right!<br><sub>Press space to continue.</sub></p>").fadeIn("300").delay("1000").fadeOut("300");
		}

		// and the answer is wrong
		else if(($("#answer").val()).toLowerCase() != answer) {
			// display the result
			$("#result").html("<p>Try again!</p>").fadeIn("300").delay("1000").fadeOut("300");
		}

		questioncount += 1;
		$("#questioncount").html(questioncount);
	});

	//Read in keypresses
	$(document).keypress(function(e) {
		// If the enter key is pressed while in the textbox
	    if(e.which == 13 && $("#answer").is(":focus")) {
	    	// and the answer is correct
	        if(($("#answer").val()).toLowerCase() == answer) {
	        	// update the score, then show the next button and result
	        	score += 1;
	        	$("#score").html(score);
				$("#next").fadeIn("300");
				$("#answer").blur();
				$("#result").html("<p>You got it right!<br><sub>Press space to continue.</sub></p>").fadeIn("300").delay("1000").fadeOut("300");
			}

			// and the answer is not correct
			else if(($("#answer").val()).toLowerCase() != answer) {
				// show the result
				$("#result").html("<p>Try again!</p>").fadeIn("300").delay("1000").fadeOut("300");
			}
			
			// update the question count regardless

			questioncount += 1;
			$("#questioncount").html(questioncount);
			return false;
	    }

	    // If the space bar is pressed while not typing in the textbox
	    if(e.which == 32 && !($("#answer").is(":focus"))) {
	    	if(checkEnabled() == true) {
		    	// Skip the question
		    	$("#next").fadeOut("300");
				$("#question").fadeIn("300").html("Loading next question...").delay("1000");
		       	nextQuestion();
		       	return false;
	       	}

	       	else {
	       		alert("Please select at least one tense, one person, one verb ending, and one verb type.");
	       	}
	    }
	});

	// Clicking the peek button shows the answer for 2 seconds
	$("#peek").click(function() {
		$("#result").html("<p>"+answer+"</p>").fadeIn("300").delay("2000").fadeOut("300");
	});

	//update the enabled / disabled persons variable every time the checklist is clicked
	$("input[type=checkbox]").click(function() {
		updateTensesPersons();
	});

});