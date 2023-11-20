import { TToastData } from "../typings";

type Callback = (data: TToastData) => void;

class Observer {
    private observers: Callback[] = [];

    subscribe(fn: Callback) {
        this.observers.push(fn);
    }

    unsubscribe(fn: Callback) {
        this.observers = this.observers.filter(subscriber => subscriber !== fn);
    }

    notify(data: TToastData) {
        this.observers.forEach(observer => observer(data));
    }
}

export default Observer;