import React, { useEffect } from "react"
import * as eva from "@eva-design/eva"
import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
} from "@ui-kitten/components"
import { Dimensions, ScrollView, StyleSheet } from "react-native"
import SearchFilterBar from "../components/SearchFilterBar"
import TodoItem from "../components/TodoItem"
import { useSelector, useDispatch } from "react-redux"
import { getTodosAsync, toggleCompleteAsync } from "../redux/todoSlice"

const height = Dimensions.get("window").height

export default function TodoList({ navigation }) {
  const dispatch = useDispatch()
  const todos = useSelector((state) => (console.log(state), state.todos))

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={styles.container}>
        <Text category="h1" style={{ marginTop: "5%" }}>
          My Todo List
        </Text>
        <SearchFilterBar />
        <ScrollView style={styles.scroll}>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              completed={todo.completed}
              title={todo.title}
              description={todo.description}
              deadline={todo.deadline}
            />
          ))}
        </ScrollView>
        <Button
          style={styles.button}
          status={"success"}
          onPress={() => navigation.navigate("AddTodo")}
        >
          Add new todo
        </Button>
      </Layout>
    </ApplicationProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    height: height,
    alignItems: "center",
  },
  scroll: {
    width: "90%",
    height: "50%",
    position: "absolute",
    top: "35%",
  },
  button: {
    position: "absolute",
    bottom: "5%",
  },
})
