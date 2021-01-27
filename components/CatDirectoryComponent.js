import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tile } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import { View, FlatList, Text } from 'react-native';


const mapStateToProps = state => {
    return {
       cats : state.cats
    };
};

class Directory extends Component {

    static navigationOptions = {
        title: 'Cats'
    };

    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({item}) => {

            return (
                <ListItem>
                    <Tile
                        title={item.name}
                        caption={item.description}
                        featured
                        imageSrc={{uri: baseUrl + item.image}}
                        onPress={() => navigate('CatInfo', { catId: item.id })}  
                    />
                </ListItem>
            );
        };
        if (this.props.cat.isLoading) {
            return <Loading />;
        }
        if (this.props.cat.errMess) {
            return (
                <View>
                    <Text>{this.props.cat.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.items.items}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()} 
            />
        );
    }
}

export default connect(mapStateToProps)(Directory);