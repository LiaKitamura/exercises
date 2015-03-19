// Calculator




function Calculator(el){
    this.display = document.getElementById("#"+el);
}

//Calculator.prototype.add = function(a,b){
//    return a + b;
//};

Calculator.prototype.subtract = function(a,b){
    return a - b;
};
Calculator.prototype.multiply = function(a,b){
    return a * b;
};
Calculator.prototype.divide = function(a,b){
    return a / b;
};
Calculator.prototype.calculate = function(num1, num2, func){
    return func(num1, num2);
};
Calculator.prototype.display = function(){

}
