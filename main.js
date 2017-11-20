requirejs(["./dist/pathfinder-a"], function(pathfinder) {
  var test_data = [];//,
  ///describe;
 /**
  *
  *  a       c       e       g
  *      b       d       f *      
  */
 
  /**
   * A-B-D-F-Z                  
   */
 test_data.push({ id:'A', connections:['B', 'C'], x:0, y:0, z:0 });
 test_data.push({ id:'B', connections:['A', 'D'], x:1, y:1, z:0 });
 test_data.push({ id:'C', connections:['A', 'E'], x:2, y:0, z:0 });
 test_data.push({ id:'D', connections:['B', 'F'], x:3, y:0, z:0 });
 test_data.push({ id:'E', connections:['C', 'G'], x:4, y:0, z:0 });
 test_data.push({ id:'F', connections:['D', 'Z'], x:5, y:1, z:0 });
 test_data.push({ id:'G', connections:['E'], x:6, y:0, z:0 });
 
 test_data.push({ id:'X', connections:[], x:100, y:100, z:0 });
 
 test_data.push({ id:'Z', connections:['F'], x:8, y:1, z:0 });

 

 var p = new pathfinder.Path(test_data),
 route = p.find('A', 'Z');

 console.log(route)


});