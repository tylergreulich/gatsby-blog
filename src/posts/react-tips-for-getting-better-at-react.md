---

title: "Tips for Getting Better At React"
date: "2018-06-07"
---

Part of the reason why I wanted to share these are because time and time again I see people making mistakes in their React code... <!-- end --> (that's not to say that mine is perfect, because believe me, it's _far_ from it) and I wanted to put my two cents out there and share what I've learned from my own experience with writing code in React, and how you could possibly improve your own.

<style>
  a {
    color: rgb(221, 153, 63);
    text-decoration: none;
    position: relative;
  }

  a:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: rgb(221, 153,53);
  visibility: hidden;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
  margin: 0 0 -2px 0;
}

a:hover:before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}

h1 > a {
  background-color: transparent !important;
  transition: none !important;
}

h1 > a:before {
  background-color: transparent !important;
}

pre {
  background: #eee
}

code {
  background: #eee
}
</style>

Now the other part of that reason is because I'm starting to get tired of seeing people using constructors when initializing their state (_I'm kidding!_ Okay, kinda), unless of course they either come from a background in Object Oriented Progamming, or they've just been writing code in React for so long that it's just become second nature.

Either way, here are some of the things I'd like to share that have helped me in producing more modular and readable code since I started to learn React.

---

## #1 Know when to use a Stateful Class Component and a Stateless Functional Component

This one shouldn't be too surprising, but if you're not planning on making use of component level state or the lifecycle hooks that come with a Stateful component **(ComponentDidMount, ComponentDidUpdate, etc)**, then more often than not you should be creating a Stateless component. Aside from the two things, the main purpose of a Stateless component (from what I've gathered at least) is just to return JSX.

### Stateful Component

```
class Hello extends Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}
```

### Converting it into a Stateless Component

```
const hello = props => <h1>Hello {props.name}</h1>;
```

See how clean that is compared to using it like a Stateful component? Not only that, but it's much easier to test if you're into that sorta thing.

If you only _need_ to return JSX from a component then you should only be using Stateless components.

_Note: You don't have to send props into the function argument if you aren't expecting any props._

---

## #2 Keep Your Components Small

Now this one kind of goes hand in hand with the previous one, but keeping your components lean will make your experience with buiding React apps much more pleasurable.

Not only that but if you're working with someone surely you don't want them to have to go through a component that's 300+ lines of code, right? Sometimes it's unavoidable, especially if you're working on a large project, but you should at least keep your components as concise as you possibly can.

```
class Comment extends Component {
  render() {
    const { user, text, date } = this.props;
    return (
      <div className="Comment">

        /* Instead of having these code blocks sitting here
           you an just split the code up into separate components */

        {/* <div className="UserInfo">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="Avatar"
          />  
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="Avatar"
          />
          <div className="UserInfo-name">{user.name}</div>
        </div> /*}
      </div>
    );
  }
}
```

#### Making things more modular

```
const userInfo = props => {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
};
```

```
const avatar = props => (
  <img
    src={props.user.avatarUrl}
    alt={props.user.name}
    className="Avatar"
  />
);
```

---

## #3 Handling _this_

If you _are_ using a Stateful component (you don't get _**this**_ in stateless components), you need to bind _**this**_
somehow. There are several ways of doing so, but I'm going to share what you _shouldn't_ do, and what is in my opinion, the best and cleanest way to do it.

**What you shouldn't do**

#### 1. Binding _this_ in the render method

```
  class HelloWorld extends Component {
    constructor(props) {
      super(props);
      this.state = {
        message: 'Hi'
      };
    };

    logMessageHandler() {
      console.log(this.state.message)
    }
    render() {
      return (
        <input type="text" onClick={this.logMessageHandler.bind(this)} />
      )
    }
  }
```

_Note: This causes a slight performance issue because a new function is going to be called every time a new component re-renders._

#### 2. Binding _this_ in the constructor

```
  class HelloWorld extends Component {
    constructor(props) {
      super(props);
      this.state = {
        message: 'Hi'
      };
      this.logMessageHandler = this.logMessageHandler.bind(this);
    };

    logMessageHandler() {
      console.log(this.state.message)
    }
    render() {
      return (
        <input type="text" onClick={this.logMessageHandler} />
      )
    }
  }
```

While this approach solves the performance issue, there is a much better and cleaner way of doing things.

Here's what you _**should**_ do

```
class HelloWorld extends Component {
  state = {
    message: 'Hello'
  }

  logMessageHandler = () => console.log(this.state.message);

  render() {
    return (
      <input type="text" onClick={this.logMessageHandler} />
    )
  }
}
```

What are the advantages to this solution? Well for one, there's no need to include the Constructor function in the mix of things which means typing less code, but you don't have to bind the _**this**_ keyword while also avoiding performance issues at the same time that came with the original solution.

### #4 Use a function in setState, not an object

Now React doesn't gaurantee that state changes are applied immediately, so using this syntax:

    this.setState({ correctData: !this.state.correctData });

is a potential pitfall because _**this.state**_ might not be what you think it is.

The correct way to do this in this particular scenario would be to use the following syntax:

    this.setState(prevState => { correctData: !prevState.correctData });

_Note: You can pass props into the function as an argument with prevState if you need to._

---

### #5 Tooling + Snippets

I'm not going to mention much aside from the fact that the [React](https://github.com/facebook/react-devtools) and [Redux](https://github.com/zalmoxisus/redux-devtools-extension) DevTools have made developing with
React a much more pleasurable experience overall, especially the Redux extension.

As far as Snippets are concerned (this is for [VS Code](https://code.visualstudio.com/), I'm not aware if this Snippet library exists for other text editors, but if not then I'm sure there are good alternatives), but I recommend using [ES7 React / Redux / GraphQL / React-Native Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets).

You can simply type 'rcc' followed by hitting tab, and you'll get a Stateful Component right out of the box, or 'rfc' if you want a Stateless Component. This saves a significant amount of time as I'm sure you could imagine.
