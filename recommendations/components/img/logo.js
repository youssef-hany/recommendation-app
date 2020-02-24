import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    FlatList,
    Image, 
    TextInput, 
    Button } from 'react-native';

    export default function Logo() {
        return (
            <View style={styles.container}>
                 <Image
            style={{
              width: 51,
              height: 51,
              resizeMode: 'contain',
            }}
            source={{
              uri:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
            }}
          />
          <Text style={styles.logoText}>Recommendations App.</Text>
            </View>
           
            
                
            )

    }
const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            alignItems: 'center',
            justifyContent:'flex-end'
        },
        logoText: {
            marginVertical:15,
            fontSize: 18,
            color: 'rgba(255, 255, 255, 0.7)'
        }

    })