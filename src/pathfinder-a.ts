
interface Waypoint{
    id: number | string, 
    waypoints:Array< number | string>,
    x:number, 
    y:number, 
    z:number
}

(function (name, context, definition) {
    if (typeof context.module != 'undefined' && context.module.exports)
        context.module.exports = definition();
    else if (typeof context.define == 'function' && context.define.amd)
        context.define(name, definition);
    else
        context[name] = definition();
})('pathfinderA', this, function () {

    function _find(arr: Array<Waypoint>, id1:  number | string, id2:  number | string) {
        var p1 = get_by_id(arr, id1),
            p2 = get_by_id(arr, id2),
            tries = [], result, neighbor;
      
        result = A(arr, p1, p2);
        
        //transform result

        return result;

        function A(arr, start, goal) {
            // The set of nodes already evaluated.
            var closedSet = [],
                // The set of currently discovered nodes still to be evaluated.
                // Initially, only the start node is known.
                openSet = [start],
                // For each node, which node it can most efficiently be reached from.
                // If a node can be reached from many nodes, cameFrom will eventually contain the
                // most efficient previous step.
                cameFrom = {},
                // For each node, the cost of getting from the start node to that node.
                gScore = {},
                // For each node, the total cost of getting from the start node to the goal
                // by passing by that node. That value is partly known, partly heuristic.
                fScore = {},

                i, tentative_gScore, current;

            arr.forEach(function (el) {
                gScore[el.id] = Infinity;
                fScore[el.id] = Infinity;
            });

            // The cost of going from start to start is zero.
            gScore[start.id] = 0;

            // For the first node, that value is completely heuristic.
            fScore[start.id] = heuristic_cost_estimate(start, goal);

            while (openSet.length) {
                current = get_lowest_score_in_openSet();

                if (current.id == goal.id) {
                    return reconstruct_path(cameFrom, current);
                }

                remove(openSet, current);
                add(closedSet, current);

                for (i = 0; i < current.waypoints.length; i++) {

                    neighbor = get_by_id(arr, current.waypoints[i]);

                    if (in_arr(closedSet, neighbor)) {
                        continue; //continue the loop. ignore neighbors that are already evaluated
                    }

                    tentative_gScore = gScore[current.id] + distance(current, neighbor);

                    if (!in_arr(openSet, neighbor)) {
                        add(openSet, neighbor);
                    } else if (tentative_gScore >= gScore[neighbor.id]) {
                        continue;
                    }

                    cameFrom[neighbor.id] = current;
                    gScore[neighbor.id] = tentative_gScore;
                    fScore[neighbor.id] = gScore[neighbor.id] + heuristic_cost_estimate(neighbor, goal);
                }

            }

            return false;

            function reconstruct_path(cameFrom, current) {
                var total_path = [current],
                    distance = gScore[current.id];

                while (current && cameFrom[current.id]) {
                    current = cameFrom[current.id];
                    total_path.unshift(current); //should it be total_path.push(current)
                }
                return {
                    steps: total_path,
                    distance: distance
                };
            }

            function remove(arr, el) {
                var i;
                for (i = 0; i < arr.length; i++) {
                    if (arr[i].id == el.id) {
                        arr.splice(i, 1);
                    }
                }
            }
            function add(arr, el) {
                var b = false;
                arr.forEach(function (el2) {
                    if (el2.id == el.id) {
                        b = true;
                    }
                });
                if (!b) {
                    arr.push(el);
                }
            }

            function heuristic_cost_estimate(a, b) {
                return distance(a, b) * 1.5;
            }

            function distance(a, b) {
                return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2));
            }

            function get_lowest_score_in_openSet() {
                if (!openSet.length) return null;
                if (openSet.length == 1) return openSet[0];

                var r = openSet.reduce(function (a, b) {
                    return (fScore[a.id] < fScore[b.id]) ? a : b;
                });
                return r;
            }
        }

        function in_arr(arr, el) {
            var a = get_by_id(arr, el.id);

            return a ? true : false;
        }

        function get_by_id(arr, id) {
            var r = arr.filter(function (el) {
                return (el.id == id);
            });

            return r.length ? r[0] : null;
        }
    }

    return {
        find: _find
    }
});



