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
var enemiesBeaten = 0;
characterChoosing();
enemyChoosing();
battle();

function characterChoosing() {
	$('.attkBtn').hide();
	$(document).on('click', '.avail', function (event){
		var characterChoice = $(event.target);
		$('.yourChar').append(characterChoice);
		$('.avail').removeClass('avail');
		$(characterChoice).addClass('hero');

		if (characterChoice.is('#luke')) {
			$('#obiWan').addClass('villain').appendTo('.enemies');
			$('#mal').addClass('villain').appendTo('.enemies');
			$('#sidious').addClass('villain').appendTo('.enemies');
			var characterChoice = luke;
		} else if (characterChoice.is('#obiWan')) {
			$('#luke').addClass('villain').appendTo('.enemies');
			$('#mal').addClass('villain').appendTo('.enemies');
			$('#sidious').addClass('villain').appendTo('.enemies');
			var characterChoice = obiWan;
		} else if (characterChoice.is('#mal')) {
			$('#obiWan').addClass('villain').appendTo('.enemies');
			$('#luke').addClass('villain').appendTo('.enemies');
			$('#sidious').addClass('villain').appendTo('.enemies');
			var characterChoice = mal;
		} else {
			$('#obiWan').addClass('villain').appendTo('.enemies');
			$('#mal').addClass('villain').appendTo('.enemies');
			$('#luke').addClass('villain').appendTo('.enemies');
			var characterChoice = sidious;
		};
		attackPower = characterChoice.attack;
		heroHealth = characterChoice.hp;
		$('.heroScore').html(`${heroHealth}`);
		$('.heroAttack').html(`${attackPower}`);
	})
};

function enemyChoosing() {
	$(document).on('click', '.villain', function(event){
		var defenderChoice = $(event.target);
		$(defenderChoice).addClass('villainToAttack');
		if (defenderChoice.is('#luke')) {
			var defenderChoice = luke;
			$('#obiWan').removeClass('villainToAttack');
			$('#mal').removeClass('villainToAttack');
			$('#sidious').removeClass('villainToAttack');
		} else if (defenderChoice.is('#obiWan')) {
			var defenderChoice = obiWan;
			$('#luke').removeClass('villainToAttack');
			$('#mal').removeClass('villainToAttack');
			$('#sidious').removeClass('villainToAttack');
		} else if (defenderChoice.is('#mal')) {
			var defenderChoice = mal;
			$('#obiWan').removeClass('villainToAttack');
			$('#luke').removeClass('villainToAttack');
			$('#sidious').removeClass('villainToAttack');
		} else {
			var defenderChoice = sidious;
			$('#obiWan').removeClass('villainToAttack');
			$('#mal').removeClass('villainToAttack');
			$('#luke').removeClass('villainToAttack');
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
				// gameOverLose();
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
		enemiesBeaten++;
		// gameOverWin();
		enemyChoosing();
	}
}

function gameOverLose() {
	if(villainHealth > 0 && heroHealth <= 0){
		$('.gameContainer').after('<div class="gameOverModal youLose"><p class="gameOverText">You Lose!</p><button class="gameOverButton">Play Again?</button></div>');
		$('.gameContainer').hide();
		// restartGame();
	}
};

function gameOverWin() {
	if(heroHealth > 0 && villainHealth <= 0 && enemiesBeaten === 3){
		$('.gameContainer').after('<div class="gameOverModal youWin"><p class="gameOverText">You Win!</p><button class="gameOverButton">Play Again?</button></div>');
		$('.gameContainer').hide();
		// restartGame();
	}
};

function restartGame() {
	$('.gameOverButton').on('click', function () {
		$('.charSelect').append('.villain');
		$('.gameContainer').show();
	})
}
