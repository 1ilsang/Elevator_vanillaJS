"use strict";
exports.__esModule = true;
var Elevator = /** @class */ (function () {
    function Elevator(id) {
        this.id = id;
        this.currentLayer = 1;
    }
    Object.defineProperty(Elevator.prototype, "curLayer", {
        get: function () {
            return this.currentLayer;
        },
        set: function (dist) {
            this.currentLayer = dist;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Elevator.prototype, "getId", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Elevator.prototype.test = function () {
        console.log('hi');
    };
    return Elevator;
}());
function createElevator(id) {
    return new Elevator(id);
}
exports.createElevator = createElevator;
