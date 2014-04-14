# Getting React

let's start with a bower.json

    {
      "name": "tinkle-react",
      "version": "0.10.0",
      "main": "react.js"
    }

and install it:

    $ bower install

alternatively, you can just link to live versions of the libs in your script tags

# Using React

Create a basic index.html that contains these three script tags:

    <script src="bower_components/react/react-with-addons.js"></script>
    <script src="bower_components/react/JSXTransformer.js"></script>

# Creating your first component with JSX
    <script type="text/jsx" src="scripts/app.jsx"></script>

Now, inside of `scripts/app.jsx`, you *must* put this at the top:

    /**
     * @jsx React.DOM
     */


# About that JSX...

JSX is an XML representation of your React component. Each component is really just a function that returns a...representation of your component.

This JSX is getting transformed by the browser on they fly.
You don't really even have to use it. You can skip it and use the plain JavaScript API.

Or, you can precompile your JSX.
We'll look at that later on.

# One more thing

You can't load .jsx like a regular script (at least in Chrome).
You'll get a

    Cross origin requests are only supported for HTTP. index.html:1
    Uncaught NetworkError: A network error occurred.

# Creating a component.

The way we'll break that down is to create a simple double-entry bookkeeping system.
(Taxes, anyone?)

# Data Binding!

Here's what we want: we want to be able to type into the input component, and have it display on the output component.

And here's a digram showing that when the onChange handler is triggered for the input, we set the value of `this.props.value` which goes "up the chain" and then is set on the output component.

# Two more components

... oh, dear.
...this gets much more complicated


# Refs and getting values from rendered DOM nodes

Because we're only ever returning **representations**  of our components, we need ways to:

- access sub-components
- retrieve values via those references

The `ref` attr lets you name your sub-components so that parent components can access them.

And, `getDOMNode` is a React method that gives you access to the DOM element.
(Remember: React components are *not* DOM elements. They are functions that return representations of DOM elements.)

# React Developer Tools

