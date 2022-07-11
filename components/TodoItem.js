import React, { useState } from "react"
import { Card, Text, Button, Toggle } from "@ui-kitten/components"
import { StyleSheet, View } from "react-native"
import { useDispatch } from "react-redux"
import { deleteTodo, toggleComplete } from "../redux/todoSlice"

export default function TodoItem({
  id,
  title,
  description,
  deadline,
  completed,
}) {
  const [checked, setChecked] = useState(completed)
  const [cardStatus, setCardStatus] = useState("basic")
  const dispatch = useDispatch()

  const handleCompleteClick = (isChecked) => {
    !checked ? setCardStatus("success") : setCardStatus("basic")
    setChecked(isChecked)
    dispatch(toggleComplete({ id: id, completed: !completed }))
  }

  const handleDeleteClick = () => {
    dispatch(deleteTodo({ id: id }))
  }

  const Header = (props) => (
    <View {...props}>
      <Text category="h6">{title}</Text>
      <Text status="danger" category="s1">
        {deadline}
      </Text>
      <Text>{description}</Text>
    </View>
  )

  return (
    <>
      <Card header={Header} status={cardStatus} style={{ margin: 2 }}>
        <View style={styles.footerContainer}>
          <Toggle
            style={styles.toggle}
            status="success"
            checked={checked}
            onChange={handleCompleteClick}
          />
          <Button
            size="small"
            status="danger"
            onPress={() => handleDeleteClick()}
          >
            DELETE
          </Button>
        </View>
      </Card>
    </>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  toggle: {
    margin: 5,
  },
})
