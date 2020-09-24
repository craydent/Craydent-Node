import duplicate from '../methods/duplicate';

class Queue<T> extends Array<T> {
    /* istanbul ignore next */
    constructor(records?: T[]) {
        /*|{
            "info": "Collection class that follows FIFO",
            "category": "Class",
            "parameters":[
                {"records": "(Array<T>) Array used to create the iterator to iterate each item"}],

            "overloads":[],

            "instanceProperties":[
                {"name":"dequeue", "type":"() => T"},
                {"name":"enqueue", "type":"(value:T) => void"},
                {"name":"hasNext", "type":"() => boolean"},
                {"name":"next", "type":"() => {value:T, done:boolean}"},
                {"name":"size", "type":"() => number"}
            ],

            "url": "http://www.craydent.com/library/1.9.3/docs#Queue",
            "typeParameter": "<T>",
            "returnType": "(IQueue<T>)"
        }|*/
        super();
        Object.setPrototypeOf(this, Object.create(Queue.prototype))
        let items = duplicate(records || [], true);
        for (let i = 0, len = items.length; i < len; i++) {
            this.push(items[i])
        }
    }
    public enqueue(value) { return !!this.push(value); };
    public dequeue() { return this.splice(0, 1)[0]; };
}
export default Queue;