import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { SwipeRow } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { deleteFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        cats: state.cats,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    deleteFavorite: catId => deleteFavorite(catId)
};

class Favorites extends Component {

    static navigationOptions = {
        title: 'Saved Cats'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFavoriteItem = ({item}) => {

            return (
                <SwipeRow rightOpenValue={-100} style={styles.swipeRow}>
                    <View style={styles.deleteView}>
                        <TouchableOpacity
                            style={styles.deleteTouchable}
                            onPress={() =>
                                Alert.alert(
                                    'Delete Cat?',
                                    'Are you sure you wish to delete this Cat? ' +
                                        item.name +
                                            '?',
                                    [
                                        {
                                            text: 'Cancel',
                                            onPress: () => console.log(item.name + 'Not Deleted'),
                                             style: 'cancel'
                                        },
                                        {
                                            text: 'OK',
                                            onPress: () => this.props.deleteFavorite(item.id)
                                        }
                                        ],
                                        { cancelable: false }
                                    )
                                }
                            >
                                <Text style={styles.deleteText}>Delete</Text>
                         </TouchableOpacity>
                    </View>    
                    <View>
                        <ListItem
                            title={item.name}
                            subtitle={item.description}
                            leftAvatar={{source: {uri: baseUrl + item.image}}}
                            onPress={() => navigate('CatInfo', {catId: item.id})}
                        />
                    </View>
                </SwipeRow>
            );
        };

        if (this.props.cats.isLoading) {
            return <Loading />;
        }
        if (this.props.cates.errMess) {
            return (
                <View>
                    <Text>{this.props.cats.errMess}</Text>
                </View>
            );
        }
        
        return (
            <Animatable.View animation="fadeInRightBig" duration={2000}>
                <FlatList
                    data={this.props.cats.cats.filter(
                        cat => this.props.favorites.includes(cat.id)
                    )}
                    renderItem={renderFavoriteItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: 'orange',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);