
name: cover
class: center, middle, s-inverse, l-cover
layout: true

---

name: intro
tempalte: cover

# Build High Performance UIs<br />with Facebook's React

## Chris Aquino, Big Nerd Ranch

???
# etc. (*coffee, bourbon, cats, bacon, sushi*)

---
name: bnr-logo
class: center, middle
layout: false

![](img/bnr-logo.png)

???
# Big Nerd Ranch

---
name: bnr-website
class:
layout: false

# Training *and* App Development
![](img/bignerdranch.png)


???
# Two very different roles
* training
* app development for consulting

# Always
* evaluating new
  * tools
  * libraries
  * frameworks
* looking ahead


---

name: and-then-react
template: cover

# React

---

name: what-it-is

# "A JavaScript Library for Building User Interfaces"

--

* Not a framework

--

* V in MVC

--

* UI Components

--

* [demo](/birthday)

???
# What does all of that mean?

Let's take a look at some code

---



name: countdown
class: small-code

# Birthday countdown example

```html
<!DOCTYPE html>
<html>
  <head>


  </head>
  <body>


















  </body>
</html>
```

---



name: countdown
class: small-code

# Birthday countdown example

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="../build/react.js"></script>
    <script src="../build/JSXTransformer.js"></script>
  </head>
  <body>


















  </body>
</html>
```


---

name: countdown
class: small-code

# Birthday countdown example

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="../build/react.js"></script>
    <script src="../build/JSXTransformer.js"></script>
  </head>
  <body>

    <script type="text/jsx">
      var ExampleApplication = React.createClass({
        render: function() {
          var elapsed = Math.round(this.props.elapsed  / 100);
          var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
          var message = 'Hooray! Another year in ' + seconds + ' seconds.';
          return React.DOM.h1(null, message);
        }
      });
      var bday = new Date("April 18, 2014 08:12:00");
      setInterval(function() {
        React.renderComponent(
          ExampleApplication({elapsed: bday.getTime() - new Date().getTime()}),
          document.getElementById('container')
        );
      }, 50);
      </script>
  </body>
</html>
```


---



name: countdown
class: small-code

# Birthday countdown example

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="../build/react.js"></script>
    <script src="../build/JSXTransformer.js"></script>
  </head>
  <body>
    <div id="container"></div>
    <script type="text/jsx">
      var ExampleApplication = React.createClass({
        render: function() {
          var elapsed = Math.round(this.props.elapsed  / 100);
          var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
          var message = 'Hooray! Another year in ' + seconds + ' seconds.';
          return React.DOM.h1(null, message);
        }
      });
      var bday = new Date("April 18, 2014 08:12:00");
      setInterval(function() {
        React.renderComponent(
          ExampleApplication({elapsed: bday.getTime() - new Date().getTime()}),
          document.getElementById('container')
        );
      }, 50);
      </script>
  </body>
</html>
```
[demo](/birthday)

---



name: countdown

# The script tag

```html
    <script type="text/jsx">
      var ExampleApplication = React.createClass({
        render: function() {
          return React.DOM.h1(null, "");
        }
      });
      React.renderComponent(
        ExampleApplication(),
        document.getElementById('container')
      );
    </script>
```
???

---

name: components
template: cover

# Component Basics

---

# React components

```js
  var MyComponent = React.createClass({



  });
```
---

# React components

```js
  var MyComponent = React.createClass({
    render: function() {

    }
  });
```

---
# React components

```js
  var MyComponent = React.createClass({
    render: function() {
      return React.DOM.h1(null, "Ni hao, react");
    }
  });
```

---
# React components

```js
  var MyComponent = React.createClass({
    render: function() {
      return React.DOM.h1(null, "Ni hao, react");
    }
  });
```
```js
  React.renderComponent(


  );
```

---

# React components

```js
  var MyComponent = React.createClass({
    render: function() {
      return React.DOM.h1(null, "Ni hao, react");
    }
  });
```
```js
  React.renderComponent(
    MyComponent()

  );
