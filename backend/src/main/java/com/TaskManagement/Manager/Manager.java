package com.TaskManagement.Manager;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.TaskManagement.Employees.Employees;

@Document(collection="Manager")
public class Manager {

	    @Id
		private String email;
	    private long phonenumber;
		private String name;
		private String dob;
		private String password;
		private String username;
		private String field;
		private int salary;
		private String profession;
		private int experience;
		private String previousCompany;
		protected List<Employees>employees = new ArrayList<>();
		
		public long getPhonenumber() {
			return phonenumber;
		}
		public void setPhonenumber(long phonenumber) {
			this.phonenumber = phonenumber;
		}
		public int getSalary() {
			return salary;
		}
		public void setSalary(int salary) {
			this.salary = salary;
		}
		public String getField() {
			return field;
		}
		public void setField(String field) {
			this.field = field;
		}
		public List<Employees> getEmployees() {
			return employees;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getDob() {
			return dob;
		}
		public void setDob(String dob) {
			this.dob = dob;
		}
	
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
	    public String getProfession() {
			return profession;
		}
		public void setProfession(String profession) {
			this.profession = profession;
		}
		public int getExperience() {
			return experience;
		}
		public void setExperience(int experience) {
			this.experience = experience;
		}
		public String getPreviousCompany() {
			return previousCompany;
		}
		public void setPreviousCompany(String previousCompany) {
			this.previousCompany = previousCompany;
		}
	}