var luke = {
	hp: 100,
	attack: 15,
	ca: 5
};
var obiWan = {
	hp: 100,
	attack: 8,
	ca: 10
};
var mal = {
	hp: 220,
	attack: 5,
	ca: 40
};
var sidious = {
	hp: 500,
	attack: 5,
	ca: 20
};
var characterChoice = '';
var defenderChoice = '';
var caPower = 0;
var attackPower = 0;
var heroHealth = 0;
var villainHealth = 0;
var characterChosen = false;
var enemyChosen = false;
characterChoosing();
enemyChoosing();
battle();

function characterChoosing() {
	$('.attkBtn').hide();
	$('.char').on('click', function (){
		var characterChoice = $(this);
		$(this).appendTo('.yourChar');
		$(this).removeClass('.avail');
		$(this).addClass('hero');
		$('.charSelect').appendTo('.enemies');

		if (characterChoice.is('#luke')) {
			$('#obiWan').addClass('villain');
			$('#mal').addClass('villain');
			$('#sidious').addClass('villain');
			var characterChoice = luke;
		} else if (characterChoice.is('#obiWan')) {
			$('#luke').addClass('villain');
			$('#mal').addClass('villain');
			$('#sidious').addClass('villain');
			var characterChoice = obiWan;
		} else if (characterChoice.is('#mal')) {
			$('#obiWan').addClass('villain');
			$('#luke').addClass('villain');
			$('#sidious').addClass('villain');
			var characterChoice = mal;
		} else {
			$('#obiWan').addClass('villain');
			$('#mal').addClass('villain');
			$('#luke').addClass('villain');
			var characterChoice = sidious;
		};
		attackPower = characterChoice.attack;
		heroHealth = characterChoice.hp;
		$('.heroScore').html(`${heroHealth}`);
		$('.heroAttack').html(`${attackPower}`);
		$('.char').off();
	})
};

function enemyChoosing() {
	$(document).on('click', '.villain', function(){
		var defenderChoice = $(this);
		$(this).appendTo('.defender');
		$(this).addClass('villainToAttack');
		if (defenderChoice.is('#luke')) {
			var defenderChoice = luke;
		} else if (defenderChoice.is('#obiWan')) {
			var defenderChoice = obiWan;
		} else if (defenderChoice.is('#mal')) {
			var defenderChoice = mal;
		} else {
			var defenderChoice = sidious;
		};
		caPower = defenderChoice.ca;
		villainHealth = defenderChoice.hp;
		$('.villainScore').html(`${villainHealth}`);
		$('.villainAttack').html(`${caPower}`);
		$('.attkBtn').show();
	});
};

function battle() {
	$('.attkBtn').on('click', function (){
		if(villainHealth > 0 && heroHealth > 0){
			villainHealth = villainHealth - attackPower;
			if(villainHealth < 0) {
				villainHealth = 0;
			}
			$('.villainScore').html(`${villainHealth}`);
			villainDead();
			if(villainHealth > 0) {
				heroHealth = heroHealth - caPower;
				if(heroHealth < 0) {
					heroHealth = 0;
				}
				$('.heroScore').html(`${heroHealth}`);
				gameOver();
			}
			attackPower = attackPower + attackPower;
			$('.heroAttack').html(`${attackPower}`);
		}
	});
};

function villainDead() {
	if(heroHealth > 0 && villainHealth <= 0) {
		$('.villainToAttack').hide();
		$('.villainToAttack').removeClass('.villainToAttack');
		enemyChoosing();
	}
}

function gameOver() {
	if(villainHealth > 0 && heroHealth <= 0){
		$('.bodyContainer').html('<div>You Lose</p>');
	}
};
