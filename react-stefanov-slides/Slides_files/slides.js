/** @jsx React.DOM */
React.initializeTouchEvents(true);

var List = React.createClass({displayName: 'List',
  
  getInitialState: function() {
    return {items: this.props.items};
  },
  
  preview: false,
  
  handleChange: function (e) {
    var items = this.state.items;
    this.preview 
      ? items[items.length - 1] = e.target.value
      : items.push(e.target.value);
    this.setState({items: items});
    this.preview = true;
  },
  
  handleSubmit: function (e) {
    this.preview = false;
    this.refs.input.getDOMNode().value = '';
    return false;
  },
  
  render: function() {
    return (
      React.DOM.form( {onSubmit:this.handleSubmit}, 
      React.DOM.ul(null, 
        this.state.items.map(function(item) {
          return React.DOM.li(null, item);
        }),
        this.props.editable 
          ? React.DOM.li(null, React.DOM.input( {ref:"input", onChange:this.handleChange} ))
          : ''
        
      )
      )
    );
  }
});

var effects = {
  componentDidMount: function (node) {
    setTimeout(function() {
      node.className += ' trans';
      
      var html = document.documentElement.offsetHeight;
      var pre = node.getElementsByTagName('pre')[0];
      if (!pre) return;
      var me = pre.offsetHeight + pre.offsetTop;
      if (me <= html) return;
      var ratio = (html - pre.offsetTop) / pre.offsetHeight;
      pre.style.fontSize = parseInt(getComputedStyle(pre).fontSize, 10) * ratio + 'px';
      pre.style.lineHeight = parseInt(getComputedStyle(pre).lineHeight, 10) * ratio + 'px';
    }, 20);
  }
};

var Slide = React.createClass({displayName: 'Slide',
  mixins: [effects],
  render: function() {
    return (
      React.DOM.div( {className:"slide whole"}, 
        React.DOM.h1(null, this.props.title),
        this.props.children
      )
    );
  }
});

var Shoutout = React.createClass({displayName: 'Shoutout',
  mixins: [effects],
  render: function() {
    return (
      React.DOM.div( {className:"slide whole"}, 
        React.DOM.div( {className:"line"}, React.DOM.p(null, React.DOM.span(null, this.props.title))),
        React.DOM.div( {className:"underline"}, this.props.children)
      )
    );
  }
});

var Slideshow = React.createClass({displayName: 'Slideshow',
  getInitialState: function() {
    return {idx: 0};
  },
  componentDidMount: function (node) {
    node.focus();
  },
  
  changeSlide: function(idx) {
    if (idx < this.props.children.length && idx > -1) {
      this.setState({idx: idx});
      location.hash = '#' + (idx + 1);
    }
  },
    
  handleKeyPress: function(e) {
    if (e.target.nodeName === 'INPUT' || e.target.nodeName === 'TEXTAREA') {
      return;
    }
    switch (e.keyCode) {
      case 39:
        this.changeSlide(this.state.idx + 1);
        break;
      case 37:
        this.changeSlide(this.state.idx - 1);
        break;
      default:
        //
    }    
  },
  
  handleClick: function(e) {
    //this.changeSlide(this.state.idx + (e.pageX > e.target.offsetWidth / 2 ? 1 : -1));
  },
  
  render: function() {
    var slide = this.props.children[this.state.idx];
    slide.props.key = this.state.idx + 1;
    return (
      React.DOM.div( {className:"currentSlide whole", tabIndex:"1", 
        onClick:this.handleClick}, 
        slide
      ));
  }
});

