function goToDistLayer(layer) {
    let selectedElevator = SchedulerFactory(SCHEDULES.throughput, layer);
    let distLayer = document.getElementById(layer);
    console.log(distLayer);
    // selectedElevator.moving(distLayer);
    // moving(selectedElevator, distLayer);
    move(selectedElevator, distLayer);
}
const move = (e, layerButton) => new Promise(res => (
    setTimeout(() => {
        if (e === null) {
            return;
        }
        console.log('moving 로직에 들어옴');
        let distLayer = layerButton.id.toString().replace(/[^0-9]/g, '');
        e.style.backgroundColor = 'red';
        layerButton.style.backgroundColor = 'red';
        layerButton.disabled = 'disable';
        //움직이는 엘리베이터 객체
        let movingE = e.id.toString().replace(/[^0-9]/g, '');
        check[elevatorList[movingE - 1].curLayer]--;
        console.log(distLayer, elevatorList[movingE - 1].curLayer);
        elevatorList[movingE - 1].isLock = true;
    
        clear = setInterval(function () {
            if (clearTime >= 67 * (distLayer - elevatorList[movingE - 1].curLayer)) {
                clearTimeout(clear);
                e.style.backgroundColor = 'orange';
                setTimeout(function () {
                    console.log('wait...3000');
                    e.style.backgroundColor = 'rgba(255, 255, 0, 0.5)';
                    layerButton.style.backgroundColor = 'white';
                    layerButton.disabled = false;
                    elevatorList[movingE - 1].curLayer = +distLayer;
                    elevatorList[movingE - 1].curHeight = e.style.marginTop;
                    check[elevatorList[movingE - 1].curLayer]++;
                    elevatorList[movingE - 1].isLock = false;
                    clearTime = 0;
                    console.log(elevatorList, check);
                }, 3000);
            }
            else {
                e.style.marginTop = -elevatorList[movingE - 1].curHeight.toString().replace(/[^0-9]/g, '') - clearTime + 'px';
                // console.log(e.style.marginTop, clearTime, elevatorList[movingE - 1].curHeight);
                clearTime += 5;
            }
        }, 50);
        res();
    }, 1000)
));
//TODO: (내려가는 로직), 락 setTimeout 해결필요, 속도 조절, API 명세
function moving(e, layerButton) {
    if (e === null) {
        return;
    }
    //lock 값 반전해줘야함.
    console.log('moving 로직에 들어옴');
    let distLayer = layerButton.id.toString().replace(/[^0-9]/g, '');
    e.style.backgroundColor = 'red';
    layerButton.style.backgroundColor = 'red';
    layerButton.disabled = 'disable';
    //움직이는 엘리베이터 객체
    let movingE = e.id.toString().replace(/[^0-9]/g, '');
    check[elevatorList[movingE - 1].curLayer]--;
    console.log(distLayer, elevatorList[movingE - 1].curLayer);
    elevatorList[movingE - 1].isLock = true;
    
    clear = setInterval(function () {
        if (clearTime >= 67 * (distLayer - elevatorList[movingE - 1].curLayer)) {
            clearTimeout(clear);
            e.style.backgroundColor = 'orange';
            setTimeout(function () {
                console.log('wait...3000');
                e.style.backgroundColor = 'rgba(255, 255, 0, 0.5)';
                layerButton.style.backgroundColor = 'white';
                layerButton.disabled = false;
                elevatorList[movingE - 1].curLayer = +distLayer;
                elevatorList[movingE - 1].curHeight = e.style.marginTop;
                check[elevatorList[movingE - 1].curLayer]++;
                elevatorList[movingE - 1].isLock = false;
                clearTime = 0;
                console.log(elevatorList, check);
            }, 3000);
        }
        else {
            e.style.marginTop = -elevatorList[movingE - 1].curHeight.toString().replace(/[^0-9]/g, '') - clearTime + 'px';
            // console.log(e.style.marginTop, clearTime, elevatorList[movingE - 1].curHeight);
            clearTime += 5;
        }
    }, 50);
}

const f = (param) => new Promise(res => (
    setTimeout(() => {
        console.log(param);
        // 비동기 함수(setTimeout)의 콜백 함수 안에서
        // resolve 시켜줘야 순서를 보장할 수 있음.
        // 이 res 부분부터 then 안에 구문이 실행된다고 보면 된다.
        res();
    }, 1000)
));
// 후속 함수에게 new Promise를 리턴해주므로 thenable해서 계속 체이닝이 가능.
f(1)               // 1
.then(() => f(2))  // 2
.then(() => f(3))  // 3
.then(() => f(4))  // 4
.then(() => f(5))  // 5
.then(() => f(6))  // 6
.then(() => f(7))  // 7
.then(() => f(8))  // 8
.then(() => f(9)); // 9