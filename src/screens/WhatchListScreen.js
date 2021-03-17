import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AntDesign } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { fetchWatchList } from '../store/actions/userActions'
import { mainActionColor, h2 } from '../styles/_common'
import Container from '../components/Container'
import MovieCard from '../components/MovieCard'

const sortBy = {
    Rating: 1,
    Name: 2
}

const WhatchListScreen = ({ watchlist, fetchWatchList }) => {
    const [currentSort, setCurrentSort] = useState(1);
    const [newWatchList, setNewWatchList] = useState(watchlist);
    const [listEmpty, setListEmpty] = useState(false);
    const [fetchingList, setFetchingList] = useState(false);

    const renderItem = ({ item }) => <MovieCard movie={item} />

    useEffect(() => {
        setFetchingList(true);
        fetchWatchList();
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!newWatchList.length)
                setListEmpty(true);
            setFetchingList(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [newWatchList])

    useEffect(() => {
        if (watchlist.length) {
            setFetchingList(false);
            setListEmpty(false);
        }
        if (!watchlist.length)
            setListEmpty(true);
        if (currentSort === 1) {
            const newList = watchlist.sort((a, b) => {
                return b.rating - a.rating
            })
            setNewWatchList(newList);
        } else {
            const newList = watchlist.sort((a, b) => {
                if (a.title < b.title) { return -1; }
                if (a.title > b.title) { return 1; }
                return 0;
            })
            setNewWatchList(newList);
        }
    }, [watchlist, currentSort])

    const renderWatchlist = () => <>
        <View style={styles.header}>
            <Text style={h2.text}>Sort by</Text>
            <View style={styles.sortPickerWrapper}>
                <AntDesign
                    style={styles.sortPickerIcon}
                    name="caretdown"
                    size={15}
                    color={mainActionColor} />
                <Picker
                    style={styles.sortPicker}
                    mode="dropdown"
                    selectedValue={currentSort}
                    onValueChange={itemValue => {
                        setCurrentSort(itemValue)
                    }}>
                    {Object.entries(sortBy).map(sortType => {
                        return <Picker.Item key={sortType[1]} label={sortType[0]} value={sortType[1]} />
                    })}
                </Picker>
            </View>
        </View>
        <FlatList
            style={{ alignSelf: 'center' }}
            extraData={watchlist}
            data={newWatchList}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
        />
    </>

    return (
        <Container>
            {fetchingList
                ? <ActivityIndicator style={{marginTop: 30}} size="large" color={mainActionColor} />
                : (
                    !listEmpty
                        ? renderWatchlist()
                        : <View style={{ marginTop: 30 }}>
                            <Text style={[h2.text, { textAlign: 'center' }]}>Looks like your watchlist is empty 🤷‍♀️</Text>
                            <Text style={[h2.text, { textAlign: 'center' }]}>Try to add new movies at home screen</Text>
                        </View>
                )
            }


        </Container>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 40,
        marginTop: 5,
        marginLeft: 15
    },
    sortPickerWrapper: {
        width: '30%',
        marginLeft: 10
    },
    sortPickerIcon: {
        position: 'absolute',
        bottom: 18,
        right: 17,
        zIndex: 10
    },
    sortPicker: {
        color: mainActionColor,
    }
})

const mapStateToProps = state => ({
    watchlist: state.user.watchlist
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchWatchList
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WhatchListScreen)
