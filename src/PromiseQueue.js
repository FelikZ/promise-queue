import _ from 'lodash';

class PromiseQueue {
    constructor(doneCallback, debounceMs = 500) {
        this.promiseDict = {};
        this.onAllDone = _.debounce(doneCallback, debounceMs);
    }

    add(key) {
        if (!this.promiseDict.hasOwnProperty(key)) {
            this.promiseDict[key] = 0;
        }

        this.onAllDone.cancel();

        this.promiseDict[key]++;
    }

    resolve(key) {
        if (!this.promiseDict.hasOwnProperty(key)) {
            console.log(`Trying to resolve key '${key}', while its not in queue anymore`);
            return;
        }

        this.promiseDict[key]--;
        if (this.promiseDict[key] <= 0) {
            delete this.promiseDict[key];

            if (Object.keys(this.promiseDict).length === 0) {
                this.onAllDone();
            }
        }
    }
}

module.exports = PromiseQueue;