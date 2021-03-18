import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library'
import * as Notifications from 'expo-notifications'


const downloadFile = async (filename, uri) => {
    const downloadResumable = FileSystem.createDownloadResumable(
        uri,
        FileSystem.documentDirectory + `${filename}.jpg`,
        { 
            sessionType: FileSystem.FileSystemSessionType.BACKGROUND
        }
    );

    const downloadedFile = await downloadResumable.downloadAsync();

    if (downloadedFile.status != 200) {
        console.log('error while downloading file')
    }
    return downloadedFile
}


export const savePosterToDevice = async (filename, uri, callback) => {
    const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (perm.status != 'granted') {
        alert('Please give me access to camera roll, so I\'ll be able to save poster');
        return;
    }

    const downloadedFile = await downloadFile(filename, uri);

    try {
        const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
        const album = await MediaLibrary.getAlbumAsync('TheMovieMine');
        if (album == null) {
            await MediaLibrary.createAlbumAsync('TheMovieMine', asset, false);
        } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
        onDownloadEnd();
        callback();
    } catch (err) {
        console.log(err)
    }
}

const onDownloadEnd = () => {

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
      
    Notifications.scheduleNotificationAsync({
        content: {
            title: 'TheMovieMine Action Report',
            body: 'Poster saved successfully'
        },
        trigger: null
        
    })

    Notifications.cancelAllScheduledNotificationsAsync();
}