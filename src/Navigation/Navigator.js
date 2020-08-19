import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import * as React from 'react';
import AddVisitor from '../Screens/AddVisitor';
import AllVisitors from '../Screens/AllVisitors';
import LatestNews from '../Screens/LatestNews';

const Stack = createStackNavigator();

const RootNavigator = props => {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen
                    name={"add_visitor"}
                    component={AddVisitor}
                />
                <Stack.Screen
                    name={"all_visitors"}
                    component={AllVisitors}
                    options={{
                        title:"All Visitors"
                    }}
                />
                <Stack.Screen
                    name={"latest_news"}
                    component={LatestNews}
                    options={{
                        title:"Latest News"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}



export default RootNavigator