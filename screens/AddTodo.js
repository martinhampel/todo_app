import React, { useState } from "react"
import * as eva from "@eva-design/eva"
import {
  ApplicationProvider,
  Card,
  Datepicker,
  Input,
  Layout,
  Text,
  Button,
} from "@ui-kitten/components"
import { StyleSheet, View } from "react-native"
import { useDispatch } from "react-redux"
import { addTodo } from "../redux/todoSlice"

export default function AddTodo({ navigation }) {
  const [title, setTitle] = useState()
  const [description, setDesription] = useState()
  const [date, setDate] = useState(new Date())

  const dispatch = useDispatch()

  const handleSubmit = () => {
    displayDate =
      date.getDate() + "." + date.getMonth() + ". " + date.getFullYear()
    dispatch(
      addTodo({
        title: title,
        description: description,
        deadline: displayDate,
      })
    )
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={styles.container}>
        <Text category="h1" style={{ marginTop: "5%", marginBottom: "5%" }}>
          Add new todo
        </Text>
        <Card style={{ width: "90%" }}>
          <Input
            label={"Title"}
            placeholder="Title"
            value={title}
            onChangeText={(string) => setTitle(string)}
          />
          <Input
            label={"Description"}
            placeholder="Description"
            value={description}
            onChangeText={(string) => setDesription(string)}
          />
          <Datepicker
            label={"Deadline"}
            date={date}
            onSelect={(nextDate) => setDate(nextDate)}
          />
        </Card>
        <View style={styles.footerContainer}>
          <Button
            style={styles.leftButton}
            status={"success"}
            onPress={() => (handleSubmit(), navigation.navigate("TodoList"))}
          >
            Add new todo
          </Button>
          <Button
            status={"info"}
            onPress={() => navigation.navigate("TodoList")}
          >
            Go back
          </Button>
        </View>
      </Layout>
    </ApplicationProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  footerContainer: {
    marginTop: "10%",
    flexDirection: "row",
  },
  leftButton: {
    marginRight: 5,
  },
})
