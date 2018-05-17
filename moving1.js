let clearTime = 0;
var clear = 0;

let lock = true;
let check = [4, 4, 0, 0, 0, 0];
const MAX_ELEVATOR_NUM = 4;
const MIN_ELEVATOR_NUM = 2;
const MAX_LAYER_HEIGHT = 5;
const MIN_LAYER_HEIGHT = 2;
const ThroughputScheduler = {
    findElevator(layer) {
        let minL = layer.toString().replace(/[^0-9]/g, '');
        const nowL = layer.toString().replace(/[^0-9]/g, '');
        let selectedElevator = null;
        //같은 층이라면 null 반환.
        if (check[nowL]) return null;
        for (let i = 0; i < elevatorList.length; i++) {
            let nowValue = nowL - +elevatorList[i].curLayer;
            
            if (0 > nowValue) {
                nowValue = -nowValue;
            }
            if (minL > nowValue) {
                minL = nowValue;
                selectedElevator = elevatorList[i].getId;
            }
        }
        return selectedElevator;
    }
};

const SCHEDULES = {
    throughput: 'THROUGHPUT'
};
let currentElevatorNum = 4;
let currentLayerHeight = 5;
let elevatorList = [];

function goToDistLayer(layer) {
    let selectedElevator = SchedulerFactory(SCHEDULES.throughput, layer);
    let distLayer = document.getElementById(layer);
    moving(selectedElevator, distLayer);
}

function SchedulerFactory(inputScheduler, layer) {
    let scheduler;
    switch (inputScheduler) {
        case 'THROUGHPUT':
            scheduler = ThroughputScheduler.findElevator(layer);
            break;
        //스트래터지패턴
        // case "...":
    }
    return scheduler;
}

//TODO: 내려가는 로직, 락, 테이블 크기에 따른 엘베 수 조정
//XXX: 이게 아마
function moving(e, layerButton) {
    if (e === null) {
        return;
    }
    //lock 값 반전해줘야함.
    console.log('moving 로직에 들어옴');
    let distLayer = layerButton.id.toString().replace(/[^0-9]/g, '');
    //TODO: 락 어떻게 처리할지 생각. disable 이 락이되는거 아닌가?
    if (!lock) return;
    else if (lock) {
        console.log('lock 안의 로직에 들어옴');
        e.style.backgroundColor = 'red';
        layerButton.style.backgroundColor = 'red';
        layerButton.disabled = 'disable';
        //움직이는 엘리베이터 객체
        let movingE = e.id.toString().replace(/[^0-9]/g, '');
        check[elevatorList[movingE - 1].curLayer]--;
        console.log(distLayer, elevatorList[movingE - 1].curLayer);
        lock = false;
        clear = setInterval(function () {
            if (clearTime >= 49 * (distLayer - elevatorList[movingE - 1].curLayer)) {
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
                    lock = true;
                    clearTime = 0;
                    console.log(elevatorList, check);
                }, 3000);
            }
            else {
                e.style.marginTop = -elevatorList[movingE - 1].curHeight.toString().replace(/[^0-9]/g, '') - clearTime + 'px';
                // console.log(e.style.marginTop, clearTime, elevatorList[movingE - 1].curHeight);
                clearTime += 5;
            }
        }, 100);
    }
}

function setTableSize() {
    let tempC, tempR;
    tempC = document.getElementById('inputElevatorNum').value;
    tempR = document.getElementById('inputLayerHeight').value;
    //TODO: validation 해줘야함.
    //TODO: 저장되었던 변수값?들 모두 초기화 해주어야 함.
    if ((tempC >= MIN_ELEVATOR_NUM && tempC <= MAX_ELEVATOR_NUM)
        && (tempR >= MIN_LAYER_HEIGHT && tempR <= MAX_LAYER_HEIGHT)) {
        let nowTable = document.getElementById('elevator-table');
        if (nowTable.rows.length === +tempR && nowTable.rows[0].cells.length === +tempC + 1) {
            alert('중복된 값입니다.');
            return;
        }
        let remakeTable = document.createElement('tbody');
        elevatorList = [];
        check = [4, 4, 0, 0, 0, 0];
        nowTable.innerHTML = `<caption>KAKAO - 화물 엘리베이터 부르기</caption>`;
        for (let i = 0; i < tempR; ++i) {
            let nowRow = remakeTable.insertRow(i);
            for (let j = 0; j <= tempC; ++j) {
                let nowCol = nowRow.insertCell(j);
                if (j === 0) {
                    let buttonLayer = document.createElement('input');
                    let nowLayer = 'layer' + (tempR - i);
                    buttonLayer.setAttribute('id', nowLayer.toString());
                    buttonLayer.setAttribute('onclick', `goToDistLayer('${nowLayer}')`);
                    buttonLayer.setAttribute('type', 'button');
                    buttonLayer.setAttribute('value', (tempR - i).toString() + '층');
                    nowCol.appendChild(buttonLayer);
                } else if (i === tempR - 1) {
                    let elevatorDiv = document.createElement('div');
                    elevatorDiv.setAttribute('id', `Elevator${j}`);
                    elevatorDiv.setAttribute('class', 'Elevator');
                    elevatorDiv.innerHTML = j;
                    nowCol.appendChild(elevatorDiv);
                }
                else {
                    nowCol.innerHTML = (i.toString() + j);
                }
            }
        }
        currentLayerHeight = tempR;
        currentElevatorNum = tempC;
        nowTable.appendChild(remakeTable);
        
        for (let i = 1; i <= tempC; ++i) {
            let nextElevator = document.getElementById(`Elevator${i}`);
            console.log(nextElevator);
            elevatorList.push(createElevator(nextElevator));
        }
        console.log(elevatorList);
        
    } else {
        alert('엘리베이터는 2~4개\n층 수는 2~5로 해주세요!');
    }
}