var show = React.renderComponent(
  Slideshow(null, 
  Shoutout( {title:"Reactive JavaScript"}, 
" by Stoyan Stefanov",React.DOM.br(null ),
    React.DOM.a( {href:"http://phpied.com"}, "phpied.com"),", " ,    React.DOM.a( {href:"http://twitter.com/stoyanstefanov"}, "@stoyanstefanov")
  ),
  Slide(null, 
    React.DOM.div( {className:"center"}, React.DOM.img( {src:"et.jpg"}))
  ),
  Slide( {title:"React"}, 
    React.DOM.ul(null, 
      React.DOM.li(null, "Facebook/Instagram"),
      React.DOM.li(null, React.DOM.a( {href:"https://github.com/facebook/react"}, "github.com/facebook/react")),
      React.DOM.li(null, "Build web UIs")
    )
  ),
  Shoutout( {title:"Apps"}, 
" Mutations: user, server, time... "  ),
  Shoutout( {title:"DOM"}, 
" Love/hate "  ),
  Slide( {title:"DOM love"}, 
    List( {items:["Familiar", "Does the job"]})
  ),
  Slide( {title:"DOM hate"}, 
    List( {items:["Browsers", "Wordy APIs", "Slow", "Event handlers"]})
  ),
  Shoutout( {title:"React: Components"}, 
" ... and their ", React.DOM.i(null, "live"), " data "  ),
  Slide( {title:"Table hell"}, 
    React.DOM.pre(null, EXAMPLES['table'])
  ),
  Slide( {title:"... and a link"}, 
    React.DOM.pre(null, "createElement('a'), setAttribute('href', 'http://'), ", React.DOM.br(null),
" createTextNode, append to the link, ", React.DOM.br(null),"append to the td, append to the tr...")
  ),
  Slide( {title:"... and then data changes!@#$"}, 
    List( {items:["Keep references?", "Traverse the nodes?", "Rebuild? Event handlers?"]})
  ),
  Slide( {title:"React"}, 
    List( {items:["Table component with Rows and Cells", "Some data", "Deal with it"]})
  ),
  Slide( {title:"Data changes"}, 
    List( {items:["Here's the data", "Deal with it"]})
  ),
  Slide( {title:"Virtual DOM"}, 
    List( {items:["In JS land", "Diffs", "Efficient updates"]})
  ),
  Slide( {title:"Synthetic events"}, 
    List( {items:["Event delegation", "W3C, x-browser, e.target", "Bubbling, capturing", "Fixes, e.g. onChange"]})
  ),
  Slide( {title:"Virtual DOM ++"}, 
    List( {items:["JS-land", "Server-side", "WebWorkers"]})
  ),
  Slide( {title:"Selling points"}, 
    List( {items:["Declarative", "Efficient", "Flexible"]})
  ),
  Shoutout( {title:"Components"}),
  Slide( {title:"Component"}, 
    React.DOM.pre(null, EXAMPLES['component'])
  ),
  Slide( {title:"Another component"}, 
    React.DOM.pre(null, EXAMPLES['more_component'])
  ),
  Shoutout( {title:"JSX"}),
  Slide( {title:"Using JSX"}, 
    React.DOM.pre(null, EXAMPLES['jsx'])
  ),
  Slide( {title:"JSX-to-JS transform"}, 
    List( {items:['Build', 'On-the-fly']})
  ),
  Shoutout( {title:"Hello world"}),
  Slide( {title:"Markup"}, 
    React.DOM.pre(null, EXAMPLES['hello-html'])
  ),
  Slide( {title:"src/hello.js"}, 
    React.DOM.pre(null, EXAMPLES['hello-jsx'])
  ),
  Slide( {title:"Building"}, 
    React.DOM.pre(null, EXAMPLES['build'])
  ),
  Slide( {title:"build/hello.js"}, 
    React.DOM.pre(null, EXAMPLES['hello-js'])
  ),
  Slide( {title:"On-the-fly transform"}, 
    React.DOM.pre(null, EXAMPLES['jsx-on-the-fly'])
  ),
  Slide( {title:"JSX"}, 
    List( {items:["Simple transform", "Keeps line #s", "Allows JS"]})
  ),
  Slide( {title:"A slide"}, 
    React.DOM.pre(null, EXAMPLES['slide'])
  ),
  Slide( {title:"Components"}, 
    List( {items:["<Slide/>", "<List/>"], editable:"true"})
  ),
  Slide( {title:"Stateless <Slide/>"}, 
    React.DOM.pre(null, EXAMPLES['slide-component'])
  ),
  Slide( {title:"Stateful <List/>"}, 
    React.DOM.pre(null, EXAMPLES['list'])
  ),
  Slide( {title:"Event handlers"}, 
    React.DOM.pre(null, EXAMPLES['list-handlers'])
  ),
  Slide( {title:"Inheritance?"}, 
    List( {items:["Composition", "Mixins"]})
  ),
  Slide( {title:"Composition"}, 
    React.DOM.pre(null, EXAMPLES['composition'])
  ),
  Slide( {title:"Mixins"}, 
    React.DOM.pre(null, EXAMPLES['mixin'])
  ),
  Slide( {title:"Transform example"}, 
    React.DOM.div( {className:"center"}, Transphormador( {examples:[]}))
  ),
  Slide( {title:"JS UI"}, 
    List( {items:[
      "Content vs behavior?",
      "No more node-hunting",
      "Or verbose createElement/appendChild"]})
  ),
  Shoutout( {title:"Thank you!"}, 
    React.DOM.a( {href:"https://github.com/facebook/react"}, "github.com/facebook/react")
  )
  ),
  document.getElementById('slideshow')
);

// #12, etc
function loco() {
  show.changeSlide(parseInt(location.hash.substr(1), 10) - 1);
}
loco();
window.onpopstate = loco;

onkeydown = show.handleKeyPress;


