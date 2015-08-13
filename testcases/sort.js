if (typeof tests !== "object") {
    tests = [];
}

(function() {
    function insertAscOrder(coll) {
        coll.drop();
        for (var i = 0; i < 10000; i++) {
            coll.insert({a: i});
        }
        coll.getDB().getLastError();
    }

    /*
     * Setup: Create a collection of documents that are inserted in ascending order.
     * Test: Query for all documents and sort them in ascending order.
     */
    tests.push({
        name: 'Sort.InsertionOrder',
        tags: ['sort'],
        pre: insertAscOrder,
        ops: [
            {
                op: 'find',
                query: {},
                sort: {a: 1},
            },
        ],
    });

    /*
     * Setup: Create a collection of documents that are inserted in ascending order.
     * Test: Query for all documents and sort them in descending order.
     */
    tests.push({
        name: 'Sort.ReverseInsertionOrder',
        tags: ['sort'],
        pre: insertAscOrder,
        ops: [
            {
                op: 'find',
                query: {},
                sort: {a: -1},
            },
        ],
    });
})();

