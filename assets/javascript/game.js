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
		console.log(`Hero HP: ${heroHealth}`);
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
		console.log(`Enemy HP: ${villainHealth}`);
		$('.attkBtn').show();
	});
};

function battle() {
	$('.attkBtn').on('click', function (){
		if(villainHealth > 0 && heroHealth > 0){
			villainHealth = villainHealth - attackPower;
			console.log(`Enemy HP: ${villainHealth}`);
			heroHealth = heroHealth - caPower;
			console.log(`Hero HP: ${heroHealth}`);
			attackPower = attackPower + attackPower;
			console.log(`Attack Power: ${attackPower}`);
		}
	});
};
