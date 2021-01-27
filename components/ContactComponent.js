import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Info'
}

sendMail() {
    MailComposer.composeAsync({
        recipients: ['cats@FurEverLove.com'],
        subject: 'I love this cat',
        body: 'To FurEver Love:'
    })
}

render() {

    return (
        <ScrollView>
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                <Card
                        title="Contact Information"
                        wrapperStyle={{margin: 20}}>
                        <Text>23 pawsome Rd</Text>
                        <Text>Stacy, MN 55079</Text>
                        <Text style={{marginBottom: 10}}>U.S.A</Text>
                
                        <Text>Phone: 1-234-567-8910</Text>
                        <Text>Email: cats@FurEverLove.com</Text>
                        <Button
                            title="Send Email"
                            buttonStyle={{backgroundColor: '#5f9ea0', margin: 40}}
                            icon={<Icon
                                name='envelope-o'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{marginRight: 10}}
                            />}
                            onPress={() => this.sendMail()}
                        />
                </Card>
               </Animatable.View>
           </ScrollView>
        );
    }
}

export default Contact;