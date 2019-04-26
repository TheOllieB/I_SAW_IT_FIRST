# I SAW IT FIRST -  Back-end Test

To get the product data from the API I used the request package as its one that I have used in the past and started manipulating the data for the tasks once the data had been received.As I had not dealt with creating csv or xlsx files before I new that research would be necessary to find the right tools for the job.

## i. Generate a CSV file from the data with the following columns: ID, Title, Product Type, Vendor, Variants IDS.

To begin this task I looked for a package that could create a csv file from the JSON provided. Json2csv stood out to me and after reading some of the documentation I was able to create a reusable function for creating csv's as this would be necessary for the 4th task. A csv file would be generated given the correct fields and data.

## ii. Generate an array and log it to the console contain the following info: Product Image URL, Product Image Height, Product Image Width and an overall count of total images.

Looped over the objects containing the required product information and push them to a new array I had created. I did this for the Images and image objects. This method seems to work however I believe that there is a more efficient approach. 

##  iii. Generate an XLSX file containing the Product Titles and Descriptions

Investigated different packages for sending data to an excel file. After looking through npm and StackOverflow the package excel4node seemed like a good fit for the job and easy to work with. I began by looping through the data extracting the product titles and descriptions, pushing into arrays for each. I then looped through the arrays inserting them into the columns/rows.

## iv. Generate a CSV of all the product tags combined, with duplicates removed

I began this task by looping over the tags for each product and pushing them to an array. I then joined and split the array in order to have all of the data as strings so that removing duplicates with the Set object would be possible. Using the function I had created in the first task I then used this tag data to insert into the function to create a csv file. 