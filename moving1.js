let clearTime = 0;
var clear = 0;

let lock = true;
const MAX_ELEVATOR_NUM = 4;
const MIN_ELEVATOR_NUM = 2;
const MAX_LAYER_HEIGHT = 5;
const MIN_LAYER_HEIGHT = 2;
let currentElevatorNum = 4;
let currentLayerHeight = 5;

function goToDistLayer(layer) {
    let e = document.getElementById('Elevator1');
    let layerButton = document.getElementById(layer);
    moving(e, layerButton);
}

function moving(e, layerButton) {
    //같은 층이라면 조건 추가.
    //현재 층일때 어케해야할지 조건 생각.
    //lock 값 반전해줘야함.
    let distLayer = layerButton.id.toString().replace(/[^0-9]/g, '');
    //TODO: 락 어떻게 처리할지 생각. disable 이 락이되는거 아닌가?
    if (!lock) return;
    else if (lock) {
        e.style.backgroundColor = 'red';
        layerButton.style.backgroundColor = 'red';
        layerButton.disabled = 'disable';
        lock = false;
        clear = setInterval(function () {
            if (clearTime >= 49 * distLayer) {//TODO: flag 추가 필요
                clearTimeout(clear);
                e.style.backgroundColor = 'orange';
                setTimeout(function () {
                    console.log('wait...3000');
                    e.style.backgroundColor = 'rgba(255, 255, 0, 0.5)';
                    layerButton.style.backgroundColor = 'white';
                    layerButton.disabled = false;
                    lock = true;
                    clearTime = 0;
                }, 3000);
            }
            else {
                //TODO: e 의 현재 위치에서 빼주는 로직 추가 필요.
                //TODO: 층을 넘을 경우 멈춰주던가 해주어야 함. flag 사용
                e.style.marginTop = -clearTime + 'px';
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
    } else {
        alert('엘리베이터는 2~4개\n층 수는 2~5로 해주세요!');
    }
}