```
---
# React components

```js
  var MyComponent = React.createClass({
    render: function() {
      return React.DOM.h1(null, "Ni hao, react");
    }
  });
```
```js
  React.renderComponent(
    MyComponent(),
    document.getElementById('example')
  );
```

---

name: jsx
template: cover

# JSX Example

---
# React components: JavaScript

```js
  var MyComponent = React.createClass({
    render: function() {
      return React.DOM.h1(null, "Ni hao, react");
    }
  });
```
```js
  React.renderComponent(
    MyComponent(),
    document.getElementById('example')
  );
```

---

# React components: JSX

```js
  var MyComponent = React.createClass({
    render: function() {
      return (<h1>Ni hao, react</h1>);
    }
  });
```
```js
  React.renderComponent(
    <MyComponent />,
    document.getElementById('example')
  );
```

---

name: ni-hao-react
class: small-code

# Ni Hao, React

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="../build/react.js"></script>
    <script src="../build/JSXTransformer.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <script type="text/jsx">
      /** @jsx React.DOM
      */
      var MyComponent = React.createClass({
        render: function() {
          return (<h1>Ni hao, react</h1>);
        }
      });
      React.renderComponent(
        <MyComponent />,
        document.getElementById('example')
      );
    </script>
  </body>
</html>
```
[demo](/ni-hao-react/index.html)

---

# Enabling JSX Transformations

```html
  <script src="../build/react.js"></script>
  <script src="../build/JSXTransformer.js"></script>
```

--

```html
  <script type="text/jsx">
    /** @jsx React.DOM
    */

    // React code goes here
  </script>
```

???

---
name: wait
template: cover

# Wait.
---
name: why
# Code and markup living together?

* Isn't this like yucky PHP?

--

* Shouldn't I be using Handlebars|Mustache|Whatever?

--

* What about separation of concerns?

--

* Will it make my jeans less skinny?


---
name: aside
# An aside

[![Default-aligned image](img/templates-separate-cover.png)](video/templates-separate-technologies.mp4)
???

Templates aren't a separation of concerns.
They're a separation of technology.
---
name: not-so-bad

# JSX

--

* embedded XML

--

* transforms to functions

--

* Completely optional.

--

* **not** part of React!
---

# Would you rather write:

```js
var HelloMessage = React.createClass({
  render: function() {
    return (
      React.DOM.div(null,
        React.DOM.h1(null, "Greetings, Professor ", this.props.name,"."),
            React.DOM.p(null,
              "Would you like to play a game?",React.DOM.br(null ),
              "How about a nice game of",
              React.DOM.a( {href:"http://nsa.gov"}, "Chess"),"?"
            )
      )
    );
  }
});

React.renderComponent(HelloMessage( {name:"Professor Falken"} ), mountNode);
```

---
# Or this?

```js
var HelloMessage = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Greetings, Professor {this.props.name}.</h1>
            <p>
              Would you like to play a game?<br />
              How about a nice game of
              <a href="http://nsa.gov">Chess</a>?
            </p>
      </div>
    );
  }
});

React.renderComponent(<HelloMessage name="Professor Falken" />, mountNode);
```

---
# Advantages of JSX

--

* Easier to read

--

* Designer-friendly!

--

* Looks like the output

--

* Is used throughout these slides

---

# JSX Compiler

![](img/jsx-compiler.png)

