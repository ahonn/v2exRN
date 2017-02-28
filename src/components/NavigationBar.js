import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

class NavigationBar extends Component {
  static defaultProps = {
    height: 50,
    title: '',
    textColor: '#000',
    backgroundColor: '#fff',
  };

  static propTypes = {
    height: PropTypes.number,
    title: PropTypes.string,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    renderLeftButton: PropTypes.func,
    renderRightButton: PropTypes.func,
    onDbclickTitle: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      click: 1,
    }

    this._onDbclickTitle = this._onDbclickTitle.bind(this);
  }

  _onDbclickTitle() {
    if (this.state.click === 1) {
      this.setState({ click: 0 });
      setTimeout(() => {
        this.setState({ click: 1 });
      }, 500);
    } else {
      this.props.onDbclickTitle && this.props.onDbclickTitle();
    }
  }

  render() {
    const navStyle = {
      height: this.props.height,
      backgroundColor: this.props.backgroundColor,
      ...this.props.style
    };

    return (
      <View style={[styles.container, navStyle]}>
        <View style={styles.left}>
          {this.props.renderLeftButton && this.props.renderLeftButton()}
        </View>
        <View style={styles.title}>
          <Text
            style={[styles.titleText, { color: this.props.textColor }]}
            onPress={this._onDbclickTitle}
          >
            {this.props.title}
          </Text>
        </View>
        <View style={styles.right}>
          {this.props.renderRightButton && this.props.renderRightButton()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  left: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
    textAlign: 'center',
  },
  right: {
    flex: 1,
    paddingRight: 15,
    justifyContent: 'center',
  }
});

export default NavigationBar;
