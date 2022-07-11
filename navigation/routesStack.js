import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation"
import TodoList from "../screens/TodoList"
import AddTodo from "../screens/AddTodo"

const screens = {
  TodoList: {
    screen: TodoList,
    navigationOptions: {
      headerShown: false,
    },
  },
  AddTodo: {
    screen: AddTodo,
    navigationOptions: {
      headerShown: false,
    },
  },
}

const rootStack = createStackNavigator(screens)

export default createAppContainer(rootStack)
