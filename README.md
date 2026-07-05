# inventory-app

A repo for Odin Project - Project: Inventory Application

The inventory will store the anime I have watched and the number of times I have watched them

Define the structure of the code:
The database will need to store:

1. name of anime
2. genre of anime (1 anime could have multiple genres, 1 genre can also have multiple animes)
3. number of times watched

It is possible to store all the above in the same table, but it is not efficient to do so.
Therefore 3 database tables will be created:

1. anime table (values: name of anime, number of times watched, genre)
2. genre table (name of genres)
3. anime and genre relation table (id of anime, id of genre)

The webpages will include:

1. an index page that allow the user to choose either "view category" or "view item"
2. a form that allows the user to create/ update anime item
3. a form that allows the user to create/ update genre item
4. a page for displaying all the anime/ or anime of the choosen category
5. a page for displaying all the category
