/**
 * @jsx React.DOM
 */

var InputComponent = React.createClass({

    submit: function (event) {
        this.props.updateHandler(this.refs.inputField.getDOMNode().value);
        event.preventDefault();
    },

    render: function () {
        return (
            <form >
                <input
                    ref="inputField"
                    onChange={ this.submit }
                />
            </form>
        );
    }
});

var OuputComponent = React.createClass({
    render: function () {
        return (
            <div>
                { this.props.outValue }
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
        this.setState({
            value: newValue
        })
    },

    render: function () {
        return (
            <div>
                <InputComponent
                    updateHandler={ this.updateValue }
                />
                <OuputComponent
                    outValue={ this.state.value }
                />
            </div>
        );
    }
});

React.renderComponent(
    <ExampleApp />,
    document.getElementById("app")
);