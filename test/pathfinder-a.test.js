var pathfinder = require('../dist/pathfinder-a.min.js'),
chai = require('chai'),
assert = require('assert'),
should = chai.should(),
expect = chai.expect,
 test_data = [];//,
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

describe('pathfinderA',function(){
    it('should return NULL if route not found', function(){

        var p = new pathfinder.Path(test_data),
        route = p.find('A', 'X');
        chai.expect(route).to.equal(null);
       
    });

    it('should return route with 5 steps if found', function(){
        var p = new pathfinder.Path(test_data),
        route = p.find('A', 'Z');
        route.steps.should.have.lengthOf(5);
    })


    it('should return direction of 45 degree for 1st step', function(){
        var p = new pathfinder.Path(test_data),
        route = p.find('A', 'Z'),
        step = route.steps[0];

        chai.expect(parseInt(step.direction)).to.equal(45);
    })

    it('should return direction of 0 degree for 2nd step', function(){
        var p = new pathfinder.Path(test_data),
        route = p.find('A', 'Z'),
        step = route.steps[1];

        chai.expect(parseInt(step.direction)).to.equal(0);
    })

    it('should return deviation of -45 degree for 3rd step', function(){
        var p = new pathfinder.Path(test_data),
        route = p.find('A', 'Z'),
        step = route.steps[2];

        chai.expect(parseInt(step.deviation)).to.equal(-45);
    })
});