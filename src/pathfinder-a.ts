type StrIndex<TValue> = {
    [key: string]: TValue
}

interface iWaypoint {
    id: number | string;
    connections: Array<number | string>;
    x: number;
    y: number;
    z: number;
    magnitude: number;
    direction: number;
    deviation: number;
}

export class Path {
    constructor(arr: Array<iWaypoint>) {
        this.arr = arr;
    }

    private arr: Array<iWaypoint>;



    public find(from: number | string, to: number | string): { steps: Array<iWaypoint>, distance: number } {
        var p1: iWaypoint = get_by_id(this.arr, from),
            p2: iWaypoint = get_by_id(this.arr, to);

        return A(this.arr, p1, p2);

        function A(arr, start, goal) {
            // The set of nodes already evaluated.
            var closedSet: Array<iWaypoint> = [],
                // The set of currently discovered nodes still to be evaluated.
                // Initially, only the start node is known.
                openSet: Array<iWaypoint> = [start],
                // For each node, which node it can most efficiently be reached from.
                // If a node can be reached from many nodes, cameFrom will eventually contain the
                // most efficient previous step.
                cameFrom: StrIndex<iWaypoint> = {},
                // For each node, the cost of getting from the start node to that node.
                gScore: StrIndex<number> = {},
                // For each node, the total cost of getting from the start node to the goal
                // by passing by that node. That value is partly known, partly heuristic.
                fScore: StrIndex<number> = {},
                tentative_gScore: number,
                neighbor: iWaypoint,
                current: iWaypoint;

            arr.forEach(function (el: iWaypoint) {
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

                for (let i = 0; i < current.connections.length; i++) {

                    neighbor = get_by_id(arr, current.connections[i]);

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

            return null;

            //NOTE: we reconstruct backward. Current is the last step.
            function reconstruct_path(cameFrom, current: iWaypoint) {
                var total_path = [current],
                    dist = gScore[current.id],
                    previous: iWaypoint;

                while (current && cameFrom[current.id]) {
                    previous = cameFrom[current.id];
                    //NOTE: Try and add angles and metadata to cameFrom
                    previous.magnitude = distance(current, previous);
                    previous.direction = direction(previous, current);

                    if (current.direction != undefined) {
                        current.deviation = current.direction - previous.direction;
                    }
                    //
                    current = previous;
                    total_path.unshift(current);
                }
                return {
                    steps: total_path,
                    distance: dist
                };
            }

            function remove(arr: Array<iWaypoint>, el: iWaypoint): void {
                var i;
                for (i = 0; i < arr.length; i++) {
                    if (arr[i].id == el.id) {
                        arr.splice(i, 1);
                    }
                }
            }
            function add(arr: Array<iWaypoint>, el: iWaypoint): void {
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

            function heuristic_cost_estimate(a: iWaypoint, b: iWaypoint): number {
                return distance(a, b) * 1.5;
            }

            function distance(a: iWaypoint, b: iWaypoint): number {
                return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2) + Math.pow((b.z - a.z), 2));
            }

            function direction(a: iWaypoint, b: iWaypoint): number {
                var x = b.x - a.x,
                    y = b.y - a.y,
                    rad: number, t;

                rad = Math.atan(y / x);

                t = rad * (180 / Math.PI);

                return t;
            }

            function get_lowest_score_in_openSet(): iWaypoint {
                if (!openSet.length) return null;
                if (openSet.length == 1) return openSet[0];

                var r = openSet.reduce(function (a, b) {
                    return (fScore[a.id] < fScore[b.id]) ? a : b;
                });
                return r;
            }
        }

        function in_arr(arr: Array<iWaypoint>, el: iWaypoint): boolean {
            var a = get_by_id(arr, el.id);

            return a ? true : false;
        }

        function get_by_id(arr: Array<iWaypoint>, id: string | number): iWaypoint {
            var r = arr.filter(function (el) {
                return (el.id == id);
            });

            return r.length ? r[0] : null;
        }

    }



}


