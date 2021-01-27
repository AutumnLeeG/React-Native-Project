import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Share } from 'react-native';
import { Card, Icon, } from 'react-native-elements';
import { postFavorite } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {

    return {
        cats: state.cats,
        favorites: state.favorites
    }
};

const mapDispatchToProps = {
    postFavorite: catId => (postFavorite(catId)),
};

function RenderCat(props) {

    const {cat} = props;

    const shareCat = (title, message, url) => {
        Share.share({
            title: title,
            message: `${title}: ${message} ${url}`,
            url: url
        },{
            dialogTitle: 'Share ' + title
        });
    };

    if (cat) {
        
        return (
            <Card
                featuredTitle={cat.name}
                image={{uri: baseUrl + cat.image}}>
                    <Text style={{margin: 10}}>
                        {cat.description}
                    </Text>
                        <View style={styles.cardRow}>
                            <Icon
                                name={props.favorite ? 'heart' : 'heart-o'}
                                type='font-awesome'
                                color='#d8bfd8'
                                raised
                                reverse
                                onPress={() => props.favorite ? console.log('Already set as a favorite') : props.markFavorite()}
                            />
                            <Icon
                                name='pencil' 
                                type='font-awesome'
                                color='#d8bfd8'
                                raised
                                reverse
                                onPress={() => props.onShowModal()} 
                            />
                            <Icon
                                name={'share'}
                                type='font-awesome'
                                color='#d8bfd8'
                                raised
                                reverse
                                onPress={() => shareCat(cat.name, cat.description, baseUrl + cat.image)} 
                            />          
                    </View>
            </Card>
        );
    }

    return <View />;
}

class CatInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            name: ''
        };
    }

    static navigationOptions = {
        title: 'Cat Information' 
    }

    markFavorite(catId) {
        this.props.postFavorite(catId);
    }

    render() {

        const catId = this.props.navigation.getParam('catId');
        const cat = this.props.cats.cats.filter(cat => cat.id === catId)[0];
        return (
            <ScrollView>
                <RenderCat cat={cat}
                    favorite={this.props.favorites.includes(catId)}
                    markFavorite={() => this.markFavorite(catId)}
                    onShowModal={() => this.toggleModal()}
                />
            </ScrollView>
        );
    }  
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    modal: { 
        justifyContent: 'center',
        margin: 20
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(CatInfo);