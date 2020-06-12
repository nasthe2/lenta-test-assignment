<template>
  <div>
    <div class="page-title">
      <h3>Форма кандидата</h3>
    </div>

    <form class="form" @submit.prevent="handleSubmit">
      <!-- <div class="input-field">
        <select>
          <option>name cat</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" />
          <span>Расход</span>
        </label>
      </p>

      -->

      <div class="input-field">
        <input
          id="fullName"
          type="text"
          v-model="fullName"
          :class="{
            invalid: $v.fullName.$dirty && !$v.fullName.required
          }"
        />
        <label for="fullName">ФИО</label>
        <small
          class="helper-text invalid"
          v-if="$v.fullName.$dirty && !$v.fullName.required"
        >
          Введите ваше полное имя
        </small>
        <!-- <span class="helper-text invalid">description пароль</span> -->
      </div>

      <div class="input-field">
        <input
          id="dateOfBirth"
          type="text"
          v-model.trim="dateOfBirth"
          :class="{
            invalid: $v.dateOfBirth.$dirty && !$v.dateOfBirth.required
          }"
        />
        <label for="dateOfBirth">Дата рождения (дд.мм.гггг)</label>
        <small
          class="helper-text invalid"
          v-if="$v.dateOfBirth.$dirty && !$v.dateOfBirth.required"
        >
          Введите вашу дату рождения
        </small>
        <!-- <span class="helper-text invalid">description пароль</span> -->
      </div>

      <div class="input-field">
        <input
          id="university"
          type="text"
          v-model="university"
          :class="{
            invalid: $v.university.$dirty && !$v.university.required
          }"
        />
        <label for="university">Название вуза</label>
        <small
          class="helper-text invalid"
          v-if="$v.university.$dirty && !$v.university.required"
        >
          Введите название вашего вуза
        </small>
        <!-- <span class="helper-text invalid">description пароль</span> -->
      </div>

      <div class="input-field">
        <input
          id="yearOfUniversity"
          type="text"
          v-model="yearOfUniversity"
          :class="{
            invalid: $v.yearOfUniversity.$dirty && !$v.yearOfUniversity.required
          }"
        />
        <label for="yearOfUniversity">Курс (1-6 или выпускник)</label>
        <small
          class="helper-text invalid"
          v-if="$v.yearOfUniversity.$dirty && !$v.yearOfUniversity.required"
        >
          Введите текущий курс обучения
        </small>
        <!-- <span class="helper-text invalid">description пароль</span> -->
      </div>

      <div class="input-field">
        <input
          id="department"
          type="text"
          v-model="department"
          :class="{
            invalid: $v.department.$dirty && !$v.department.required
          }"
        />
        <label for="department">Факультет</label>
        <small
          class="helper-text invalid"
          v-if="$v.department.$dirty && !$v.department.required"
        >
          Введите ваш факультет
        </small>
        <!-- <span class="helper-text invalid">description пароль</span> -->
      </div>

      <div class="input-field">
        <input
          id="phoneNumber"
          type="text"
          v-model="phoneNumber"
          :class="{
            invalid: $v.phoneNumber.$dirty && !$v.phoneNumber.required
          }"
        />
        <label for="phoneNumber">Контактный телефон</label>
        <small
          class="helper-text invalid"
          v-if="$v.phoneNumber.$dirty && !$v.phoneNumber.required"
        >
          Введите ваш номер телефона
        </small>
        <!-- <span class="helper-text invalid">description пароль</span> -->
      </div>

      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email)
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >
          Поле Email не должно быть пустым
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >
          Введите корректный Email
        </small>
        <!-- <span class="helper-text invalid">description пароль</span> -->
      </div>

      <div class="input-field">
        <input id="info" type="text" v-model.trim="info" />
        <label for="info">Информация о себе</label>
        <!-- <span class="helper-text invalid">description пароль</span> -->
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Отправить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { email, required } from "vuelidate/lib/validators";

export default {
  name: "record",
  data: () => ({
    date: new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date()),
    fullName: "",
    dateOfBirth: "",
    university: "",
    yearOfUniversity: "",
    department: "",
    phoneNumber: "",
    email: "",
    info: ""
  }),
  validations: {
    fullName: {
      required
    },
    dateOfBirth: {
      required
    },
    university: {
      required
    },
    yearOfUniversity: {
      required
    },
    department: {
      required
    },
    phoneNumber: {
      required
    },
    email: {
      email,
      required
    }
  },
  methods: {
    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        await this.$store.dispatch("createRecord", {
          fullName: this.fullName,
          dateOfBirth: this.dateOfBirth,
          university: this.university,
          yearOfUniversity: this.yearOfUniversity,
          department: this.department,
          phoneNumber: this.phoneNumber,
          email: this.email,
          info: this.info,
          createDate: this.date,
          editDate: this.date
        });

        this.$v.$reset();
        this.$message("Форма успешно отправлена");

        this.fullName = "";
        this.dateOfBirth = "";
        this.university = "";
        this.yearOfUniversity = "";
        this.department = "";
        this.phoneNumber = "";
        this.email = "";
        this.info = "";

        // eslint-disable-next-line
      } catch (e) {}
    }
  }
};
</script>
