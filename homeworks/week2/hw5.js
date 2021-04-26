

function join(arr, concatStr) {
    var result = ""
    for ( var i = 0 ; i < arr.length ; i++){
        if (i+1 === arr.length ){  // if it is last index, we only need to add last element to result
            result = result + arr[i] 
        } else { // other situations, we need to add last element and concatStr to result
            result = result + arr[i] + concatStr
        }
    }
    return result
  
}


function repeat(str, times) {
    var result = ""
    for ( var i = 0 ; i < times ; i++) {
        result = result + str
    }
    return result
  
}


console.log(join(["a", 1, "b", 2, "c", 3], ','));


console.log(repeat('yoyo', 2));
