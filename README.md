# Introduce
We made the API Server by implemneting the [JSON API](https://jsonapi.org/).
I hope to refer it when JSON API server.

# Install
    npm install mysql
`
CREATE TABLE articles(                               
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,                 
  title VARCHAR(100) NOT NULL,
  peopleId INT,
  FOREIGN KEY (peopleId) REFERENCES people(ID) ON UPDATE CASCADE  
)

INSERT INTO articles VALUES (1, 'JSON:API paints my bikeshed!', 9);
`
`
CREATE TABLE comments(                               
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,                 
  body VARCHAR(30) NOT NULL,
  peopleId INT,
  articleId INT,
  FOREIGN KEY (peopleId) REFERENCES people(ID) ON UPDATE CASCADE,
  FOREIGN KEY (articleId) REFERENCES articles(ID) ON UPDATE CASCADE
)

INSERT INTO comments VALUES (5, 'First!', 2, 1);
INSERT INTO comments VALUES (12, 'I like XML better', 9, 1);
`
`
CREATE TABLE people(                               
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,                 
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  twitter VARCHAR(30)
)

INSERT INTO people VALUES (2, 'Kim', 'JeongWon', 'shcrlk12');
INSERT INTO people VALUES (9, 'Dan', 'Gabhardt', 'dgeb');
`

https://kth990303.tistory.com/36
# Progress
not yet complete! 😢