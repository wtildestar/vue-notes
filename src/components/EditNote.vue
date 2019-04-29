<template>
  <div class="edit-note container" v-if="note">
    <h2>Изменить заметку: {{ note.title }}</h2>
    
    <form @submit.prevent="EditNote">
      <div class="field title">
        <label for="title">Заметка:</label>
        <input type="text" name="title" v-model="note.title" />
      </div>
      <div class="field" v-for="(tag, index) in note.tags" :key="index">
        <label for="tag">Тег:</label>
        <input type="text" name="tag" v-model="note.tags[index]" />
        <i class="material-icons delete" @click="deleteTag(tag)">delete</i>
      </div>
      <div class="field add-tag">
        <label for="add-tag">Добавить тег (Нажмите TAB для добавления):</label>
        <input type="text" name="add-tag" @keydown.tab.prevent="addTag" v-model="another" />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Обновить заметку</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditNote",
  data() {
    return {
      note: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    EditNote() {
      if (this.note.title) {
        this.feedback = null;
        // create a slug
        this.note.note = slugify(this.note.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("notes")
          .doc(this.note.id)
          .update({
            title: this.note.title,
            tags: this.note.tags,
            note: this.note.note
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
        this.note.tags.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "Тег не должен быть пустым";
      }
    },
    deleteTag(tag) {
      this.note.tags = this.note.tags.filter(
        tag => {
          return tag != tag;
        }
      );
    }
  },
  created() {
    db.collection("notes")
      .doc(this.$route.params.id)
      .get()
      .then(doc => {
        this.note = doc.data();
        this.note.id = doc.id;
      });
  }
};
</script>

<style>
.edit-note {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-note h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-note .field {
  margin: 20px auto;
  position: relative;
}
.edit-note .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
