const ThroughputScheduler = {
    findElevator(layer) {
        let minL = layer.toString().replace(/[^0-9]/g, '');
        const nowL = layer.toString().replace(/[^0-9]/g, '');
        let selectedElevator = null;
        //같은 층이라면 null 반환.
        // console.log(nowL);
        if (check[nowL]) return null;
        //엘리베이터의 상태를 순회. 절대값으로 가장 가까운 녀석을 찾는다.
        for (let i = 0; i < elevatorList.length; i++) {
            let nowValue = nowL - +elevatorList[i].curLayer;
            let nowLock = elevatorList[i].isLock;
            // console.log(i, nowValue, nowLock);
            //lock 을 걸어 움직이는 객체라면 로직을 타지 않도록 해준다.
            if(nowLock) {
                continue;
            }
            if (0 > nowValue) {
                nowValue = -nowValue;
            }
            if (minL >= nowValue) {
                minL = nowValue;
                selectedElevator = elevatorList[i].getId;
            }
        }
        return selectedElevator;
    }
};