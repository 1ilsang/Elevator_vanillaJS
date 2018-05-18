class Elevator {
    private currentLayer: number = 1;
    private currentHeight: number = 0;
    private lock: boolean = false;

    constructor(private id: string){
    }
    get curLayer(): number {
        return this.currentLayer;
    }
    set curLayer(dist: number){
        this.currentLayer = dist;
    }
    get curHeight(): number {
        return this.currentHeight;
    }
    set curHeight(height: number) {
        this.currentHeight = height;
    }
    get getId(): string {
        return this.id;
    }
    get isLock(): boolean {
        return this.lock;
    }
    set isLock(lock: boolean) {
        this.lock = lock;
    }
}
export function createElevator(id: string) {
    return new Elevator(id);
}
// export function moving(layerButton: HTMLElement) {
//     public distLayer:number = layerButton.id.toString().replace(/[^0-9]/g, '');
//     distLayer=3;
// }