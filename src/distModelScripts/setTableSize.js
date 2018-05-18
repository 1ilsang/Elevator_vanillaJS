function setTableSize() {
    let tempC, tempR;
    tempC = document.getElementById('inputElevatorNum').value;
    tempR = document.getElementById('inputLayerHeight').value;
    if ((tempC >= MIN_ELEVATOR_NUM && tempC <= MAX_ELEVATOR_NUM)
        && (tempR >= MIN_LAYER_HEIGHT && tempR <= MAX_LAYER_HEIGHT)) {
        let nowTable = document.getElementById('elevator-table');
        if (nowTable.rows.length === +tempR && nowTable.rows[0].cells.length === +tempC + 1) {
            alert('중복된 값입니다.');
            return;
        }
        //XXX: 이 부분도 변수가 너무 거추장 수럽다. 변경하자.
        time1 = 0;
        time2 = 0;
        time3 = 0;
        time4 = 0;
        clearTime1 = 0;
        clearTime2 = 0;
        clearTime3 = 0;
        clearTime4 = 0;
        let remakeTable = document.createElement('tbody');
        elevatorList = [];
        check = [4, tempC, 0, 0, 0, 0];
        nowTable.innerHTML = `<caption>화물 엘리베이터 부르기</caption>`;
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
            elevatorList.push(createElevator(nextElevator));
        }
    } else {
        alert('엘리베이터는 2~4개\n층 수는 2~5로 해주세요!');
    }
}