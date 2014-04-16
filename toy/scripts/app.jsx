/**
 * @jsx React.DOM
 */


var rot13 = function (s) {
    return s.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
}

var InputComponent = React.createClass({

    changeHandler: function (event) {
        // this.props.updateHandler(this.refs.inputField.getDOMNode().value);
        this.props.updateHandler(event.target.value);
        event.preventDefault();
    },

    render: function () {
        return (
            <form>
                <input
                    // ref="inputField"
                    value={ this.props.value }
                    onChange={ this.changeHandler }
                />
            </form>
        );
    }
});

var OuputComponent = React.createClass({
    changeHandler: function (event) {
        this.props.updateHandler(event.target.innerHTML);
        event.preventDefault();
    },
    toggleContentEditable: function (event) {
        var editable = !event.target.isContentEditable + "";
        event.target.contentEditable = editable;
        console.log(editable);
    },
    render: function () {
        return (
            <div
                title={this.props.outValue}
                onClick={ this.toggleContentEditable }
                onBlur={ this.changeHandler }
            >
                { rot13(this.props.outValue) }
            </div>
        );
    }
});

var ExampleApp = React.createClass({

    getInitialState: function () {
        return {
            value: '',
        }
    },

    updateValue: function (newValue) {
        // this.props.value = newValue
        this.setState({
            value: newValue
        })
    },

    render: function () {
        return (
            <div>
                <InputComponent
                    updateHandler={ this.updateValue }
                    value={ this.state.value }
                />
                <OuputComponent
                    updateHandler={ this.updateValue }
                    outValue={ this.state.value }
                />
            </div>
        );
    }
});

var start = new Date().getTime();


React.renderComponent(
    <ExampleApp />,
    // <ExampleApp value={new Date().getTime() - start}/>,
    document.body
);
