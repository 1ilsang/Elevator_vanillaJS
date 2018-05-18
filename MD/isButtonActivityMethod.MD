층을 입력받아 층의 버튼이 활성화되었는지 여부를 반환하는 메서드 flow
===
### 1. Elevator.ts
```javascript
class Elevator {
    private lock: boolean = false;
    ...
    get isLock(): boolean {
        return this.lock;
    }
    set isLock(lock: boolean) {
        this.lock = lock;
    }
}
```
타입 스크립트로 만든 객체에 lock 을 private 으로 해주고
(이후 시간이 된다면 이 부분을 싱글톤으로 막으려고 한다. static or LazySingleton) 
get / set 을 통해 lock 을 가져오면 된다.

### 2. 실제 사용
```javascript
    set : elevatorList[selected].isLock = true;
    get : if(elevatorList[selected].isLock);
```
get 과 set 을 이용해 락이 걸려 있는지 확인하는 것으로 끝.

엘리베이터 객체의 락과 버튼이 무슨 연관이 있는가 의문이 있다면
버튼을 누를 시 선택된 엘리베이터가 움직이고 버튼이 비활성화 되므로
그 선택된 움직이는 엘리베이터가 곧 button 의 lock 이 된다고 볼 수 있다.

fin.