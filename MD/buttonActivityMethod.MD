층을 입력받아 층의 버튼이 활성화되는 메서드 flow
===
### 1. index.html
```javascript
   <button id='layer5' onclick="goToDistLayer('layer5')">5층</button>
```
목표 층의 object 를 선언한 뒤 onclick 이벤트를 통해 목표 층을 인자로 넘겨준다.

### 2. moving.js
```javascript
function goToDistLayer(layer) {
    let selectedElevator = SchedulerFactory(SCHEDULES.throughput, layer);
    let distLayer = document.getElementById(layer);
    moving(selectedElevator, distLayer);
}
```
SchedulerFactory 에 스케줄과 목표층을 던짐.(추상 팩토리 메서드 패턴)
    - 추후 유지보수 및 확장성을 위해 넣어 주었다. 전략에 따라 엘리베이터의 움직임을 조절할 수 있음.  
스케줄링을 통과해 선택된 최적의 엘리베이터와 목표층을 moving 함수에 넣어 실제로 움직여 준다.

### 3. SchedulerFactory.js
```javascript
function SchedulerFactory(inputScheduler, layer) {
    let scheduler;
    switch (inputScheduler) {
        case 'THROUGHPUT':
            scheduler = ThroughputScheduler.findElevator(layer);
            break;
        //스트래터지패턴. 이후 엘리베이터 정책 추가용
        // case "...":
    }
    return scheduler;
}
```
이후 타입스크립트를 사용해 abstract factory 클래스를 구현할 예정.
추상 팩토리 메서드로 여러 스케줄링들을 만들었다면 Strategy 패턴을 이용해 스케줄링 전략을 설정.

### 4. Scheduler.js
```javascript
const ThroughputScheduler = {
    findElevator(layer) {
        ...
        let selectedElevator = null;
        if (check[nowL]) return null;
        //엘리베이터의 상태를 순회. 절대값으로 가장 가까운 녀석을 찾는다.
        for (let i = 0; i < elevatorList.length; i++) {
            let nowValue = nowL - +elevatorList[i].curLayer;
            let nowLock = elevatorList[i].isLock;
            //lock 을 걸어 움직이는 객체라면 로직을 타지 않도록 해준다.
            if(nowLock) {continue;}
            ...
            if (minL >= nowValue) { ...selectedElevator = elevatorList[i].getId;}
        }
        return selectedElevator;}};
```
스캐줄러 팩토리에서 전략과 정책을 유동적으로 선택할 수 있도록(Strategy pattern) 설정했다면
실제로 전략과 정책에 대한 구현부분이 된다.

### 5. moving function
```javascript
function moving(e, layerButton) {
    ...
    if (e === null) {return;}
    check[elevatorList[movingE - 1].curLayer]--;
    elevatorList[movingE - 1].isLock = true;
    버튼 비활성화
    ...
    if(movingE == 1){
        if(distLayer > preElevatorLayer){
            time1 = setInterval(function () {
                if (clearTime1 >= 67 * (distLayer - elevatorList[movingE - 1].curLayer)) {
                    clearTimeout(time1);
                    setTimeout(function () {
                        3초 대기 로직 및 초기화...
                    }, 3000);
                }
                else {
                    e.style.marginTop = -elevatorList[movingE - 1].curHeight.toString().replace(/[^0-9]/g, '') - clearTime1 + 'px';
                    clearTime1 += 5;
                }
            }, 50);
        }
```
스케줄링 정책과 전략을 통해 최적의 엘리베이터를 선택한 이후의 로직.
만약 선택된 Elevator 가 null 이라면 최적의 엘리베이터가 없거나, 현재 층에 있는 경우므로 return 을 해준다.
그게 아니라면 check 배열을 통해 각 층에 몇 대의 엘리베이터가 있는지 갱신해 주고
선택된 엘리베이터에 Lock 을 걸어준다. (버튼 또한 비활성화)

그 후 선택된 Elevator 가 목표 층에 닿을 때까지 setTimeout 으로 marginTop 을 갱신해 준다.
도달했다면 3초간 lock 유지 후 lock 반환 및 여러 초기화 작업을 해준다. (버튼 활성화)

fin.