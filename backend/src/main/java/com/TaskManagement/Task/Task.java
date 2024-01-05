package com.TaskManagement.Task;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="Task")
public class Task {
  @Id
private String todo;
private String inprogress;
private String done;

public String getTodo() {
	return todo;
}
public void setTodo(String todo) {
	this.todo = todo;
}
public String getInprogress(){
	return inprogress;
}
public void setInprogress(String inprogress) {
	this.inprogress = inprogress;
}
public String getDone() {
	return done;
}
public void setDone(String done) {
	this.done = done;
}
}