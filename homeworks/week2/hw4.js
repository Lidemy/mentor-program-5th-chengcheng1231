function printFactor(n) {
  for ( var i = 1 ; i <= n ; i++){
      if ( n % i === 0) {  // when remainder is 0, it means i is factor
          console.log (i)
      } else {
          continue
      }
  }
}

printFactor(15);
