if (typeof tests !== "object") {
    tests = [];
}

(function() {
    /**
     * Inserts 10,000 documents into the collection, each ~500KB in size.
     */
    function insertAscOrder(coll) {
        coll.drop();
        var bigString = new Array(500 * 1024).toString();
        for ( var i = 0; i < 100; i++ ) {
            coll.insert({a : bigString});
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
                query: {query: {}, orderBy: {a: 1}},
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
                query: {query: {}, orderBy: {a: -1}},
            },
        ],
    });

    /*
     * Setup: Create a collection of documents that are inserted in ascending order.
     * Test: Query for all documents and sort them in ascending order, but limit the result size.
     */
    tests.push({
        name: 'Sort.InsertionOrderWithLimit',
        tags: ['sort'],
        pre: insertAscOrder,
        ops: [
            {
                op: 'find',
                query: {query: {}, orderBy: {a: 1}},
                limit: 10,
            },
        ],
    });

    /*
     * Setup: Create a collection of documents that are inserted in ascending order.
     * Test: Query for all documents and sort them in descending order, but limit the result size.
     */
    tests.push({
        name: 'Sort.ReverseInsertionOrderWithLimit',
        tags: ['sort'],
        pre: insertAscOrder,
        ops: [
            {
                op: 'find',
                query: {query: {}, orderBy: {a: -1}},
                limit: 10,
            },
        ],
    });

    /*
     * Setup: Create a collection of documents that are inserted in ascending order.
     * Test: Query for all documents and sort them in ascending order, but limit the result to a
     * single document.
     */
    tests.push({
        name: 'Sort.InsertionOrderLimitOne',
        tags: ['sort'],
        pre: insertAscOrder,
        ops: [
            {
                op: 'find',
                query: {query: {}, orderBy: {a: 1}},
                limit: 1,
            },
        ],
    });

    /*
     * Setup: Create a collection of documents that are inserted in ascending order.
     * Test: Query for all documents and sort them in descending order, but limit the result to a
     * single document.
     */
    tests.push({
        name: 'Sort.ReverseInsertionOrderLimitOne',
        tags: ['sort'],
        pre: insertAscOrder,
        ops: [
            {
                op: 'find',
                query: {query: {}, orderBy: {a: -1}},
                limit: 1,
            },
        ],
    });
})();
