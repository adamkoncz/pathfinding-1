var pathfinder = require('../dist/pathfinder-a.min.js'),
chai = require('chai'),
should = chai.should(),
 test_data = [];

test_data.push({ id:'A', connections:['B', 'C'], x:0, y:0, z:0 });
test_data.push({ id:'B', connections:['A', 'D'], x:1, y:1, z:0 });
test_data.push({ id:'C', connections:['A', 'E'], x:2, y:0, z:0 });
test_data.push({ id:'D', connections:['B', 'F'], x:3, y:1, z:0 });
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
});