

CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,                   
    age INTEGER,                       
    work TEXT,                  
    priority TEXT CHECK(priority IN ('high', 'medium', 'low')), 
    due_date DATE                         
);


INSERT INTO user (name, age, work, priority, due_date) 
VALUES
               ('Lesego ', 30, 'Software Engineer', 'high', '2024-08-01'),
               ('Tshepo', 25, 'Graphic Designer', 'medium', '2024-08-15'),
               ('Kamogelo', 40, 'Project Manager', 'low', '2024-09-01'),
               ('Lonwabo', 28, 'Marketing Specialist', 'medium', '2024-08-20'),
               ('mpho', 35, 'Cybersecurity Analyst', 'high', '2024-07-30');

          




            
  
