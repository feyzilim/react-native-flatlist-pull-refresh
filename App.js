import React from 'react';
import { View, Text, FlatList } from 'react-native';

export default class App extends React.Component {
  state = {
    items: [],
    isLoading: false
  }

  renderRow = ({ item }) => {
    return (
      <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text>{item.id}) {item.title}</Text>
      </View>
    )
  }

  componentDidMount(){
    this.getData()
  }

  getData = () => {
    let API_URL = 'https://jsonplaceholder.typicode.com/posts';
    this.setState({isLoading:true})
    fetch(API_URL).then(res => res.json()).then(res => {
      this.setState({ items: res })
    }).finally(()=> this.setState({isLoading:false}))
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 50 }}>
        <FlatList
          data={this.state.items}
          renderItem={this.renderRow}
          refreshing={this.state.isLoading}
          onRefresh={this.getData}
          keyExtractor={(i, k) => k.toString()}
        />
      </View>
    )
  }
}