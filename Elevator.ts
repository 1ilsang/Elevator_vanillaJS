class Elevator {
    private currentLayer: number = 1;
    private currentHeight: number = 0;

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
    test(){
        console.log('hi');
    }
}
export function createElevator(id: string) {
    return new Elevator(id);
}