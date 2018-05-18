class Elevator {
    constructor(id) {
        this.id = id;
        this.currentLayer = 1;
        this.currentHeight = 0;
        this.lock = false;
    }
    get curLayer() {
        return this.currentLayer;
    }
    set curLayer(dist) {
        this.currentLayer = dist;
    }
    get curHeight() {
        return this.currentHeight;
    }
    set curHeight(height) {
        this.currentHeight = height;
    }
    get getId() {
        return this.id;
    }
    get isLock() {
        return this.lock;
    }
    set isLock(lock) {
        this.lock = lock;
    }
}
export function createElevator(id) {
    return new Elevator(id);
}
// export function moving(layerButton: HTMLElement) {
//     public distLayer:number = layerButton.id.toString().replace(/[^0-9]/g, '');
//     distLayer=3;
// }
