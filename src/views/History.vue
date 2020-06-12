<template>
  <div>
    <div class="page-title">
      <h3>Информация о кандидате</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Заявок пока нет :(
      <br />
      <router-link to="/record">Добавьте новую</router-link>
    </p>

    <section>
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from "../components/HistoryTable";

export default {
  name: "history",
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    this.records = records.map(record => {
      return {
        ...record
      };
    });

    this.loading = false;
  },
  components: {
    HistoryTable
  }
};
</script>
