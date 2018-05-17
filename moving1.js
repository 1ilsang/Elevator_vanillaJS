function goToDistLayer(layer) {
    let selectedElevator = SchedulerFactory(SCHEDULES.throughput, layer);
    let distLayer = document.getElementById(layer);
    moving(selectedElevator, distLayer);
}

//TODO: (내려가는 로직), 락setTimeout 해결필요, 속도 조절, API 명세
function moving(e, layerButton) {
    if (e === null) {
        return;
    }
    //lock 값 반전해줘야함.
    console.log('moving 로직에 들어옴');
    let distLayer = layerButton.id.toString().replace(/[^0-9]/g, '');
        console.log('lock 안의 로직에 들어옴');
        e.style.backgroundColor = 'red';
        layerButton.style.backgroundColor = 'red';
        layerButton.disabled = 'disable';
        //움직이는 엘리베이터 객체
        let movingE = e.id.toString().replace(/[^0-9]/g, '');
        check[elevatorList[movingE - 1].curLayer]--;
        console.log(distLayer, elevatorList[movingE - 1].curLayer);
        elevatorList[movingE - 1].isLock = true;
        clear = setInterval(function () {
            if (clearTime >= 65 * (distLayer - elevatorList[movingE - 1].curLayer)) {
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