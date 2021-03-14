import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'

const VideoPlayer = ({ videoUrl }) => {
    return (
        <View style={{ flex: 1 }}>
            <WebView 
                allowsFullscreenVideo
                source={{ uri: videoUrl }} />
        </View>
    )
}

export default VideoPlayer
