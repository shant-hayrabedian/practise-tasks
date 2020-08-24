import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from 'src/app/models/Task';

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
    task: Task = {
        title: ''
    };

    constructor(private taskService: TaskService) {
    }

    ngOnInit(): void {
    }

    onSubmit() {
        if (this.task.title !== '') {
            this.taskService.addTask(this.task);
            this.task.title = '';
        }
    }

}
