<template lang="pug">
    v-layout(
        row
        wrap
        grid-list-md
    )

        v-flex.tasks-scrum(
            v-if="tasksGroupByStatusesLocal"
            d-flex
            xs12
            sm6
            md4
            v-for="(taskGroup,key) in tasksGroupByStatusesLocal"
            :key="key"
        )
            v-layout(row wrap :key="key")
                draggable.tasks-scrum-list-group(
                        :list="taskGroup"
                        group="tasks"
                        handle=".task-scrum__header__handle--drag"
                        :key="key"
                        @end="dragHandler"
                        :class="key"
                        :data-status-key="key"
                    )
                        v-flex(
                            d-flex
                            v-for="listItem in taskGroup"
                            :key="listItem.id"
                            :data-task-id="listItem.id"
                        )
                            v-card.task-scrum(
                                :color='listItem.color'
                                dark
                                width="100%"
                            )
                                v-card-title.task-scrum__header
                                    .status
                                        span.status-text {{listItem.statusTitle}}
                                    v-layout
                                        span.title {{listItem.title}}
                                        v-spacer
                                        v-icon.task-scrum__header__handle(
                                            class="task-scrum__header__handle--drag"
                                        ) drag_handle
                                v-card-text.task-scrum__content
                                    .task-scrum__content-block.description
                                        | {{ descriptionHandler(listItem.description) }}
                                    .task-scrum__content-block.deadline
                                        v-icon(left) event
                                        | {{ listItem.deadlineDate }}


                                    .task-scrum__content-block.priority
                                        v-rating(
                                            :value='listItem.priority'
                                            color="yellow darken-3"
                                            readonly
                                            size="16px"
                                        )

                                v-card-actions.pa-3
                                    v-spacer
                                    v-btn(
                                        small
                                        fab
                                        color="red"
                                        @click="$emit('deleteTask', listItem.id)"
                                    )
                                        v-icon delete
                                    v-btn(
                                        small
                                        fab
                                        color="primary"
                                        @click="$emit('updateTask', Object.assign({}, listItem))"
                                    )
                                        v-icon edit


</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'ScrumTaskList',
  components: {
    draggable,
  },
  data() {
    return {
      maxDescriptionLength: 90,
      tasksGroupByStatusesLocal:
         (this.$store.getters.tasksGroupByStatuses)
           ? Object.assign({}, this.$store.getters.tasksGroupByStatuses)
           : null,
    };
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    taskStatuses() {
      return this.$store.getters.taskStatuses;
    },
  },
  methods: {
    dragHandler($event) {
      const task = this.$store.getters.taskById(+$event.item.getAttribute('data-task-id'));
      const status = this.$store.getters.statusByKey($event.to.getAttribute('data-status-key'));
      task.statusId = status.id;
      this.$store.dispatch('updateTask', task);
    },
    descriptionHandler(text) {
      const textLength = text.length;
      if (textLength + 5 > this.maxDescriptionLength) {
        return `${text.slice(0, this.maxDescriptionLength)}...`;
      }
      return text;
    },
  },
};
</script>

<style lang="scss" scoped>
    .tasks-scrum-list-group{
        border: 1px solid #e0e0e0;
        min-height: 200px;
        padding: 10px;
        width: 100%;
    }
    .task-scrum__header{
        .title{
            word-break: break-all;
        }
        .task-scrum__header__handle{
            cursor: grab;
            &:active{
                cursor: grabbing;
            }
        }

        .status{
            border-bottom: 1px solid #ffffff4a;
            display: block;
            font-weight: 100;
            margin-bottom: 5px;
            width: 100%;
            &-text{
                float: right;
                font-size: 12px;
            }
        }
    }
    .task-scrum__content{
        &-block{
            padding-bottom: 10px;
            &:last-child{
                padding-bottom: 0;
            }

        }

        .deadline{
            font-size: 16px;
            .v-icon{
                font-size: 20px;
            }
        }
    }
</style>
