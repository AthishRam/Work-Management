package com.TaskManagement.Task;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskRepo extends MongoRepository<Task,String> {

}
