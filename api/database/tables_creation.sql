use balenoupgdfsd3lf0k3j;

DROP TABLE user_types;
# user types 
CREATE Table user_types
(
	id            	TINYINT auto_increment NOT NULL UNIQUE PRIMARY KEY,
	userType		VARCHAR(255) NOT NULL
);




CREATE TABLE users 
  (
     id            	VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
     userType		TINYINT NOT NULL, /* S = Student or T = Teacher */
	 profileImg  	VARCHAR(255), 
     imgExtension 	VARCHAR(255),
     fullname     	VARCHAR(255) NOT NULL,
     gender        	CHAR(1), /* M - male or F - female */
     email         	VARCHAR(255) NOT NULL,
     pswd          	VARCHAR(255) NOT NULL,
     token 			VARCHAR(255), 	# for password changing 
     expiration 	datetime,	# token's expiration
     
	FOREIGN KEY (userType) REFERENCES user_types(id)
  );

# the tests documents are saved locally using the id 
CREATE TABLE tests
(
	id			INT auto_increment NOT NULL UNIQUE PRIMARY KEY ,
    teacherId 	VARCHAR(255) NOT NULL,
    topic 		VARCHAR(255) NOT NULL,
    subtopic 	VARCHAR(255) NOT NULL,
    timelimit 	time NOT NULL,
    grade 		tinyint NOT NULL,
    filenmae 	VARCHAR(255) NOT NULL,
    
    FOREIGN KEY (teacherId) REFERENCES users(id)					# the owner of the test 
);

CREATE TABLE classes
(
	id	INT auto_increment NOT NULL UNIQUE PRIMARY KEY,
    teacherId 	VARCHAR(255) NOT NULL,
    
    FOREIGN KEY (teacherId) REFERENCES users(id)		
);

CREATE TABLE class_students
(
	id	INT auto_increment NOT NULL UNIQUE PRIMARY KEY,
    studentId 	VARCHAR(255) NOT NULL,
    classId 	INT NOT NULL,
    
	FOREIGN KEY (studentId) REFERENCES users(id),
	FOREIGN KEY (classId) REFERENCES classes(id)
);


# every record of a test that has been finished by the class members
# every time a test is given to a class, a unique instance of it is created  
CREATE TABLE test_instances
(
	id			INT auto_increment NOT NULL UNIQUE PRIMARY KEY,		# unique id 
	accessToken	VARCHAR(255) NOT NULL UNIQUE,						# unique access token 
	classId 	INT, 												# the class to which the test was done 
    testId  	INT NOT NULL, 										# the test's id in the tests' documents table 
    doneDate	DATE NOT NULL,										# the date in which the test was done 
	startedHour TIME NOT NULL,										# the hour in which the test has started 

	FOREIGN KEY (classId) REFERENCES classes(id),	
	FOREIGN KEY (testId) REFERENCES tests(id)
);
drop table answered_tests;
# here we save the answered document of each student for a specifc test 
CREATE TABLE answered_tests
(
	id				INT auto_increment NOT NULL UNIQUE PRIMARY KEY,		# unique id 
    submitTime		TIME NOT NULL,										# at which hour was the test submitted by the student 
	studentId		VARCHAR(255) NOT NULL,								# the student who answered the test
    instanceId		VARCHAR(255) NOT NULL,								# the unique identifier of the test's instance
	wasChecked 		BOOL NOT NULL,										# determine whether this test has been checked by the teacher or not (0 = no / 1 = yes)
	
						
	FOREIGN KEY (instanceId) REFERENCES test_instances(accessToken)				
);


# each test will have it's alerts folder, the images will be saved with it's id 
CREATE TABLE test_alerts
(
	id	INT auto_increment NOT NULL UNIQUE PRIMARY KEY,		# unique id
	instanceId		INT NOT NULL,							# the unique identifier of the test's instance
	studentId		VARCHAR(255) NOT NULL,					# the student who answered the test
	
    FOREIGN KEY (studentId) REFERENCES users(id),
    FOREIGN KEY (instanceId) REFERENCES test_instances(id)
);