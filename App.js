import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Task from "./components/Task";

const App = () => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      {/*  // Today´s Tasks // */}
      <View style={styles.tasksWrapper}>
        <Animatable.Text
          animation="fadeInRight"
          delay={5}
          duration={1500}
          style={styles.sectionTitle}
        >
          Tareas de hoy
        </Animatable.Text>
        <View style={styles.items}>
          {/*  This is where the tasks will go! */}
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <Animatable.View animation="bounceInDown" delay={5} duration={3000}>
          <TextInput
            style={styles.input}
            value={task}
            placeholder={"Escriba una tarea..."}
            onChangeText={(text) => setTask(text)}
          />
        </Animatable.View>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <Animatable.View
            animation="bounceInDown"
            delay={5}
            duration={3000}
            style={styles.addWrapper}
          >
            <Text style={styles.addText}>+</Text>
          </Animatable.View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    backgroundColor: "#FFF",
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
});

export default App;
