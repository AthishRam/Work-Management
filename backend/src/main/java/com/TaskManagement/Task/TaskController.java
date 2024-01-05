package com.TaskManagement.Task;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

	@Autowired
	private TaskRepo repo1;
	
	@PostMapping("/task")
	public Task addTask(@RequestBody Task task){
     repo1.save(task);
     return task;
	}
	@GetMapping("/task")
	public List<Task>getTask(){
		return repo1.findAll();
	}
	@PutMapping("/task")
	public  Task updateTask(@RequestBody Task task) {
		repo1.save(task);
		return task;
	}
	@DeleteMapping("/task/{id}")
	public String deleteTask(@PathVariable Task id) {
		repo1.delete(id);
		return "deleted";
	}
}
