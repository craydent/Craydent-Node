import duplicate from "./duplicate";

class Queue<T> extends Array<T> {
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
    protected nextIndex: number;
    constructor(records: T[]) {
        super(...duplicate(records || [], true) as any);
        Object.setPrototypeOf(this, Object.create(Queue.prototype))
        this.nextIndex = 0;
    }
    public enqueue(value) { this.push(value); };
    public dequeue() { return this.splice(0, 1)[0]; };
    public next() { return { value: this[this.nextIndex++], done: this.nextIndex >= this.size() }; };
    public hasNext() { return this.nextIndex < this.size(); };
    public size() { return this.length; };
}
export default Queue;