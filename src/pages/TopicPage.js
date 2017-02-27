import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
  StyleSheet,
  InteractionManager,
  TouchableWithoutFeedback
} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../config/theme';
import api from '../api';

class TopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: {}
    }

    this._onPressBack = this._onPressBack.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this._fetchTopic();
    });
  }

  _fetchTopic() {
    const { id } = this.props.topic;
    api.fetchTopicById(id).then(topic => {
      this.setState({ topic });
    });
  }

  _onPressBack() {
    this.props.navigator.pop();
  }

  _renderNavigationBar() {
    const isiOS = Platform.OS === 'ios';
    const iconName = isiOS ? 'ios-arrow-back' : 'md-arrow-back';

    return (
      <NavigationBar
        title='主题'
        textColor={theme.color.white}
        backgroundColor={theme.color.theme}
        renderLeftButton={() => {
          return (
            <TouchableWithoutFeedback onPress={this._onPressBack}>
              <View style={navStyles.back}>
                <Icon name={iconName} size={22} color={theme.color.white} />
                { isiOS && <Text style={navStyles.backText}>返回</Text>}
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    );
  }

  render() {
    console.log(this.props);
    const { topic } = this.state;
    return(
      <View style={styles.container}>
        {this._renderNavigationBar()}
        <View style={styles.topic}>
          <View style={styles.header}>
            <Text style={styles.title}>{topic.title}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topic: {
    padding: 15,
  },
});

const navStyles = StyleSheet.create({
  back: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 10,
    fontSize: 16,
    color: theme.color.white,
  }
});
export default TopicPage;
