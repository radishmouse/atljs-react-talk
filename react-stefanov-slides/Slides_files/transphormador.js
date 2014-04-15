/** @jsx React.DOM */

var DOCBLOCK = '/** @jsx React.DOM */\n';
var Transphormador = React.createClass({displayName: 'Transphormador',

  getInitialState: function () {
    return {code: DOCBLOCK, result: '', error: ''};
  },

  transform: function (code) {
    try {
      var result = JSXTransformer.transform(code).code;
      this.setState({code: code, error: '', result: result});
    } catch (err) {
      this.setState({code: code, error: err.message, result: ''});
    }
  },

  handleChange: function(e) {
    this.transform(e.target.value);
  },

  render: function () {
    var examples = this.props.examples.map(function(ex, id) {
      return React.DOM.button( {onClick:this.transform.bind(this, ex)}, 
               "Example " + (id + 1)
             );
    }.bind(this));
    return (
      React.DOM.div( {className:"whole"}, 
        examples,
        React.DOM.p( {className:"error"}, this.state.error),
        React.DOM.textarea( {onChange:this.handleChange, value:this.state.code, 
                  onKeyPress:function(e){e.stopPropagation()}}),
        React.DOM.textarea( {value:this.state.result} )
      )
    );
  }
});

