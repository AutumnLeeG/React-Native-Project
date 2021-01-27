import React, { Component } from 'react';
import Loading from './LoadingComponent';
import { View, Text, } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
       cats : state.cats
    };
};

function RenderItem(props) {
    const {item} = props;

    if (props.isLoading) {
        return <Loading />
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}>
                <Text style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class Home extends Component {

    static navigationOptions = { 
        title: 'FurEver Love'
    }

    render() {
        return (
            <ScrollView>
                <RenderItem
                    item={this.props.cats.cats.filter(cat => cat.featured)[0]}
                    isLoading={this.props.cats.isLoading}
                    errMess={this.props.cats.errMess}
                />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);