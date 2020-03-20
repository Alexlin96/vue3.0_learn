var b = 1
function outer() {
  console.log(b)
  var b = 2
  function inner() {
    b++
    console.log('p1', b)
    var b = 3
    console.log('p2', b)
  }
  inner()
}
outer()

// 变量提升
