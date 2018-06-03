<!-- ---
title: "React Tips for Getting Better At React"
date: "June 04 2018"
---

Part of the reason why I wanted to share these are because time and time again I see people making mistakes in their React code (that's not to say that mine is perfect, because believe me, it's *far*  from it) and I wanted to put my two cents out there and share what I've learned from my own experience with writing code in React, and how you could possibly improve your own.

Now the other part of that reason is because I'm starting to get tired of seeing people using constructors when initializing their state (*I'm kidding!* Okay, kinda), unless of course they either come from a background in Object Oriented Progamming, or they've just been writing code in React for so long that it's just become second nature.

Either way, here are some of the things I'd like to share that have helped me in producing more modular and readable code since I started to learn React.

//*  #1 Know when to use a Stateful Class Component and a Stateless Functional Component

// Stateless === A component without state that's well, just a function that returns JSX.
// Stateless === No lifecycle hooks.
// Stateless === No refs
// If your components aren't using state, refs, then 9 times out of 10 you're going to want to use a stateless funtional component

class Hello extends Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}

// This should be a funtional component

const hello = props => <h1>Hello {props.name}</h1>;

// Note: You don't have to send props into the function argument if you don't expect to receive any props

// Benefits: Less and much more clean code, easier to test.

//* #2 => Keep Your Components Small

// Easier to read, maintain, test, and reuse

class Comment extends Component {
  render() {
    const { user, text, date } = this.props;
    return (
      <div className="Comment">
        <UserInfo user={user} />
        {/* <div className="UserInfo">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="Avatar"
          />
          <div className="UserInfo-name">{user.name}</div>
        </div> */}
        <div className="Comment-text">{text}</div>
        <div className="Comment-date">{formatDate(date)}</div>
      </div>
    );
  }
}

// =>

const userInfo = props => {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      {/* <img
      src={props.user.avatarUrl}
      alt={props.user.name}
      className="Avatar"
    /> */}
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
};

//? More Modularity =>

const avatar = props => <img
  src={props.user.avatarUrl}
  alt={props.user.name}
  className="Avatar"
/>

//* Handling *this*

// If you *are* using a Stateful component (you don't get *this* in stateless components), you need to bind *this*
// somehow. There are several ways of doing so, but I'm going to share what is in my opinion, the best and cleanest
// way to do it.

//! Binding *this* in the render method
// ! NO CONSTRUCTOR !


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

  // This causes a slight performance issue because a new function is going to be called every time a new component re-renders.

  //! Bind in the constructor

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

  // Solves the performance issue, but there is a *much* better way of doing things for cleaner code.

  //* Arrow functions in Class Property

class HelloWorld extends Component {
  state = {
    message: 'Hello'
  }

  logMessageHandler = () => {
    console.log(this.state.message)
  }
  render() {
    return (
      <input type="text" onClick={this.logMessageHandler} />
    )
  }
}

  //* No Constructor
  //* Don't have to bind *this*
  //* Not repeating yourself
  //* Avoids performance issues


  //* #3 Use a function in setState, and not an object

  // React !== gaurantee state changes are applied immediately

  // So using *this.state* right after *this.setState* is a potential pitfall because *this.state* might not be what you think it is

  //! this.setState({ correctData: !this.state.correctData });

  //* this.setState((prevState, props) => { correctData: !prevState.correctData })

  // Receives prevState as it's first arg, and the props when the update is applied as it's second arg.

  //* #5 If you're not using Flow or TypeScript, utiilize PropTypes.

  import PropTypes from 'prop-types';

  class Welcome extends Component {
    render() {
      return (
        <h1>Hello {this.props.name}</h1>
      )
    }
  }

  Hello.propTypes = {
    name: PropTypes.string.isRequired
  }

  // Can help prevent bugs by ensuring that you're using the right data types for your props
  // You're going to want to install it with ``` npm i prop-types ```

  //* #5 Tooling + Snippets

  // I'm not going to mention much aside from the fact that the React and Redux DevTools have made developing with
  // React a much more pleasurable experience overall. I think i might've considered pulling my hair out at some
  // point if they didn't exist.

  // As far as Snippets are concered (this is for VS Code, I'm not aware if this Snippet library exists for other text editors, but if not then I'm sure there are good alternatives), I recommend using ES7 React / Redux / GraphQL / React-Native Snippets. You can simply type 'rcc' and you'll get a Stateful Component right out of the box, or 'rfc' if you want a Stateless Component. Saves a significant amount of time as I'm sure you could imagine. -->
