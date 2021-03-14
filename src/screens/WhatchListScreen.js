import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
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

    const renderItem = ({ item }) => <MovieCard movie={item}/>

    useEffect(() => {
        fetchWatchList();
    }, [])

    return (
        <Container>
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
                        selectedValue={Object.entries(sortBy)[0][1]}
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
                style={{alignSelf: 'center'}}
                data={watchlist}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 40,
        marginTop: 5
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
