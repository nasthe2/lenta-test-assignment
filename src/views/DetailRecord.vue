<template>
  <div>
    <Loader v-if="loading" />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/" class="breadcrumb">
          Информация о кандидате
        </router-link>
        <a class="breadcrumb">Заявка</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card white">
            <div class="card-content black-text">
              <p>ФИО: {{ record.fullName }}</p>
              <p>Дата рождения: {{ record.dateOfBirth }}</p>
              <p>Название вуза: {{ record.university }}</p>
              <p>Курс: {{ record.yearOfUniversity }}</p>
              <p>Факультет: {{ record.department }}</p>
              <p>Контактный телефон: {{ record.phoneNumber }}</p>
              <p>Email: {{ record.email }}</p>
              <p>Информация о себе: {{ record.info }}</p>
              <p>Дата создания: {{ record.createDate }}</p>
              <p>Дата изменения: {{ record.editDate }}</p>
              <p>Кем создана:</p>
              <p>Кем изменена:</p>

              <small>12.12.12</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="center" v-else>Упс, такой заявки нет</p>
  </div>
</template>

<script>
export default {
  name: "detail",
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id;
    /* eslint-disable */
    const record = await this.$store.dispatch("fetchRecordById", id);

    this.record = {
      ...record
    };

    debugger

    this.loading = false;
  }
};
</script>
