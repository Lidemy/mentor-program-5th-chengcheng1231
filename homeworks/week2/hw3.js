function reverse(str) {
  var splitstr = str.split('')
  var result = '' 
  for (var i = -1; i >= -(splitstr.length) ; i--) { // let i as index in order to get elements from the end of splitstr
    result = result + splitstr.slice(i)[0]
  }
  console.log(result)

}

reverse('1,2,3,2,1');
