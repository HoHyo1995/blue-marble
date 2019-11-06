	window.addEventListener("load",function() {
		// 게임 하는 인원 수
		let currentPeople = 0;
		let pl = 1;
		let walking = {};
		let player1 = {
				beforePoint : 21,
				afterPoint : 21,
				// 현재 위치
				nowPoint : 21,
				afterId : "#p21",
				beforeId : "#p21",
				// 말
				picture : "p1",
				// 무인도
				desertIsland : 0,
				// 시작 돈
				money : 3000000
			}
		let player2 = {
				beforePoint : 21,
				afterPoint : 21,
				nowPoint : 21,
				afterId : "#p21",
				beforeId : "#p21",
				picture : "p2",
				desertIsland : 0,
				money : 3000000
			}
		let player3 = {
				beforePoint : 21,
				afterPoint : 21,
				nowPoint : 21,
				afterId : "#p21",
				beforeId : "#p21",
				picture : "p3",
				desertIsland : 0,
				money : 3000000
			}
		let player4 = {
				beforePoint : 21,
				afterPoint : 21,
				nowPoint : 21,
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
				console.log("완주");
			}
			
			document.querySelector("#point").value = walking.afterPoint;
			// 무인도를 밟았을 시 
			if(walking.nowPoint == 31) {
				if(walking.desertIsland == 0){
					console.log("무인도1");
					walking.desertIsland = walking.desertIsland+1;
					playerChange();
					doubleDice(dic1,dic2);
				}else if(walking.desertIsland == 1){
					console.log("무인도2");
					walking.desertIsland = walking.desertIsland+1;
					playerChange();
					doubleDice(dic1,dic2);
				}else if(walking.desertIsland == 2){
					console.log("무인도3");
					walking.desertIsland = 0;
					walking.nowPoint = 0;
					playerChange();
					doubleDice(dic1,dic2);
				}
			} else if(walking.nowPoint != 31){
				// 말을 이동시킵니다.
				moveing();
				playerChange();
				doubleDice(dic1,dic2);
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
		// 플레이어 차례 바꾸는 메소드(더블일 경우 항상 doubleDice함수보다 먼저 나와야한다)
		function playerChange() {
			pl = pl+1;
			if(pl>currentPeople) {
				pl = 1;
			}
		}
		// 주사위 더블일 경우 현 플레이어가 한번 더 하는 메소드
		function doubleDice(dic1, dic2) {
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
		walking.beforePoint = walking.afterPoint;
		walking.nowPoint = walking.beforePoint;
		}
		//------------------------------------------------------------------------------맵 데이터
		let MapData = [
			{type : null , title : null},
			{type : "money" , title : "사회복지"},
			{type : "city" , title : "부에노스", owner : null},
			{type : "chance", title : "황금열쇠"},
			{type : "city" , title : "상파울루", owner : null},
			{type : "city" , title : "시드니", owner : null},
			{type : "island" , title : "부산", owner : null},
			{type : "city" , title : "하와이", owner : null},
			{type : "city" , title : "리스본", owner : null},
			{type : "island" , title : "엘리자베스", owner : null},
			{type : "city" , title : "마드리드", owner : null},
			{type : "space" , title : "우주여행"},
			{type : "city" , title : "도쿄", owner : null},
			{type : "island" , title : "컬럼비아호", owner : null},
			{type : "city" , title : "파리", owner : null},
			{type : "city" , title : "로마", owner : null},
			{type : "chance" , title : "황금열쇠"},
			{type : "city" , title : "런던", owner : null},
			{type : "city" , title : "뉴욕", owner : null},
			{type : "pay" , title : "기부"},
			{type : "island" , title : "서울", owner : null},
			{type : "home" , title : "출발지"},
			{type : "city" , title : "타이베이", owner : null},
			{type : "chance" , title : "황금열쇠"},
			{type : "city" , title : "베이징", owner : null},
			{type : "city" , title : "마닐라", owner : null},
			{type : "island" , title : "제주", owner : null},
			{type : "city" , title : "싱가포르", owner : null},
			{type : "chance" , title : "황금열쇠"},
			{type : "city" , title : "카이로", owner : null},
			{type : "city" , title : "이스탄불", owner : null},
			{type : "desert_island" , title : "무인도"},
			{type : "city" , title : "아테네", owner : null},
			{type : "chance" , title : "황금열쇠"},
			{type : "city" , title : "코펜하겐", owner : null},
			{type : "city" , title : "스톡홀름", owner : null},
			{type : "island" , title : "여객기"},
			{type : "city" , title : "베른", owner : null},
			{type : "city" , title : "베를린", owner : null},
			{type : "city" , title : "오타와", owner : null}
		];
		//--------------------------------------------------------------맵데이터 끝
	});