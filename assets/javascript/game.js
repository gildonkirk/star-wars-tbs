$(document).ready(function() {
	var luke = {
		hp: 100,
		attack: 15,
		ca: 5
	};
	var obiWan = {
		hp: 120,
		attack: 8,
		ca: 10
	};
	var mal = {
		hp: 180,
		attack: 5,
		ca: 25
	};
	var sidious = {
		hp: 150,
		attack: 5,
		ca: 20
	};
	var characterChoice = '';
	var defenderChoice = '';
	// shows whether it is your turn or defenders turn to attack
	var isAttacking = true; 


	$('.char').on('click', function (){
		var characterChoice = $(this);
		$(this).appendTo('.yourChar');
		$(this).removeClass('.avail');
		$(this).addClass('hero');
		$('.charSelect').appendTo('.enemies');
		if (characterChoice.is('#luke')) {
			var characterChoice = luke;
		} else if (characterChoice.is('obiWan')) {
			var characterChoice = obiWan;
		} else if (characterChoice.is('mal')) {
			var characterChoice = mal;
		} else {
			var characterChoice = sidious;
		};
		console.log(characterChoice.hp);
		$('.char').off();
	});

	$('.enemies').on('click', '.avail', function(){
		var defenderChoice = $(this);
		$(this).appendTo('.defender');
		$(this).addClass('villain');
		console.log(defenderChoice.hp);
	});

	$('button').on('click', function damage(){
		if(defenderChoice.hp > 0 && characterChoice.hp > 0){
			defenderChoice.hp = defenderChoice.hp - characterChoice.attack;
			characterChoice.hp = characterChoice.hp - defenderChoice.ca;
			
		} else if (defenderChoice.hp <= 0){
			$('.villain').remove();
		} else {

		}
	});
	// $('.enemiesAvailable').on('click', function(){
	// 	$
	// )};
	// $('.char').on('click', function(){
	// 	$(this).appendTo('.defender');
	// 	$('.charSelect').off();
	// });
});