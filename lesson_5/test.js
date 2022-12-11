let obj = {};

obj.joinOr = function(array, seperator, contraction) {
  let options = array.join(seperator).split('');
  let lastComma = options.lastIndexOf(seperator[0]);
  
  console.log(options)
  options[lastComma] = `${seperator}` + contraction;

  return options.join('');
}


console.log(obj.joinOr([1,2, 3], ", ", "or"));