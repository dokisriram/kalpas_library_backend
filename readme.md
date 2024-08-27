
Kalpas Library backend API

1. download code and run command npm install
2. for starting of application run npm start command


Implementation 

-----------------------------  Login and Register Api -------------------------------------

1. First you have to register as a user by using "/api/users/register" post route

In this route you have to give a object user in the body 

{
    "user": {
        "name": "username",
        "email":"email@gmail.com",
        "password":"11111111",
        "role":"user",
        "books":[]
    }
}

There are two roles
    1. user
    2. admin

admin can remove book from the library inventory


2. After Registration user have to login by using "/api/users/login" post route

In this route you have to give a user object with email and password

{
    "user":{
        "email":"sriram@gmail.com",
        "password":"123456"
    }
}

after logging in a token is generated which we have to put it as bearer token for books and library route


-----------------------------  Books Routes -------------------------------------

1. We can Retrive all books by using   "/api/books" GET route

2. To get a specific book information by using "/api/books/:id" GET route

3. To Create a new book by using "/api/books" POST route

to create a book we have to give following information

In formdata we are giving the following details

    1. author - userid(a userid)
    2. borrower - serid(a userid)
    3. library - libraryid
    4. filename - upload a picture for book coverpage (optional)

4. To update a book by using "/api/books/:id" PUT route

to update a book we have to give following information

In formdata we are giving the following details

    1. author - userid(a userid)
    2. borrower - serid(a userid)
    3. library - libraryid
    4. filename - upload a picture for book coverimage (optional)

    if we give filename it will update the coverimage otherwise not

5. To delete a book by using "/api/books/:id" DELETE route

6. To borrow a book by using "/api/borrow" POST Route

to borrow we have to give the data object 

{
    "data":{
        "id":"book_id",
        "userId":"user_id"
    }
}

    1. In id we have to provide _id of  book 
    2. in userId we have to provide _id of user 


7. To return a book by using "/api/return/:id" PUT Route

    The id is _id of book


-----------------------------  Library Routes -------------------------------------

1. To create a library by using "/api/libraries" POST Route

In the request body you have to pass data object

{
    "data":{
        "name":"name of library"
    }
}


2. To get all library by using "/api/libraries" GET Route

3. To get one library by using "/api/libraries/:id" GET Route

4. To modify library by using "/api/libraries/:id" PUT Route

id is the _id of library
In the Request body you have to pass data object

{
    "data":{
        "name":"modified name"
    }
}

5. To delete library by using "/api/libraries/:id" DELETE Route

id is the _id of library 

6. To get the inventory inside library is "/api/libraries/:id/inventory" GET Route

id is the _id of library

7. To add inventory inside library is "/api/libraries/:id/inventory" POST Route

we have to pass the data object inside request body

{
    "data":{
        "bookId":"id"
    }
}

id is the _id of book

8. To delete inventory inside library is "/api/libraries/:libid/inventory/:id" DELETE Request

libid is the library id and id is the book id 