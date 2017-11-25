import React, { PureComponent } from 'react';
import { Text, View, ActivityIndicator,Alert } from 'react-native';
import { Container, Header, Body, Title, Content, List, ListItem } from 'native-base';
import DataItem from '../components/list_item';
import { getArticles } from '../services/news';


export class HomeScreen extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: null,
            isError: false
        }
    }

    componentDidMount() {
        getArticles().then(data=>{
            this.setState({
                isLoading:false,
                data:data
            })
        },error=>{
            Alert.alert(JSON.stringify("Something happend, please try again"))
        })
    }

    render() {
        let view = this.state.isLoading ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator animating={this.state.isLoading} color="#00f0ff" />
                <Text style={{ marginTop: 8 }} children="Please wait..." />
            </View>
        ) : (
                <List
                    dataArray={this.state.data}
                    renderRow={(item) => {
                        return (
                            <ListItem>
                                <DataItem data={item} />
                            </ListItem>
                        )
                    }} />

            )
        return (
            <Container>
                <Header>
                    <Body>
                        <Title children="RN NewsApp" />
                    </Body>
                </Header>
                <Content
                    contentContainerStyle={{ flex:1, backgroundColor: '#fff' }}
                    padder={false}
                    children={view} />
            </Container>
        )
    }
}