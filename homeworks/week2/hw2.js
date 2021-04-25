function capitalize(str) {
    First_letter_code = str[0].charCodeAt() // let First_letter_code as ASCII code of first letter
    if ("a".charCodeAt() <= First_letter_code && First_letter_code <= "z".charCodeAt()) { // if First_letter_code is greater than "a" ASCII code  nd First_letter_code is less than "z" ASCII code
        var Capti = String.fromCharCode(First_letter_code -32) // let Capti as capitalized letter
        result =  Capti + str.slice(1) 
        return result
    } else {
        return str
    }
        
}

console.log(capitalize('hello'));
