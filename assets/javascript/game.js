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
var vader = {
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
var battling = false;
var enemiesBeaten = 0;

$(document).ready(function() {
	$('.attkBtn').hide();
	$('.charContain').hide();
	$('.enemyContain').hide();
	$('.scoreContainer').hide();
});

characterChoosing();
enemyChoosing();
battle();

function characterChoosing() {
	$(document).on('click', '.avail', function (event){
		$('.charContain').show();
		$('.enemyContain').show();
		$('.scoreContainer').show();
		var characterChoice = $(event.target);
		$('.yourChar').prepend($(event.target).parent());
		$('.avail').removeClass('avail');
		$(characterChoice).addClass('hero');
		$(characterChoice).parent().removeClass('img-hover');
		if (characterChoice.is('#luke')) {
			$('#obiWan').addClass('villain');
			$('#vader').addClass('villain');
			$('#sidious').addClass('villain');
			$('.villain').parent().prependTo('.enemies')
			$('.heroNameTitle').text('Luke');
			var characterChoice = luke;
		} else if (characterChoice.is('#obiWan')) {
			$('#luke').addClass('villain');
			$('#vader').addClass('villain');
			$('#sidious').addClass('villain');
			$('.villain').parent().prependTo('.enemies')
			$('.heroNameTitle').text('Obi Wan');
			var characterChoice = obiWan;
		} else if (characterChoice.is('#vader')) {
			$('#obiWan').addClass('villain');
			$('#luke').addClass('villain');
			$('#sidious').addClass('villain');
			$('.villain').parent().prependTo('.enemies')
			$('.heroNameTitle').text('Darth Vader');
			var characterChoice = vader;
		} else {
			$('#obiWan').addClass('villain');
			$('#vader').addClass('villain');
			$('#luke').addClass('villain');
			$('.villain').parent().prependTo('.enemies')
			$('.heroNameTitle').text('Darth Sidious');
			var characterChoice = sidious;
		};
		$('.charImg').removeClass('col-sm-3').addClass('col-md-4');
		$(event.target).parent().addClass('heroParent col-12').removeClass('col-md-4 col-6');
		attackPower = characterChoice.attack;
		heroHealth = characterChoice.hp;
		$('.heroScore').text(`HP: ${heroHealth}`);
		$('.heroAttack').text(`Attack: ${attackPower}`);
		$('.instructions').text('Choose Your Villain');
	})
};

function enemyChoosing() {
	$(document).on('click', '.villain', function(event){
		if (battling === false) {
			$('.villain').parent().removeClass('col-md-4 col-12').addClass('img-hover col-6');
			var defenderChoice = $(event.target);
			$(defenderChoice).addClass('villainToAttack');
			$('.charImg').removeClass('villainParent');
			$(event.target).parent().addClass('villainParent col-12').removeClass('col-6 col-md-4');
			if (defenderChoice.is('#luke')) {
				var defenderChoice = luke;
				$('.villainNameTitle').text('Luke');
				$('#obiWan').removeClass('villainToAttack');
				$('#vader').removeClass('villainToAttack');
				$('#sidious').removeClass('villainToAttack');
			} else if (defenderChoice.is('#obiWan')) {
				var defenderChoice = obiWan;
				$('.villainNameTitle').text('Obi Wan');
				$('#luke').removeClass('villainToAttack');
				$('#vader').removeClass('villainToAttack');
				$('#sidious').removeClass('villainToAttack');
			} else if (defenderChoice.is('#vader')) {
				var defenderChoice = vader;
				$('.villainNameTitle').text('Darth Vader');
				$('#obiWan').removeClass('villainToAttack');
				$('#luke').removeClass('villainToAttack');
				$('#sidious').removeClass('villainToAttack');
			} else {
				var defenderChoice = sidious;
				$('.villainNameTitle').text('Darth Sidious');
				$('#obiWan').removeClass('villainToAttack');
				$('#vader').removeClass('villainToAttack');
				$('#luke').removeClass('villainToAttack');
			};
			caPower = defenderChoice.ca;
			villainHealth = defenderChoice.hp;
			$('.villainScore').text(`HP: ${villainHealth}`);
			$('.villainAttack').text(`Counter Attack: ${caPower}`);
			$('.attkBtn').show();
			$('.instructions').html('When you attack, the enemy will strike back!');
			$('.enemies').append($('.villain').parent());
			$('.enemies').prepend($('.villainToAttack').parent());
			$('.villainToAttack').parent().removeClass('img-hover');
		}
	});
};

function battle() {
	$('.attkBtn').on('click', function (){
		battling = true;
		$('.villain').parent().removeClass('img-hover');
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
				gameOverLose();
			}
			attackPower = attackPower + attackPower;
			$('.heroAttack').html(`${attackPower}`);
		}
	});
};

function villainDead() {
	if(heroHealth > 0 && villainHealth <= 0) {
		$('.villainNameTitle').text('Villain');
		$('.villainAttack').text(0);
		$('.villainToAttack').parent().hide();
		$('.villainToAttack').removeClass('.villainToAttack');
		enemiesBeaten++;
		battling = false;
		gameOverWin();
		$('.villain').parent().addClass('img-hover');
		enemyChoosing();
	}
}

function gameOverLose() {
	if(villainHealth > 0 && heroHealth <= 0){
		$('.gameContainer').after('<div class="container"><div class="row gameOverModal youLose"><p class="col-12 gameOverText">You Lose!</p><button class="gameOverButton col-12 col-md-6">Play Again?</button></div></div>');
		$('.gameContainer').hide();
		$('.instructions').hide();
		restartGame();
	}
};

function gameOverWin() {
	if(heroHealth > 0 && villainHealth <= 0 && enemiesBeaten === 3){
		$('.gameContainer').after('<div class="container"><div class="row gameOverModal youWin"><p class="col-12 gameOverText">You Win!</p><button class="gameOverButton col-12 col-md-6">Play Again?</button></div></div>');
		$('.gameContainer').hide();
		$('.instructions').hide();
		restartGame();
	}
};

function restartGame() {
	$('.gameOverButton').on('click', function () {
		$('.gameOverModal').hide();
		$('.instructions').show();
		$('.gameContainer').show();
		$('.charImg').show();
		$('.charSelect').append($('.charImg'));
		$('.char').removeClass('hero villain villainToAttack');
		$('.char').addClass('avail');
		$('.heroParent').removeClass('col-12 col-md-6 col-lg-4');
		$('.charImg').addClass('img-hover col-sm-3 col-6').removeClass('col-md-4 heroParent villainParent');
		$('.instructions').text('Choose Your Hero');
		$('.villainNameTitle').text('Villain');
		$('.heroNameTitle').text('Hero');
		$('.heroScore').text(0);
		$('.heroAttack').text(0);
		$('.villainScore').text(0);
		$('.villainAttack').text(0);
		$('.attkBtn').hide();
		$('.charContain').hide();
		$('.enemyContain').hide();
		$('.scoreContainer').hide();
		battling = false;
		enemiesBeaten = 0;
	})
}
