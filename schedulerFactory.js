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