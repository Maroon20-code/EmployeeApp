package net.guides.springboot.crud.repository;


import org.springframework.stereotype.Repository;

import net.guides.springboot.crud.model.Employee;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;



@Repository
public interface EmployeeRepository extends MongoRepository<Employee, Long>{
	
	List<Employee> findByCity( String city);
}
