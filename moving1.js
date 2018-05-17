let clearTime = 0;
var clear = 0;

function goToDistLayer(layer) {
    let e = document.getElementById('firstElevator');
    let layerButton = document.getElementById(layer);
    moving(e, layerButton);
}

let lock = true;
let elevatorNum = 5;
let layerHeight = 4;
const MAX_ELEVATOR_NUM = 4;
const MIN_ELEVATOR_NUM = 2;
const MAX_LAYER_HEIGHT = 5;
const MIN_LAYER_HEIGHT = 2;

function moving(e, layerButton) {
    //같은 층이라면 조건 추가.
    //현재 층일때 어케해야할지 조건 생각.
    //lock 값 반전해줘야함.
    let distLayer = layerButton.id.toString().replace(/[^0-9]/g, '');
    //TODO: 락 어떻게 처리할지 생각. disable 이 락이되는거 아닌가?
    if (!lock) return;
    else if (lock) {
        console.log('come');
        e.style.backgroundColor = 'red';
        layerButton.style.backgroundColor = 'red';
        layerButton.disabled = 'disable';
        lock = false;
        clear = setInterval(function () {
            if (clearTime >= 49 * distLayer) {
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
                //e 의 현재 위치에서 빼주는 로직 추가 필요.
                e.style.marginTop = -clearTime + 'px';
                clearTime += 5;
                console.log(clearTime);
            }
        }, 100);
    }
}

function setTableSize() {
    let tempC, tempR;
    tempC = document.getElementById('inputElevatorNum').value;
    tempR = document.getElementById('inputLayerHeight').value;
    console.log(tempC, tempR);
    //TODO: validation 해줘야함.
    if ((tempC >= MIN_ELEVATOR_NUM && tempC <= MAX_ELEVATOR_NUM)
        && (tempR >= MIN_LAYER_HEIGHT && tempR <= MAX_LAYER_HEIGHT)) {
        //TODO: 만약 값이 제대로 정확하게 왔다면.
        console.log('LOGIC');
        return;
    } else {
        alert('엘리베이터는 2~4개\n층 수는 2~5로 해주세요!');
    }
    return;
}