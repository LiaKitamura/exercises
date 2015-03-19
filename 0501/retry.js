
function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
    "use strict";
    if (Math.random() < 0.5)
        return a * b;
    else
        throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
    "use strict";
    // Your code here.
    var result = 0;
    try{
        result = primitiveMultiply(a, b);
    }catch(error){

    if( error instanceof MultiplicatorUnitFailure ){
	    console.log(error);
    }else{
        throw(error);
    }

    result = primitiveMultiply(a, b);
}

  return result;
}
