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
	var heroHealth = '';
	var villainHealth = ''

	$('.char').on('click', function (){
		var characterChoice = $(this);
		$(this).appendTo('.yourChar');
		$(this).removeClass('.avail');
		$(this).addClass('hero');
		$('.charSelect').appendTo('.enemies');

		if (characterChoice.is('#luke')) {
			var characterChoice = luke;
		} else if (characterChoice.is('#obiWan')) {
			var characterChoice = obiWan;
		} else if (characterChoice.is('#mal')) {
			var characterChoice = mal;
		} else {
			var characterChoice = sidious;
		};
		console.log(characterChoice.hp);
		$('.char').off();

		var attackPower = characterChoice.attack
		$('.enemies').on('click', '.avail', function(){
		var defenderChoice = $(this);
		$(this).appendTo('.defender');
		$(this).addClass('villain');
		if (defenderChoice.is('#luke')) {
			var defenderChoice = luke;
		} else if (defenderChoice.is('#obiWan')) {
			var defenderChoice = obiWan;
		} else if (defenderChoice.is('#mal')) {
			var defenderChoice = mal;
		} else {
			var defenderChoice = sidious;
		};
		console.log(defenderChoice.hp);

			
			$('.attkBtn').on('click', function (){
				
				if(defenderChoice.hp > 0 && characterChoice.hp > 0){
					defenderChoice.hp = defenderChoice.hp - characterChoice.attack;
					console.log(defenderChoice.hp);
					characterChoice.hp = characterChoice.hp - defenderChoice.ca;
					console.log(characterChoice.hp);
					characterChoice.attack = characterChoice.attack + attackPower;

					if (defenderChoice.hp < 1){
						$('.villain').remove();
					} 

					if (characterChoice.hp < 1) {
						$('.fightSection').after('<p>You Lose!</p>');
					}
				}
			});
			// heroHealth = characterChoice.hp
			// $('.heroHealth').html('Hero Health: ' + heroHealth)
			// villainHealth = defenderChoice.hp
			// $('villainHealth').html('Villain Health: ' + villainHealth)
		});
	});
});