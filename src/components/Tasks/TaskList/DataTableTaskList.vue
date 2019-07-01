<template lang="pug">
    v-layout(
        row
        wrap
    )
        v-flex(d-flex)
            v-card
                v-card-title Tasks
                    v-spacer
                    v-text-field(
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                    )
                v-data-table.elevation-1(
                    :headers='headers'
                    :items='tasksWithStatusData'
                    :pagination.sync="paginationOpts"
                    :search="search"
                    v-if='tasksWithStatusData'
                )
                    template(
                        v-slot:items='props'
                    )
                        td.text-xs-left {{ props.item.title }}
                        td.text-xs-left {{ props.item.statusTitle }}
                        td.text-xs-left {{ props.item.priority }}
                        td.text-xs-left {{ props.item.deadlineDate }}
                        td.text-xs-left
                            v-icon.mr-2(small='', @click="$emit('updateTask', props.item)") edit
                            v-icon(small='', @click="$emit('deleteTask', props.item.id)") delete

</template>

<script>
export default {
  name: 'DataTableTaskList',
  data: () => ({
    search: '',
    headers: [
      {
        text: 'Title',
        align: 'left',
        value: 'title',
      },
      {
        text: 'Status',
        align: 'left',
        value: 'statusTitle',
      },
      {
        text: 'Priority',
        align: 'left',
        value: 'priority',
      },
      {
        text: 'Deadline',
        align: 'left',
        value: 'deadlineDate',
      },
      {
        text: 'Actions',
        align: 'left',
        sortable: false,
      },
    ],
    paginationOpts: {
      descending: true,
      rowsPerPage: 10,
      sortBy: 'priority',
    },
  }),
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    tasksStatuses() {
      return this.$store.getters.tasksStatuses;
    },
    tasksWithStatusData() {
      return this.$store.getters.tasksWithStatusData;
    },
  },
};
</script>

<style scoped>

</style>
