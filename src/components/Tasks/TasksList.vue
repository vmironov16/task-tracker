<template lang="pug">
    v-container(fluid grid-list-md)
        v-layout(
            row
            wrap
        )
            v-flex(
                d-flex
                xs12
                text-lg-center
                text-md-center
                text-xs-center
                v-if="tasks.length < 1"
            )
                h2 You haven't tasks. Create new task and this message will disappear.
            v-flex(
                d-block
                xs-10
                v-if="tasks.length > 0"
            )
                v-select(
                    :items='viewModeList'
                    box
                    label='View Mode'
                    v-model="activeViewModeList"
                )

            v-flex(
                d-block
                :class="(tasks.length < 1) ? 'xs12 text-xs-center' : 'xs2'"
            )
                v-dialog(
                    v-model='dialog'
                    @click="modeEditor = 'add'"
                    fullscreen
                    hide-overlay
                    transition='dialog-bottom-transition'
                )
                    template(v-slot:activator='{ on }')
                        v-btn(
                        color='primary'
                        v-on='on'
                        ) Add Task
                    v-card
                        v-toolbar(
                            dark
                            color='primary'
                        )
                            v-btn(
                                icon
                                dark
                                @click='closeDialog'
                                )
                                v-icon close
                            v-toolbar-title Task Editor

                        v-layout
                            v-container
                                TaskEditor(
                                    v-if="dialog"
                                    :modeEditor="modeEditor"
                                    @closeDialog="closeDialog"
                                    :task="task"
                                )

        DataTableTaskList(
            v-if="tasks.length > 0 && activeViewModeList =='table'"
            @updateTask="updateTask"
            @deleteTask="deleteTask"
        )
        ScrumTaskList(
            v-if="tasks.length > 0 && activeViewModeList =='scrum'"
            @updateTask="updateTask"
            @deleteTask="deleteTask"
        )
</template>

<script>
import DataTableTaskList from '@/components/Tasks/TaskList/DataTableTaskList';
import ScrumTaskList from '@/components/Tasks/TaskList/ScrumTaskList';
import TaskEditor from '@/components/Tasks/TaskList/TaskEditor';

export default {
  name: 'TaskList',
  components: {
    DataTableTaskList,
    ScrumTaskList,
    TaskEditor,
  },
  data: () => ({
    modeEditor: 'add',
    dialog: false,
    taskDefault: {
      title: '',
      description: '',
      statusId: 0,
      priority: 1,
      createDate: new Date().toISOString().substr(0, 10),
      deadlineDate: new Date().toISOString().substr(0, 10),
      doneDate: '',
      userId: null,
    },
    task: this.taskDefault,
  }),
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    tasksListOptions() {
      return this.$store.getters.tasksListOptions;
    },
    activeViewModeList: {
      get() {
        return this.tasksListOptions.activeViewModeList;
      },
      set(value) {
        this.$store.dispatch('setActiveViewModeListForTasksListOption', value);
      },
    },
    viewModeList() {
      return this.tasksListOptions.viewModeList;
    },
  },
  methods: {
    updateTask(task) {
      this.task = task;
      this.modeEditor = 'edit';
      this.dialog = true;
    },
    deleteTask(id) {
      if (confirm('Are you sure?')) { // eslint-disable-line no-alert
        this.$store.dispatch('deleteTask', id);
      }
    },
    closeDialog() {
      this.task = this.taskDefault;
      this.dialog = false;
    },
  },
  mounted() {
  },
};
</script>
