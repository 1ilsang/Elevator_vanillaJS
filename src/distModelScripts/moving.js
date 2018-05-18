function goToDistLayer(layer) {
    let selectedElevator = SchedulerFactory(SCHEDULES.throughput, layer);
    let distLayer = document.getElementById(layer);
    // console.log(distLayer);
    // selectedElevator.moving(distLayer);
    moving(selectedElevator, distLayer);
}

//TODO: API 명세
function moving(e, layerButton) {
    if (e === null) {
        return;
    }
    //정규식을 활용. 숫자를 뽑아 키값으로 사용.
    let distLayer = layerButton.id.toString().replace(/[^0-9]/g, '');
    
    e.style.backgroundColor = 'red';
    layerButton.style.backgroundColor = 'red';
    layerButton.disabled = 'disable';
    //움직이는 엘리베이터 객체
    let movingE = e.id.toString().replace(/[^0-9]/g, '');
    let preElevatorLayer = elevatorList[movingE - 1].curLayer;
    check[elevatorList[movingE - 1].curLayer]--;
    // console.log(distLayer, elevatorList[movingE - 1].curLayer);
    elevatorList[movingE - 1].isLock = true;

    //fixme 로직이 너무 나쁘다. 중복 코드가 이후 유지보수에 치명적일 것.
    //fixme 이 부분은 반드시 리팩토링을 해야 함.
    //fixme 내 생각 :: prototype 으로 moving 을 빼던가 TS 에 추가.
    if(movingE == 1){
        if(distLayer > preElevatorLayer){
            time1 = setInterval(function () {
                if (clearTime1 >= 67 * (distLayer - elevatorList[movingE - 1].curLayer)) {
                    clearTimeout(time1);
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
                        clearTime1 = 0;
                    }, 3000);
                }
                else {
                    e.style.marginTop = -elevatorList[movingE - 1].curHeight.toString().replace(/[^0-9]/g, '') - clearTime1 + 'px';
                    clearTime1 += 5;
                }
            }, 50);
        }
        else {
            time1 = setInterval(function () {
                if (clearTime1 <= 67 * (distLayer - elevatorList[movingE - 1].curLayer)) {
                    clearTimeout(time1);
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
                        clearTime1 = 0;
                    }, 3000);
                }
                else {
                    e.style.marginTop = -elevatorList[movingE - 1].curHeight.toString().replace(/[^0-9]/g, '') - clearTime1 + 'px';
                    clearTime1 -= 5;
                }
            }, 50);
        }
    }
    else if(movingE == 2){
        if(distLayer > preElevatorLayer){
            time2 = setInterval(function () {
                if (clearTime2 >= 67 * (distLayer - elevatorList[movingE - 1].curLayer)) {
                    clearTimeout(time2);
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
                        clearTime2 = 0;
                    }, 3000);
                }
                else {
                    e.style.marginTop = -elevatorList[movingE - 1].curHeight.toString().replace(/[^0-9]/g, '') - clearTime2 + 'px';
                    clearTime2 += 5;
                }
            }, 50);
        }else {
            time2 = setInterval(function () {
                if (clearTime2 <= 67 * (distLayer - elevatorList[movingE - 1].curLayer)) {
                    clearTimeout(time2);
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
                        clearTime2 = 0;
                    }, 3000);
                }
                else {
                    e.style.marginTop = -elevatorList[movingE - 1].curHeight.toString().replace(/[^0-9]/g, '') - clearTime2 + 'px';
                    clearTime2 -= 5;
                }
            }, 50);
        }
    }
    else if(movingE == 3){
        if(distLayer > preElevatorLayer){
            time3 = setInterval(function () {
                if (clearTime3 >= 67 * (distLayer - elevatorList[movingE - 1].curLayer)) {
                    clearTimeout(time3);
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
                        clearTime3 = 0;
                    }, 3000);
                }
                else {
                    e.style.marginTop = -elevatorList[movingE - 1].curHeight.toString().replace(/[^0-9]/g, '') - clearTime3 + 'px';
                    clearTime3 += 5;
                }
            }, 50);
        }else {
            time3 = setInterval(function () {
                if (clearTime3 <= 67 * (distLayer - elevatorList[movingE - 1].curLayer)) {
                    clearTimeout(time3);
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
                        clearTime3 = 0;
                    }, 3000);
                }
                else {
                    e.style.marginTop = -elevatorList[movingE - 1].curHeight.toString().replace(/[^0-9]/g, '') - clearTime3 + 'px';
                    clearTime3 -= 5;
                }
            }, 50);
        }
        
    }
    else if(movingE == 4){
        if(distLayer > preElevatorLayer){
            time4 = setInterval(function () {
                if (clearTime4 >= 67 * (distLayer - elevatorList[movingE - 1].curLayer)) {
                    clearTimeout(time4);
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
                        clearTime4 = 0;
                    }, 3000);
                }
                else {
                    e.style.marginTop = -elevatorList[movingE - 1].curHeight.toString().replace(/[^0-9]/g, '') - clearTime4 + 'px';
                    clearTime4 += 5;
                }
            }, 50);
        }
        else {
            time4 = setInterval(function () {
                if (clearTime4 <= 67 * (distLayer - elevatorList[movingE - 1].curLayer)) {
                    clearTimeout(time4);
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
                        clearTime4 = 0;
                    }, 3000);
                }
                else {
                    e.style.marginTop = -elevatorList[movingE - 1].curHeight.toString().replace(/[^0-9]/g, '') - clearTime4 + 'px';
                    clearTime4 -= 5;
                }
            }, 50);
        }
    }
}
