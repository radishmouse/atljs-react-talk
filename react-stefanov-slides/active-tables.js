/** @jsx React.DOM */

var Table = React.createClass({

    getInitialState: function () {

        /*
         *
         * This provides the initial `this.state` for our component
         */
        return {
            data: this.props.data,
            headers: this.props.headers,
            sortby: null,
            search: false,
            edit: [-1, -1]
        };
    },

    //
    sort: function (e) {
        // What's the dataset property?
        // Holy shit. it's how you access data attributes!
        // And... he's using `data-idx` for the sortby?
        // Ah. this is probably attached to a column header.
        var by = e.target.dataset.idx;
        var state = this.state;
        // Um...does this mean descending?
        // And, he's setting this in the state.
        // I get it.
        // Wait...I actually don't.
        var desc = state.sortby === by;

        // Oh! clever.
        // This is how we translate a boolean to either a 1 or -1 for sorting!
        var one = function(boo) {return boo ? 1 : -1};

        // And, here's our big sorty-mcsorter.
        state.data = state.data.sort(function(a, b) {
            // Right. Since we're sorting rows, we index to find the right column
            var numa = Number(a[by].replace(/,/g, '')),
            numb = Number(b[by].replace(/,/g, ''));
            // And, we convert it to numbers, making sure to replace any...commas?

            if (isNaN(numa)) {
                return isNaN(numb)
                ? one(desc ? a[by] < b[by] : a[by] > b[by]) // two strings
                : (desc ? 1 : -1); // numbers first
            }
            return isNaN(numb)
            ? (desc ? -1 : 1)
            : one(desc ? numa < numb : numa > numb);
        });
        // Right...the sortby is
        state.sortby = desc ? null : by;
        // Make a copy of the array!
        // Why? Because assignment would just add a new reference.
        state.headers = this.props.headers.slice();
        // And, let's show that we're either ascending or descending.
        state.headers[by] = state.headers[by] + (desc ? ' \u2191' : ' \u2193');
        this.setState(state);
    },

    toggleSearch: function(e) {
        // Reset.
        this.state.search = !this.state.search;
        this.state.data = this.props.data;
        this.setState(this.state);
        e.target.innerHTML = this.state.search ? 'nuff searching' : 'search';
    },

    search: function(e) {
        // So, the e.target is likely an input[type='text']
        var needle = e.target.value.toLowerCase();
        if (!needle) {
            this.state.data = this.props.data;
            this.setState(this.state);
            // Reset if there's nothing in the search box.
            return;
        }
        // Remember, this is the column we're searching by
        var idx = e.target.dataset.idx;
        this.state.data = this.props.data.filter(function (a) {
            // Searching our data by column
            return a[idx].toString().toLowerCase().indexOf(needle) > -1;
        });
        // Set the state to trigger a re-render
        this.setState(this.state);
    },

    export: function(format, e) {
        var contents = format === 'json'
            ? JSON.stringify(this.state.data)
            : this.state.data.reduce((function(res, row){
                return res + this.getCSVRow(row)
            }).bind(this), this.getCSVRow(this.state.headers));

        // Oh! And this is part of the File API!
        var URL = window.webkitURL || window.URL;
        var bb = new Blob([contents], {type: 'text/' + format});
        e.target.href = URL.createObjectURL(bb);
        e.target.download = 'data.' + format;
    },

    // Where row is an array
    getCSVRow: function(row) {
        return '"' + row.join('","') + '"\n';
    },

    // ok, we're probably going to set `contenteditable` on this particular cell
    // Or, it's an input[type='text'], and we'll bind an event listener
    editor: function (e) {
        var data = e.target.dataset;
        this.state.edit = [Number(data.row), Number(data.column)];
        this.setState(this.state);
    },

    save: function (e) {
        e.preventDefault();
        var s = this.state;
        // Save the value from the input to the "coordinates" of the data
        s.data[s.edit[0]][s.edit[1]] = e.target.elements[0].value;
        s.edit = [-1, -1];
        this.setState(s);
    },

    // ok! now, we get to the whole React part of this
    render: function () {
        // search inputs
        var search = null;
        if (this.state.search) {
            // oh!! we're assigning a JSX description to a var...
            // which we can use as part of our return statement!
            // fuckin' awesome.
            search =
            <tr onChange={this.search}>
            {this.props.headers.map(function(ignore, idx) {
                return <td><input data-idx={idx}/></td>;
            })}
            </tr>;
        }

        return (
            <div>
                <div class="tools">
                <button onClick={this.toggleSearch}>search</button>
                or download:
                <a href="data.csv"  onClick={this.export.bind(this, 'csv')} >csv</a>
                <a href="data.json" onClick={this.export.bind(this, 'json')}>json</a>
                </div>
                <table>
                    <thead onClick={this.sort}>
                        <tr>
                        // This is...an expression that returns an array
                        // And this value gets interpolated?
                        {this.state.headers.map(function(cell, idx) {
                            return <th data-idx={idx}>{cell}</th>;
                        })}
                        </tr>
                    </thead>
                    <tbody onDoubleClick={this.editor}>
                        // And this is where we write out the value of our `search` var
                        {search}
                        {this.state.data.map(function(row, ridx) {
                            return (
                                <tr>
                                {row.map(function(cell, cidx) {
                                    var content =
                                    this.state.edit[0] === ridx && this.state.edit[1] === cidx
                                    ? <form onSubmit={this.save}><input defaultValue={cell}/></form>
                                    : cell;
                                    return <td data-row={ridx} data-column={cidx}>{content}</td>;
                                }.bind(this))}
                                </tr>);
                            }.bind(this))}
                    </tbody>
                </table>
            </div>
        );
    }
});


