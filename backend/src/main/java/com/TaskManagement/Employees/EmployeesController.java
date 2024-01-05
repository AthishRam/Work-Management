package com.TaskManagement.Employees;

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
import com.TaskManagement.Task.Task;
import com.TaskManagement.Task.TaskRepo;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeesController {

	@Autowired
	private TaskRepo repo1;
	@Autowired
	private EmployeesRepo repo;
	
	@PostMapping("/employee")
	public Employees addEmployee(@RequestBody Employees employee){
     repo.save(employee);
     return employee;
	}
	@GetMapping("/employees")
	public List<Employees>getEmployees(){
		return repo.findAll();
	}
	@PutMapping("/employee")
	public Employees updateEmployee(@RequestBody Employees employee) {
		repo.save(employee);
		return employee;
	}
	@DeleteMapping("/employee/{id}")
	public String deleteEmployee(@PathVariable Employees id) {
		repo.delete(id);
		return "deleted";
	}
	@PutMapping("/employee/{employeeid}/task/{taskid}")
	public Employees employeesToManager(@PathVariable String employeeid, @PathVariable String taskid){
		Employees employees = repo.findById(employeeid).get();
		Task task=repo1.findById(taskid).get();
		employees.task.add(task);
		repo.save(employees);
		return employees;
	}
}