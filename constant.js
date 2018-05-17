let clearTime = 0;
let clear = 0;

let check = [4, 4, 0, 0, 0, 0];
const MAX_ELEVATOR_NUM = 4;
const MIN_ELEVATOR_NUM = 2;
const MAX_LAYER_HEIGHT = 5;
const MIN_LAYER_HEIGHT = 2;

let currentElevatorNum = 4;
let currentLayerHeight = 5;
let elevatorList = [];

const SCHEDULES = {
    throughput: 'THROUGHPUT'
};