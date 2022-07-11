import React, { useState } from "react"
import { Card, Input, Radio, RadioGroup, Button } from "@ui-kitten/components"
import { StyleSheet, View } from "react-native"
import { useDispatch } from "react-redux"
import {
  activeFilter,
  doneFilter,
  noFilter,
  searchFilter,
} from "../redux/todoSlice"

export default function SearchFilterBar() {
  const [selectedOption, setSelectedOption] = useState(0)
  const [searchTodo, setSearchTodo] = useState("")
  const dispatch = useDispatch()

  const handleFilterChange = (selectedOption) => {
    switch (selectedOption) {
      case 0:
        console.log(selectedOption)
        dispatch(noFilter())
      case 1:
        console.log(selectedOption)
        dispatch(activeFilter())
      case 2:
        console.log(selectedOption)
        dispatch(doneFilter())
    }
  }

  const handleSearch = () => {
    if (searchTodo === "") {
      dispatch(noFilter())
    } else {
      dispatch(searchFilter({ search: searchTodo }))
    }
  }

  return (
    <>
      <View style={styles.card}>
        <Card>
          <Input
            placeholder="Search for todo"
            value={searchTodo}
            onChangeText={(string) => setSearchTodo(string)}
          />
          <Button status={"info"} onPress={() => handleSearch()}>
            Search
          </Button>
        </Card>
      </View>
      <View style={styles.card}>
        <RadioGroup
          style={styles.row}
          selectedIndex={selectedOption}
          onChange={(index) => (
            setSelectedOption(index), handleFilterChange(selectedOption)
          )}
        >
          <Radio>All</Radio>
          <Radio>Active</Radio>
          <Radio>Done</Radio>
        </RadioGroup>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    margin: "1%",
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
})
