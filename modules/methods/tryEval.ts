
type EvaluatorMethod = (expression: any) => any;

export default function tryEval(expression: any, evaluator?: EvaluatorMethod) {
    /*|{
        "info": "Evaluates an expression without throwing an error",
        "category": "Utility",
        "parameters":[
            {"expression": "(any) Expression to evaluate"},
            {"evaluator?": "(EvaluatorMethod) Method to use to evaluate the expression"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#tryEval",
        "returnType": "(any)"
    }|*/
    try {
        let value;
        if (evaluator) { value = evaluator(expression); }
        else { value = eval(expression); }
        if (value === undefined && expression != "undefined") {
            throw '';
        }
        return value;
    } catch (e) {
        try {
            return eval("(" + expression + ")");
        } catch (e) {
            return null;
        }
    }
}