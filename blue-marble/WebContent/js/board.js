	window.addEventListener("load",function() {
		// 게임 하는 인원 수
		let currentPeople = 0;
		let pl = 1;
		let walking = {};
		let socialWelfareFund = 0;
		let player1 = {
				beforePoint : 21,
				afterPoint : 21,
				// 현재 위치
				nowPoint : 21,
				afterId : "#p21",
				beforeId : "#p21",
				// 말
				picture : "p1",
				// 무인도(2가되면 0으로 초기화 되어 다음턴에 탈출이 가능합니다.)
				desertIsland : 0,
				// 시작 돈
				money : 3000000,
				// 바퀴 수 (1바퀴를 돌때마다 월급 20만원을 받을 수 있다)****** 나중에 필요할 듯 하다
				turn : 0,
				// 월급 유무 판단(1이 되면 월급을 받아서 2부터시작하고 사회복지기금 접수처를 지나면 0이된다 )
				salaryCount : 2
			}
		let player2 = {
				beforePoint : 21,
				afterPoint : 21,
				nowPoint : 21,
				afterId : "#p21",
				beforeId : "#p21",
				picture : "p2",
				desertIsland : 0,
				money : 3000000,
				turn : 0,
				salaryCount : 2
			}
		let player3 = {
				beforePoint : 21,
				afterPoint : 21,
				nowPoint : 21,
				afterId : "#p21",
				beforeId : "#p21",
				picture : "p3",
				desertIsland : 0,
				money : 3000000,
				turn : 0,
				salaryCount : 2
			}
		let player4 = {
				beforePoint : 21,
				afterPoint : 21,
				nowPoint : 21,
				afterId : "#p21",
				beforeId : "#p21",
				picture : "p4",
				desertIsland : 0,
				money : 3000000,
				turn : 0,
				salaryCount : 2
			}
		
		$("#oneDice").hide();
		$("#twoDice").hide();
		let play = document.querySelector("#play");
		play.addEventListener("click", function() {
			// pl은 현재 진행중인 사용자
			// walking도 동일
			if(pl == 1){
				walking = player1
				console.log("player1");
			} else if(pl == 2) {
				walking = player2
				console.log("player2");
			} else if(pl == 3) {
				walking = player3
				console.log("player3");
			} else if(pl == 4) {
				walking = player4
				console.log("player4");
			}
			// 주사위 1~6 두개
			let dic1 = Math.floor((Math.random() * 6) + 1);
			//let dic1 = 1; // 실험
			$("#oneDice").show();
			$("#oneDice").attr("src","/blue-marble/images/"+dic1+".jpg");
			let dic2 = Math.floor((Math.random() * 6) + 1);
			//let dic2 = 1; // 실험
			$("#twoDice").show();
			$("#twoDice").attr("src","/blue-marble/images/"+dic2+".jpg");
			document.querySelector("#dice").value = dic1+dic2;
			// 두개의 주사위의 합
			totalDice = dic1+dic2;
			if (walking.beforePoint + (totalDice) < 41) {
				walking.afterPoint = walking.beforePoint + (totalDice);
				console.log("afterPoint", walking.afterPoint);
			} else {
				walking.afterPoint = walking.beforePoint + (totalDice) - 40;
				console.log("afterPoint", walking.afterPoint);
			}	
			document.querySelector("#point").value = walking.afterPoint;
			// 무인도를 밟았을 시 
			if(walking.nowPoint == 31) {
				if(walking.desertIsland == 0){
					console.log("무인도1");
					walking.desertIsland = walking.desertIsland+1;
					playerChangeDouble(dic1,dic2);
				}else if(walking.desertIsland == 1){
					console.log("무인도2");
					walking.desertIsland = walking.desertIsland+1;
					playerChangeDouble(dic1,dic2);
				}else if(walking.desertIsland == 2){
					console.log("무인도3");
					walking.desertIsland = 0;
					walking.nowPoint = 0;
					playerChangeDouble(dic1,dic2);
				}
			} else if(walking.nowPoint != 31){ // 평소에  말 이동
				// 말을 이동시킵니다.
				moveing();
				// 돈 내는 곳
				payFund();
				// 돈 받는곳
				receiveFund();
				playerChangeDouble(dic1,dic2);
			}
			
			
			});
		
		
		$(".selectPeopleBtn").hide();
		// 게임시작버튼 누를시
		$("#startBtn").click(function(){
			$("#startBtn").hide();
			$(".selectPeopleBtn").show();
			$("#selectPeople2").click(function(){
				currentPeople = 2;
				$(".selectPeopleBtn").hide()
				$(".p3").remove()
				$(".p4").remove()
			});
			$("#selectPeople3").click(function(){
				currentPeople = 3;
				$(".selectPeopleBtn").hide()
				$(".p4").remove()
			});
			$("#selectPeople4").click(function(){
				currentPeople = 4;
				$(".selectPeopleBtn").hide()
			});
			
		});
		// 플레이어 차례 바꾸는 메소드+더블
		function playerChangeDouble(dic1, dic2) {
			pl = pl+1;
			if(pl>currentPeople) {
				pl = 1;
			}
			// 주사위 더블일 경우 현 플레이어가 한번 더 하는 함수
			if(dic1 == dic2) {
				// 중첩if는 더블로 무인도에 들어 갈 경우 다음 타자에게 바로넘긴다.
				if(walking.afterPoint == 31) {
					console.log("더블로 무인도 입성이므로 다음 차례에게 넘어갑니다.")
				}else{
					// 무인도에서 더블인 경우는 바로 한번 더 주사위를 던져 빠져 나갈 수 있다.	
					if(walking.nowPoint == 31){
							walking.nowPoint = 0;
							console.log("더블");
							pl = pl-1;	
							walking.desertIsland = 0;
						} else{
							console.log("더블");
							pl = pl-1;	
						}	
				}
			}
		}
		
		
		// 말을 이동시키는 함수
		function moveing(){
		walking.afterId = "#p" + walking.afterPoint;
		walking.beforeId = "#p" + walking.beforePoint;
		$("."+walking.picture).remove();
		$(walking.afterId).append("<input type = 'image' src='/blue-marble/images/"+walking.picture+".png' class='picture "+walking.picture+"'>");
		// 월급기능
		salary();
		walking.beforePoint = walking.afterPoint;
		walking.nowPoint = walking.beforePoint;
		}
		// 월급 기능 함수
		function salary(){
			if(walking.afterPoint >= 21) {
				walking.salaryCount = walking.salaryCount+1;
				if(walking.salaryCount == 1) {
					walking.turn = walking.turn+1;
					walking.money = walking.money+200000;
					walking.salaryCount = walking.salaryCount+1;
					alert(walking.picture+"님월급 20만원이 들어왔습니다.");
					//console.log("salaryCount",walking.salaryCount);
					console.log(walking.picture,"님의money는",walking.money);
					console.log(walking.picture,"님의turn 횟수는",walking.turn);
				}
			} else if(walking.afterPoint<21) {
				walking.salaryCount = 0;
				//console.log("salaryCount",walking.salaryCount);
			}
		}
		// 사회복지기금(19)을 밟았을 시 사회복지기금을 내야하는 메소드
		function payFund(){
			if(walking.nowPoint == 19){
				walking.money = walking.money-150000;
				socialWelfareFund = socialWelfareFund+150000;
				console.log(walking.picture,"money는",walking.money);
				console.log("socialWelfareFund(사회복지기금)",socialWelfareFund);
			}
		}
		// 사회복지기금(1)을 밟았을 시 모여진 사회복지기금을 받는 메소드
		function receiveFund() {
			if(walking.nowPoint == 1){
				if(socialWelfareFund != 0){
					walking.money = walking.money + socialWelfareFund;
					socialWelfareFund = 0;
					console.log(walking.picture,"money는",walking.money);
					console.log("socialWelfareFund(사회복지기금)",socialWelfareFund);
				}else{
					console.log("축적된 사회복지기금이 0원 입니다.")
				}
			}
		}	
		
		//------------------------------------------------------------------------------맵 데이터
		let map =[{title : "사회복지기금", point : 19, owner : null, purchase : 0, toll : 0},
			{title : "사회복지기금접수처", point : 1, owner : null, purchase : 0, toll : 0 },
			{title : "우주여행", point : 11, owner : null, purchase : 0, toll: 0},
			{title : "컬럼비아호", point : 13, owner : null, purchase : 450000, toll: 400000}
		];
		map[1].money = map[0].money;
		
		//--------------------------------------------------------------맵데이터 끝
	});