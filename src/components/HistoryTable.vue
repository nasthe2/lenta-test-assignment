<template>
  <table>
    <thead>
      <tr>
        <th>Дата</th>
        <th>Имя</th>
        <th>Email</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="record of records" :key="record.id">
        <td>{{ record.editDate }}</td>
        <td>{{ record.fullName }}</td>
        <td>{{ record.email }}</td>
        <td>
          <button
            v-tooltip="'Ознакомиться с деталями'"
            class="btn-small btn"
            @click="$router.push('/detail-record/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  }
};
</script>
