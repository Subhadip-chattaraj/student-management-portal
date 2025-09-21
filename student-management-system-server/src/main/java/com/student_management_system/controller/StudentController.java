package com.student_management_system.controller;

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
import com.student_management_system.model.Student;
import com.student_management_system.repository.StudentRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    StudentRepository repo;
    
    //For add a new Student
    @PostMapping("/student/add")
    public Student createStudent(@RequestBody Student student) {
        return repo.save(student);
    }
    
    //For show all students
    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return repo.findAll();
    }
    
    //To find a student by id
    @GetMapping("/student/{id}")
    public Student getStudent(@PathVariable int id)
    {
    	Student student=repo.findById(id).get();
    	return student;
    }
    
    //For Update Student Details
    @PutMapping("/student/update/{id}")
    public Student updateDetails(@PathVariable int id, @RequestBody Student updatestudent) {
        Student student = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Student not found with id " + id));

        student.setName(updatestudent.getName());
        student.setAge(updatestudent.getAge());
        student.setAddress(updatestudent.getAddress());
        student.setPhone_no(updatestudent.getPhone_no());  // ✅ Corrected
        student.setRoll_no(updatestudent.getRoll_no());
        student.setStudy_class(updatestudent.getStudy_class());

        return repo.save(student);
    }
    
    //For delete record of an existing student
    @DeleteMapping("/student/delete/{id}")
    public void removeStudent(@PathVariable int id)
    {
    	Student student=repo.findById(id).get();
    	System.out.println(id);
    	repo.delete(student);
    }
}
