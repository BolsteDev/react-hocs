# react-hocs

[![CircleCI](https://circleci.com/gh/BolsteDev/react-hocs.svg?style=svg)](https://circleci.com/gh/BolsteDev/react-hocs)

Higher Order Component Utilities for React Components

## Installation

```
yarn add react-hocs
```

## Usage

Full Example:

```js

// ----- READ USER COMPONENT ----- //
class ReadUser extends Component {
  static defaultProps = {
    href: string,
    user: null,
    isReady: false,
  }

  // Do some cool loading stuff here using this.props.href

  render() {
    const { children, isReady, user, ...rest } = this.props;

    return React.cloneElement(children, { user, userReady: isReady, ...rest });
  }
}

const mapStateToProps = (state, props) => {
  const { href } = props;
  return {
    isReady: state.networks.state === RESOLVED,
    user: state.networks.everyone.find(e => {
      return e.data.href === href;
    }),
  };
};

const connectReadUser = connectFactory(
  connect(mapStateToProps)(ReadUser)
);

export { ReadUser };
export default connectReadUser;

// ----- I NEED A USER COMPONENT ----- //

class INeedAUser extends Component {
  render() {
    if (!this.props.userReady) { return null; }

    return (
      <div>
        {this.props.user.data.first_name}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // Map other data here
  };
};

export default bind(
  // By default, the hocFactory will auto-map props for you, making this redundant
  // instead, we could use `connectReadUser()` and it would be the same functionality
  connectReadUser(({ href }) => { return { href }; }),
  connect(mapStateToProps)
)(INeedAUser);

// ----- APP COMPONENT ----- //

class App extends Component {
  render () {
    return (
      <INeedAUser href="/users/123" />
    );
  }
}

```
