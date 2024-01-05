package com.TaskManagement.Employees;

import org.springframework.data.mongodb.repository.MongoRepository;
public interface EmployeesRepo extends MongoRepository<Employees, String>{}
