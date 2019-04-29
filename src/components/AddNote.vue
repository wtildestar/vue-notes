<template>
  <div class="add-note container">
    <h2 class="center-align indigo-text">Добавить заметку</h2>
    <form @submit.prevent="AddNote">
      <div class="field title">
        <label for="title">Заметка:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div class="field" v-for="(tag, index) in tags" :key="index">
        <label for="tag">тег:</label>
        <input type="text" name="tag" v-model="tags[index]">
        <i class="material-icons delete" @click="deleteTag(tag)">delete</i>
      </div>
      <div class="field add-tag">
        <label for="add-tag">Добавить тег (Нажмите TAB для добавления):</label>
        <input type="text" name="add-tag" @keydown.tab.prevent="addTag" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Добавить</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "AddNote",
  data() {
    return {
      title: null,
      another: null,
      tags: [],
      feedback: null,
      note: null
    };
  },
  methods: {
    AddNote() {
      if (this.title) {
        this.feedback = null;
        // Создаем заметку
        this.note = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("notes")
          .add({
            title: this.title,
            tags: this.tags,
            note: this.note
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.feedback = "Вы должны ввести заметку";
      }
    },
    addTag() {
      if (this.another) {
        this.tags.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "Тег не должен быть пустым";
      }
    },
    deleteTag(tag) {
      this.tags = this.tags.filter(tag => {
        return tag != tag;
      });
    }
  }
};
</script>

<style>
.add-note {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-note h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-note .field {
  margin: 20px auto;
  position: relative;
}
.add-note .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
