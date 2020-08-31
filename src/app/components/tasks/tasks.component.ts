import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/Task';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
    editState = false;
    taskEdit: Task;
    tasks: any;

    constructor(private authService: AuthService, private taskService: TaskService) {
    }

    ngOnInit(): void {
        this.getTask();
    }

    getTask() {
        this.taskService.getTaskList().subscribe(tasks => {
            this.tasks = tasks;
        });
    }

    deleteTask() {
        this.clearState();
        this.taskService.deleteTask(this.tasks[0].id);
    }

    editTask(event, task) {
        this.editState = true;
        this.tasks.key = task;
    }

    updateTask(task: Task) {
        this.taskService.updateTask(this.taskEdit.key, { title: task.title });
    }

    clearState() {
        this.editState = false;
        this.tasks.key = null;
    }

    signOutUser() {
        this.authService.signOutUser();
    }

}
