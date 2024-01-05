package com.TaskManagement.Manager;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ManagerRepo extends  MongoRepository<Manager, String> {

}
