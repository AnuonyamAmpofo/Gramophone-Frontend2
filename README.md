# 208-Group-Solution
Repository for DCIT 208 collaborative project.



#Requirements of Backend from FrontEnd.

1)Admin page
A dashboard - which shows number of students enrolled and instructors. 
An add student button.
A delete student button- which will allow multiple students to be deleted.
An add instructor button.
A delete instructor button

//New Update
Assign instructor to student per session.



2)For Student account
A dashboard - which welcomes the student back. 
Shows the class he is enrolled in.
His sessions
His instructor(s)




3)Instructor page.
A dashboard - which shows the instrument(s) he is teaching.
The number of students in each class
His session time depending on the session times indicated by the students.


4)For the sign up button, we'll need to link it to their google form to receive new entries. **To be confirmed by the client**


//The 2 admins will be the director himself and the secretary.
The secretary will be in charge of adding and removing students, instructors, etc.
The Director will oversee all the operations.

More requirements will be added in due course.



//FOR Backend
(1)Create a 'change password' API
(2)Create a 'forgot password' API where they can use probably t


Make sure you check why the sp.user_id does not show the name for the instructor as it does for the student. -DOne

The announcements on the student Dashboard should have 3 parts and justified space between - DONE

*Create a Course Detail page that appears when the user clicks on the course card(only for instructors and admins)-
    ~Should have 
        -Course Code
        -Day
        -Number of Students
        -List of Students and session times (with the dropdown...)
        -Announcements Section(which shows the list of announcements)
        -A small, "Post and Announcement section(with "title" and "Content" boxes )"

DONE

*Create a part for individual comments for students by instructor and admin as well - 
    ~When the instructor clicks on the student in the list of students, a dropdown menu appears with the details of the student, and a portion for comments with a post comment button. - DONE




*When the instructor clicks on an announcement, an overlaying modal box (like the one for login) should display "Edit" or "Delete" - DONE


//Admin

*Both the student button and student link on the dashboard should take the user to a students page.
    The student page should list the students names with a filter to filter the students by maybe instrument, session day
    -There should also be a search bar

    Then on the right side, there should be an add/delete and update students column(so the page will be divided into 2).

