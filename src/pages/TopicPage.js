import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  RefreshControl,
  StyleSheet,
  InteractionManager,
  TouchableWithoutFeedback
} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../config/theme';
import { parseImageUrl } from '../utils';
import api from '../api';

class TopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: props.topic,
      isRefreshing: true,
    }

    this._onPressBack = this._onPressBack.bind(this);
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this._fetchTopic();
    });
  }

  _fetchTopic() {
    const { id } = this.props.topic;
    api.fetchTopicById(id).then(topic => {
      this.setState({
        topic,
        isRefreshing: false,
      });
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
    console.log(this.state);
    const { topic } = this.state;

    return(
      <View style={styles.container}>
        {this._renderNavigationBar()}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing} 
              onRefresh={this._onRefresh} /> }>
          <View style={styles.topic}>
            <View style={styles.header}>
              <Text style={styles.title}>{topic.title}</Text>
              <View style={styles.author}>
                <View style={styles.left}>
                  <Image
                    style={styles.avatar}
                    source={{ uri: parseImageUrl(topic.author.avatar) }}
                  />
                </View>
                <View style={styles.mid}>
                  <View style={styles.info}>
                    <Text style={styles.name}>{topic.author.name}</Text>
                    <Icon name='md-arrow-dropright' size={12} color={theme.color.theme} />
                    <Text style={styles.node}>{topic.node.name}</Text>
                  </View>
                  { topic.created && <Text style={styles.created}>发布于：{topic.created}</Text>}
                </View>
                <View style={styles.right}>
                  <Text style={styles.reply}>{topic.reply}</Text>
                </View>
              </View>
            </View>
            <View style={styles.content}>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topic: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    color: theme.color.black,
  },
  author: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  left: {
    width: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  mid: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  info: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  name: {
    marginRight: 5,
    fontWeight: 'bold',
    color: theme.color.theme,
  },
  node: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  created: {
    marginTop: 5,
    fontSize: 12,
  },
  right: {
    width: 30,
    height: 18,
    borderRadius: 10,
    backgroundColor: theme.color.lightTheme,
  },
  reply: {
    fontSize: 12,
    color: theme.color.white,
    textAlign: 'center',
  }
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
