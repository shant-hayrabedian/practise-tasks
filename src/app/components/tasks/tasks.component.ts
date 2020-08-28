import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/Task';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
    tasks: Task[];
    editState = false;
    taskEdit: Task;
    taskss: any;

    constructor(private authService: AuthService, private taskService: TaskService) {
    }

    ngOnInit(): void {
        // this.taskService.getTaskList().subscribe(tasks => {
        //     this.tasks = tasks;
        // });
        // this.taskService.getTaskList().valueChanges()
        //     .subscribe(tasks => {
        //         this.taskss = tasks;
        // });
        this.getTask();

    }

    getTask() {
        this.taskService.getTaskList().subscribe(tasks => {
            this.taskss = tasks;
        });
    }

    deleteTask(event, task: Task) {
        this.clearState();
        this.taskService.deleteTask(task);
    }

    editTask(event, task: Task) {
        this.editState = true;
        this.taskEdit = task;
    }

    updateTask(task: Task) {
        this.taskService.updateTask(task);
    }

    clearState() {
        this.editState = false;
        this.taskEdit = null;
    }

    signOutUser() {
        this.authService.signOutUser();
    }

}
