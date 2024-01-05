package com.TaskManagement.Manager;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.TaskManagement.Employees.Employees;
import com.TaskManagement.Employees.EmployeesRepo;
import com.TaskManagement.Task.Task;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ManagerController {

	@Autowired
	private ManagerRepo repo1;
	@Autowired
	private EmployeesRepo repo2;
	
	@PostMapping("/manager")
	public Manager addManager(@RequestBody Manager manager){
     repo1.save(manager);
     return manager;
	}
	@GetMapping("/manager")
	public List<Manager>getManager(){
		return repo1.findAll();
	}
	@PutMapping("/manager")
	public  Manager updateManager(@RequestBody Manager manager) {
		repo1.save(manager);
		return manager;
	}
	@DeleteMapping("/manager/{id}")
	public String deleteManager(@PathVariable Manager id) {
		repo1.delete(id);
		return "deleted";
	}
	@PutMapping("/manager/{managerid}/employee/{employeeid}")
	public Manager employeesToManager(@PathVariable String managerid, @PathVariable String employeeid){
		Manager manager=repo1.findById(managerid).get();
		Employees employees=repo2.findById(employeeid).get();
		manager.employees.add(employees);
		repo1.save(manager);
		return manager;
	}
	@PutMapping("/employee/task/{managerid}/{employeeid}")
	public Manager taskToEmployees(@RequestBody Employees employee, @PathVariable String managerid,@PathVariable String employeeid){
       Manager manager=repo1.findById(managerid).get();
		for(int i=0;i<manager.employees.size();i++){
		  if(manager.employees.get(i).email.equals(employeeid)){
		    manager.employees.set(i, employee);
           repo1.save(manager);  
           break;
		}
       }
		return manager;
	}
	
	@GetMapping("/manager/employee/{employeeid}/{managerid}")
	public List<Task> getEmployees(@PathVariable String employeeid, @PathVariable String managerid){
		int index = 0;
		Manager manager=repo1.findById(managerid).get();
		for(int i=0;i<manager.employees.size();i++){
		if(manager.employees.get(i).email.equals(employeeid)){
			index =i;
		}
	}
		return manager.employees.get(index).task;
	}
	
	@GetMapping("/manager/{id}")
	public Optional<Manager>getByManagerId(@PathVariable String id){
		return repo1.findById(id);
	}
}