[facebook.github.io/react/jsx-compiler.html](http://facebook.github.io/react/jsx-compiler.html)
---

name: composition
template: cover

# Data flow example

---

# Rot13 converter

![](img/kung-fu.png)

[/data-flow/final.html](/data-flow/)

---

# Rot13 converter

![](img/kung-fu-components.png)


---

# Rot13 converter

## What components do we need?

--

* Input

--

* Output

--

* App



---
# Rot13 converter

## How will it work?

![](img/rot13-data-flow.png)


---
class: small-code
# Start with some HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="../build/react.js"></script>
    <script src="../build/JSXTransformer.js"></script>
  </head>
  <body>
    <div id="container"></div>
    <script type="text/jsx">
      /** @jsx React.DOM */














    </script>
  </body>
</html>
```

---

class: small-code
# Create three components

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="../build/react.js"></script>
    <script src="../build/JSXTransformer.js"></script>
  </head>
  <body>
    <div id="container"></div>
    <script type="text/jsx">
      /** @jsx React.DOM */
      var InputComponent = React.createClass({
          render: function () {
          }
      });

      var OuputComponent = React.createClass({
          render: function () {
          }
      });

      var AppComponent = React.createClass({
          render: function () {
          }
      });
    </script>
  </body>
</html>
```

---
class: small-code
# (Same slide, but HTML omitted)

```html








    <script type="text/jsx">
      /** @jsx React.DOM */
      var InputComponent = React.createClass({
          render: function () {
          }
      });

      var OuputComponent = React.createClass({
          render: function () {
          }
      });

      var AppComponent = React.createClass({
          render: function () {
          }
      });
    </script>

.
```

---
class: small-code
# Add return values

```js
  var InputComponent = React.createClass({
      render: function () {
          return (
              <input></input>
          );
      }
  });

  var OuputComponent = React.createClass({
      render: function () {
          return (
              <div></div>
          );
      }
  });

  var AppComponent = React.createClass({
      render: function () {
          return (
            <div>


            </div>
          );
      }
  });

```

---
class: small-code
# Buzzword: Composition

```js
  var InputComponent = React.createClass({
      render: function () {
          return (
              <input></input>
          );
      }
  });

  var OuputComponent = React.createClass({
      render: function () {
          return (
              <div></div>
          );
      }
  });

  var AppComponent = React.createClass({
      render: function () {
          return (
            <div>
                <InputComponent />
                <OuputComponent />
            </div>
          );
      }
  });
```

---
class: small-code
name: renderComponent
# Add React.renderComponent

```js
  var InputComponent = React.createClass({
      render: function () {
          return (
            <input></input>
          );
      }
  });

  var OuputComponent = React.createClass({
      render: function () {
          return (
              <div></div>
          );
      }
  });

  var AppComponent = React.createClass({
      render: function () {
          return (
            <div>
                <InputComponent />
                <OuputComponent />
            </div>
          );
      }
  });

  React.renderComponent(
    <AppComponent />,
    document.getElementById('container')
  );
```

---
name: props
template: cover
# props
---

# Passing values via .props

![](img/trickle.png)

---
class: small-code

# Passing values via .props


```js
  var InputComponent = React.createClass({
      render: function () {
          return (
            <input></input>
          );
      }
  });

  var OuputComponent = React.createClass({
      render: function () {
          return (
              <div>{ this.props.value }</div>
          );
      }
  });

  var AppComponent = React.createClass({
      render: function () {
          return (
            <div>
                <InputComponent />
                <OuputComponent value="I know kung fu" />
            </div>
          );
      }
  });

  React.renderComponent(
    <AppComponent />,
    document.getElementById('container')
  );
```
[demo](/data-flow/props.html)


---

name: 1direction
# Data flows in one direction

![](img/1direction.jpg)

---

name: 2direction
# But it can flow in two directions


![](img/2direction.jpg)

---

name: state
template: cover

# state

---

name: state
# Passing data via .state

![](img/state.png)

---

name: state
# Passing data via .state


```js
  var AppComponent = React.createClass({
      getInitialState: function () {
          return {
              value: "I know kung fu!!!!",
          }
      },
      render: function () {
          return (
            <div>
                <InputComponent />
                <OuputComponent value={ this.state.value } />
            </div>
          );
      }
  });

  React.renderComponent(
    <AppComponent />,
    document.getElementById('container')
  );
```
[demo](/data-flow/state.html)
---
name: events
template: cover

# Events

---
class: small-code
# Getting data from the input

```js
  var InputComponent = React.createClass({



      render: function () {
          return (
            <input

            ></input>
          );
      }
  });
```

---
class: small-code
# Getting data from the input

```js
  var InputComponent = React.createClass({
      changeHandler: function (event) {
          console.log(event.target.value);
      },
      render: function () {
          return (
            <input
              onChange={ this.changeHandler }
            ></input>
          );
      }
  });
```

[demo](/data-flow/events.html)

---
class: small-code
# Sending data to the parent

```js
  var InputComponent = React.createClass({
      changeHandler: function (event) {
          this.props.sendChange(event.target.value);
      },
      render: function () {
          return (
            <input
              onChange={ this.changeHandler }
            ></input>
          );
      }
  });
```

[demo](/data-flow/events.html)

---
class: small-code
# Sending data to the parent

```js
  var InputComponent = React.createClass({
      changeHandler: function (event) {
          this.props.sendChange(event.target.value);
      },
      render: function () {
          return (
            <input
              onChange={ this.changeHandler }
            ></input>
          );
      }
  });
  var AppComponent = React.createClass({
      getInitialState: function () {
          return {
              value: "I know kung fu!!!!",
          }
      },




      },
      render: function () {
          return (
            <div>
                <InputComponent />
                <OuputComponent value={ this.state.value} />
            </div>
          );
      }
  });
```


---
class: small-code
# Sending data to the parent

```js
  var InputComponent = React.createClass({
      changeHandler: function (event) {
          this.props.sendChange(event.target.value);
      },
      render: function () {
          return (
            <input
              onChange={ this.changeHandler }
            ></input>
          );
      }
  });
  var AppComponent = React.createClass({
      getInitialState: function () {
          return {
              value: "I know kung fu!!!!",
          }
      },
      updateValue: function (newValue) {



      },
      render: function () {
          return (
            <div>
                <InputComponent sendChange={ this.updateValue }/>
                <OuputComponent value={ this.state.value} />
            </div>
          );
      }
  });
```


---
class: small-code
# Sending data to the parent

```js
  var InputComponent = React.createClass({
      changeHandler: function (event) {
          this.props.sendChange(event.target.value);
      },
      render: function () {
          return (
            <input
              onChange={ this.changeHandler }
            ></input>
          );
      }
  });
  var AppComponent = React.createClass({
      getInitialState: function () {
          return {
              value: "I know kung fu!!!!",
          }
      },
      updateValue: function (newValue) {
        this.setState({
            value: newValue
        });
      },
      render: function () {
          return (
            <div>
                <InputComponent sendChange={ this.updateValue }/>
                <OuputComponent value={ this.state.value} />
            </div>
          );
      }
  });
```

[demo](/data-flow/events2.html)

---
name: finally
# And now...Rot13

```js




  var OuputComponent = React.createClass({
      render: function () {
          return (
              <div>{ this.props.value }</div>
          );
      }
  });
```

---
name: finally
# And now...Rot13

```js
  var rot13 = function (s) {
      return s.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
  }

  var OuputComponent = React.createClass({
      render: function () {
          return (
              <div>{ rot13(this.props.value) }</div>
          );
      }
  });
```
[demo](/data-flow/rot13.html)
---
class: small-code

name: completion
# Completed JavaScript code
[demo](/data-flow/complete.html)

---
template: cover
# Debugging

---

# React Developer Tools

![](img/dev-tools.png)

---
# React Developer Tools

[demo](/data-flow/complete-buggy.html)

---

name: find-out-more
template: cover


# Find out more about React

---

name: official-website
class:

# facebook.github.io/react
.center[![](img/facebook.github.io.png)]

---
name: github
class:

# github.com/facebook/react
.center[![](img/github.png)]

---

name: google-group

# groups.google.com/group/reactjs
.center[![](img/groups.google.png)]

---

name: bnr-blog

# blog.bignerdranch.com
.center[![](img/blog.bignerdranch.png)]


---
name: outro
template: cover

# Thank you!


## Chris Aquino, Big Nerd Ranch

@bignerdranch
