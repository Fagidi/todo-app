<template>
  <div id="app" style="max-width: 500px; margin: auto; padding: 20px;">
    <h1>TODO App 🎉</h1>

    <div style="display: flex; gap: 5px; margin-bottom: 10px;">
      <input v-model="newTask" placeholder="Add a task..." style="flex: 1; padding: 5px;" />
      <button @click="addTask" style="padding: 5px 10px;">Add</button>
    </div>

    <ul style="list-style: none; padding: 0;">
      <li v-for="task in tasks" :key="task.id" style="margin-bottom: 5px;">
        <span :style="{ textDecoration: task.done ? 'line-through' : 'none' }">{{ task.text }}</span>
        <button @click="toggleDone(task)" style="margin-left: 10px;">{{ task.done ? 'Undo' : 'Done' }}</button>
        <button @click="deleteTask(task)" style="margin-left: 5px; color: red;">Delete</button>
      </li>
    </ul>

    <div v-if="quote" style="margin-top: 20px; font-style: italic; color: purple;">
      ✨ "{{ quote }}"
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const BASE_URL = 'https://todo-app-stys.onrender.com/api/tasks';

export default {
  data() {
    return {
      newTask: "",
      tasks: [],
      quote: "",
      quotes: [
        "You are capable of amazing things!",
        "Keep pushing forward!",
        "Every day is a fresh start.",
        "Small steps lead to big changes.",
        "You’ve got this!"
      ]
    };
  },
  created() {
    this.loadTasks();
  },
  methods: {
    async loadTasks() {
      try {
        const res = await axios.get(BASE_URL);
        this.tasks = res.data;
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    },
    async addTask() {
      if (this.newTask.trim() === "") return;
      try {
        const newTaskData = { text: this.newTask };
        const res = await axios.post(BASE_URL, newTaskData);
        this.tasks.push(res.data);
        this.newTask = "";
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
    async toggleDone(task) {
      task.done = !task.done;
      try {
        await axios.put(`${BASE_URL}/${task.id}`, task);
        if (task.done) this.showRandomQuote();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },
    async deleteTask(task) {
      try {
        await axios.delete(`${BASE_URL}/${task.id}`);
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
    showRandomQuote() {
      const randomIndex = Math.floor(Math.random() * this.quotes.length);
      this.quote = this.quotes[randomIndex];
    }
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
</style>
