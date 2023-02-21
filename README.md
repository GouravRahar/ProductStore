# Description
This website is designed using MERN stack where MongoDB is used as database to store the user details and the product details, ReactJS is used to develop the frontend of website and NodeJS is used to develop the backend of this project.
# Home Page
This is the main page of our website and the products are shown in this page itself and users can go through the products list by scrolling down. The category of the product is written on top of image of product itself and little description is written below the image. 
Every Page is divided mainly into three components and these components can be reused with providing different text on every page using react so we don’t have to again write code to create this thing.

![image](https://user-images.githubusercontent.com/89836038/220333076-10bdf30f-8395-43d3-94fe-0480550504ca.png)

![image](https://user-images.githubusercontent.com/89836038/220333449-82a6a897-3f74-422b-b038-845a10c79ece.png)
  
First component is where all different links of the website are present.  Second Component is where all the details/functions are shown of that particular page and third one is to Contact us if user have any query.

# Signup Page
If a new user is using the website, then he has to first signup by providing all the necessary details given in form when he clicks on submit, a new user is stored in our database with all the attributes given in form and his password is stored in encrypted form using sha256 so that even someone with access to the database cannot see the password. After signing up user can sign in with the same details, he used for signing up.
![image](https://user-images.githubusercontent.com/89836038/220334446-8f3d8a5b-70e9-4dba-873e-31e9cddb714f.png)

# Cart Page
![image](https://user-images.githubusercontent.com/89836038/220334536-d161261e-0968-4e1f-80b8-35eb6957960d.png)

# Admin Page
Once user with admin role logged in Admin have a dashboard page for himself where he can go and check all the functionalities provided to him. Now, four different options are present in his Dashboard: Create Category, Manage Categories, Create Product and Manage Products.

![image](https://user-images.githubusercontent.com/89836038/220334921-6e28f050-b5b1-49ef-b536-206fb13ce6d0.png)

# Flow Chart Diagram
![image](https://user-images.githubusercontent.com/89836038/220335288-e32a593e-aa0a-445e-8e26-ae7cf39ae1dd.png)

