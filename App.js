// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

// import { Button, StyleSheet, Text, View,Alert } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { PERMISSIONS, request, check } from 'react-native-permissions';
// import Geolocation from '@react-native-community/geolocation';


// const App = () => {

//     const [location, setLocation] = useState(null);

//     useEffect(() => {
//         requestLocationPermission();
//     }, []);



//     const requestLocationPermission = async () => {
//         try {
//             const permission = Platform.select({
//                 android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//                 ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
//             });
    
//             const result = await check(permission);
    
//             if (result === 'granted') {
//                 getLocation();
//             } else {
//                 const requestResult = await request(permission);
//                 if (requestResult === 'granted') {
//                     console.log('Permission granted');
//                     getLocation();
//                 } else {
//                     Alert.alert('Location Permission', 'Location permission is required to use this feature.');
//                 }
//             }
//         } catch (error) {
//             console.warn(error);
//         }
//     };


//     // Function to fetch current location
//     const getLocation = () => {
//         Geolocation.getCurrentPosition(
//             position => {
//                 setLocation({
//                     latitude: position.coords.latitude,
//                     longitude: position.coords.longitude,
//                 });
//             },
//             error => {
//                 Alert.alert('Error', 'Could not fetch location. Please try again.');
//                 console.error(error);
//             },
//             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//         );
//     };

//     return (
//         // <View style={{ flex: 1 }}>
//         //     <Text>App</Text>
//         // </View>

//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             {location ? (
//                 <Text>
//                     Location: {location.latitude}, {location.longitude}
//                 </Text>
//             ) : (
//                 <Text>Fetching Location...</Text>
//             )}
//             <Button title="Refresh Location" onPress={getLocation} />
//         </View>
//     )
// }

// export default App

import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { PERMISSIONS, request, check } from 'react-native-permissions';

const App = () => {
    const [location, setLocation] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const requestLocationPermission = async () => {
        try {
            const permission = Platform.select({
                android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            });

            const result = await check(permission);
            console.log('Location Permission Result:', result); // Log permission result

            if (result === 'granted') {
                getLocation();
            } else {
                const requestResult = await request(permission);
                console.log('Request Permission Result:', requestResult); // Log request result
                if (requestResult === 'granted') {
                    getLocation();
                } else {
                    setErrorMessage('Location permission is required to use this feature.');
                    Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
                }
            }
        } catch (error) {
            console.warn(error);
        }
    };

    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                console.log('Location fetched:', { latitude, longitude }); // Log the fetched location
            },
            (error) => {
                setErrorMessage('Could not fetch location. Please try again.');
                console.error('Geolocation error:', error); // Log error details
                Alert.alert('Error', error.message); // Show specific error message
            },
            { enableHighAccuracy: true, timeout: 60000, maximumAge: 10000 }
        );
    };

    return (
        <View style={styles.container}>
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            {location ? (
                <Text>
                    Location: {location.latitude}, {location.longitude}
                </Text>
            ) : (
                <Text>Fetching Location...</Text>
            )}
            <Button title="Refresh Location" onPress={getLocation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default App;

