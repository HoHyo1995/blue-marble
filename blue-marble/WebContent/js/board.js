	window.addEventListener("load",function() {
		// 게임 하는 인원 수
		let currentPeople = 0;
		let pl = 1;
		let walking = {};
		let player1 = {
				beforePoint : 21,
				afterPoint : 21,
				afterId : "#p21",
				beforeId : "#p21",
				picture : "p1",
				desertIsland : 0,
				money : 3000000
			}
		let player2 = {
				beforePoint : 21,
				afterPoint : 21,
				afterId : "#p21",
				beforeId : "#p21",
				picture : "p2",
				desertIsland : 0,
				money : 3000000
			}
		let player3 = {
				beforePoint : 21,
				afterPoint : 21,
				afterId : "#p21",
				beforeId : "#p21",
				picture : "p3",
				desertIsland : 0,
				money : 3000000
			}
		let player4 = {
				beforePoint : 21,
				afterPoint : 21,
				afterId : "#p21",
				beforeId : "#p21",
				picture : "p4",
				desertIsland : 0,
				money : 3000000
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
			//let dic1 = Math.floor((Math.random() * 6) + 1);***********************************************************
			let dic1 = 6;
			$("#oneDice").show();
			$("#oneDice").attr("src","/blue-marble/images/"+dic1+".jpg");
			//let dic2 = Math.floor((Math.random() * 6) + 1);**********************************************************
			let dic2 = 4;
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
				console.log("완주");
			}
			
			document.querySelector("#point").value = walking.afterPoint;
			
			// 말을 이동시킵니다.
			walking.afterId = "#p" + walking.afterPoint;
			walking.beforeId = "#p" + walking.beforePoint;
			$("."+walking.picture).remove();
			$(walking.afterId).append("<input type = 'image' src='/blue-marble/images/"+walking.picture+".png' class='picture "+walking.picture+"'>");
			walking.beforePoint = walking.afterPoint;
			// 무인도를 밟았을 시 (더블로 들어갔을때 제외)*************************************무인도 진행 중************ 안움직이게하기
			if(walking.beforeId == "#p31") {
				if(walking.desertIsland == 0){
					console.log("무인도1");
					walking.afterId = "#p31";
					walking.desertIsland = walking.desertIsland+1;
				}else if(walking.desertIsland == 1){
					console.log("무인도2");
					walking.desertIsland = walking.desertIsland+1;
				}else if(walking.desertIsland == 2){
					console.log("무인도3");
					walking.desertIsland = 0;
				}
			}
			// 플레이어 차례 바꾸기
			pl = pl+1;
			if(pl>currentPeople) {
				pl = 1;
			}
			// 더블일 경우
			if(dic1 == dic2) {
				console.log("더블");
				pl = pl-1;	
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
	});