import { observable, computed, action } from 'mobx';
import { Task, TaskProps } from './task';
import { validate } from 'class-validator';
import { string } from 'prop-types';

export class TaskStore {
    @observable private _tasks: Task[] = [];

    // @fix: this method creates, validates and add new task (violates single responsibility priciple).
    @action
    async addTask({ title, goal, description }: TaskProps) {
        const task = new Task({
            title,
            description,
            goal
        });

        const errors = await validate(task);
        
        if (errors && errors.length) {
            console.error(errors);
            return;
        }

        this._tasks.push(task);
    }

    @action
    async updateTask(id: string, { title, goal, description }: { title?: string, goal?: string,  description?: string }) {
        const task = this._tasks.find(task => task.id === id);

        if (task) {
            task.title = title || task.title;
            task.goal = goal || task.goal;
            task.description = description || task.description;
            return true;
        }

        return false;
    }

    @action
    async deleteTask(taskId: string) {
        const taskIndex = this._tasks.findIndex(task => task.id === taskId);

        if (taskIndex >= 0) {
            return this._tasks.splice(taskIndex, 1);
        }

        return null;
    }

    @computed
    get tasks() {
        return this._tasks.slice();
    }
}