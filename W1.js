class CustomEvents {
    instance = {};
    constructor(name) {
        this.instance = {
            name,
            eventInfo: [],
        };
    }

    emit = (eventName, ...args) => {
        let conditionListener = this.instance.eventInfo.findIndex(event => event.eventName === eventName).length !== 0;
        if (conditionListener) {
            let indexes = [];
            for (let i = 0; i < this.instance.eventInfo.length; i++) {
                if (this.instance.eventInfo[i].eventName === eventName) {
                    this.instance.eventInfo[i].methodName === 'on' ?
                        this.instance.eventInfo[i].on(...args) : this.instance.eventInfo[i].once(...args);
                    this.instance.eventInfo[i].methodName === 'once' ? indexes[indexes.length] = i : indexes;
                }
            }
            for (let i = 0; i < indexes.length; i++) {
                this.instance.eventInfo.splice(indexes[i], 1);
            }
        }
    }

    on = (eventName, callback) => {
        this.instance.eventInfo.push({
            eventName,
            on: callback,
            methodName: 'on',
        })
    };

    once = (eventName, callback) => {
        this.instance.eventInfo.push({
            eventName,
            once: callback,
            methodName: 'once',
        })
    };

    off = (eventName, callback) => {
        let conditionListener = this.instance.eventInfo.findIndex(event => event.eventName === eventName).length !== 0;
        if (conditionListener) {
            for (let i = 0; i < this.instance.eventInfo.length; i++) {
                if (this.instance.eventInfo[i].eventName === eventName &&
                    this.instance.eventInfo[i].on.toString() == callback.toString()) {
                    this.instance.eventInfo.splice(i, 1);
                    break;
                }
            }
        }
    };

}

const callback1 = (msg) => {
    console.log('Message from callback1: ' + msg);
};

const callback2 = (msg) => {
    console.log('Message from callback2: ' + msg);
};

const obj0 = new CustomEvents('Reyhan');
const obj1 = new CustomEvents('Ali');
obj0.on('connection', callback1);
obj0.once('connection', callback1);
obj1.on('connection', callback2);
obj0.emit('connection', 'OBGECT1');
obj1.emit('connection', 'OBGECT2');
obj0.off('connection', callback1);
obj0.on('connection', callback1);
obj0.emit('connection', '----Changes After')
