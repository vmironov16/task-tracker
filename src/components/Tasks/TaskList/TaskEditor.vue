<template lang="pug">
    v-layout
        v-flex(xs12='')
            v-form(
                ref="form"
                v-model="formValid"
                validation
            )
                v-card(color="blue-grey lighten-5")
                    v-container
                        v-flex.date-created(
                            xs12
                        )
                                p.date-created__value.text-xs-right
                                    | created: {{this.task.createDate}}
                        v-card-title
                            v-text-field(
                                label='Title'
                                placeholder="Enter task's title"
                                box
                                required
                                :counter="maxTitleLength"
                                :rules="titleRules"
                                v-model="task.title"
                            ) {{task.title}}

                        .priority.pa-3
                            h3 Priority
                            v-rating(
                            v-model='task.priority'
                            color="yellow darken-3"
                            large
                        )

                        v-card-text
                            v-textarea.description(
                                name='input-7-1'
                                box
                                label='Description'
                                auto-grow=true
                                required
                                :rules="descriptionRules"
                                v-model='task.description'
                            )

                            .date-deadline
                                v-flex(
                                    xs12
                                    sm6
                                )
                                    v-dialog(
                                        ref='dialogDeadlineDate'
                                        v-model='modalDeadlineDate'
                                        :return-value.sync='task.deadlineDate'
                                        persistent
                                        lazy
                                        full-width
                                        width='290px'

                                    )
                                        template(
                                            v-slot:activator='{ on }')
                                            v-text-field(
                                                required
                                                v-model='task.deadlineDate'
                                                box
                                                prepend-inner-icon="event"
                                                label='Deadline'
                                                v-on='on'
                                                :rules="deadlineDateRules"
                                        )
                                        v-date-picker(
                                            v-model='task.deadlineDate'
                                            scrollable
                                        )
                                            v-spacer
                                            v-btn(
                                                flat
                                                color='primary'
                                                @click='modalDeadlineDate = false'
                                            ) Cancel
                                            v-btn(
                                                flat=''
                                                color='primary'
                                                @click='$refs.dialogDeadlineDate.save(task.deadlineDate)'
                                            ) OK
                            .date-done
                                v-flex(
                                xs12
                                sm6
                                )
                                    v-dialog(
                                    ref='dialogDoneDate'
                                    v-model='modalDoneDate'
                                    :return-value.sync='task.doneDate'
                                    persistent
                                    lazy
                                    full-width
                                    width='290px'

                                    )
                                        template(
                                            v-slot:activator='{ on }')
                                            v-text-field(
                                            required
                                            v-model='task.doneDate'
                                            box
                                            prepend-inner-icon="event"
                                            label='Done Date'
                                            v-on='on'
                                            disabled
                                        )
                                        v-date-picker(
                                            v-model='task.doneDate'
                                            scrollable
                                        )
                                            v-spacer
                                            v-btn(
                                            flat
                                            color='primary'
                                            @click='modalDoneDate = false'
                                            ) Cancel
                                            v-btn(
                                            flat=''
                                            color='primary'
                                            @click='$refs.dialogDoneDate.save(task.doneDate)'
                                            ) OK

                            .status
                                v-flex(
                                xs12
                                sm4
                                d-flex
                                )
                                    v-menu(
                                        offset-y
                                    )
                                        template(
                                            v-slot:activator='{ on }'
                                        )
                                            v-btn(
                                                dark
                                                v-on='on'
                                            )
                                                | Status: {{statusTitle}}
                                        v-list
                                            v-list-tile(
                                                v-for='(item, index) in statusList'
                                                :key='index'
                                                @click="updateStatusId(item.id)"
                                            )
                                                v-list-tile-title(v-if="item") {{ item.key }}


                            v-card-actions
                                v-spacer
                                v-btn(
                                    large
                                    color="primary"
                                    @click="addTask"
                                    :disabled="!formValid"
                                    v-if="this.modeEditor === 'add'"
                                ) Add Task
                                v-btn(
                                    large
                                    dark
                                    color="red"
                                    @click="deleteTask(task.id)"
                                    v-if="this.modeEditor === 'edit'"
                                )
                                    v-icon(dark left) delete
                                    |Delete Task
                                v-btn(
                                    large
                                    color="primary"
                                    @click="updateTask"
                                    :disabled="!formValid"
                                    v-if="this.modeEditor === 'edit'"
                                )
                                    v-icon(dark left) edit
                                    |Update Task


</template>

<script>
export default {
  name: 'TaskEditor',
  props: {
    modeEditor: {
      type: String,
      required: true,
      default: 'add',
    },
    task: {
      type: Object,
      required: true,
      default() {
        return {
          title: '',
          description: '',
          statusId: 0,
          priority: 1,
          createDate: new Date().toISOString().substr(0, 10),
          deadlineDate: new Date().toISOString().substr(0, 10),
          doneDate: '',
          userId: null,
        };
      },
    },
  },
  data: () => ({
    formValid: false,

    maxTitleLength: 40,
    modalDoneDate: false,
    modalDeadlineDate: false,
    activeStatus: (this.task && this.task.statusId)
      ? this.getStatusById(this.task.statusId)
      : 0,
  }),
  computed: {
    descriptionRules() {
      return [
        v => !!v || 'Description is required',
      ];
    },
    deadlineDateRules() {
      return [
        v => !!v || 'Deadline is required',
      ];
    },
    titleRules() {
      return [
        v => !!v || 'Title is required',
        v => (v || '').length <= this.maxTitleLength ||
              `A maximum of ${this.maxTitleLength} characters is allowed`,
      ];
    },
    statusList() {
      if (!this.$store.getters.tasksStatuses) {
        return [];
      }
      return this.$store.getters.tasksStatuses;
    },

    statusData() {
      if (!this.statusList) { return null; }
      return this.statusList.find(item => ((this.task.statusId === item.id) ? item : false));
    },

    statusTitle() {
      if (!this.statusData) {
        return null;
      }
      return this.statusData.title;
    },

    userId() {
      return this.$store.getters.userId;
    },
  },
  methods: {
    updateTask() {
      this.$store.dispatch('updateTask', {
        ...this.task,
        userId: this.$store.getters.userId,
      });
      this.$emit('closeDialog');
    },
    addTask() {
      this.$store.dispatch('createTask', {
        ...this.task,
        userId: this.$store.getters.userId,
      });
      this.$emit('closeDialog');
    },
    updateStatusId(statusId) {
      this.task.statusId = statusId;
    },
    deleteTask(id) {
      if (confirm('Are you sure?')) { // eslint-disable-line no-alert
        this.$store.dispatch('deleteTask', id);
      }
    },
    getStatusById(statusId) {
      if (!this.statusList) { return null; }
      return this.statusList.find(item => item.id === statusId);
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
    .date-created__value{
        border-bottom: 1px solid #bdbdbd;
        font-weight: 300;
        margin: 0;
    }
</style>
