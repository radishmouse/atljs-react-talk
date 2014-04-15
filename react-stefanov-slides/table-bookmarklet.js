
(function(){
    var styles =
    '#reactive-table-overlay {\
    background: rgba(0, 0, 0, 0.7);\
    position: fixed;\
    width: 100%;\
    height: 100%;\
    top: 0;\
    left: 0;\
    }\
    #reactive-table-iframe {\
    width: 90%;\
    height: 90%;\
    padding: 5%;\
    }';

    function $$(s) {
        // We're taking the result of calling qsa and turning it into
        // an array. Is that because it returns a NodeList?
        // Or is it an ElementList?
        // It's a "non-live NodeList"
        return Array.prototype.slice.call(document.querySelectorAll(s));
    }

    function $(s) {
        // This is basically. getting the first result.
        // Possibly more efficient than calling plain ol' qs
        return $$(s)[0];
    }

    (function () {
        // Get all the tables and iterate through them using array's forEach
        $$('table').forEach(function(table, idx) {
            // make a button
            var button = document.createElement('button');
            button.innerHTML = 'pop &#8599;';
            // give it a handler, whose context is set to nil
            button.onclick = pop.bind(null, idx);
            // add it to the dom
            table.parentNode.insertBefore(button, table);
        });
        // style it, yo.
        var s = document.createElement('style');
        s.textContent = styles;
        document.head.appendChild(s);
    }());

    function pop(id) {
        // Create a div for the overlay
        var overlay = document.createElement('div');
        overlay.id = 'reactive-table-overlay';
        // give it that 'click to dismiss' lightbox functionality.
        overlay.onclick = function() {
            document.body.removeChild(overlay);
        };

        // ooh...we're putting an iframe inside the overlay?
        var iframe = document.createElement('iframe');
        iframe.id = 'reactive-table-iframe';
        overlay.appendChild(iframe);

        document.body.appendChild(overlay);

        // ah..., we're building the actual overlay contents
        // inside of the iframe by pulling in scripts from a remote server...
        var w, d;
        setTimeout(function () {
            // Do we really have access to the contentWindow?
            w = iframe.contentWindow;
            d = w.document;
            // We must...maybe because the iframe doesn't have a
            // remote source.
            var s = d.createElement('script');
            s.src = 'http://www.phpied.com/files/react/build/react.min.js';
            // Oh! and this is how we're making sure one script loads
            // after the other!
            // Using the one script's "onload" handler

            s.onload = function() {
                var s = d.createElement('script');
                s.src = 'http://www.phpied.com/files/react/build/table2.js';
                s.onload = populate;
                d.head.appendChild(s);
            }
            // Ok, now that the loading of those two have been chained
            // and, we're using the 2nd one's onload as an init()
            // we add the first script to the iframe's document's head.
            d.head.appendChild(s);
            s = d.createElement('style');
            s.textContent =
            'html{font-family:Arial;background:white}\
            td{border-top:1px solid black;padding:5px;cursor:cell}\
            th{padding:5px;cursor:pointer}\
            table{margin: 20px;border:1px solid black}\
            .tools{margin: 20px}\
            .tools button,.tools a{\
            border-radius:3px;border: 1px solid black;color:black;\
            background: #ddd;font:20px/24px Arial;\
            margin-right: 5px;padding: 5px;text-decoration: none}';
            d.head.appendChild(s);
        }, 0);

        function populate() {
            var headers, data;
            // Ok.. this is the weird part.
            // I *think* that the `id` label is bound to the id
            // passed in as an arg to `pop`
            // And, it's available here because `populate` has been assigned
            // as the onclick handler inside of `pop`
            // Which...I didn't realize you could do.
            //
            //
            // Oh! Oh, no! That's not it at all...
            // `populate` is a function declared *inside* of `pop`
            // So, id has closure scope.
            // I get it now...
            //
            //

            //
            // Ok, so. We grab the table associated with `id`
            var table = $$('table')[id];
            // Get an array of th elements, scoped to the table itself.
            var head = [].slice.call(table.getElementsByTagName('th'));
            // As opposed to getting the length?
            // This is equivalent to head.length == 0
            if (!'0' in head) {
                // instead, the head is a 'td' inside of a 'thead'
                head = [].slice.call(table.getElementsByTagName('thead').getElementsByTagName('td'));
            }

            // collect all of the textCotnents of the elements in head
            // Why use .reduce instead of .map and returning the textContent?
            // Like so:
            // headers = head.map(function (th) { return th.textContent});
            headers = head.reduce(function(res, th) {
                res.push(th.textContent);
                return res;
            }, []);

            // Get all of the rows, except for the first.
            var body = [].slice.call(table.getElementsByTagName('tr'), 1);

            // Again, he's building up an array, which...I still think he could have done
            // with .map
            data = body.reduce(function(res, tr) {
                var tds = tr.getElementsByTagName('td'),
                    row = [];

                // And now, iterate through the 'td' elements in the row
                for (var i = 0; i < tds.length; i++) {
                    // Stuffing the textContent into a new array
                    row.push(tds[i].textContent);
                }
                // And put that array in the bigger array
                res.push(row);
                return res;
            }, []);

            // Which, we could do as:
            /*
            data = body.map(function (tr) {
                var tds = tr.getElementsByTagName('td'),
                return tds.map(function (td) {
                    return td.textContent;
                });
            });
            */

            var table = w.React.renderComponent(
                w.Table({
                    headers: headers,
                    data: data
                }), d.body);
        }
    }

}());
