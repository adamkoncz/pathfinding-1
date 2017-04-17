(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Path = (function () {
        function Path(arr) {
            this.arr = arr;
        }
        Path.prototype.find = function (from, to) {
            var p1 = get_by_id(this.arr, from), p2 = get_by_id(this.arr, to);
            return A(this.arr, p1, p2);
            function A(arr, start, goal) {
                var closedSet = [], openSet = [start], cameFrom = {}, gScore = {}, fScore = {}, tentative_gScore, neighbor, current;
                arr.forEach(function (el) {
                    gScore[el.id] = Infinity;
                    fScore[el.id] = Infinity;
                });
                gScore[start.id] = 0;
                fScore[start.id] = heuristic_cost_estimate(start, goal);
                while (openSet.length) {
                    current = get_lowest_score_in_openSet();
                    if (current.id == goal.id) {
                        return reconstruct_path(cameFrom, current);
                    }
                    remove(openSet, current);
                    add(closedSet, current);
                    for (var i = 0; i < current.connections.length; i++) {
                        neighbor = get_by_id(arr, current.connections[i]);
                        if (in_arr(closedSet, neighbor)) {
                            continue;
                        }
                        tentative_gScore = gScore[current.id] + distance(current, neighbor);
                        if (!in_arr(openSet, neighbor)) {
                            add(openSet, neighbor);
                        }
                        else if (tentative_gScore >= gScore[neighbor.id]) {
                            continue;
                        }
                        cameFrom[neighbor.id] = current;
                        gScore[neighbor.id] = tentative_gScore;
                        fScore[neighbor.id] = gScore[neighbor.id] + heuristic_cost_estimate(neighbor, goal);
                    }
                }
                return null;
                function reconstruct_path(cameFrom, current) {
                    var total_path = [current], distance = gScore[current.id];
                    while (current && cameFrom[current.id]) {
                        current = cameFrom[current.id];
                        total_path.unshift(current);
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
                    return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2) + Math.pow((b.z - a.z), 2));
                }
                function get_lowest_score_in_openSet() {
                    if (!openSet.length)
                        return null;
                    if (openSet.length == 1)
                        return openSet[0];
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
        };
        return Path;
    }());
    exports.Path = Path;
});
//# sourceMappingURL=pathfinder-a.js.map