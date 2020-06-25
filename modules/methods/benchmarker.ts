class Benchmarker {
    /*|{
        "info": "Class used to measure the run time of code",
        "category": "Class",
        "parameters":[],

        "overloads":[],

        "instanceProperties":[
            {"name":"executionTime", "type":"number"},
            {"name":"start", "type":"void"},
            {"name":"stop", "type":"() => number"}
        ],

        "url": "http://www.craydent.com/library/1.9.3/docs#Benchmarker",
        "returnType": "(IBenchmarker)"
    }|*/
    public executionTime: number = 0;
    protected _start: Date;
    protected _end: Date;

    public start = function (): void {
        this._start = new Date();
        this._end = 0;
    }
    public stop = function (): number {
        this._end = new Date();
        return this.executionTime = (this._end - this._start) / 1000;
    }
    constructor() {
        this.executionTime = 0;
    }
}
export default Benchmarker;