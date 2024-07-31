## Stories Endpoints

1. **Create a story**
    * **Endpoint:** `/stories`
    * **Method:** POST
    * **Description:** Create a new story

2. **Fetch a single story**
    * **Endpoint:** `/stories/{storyId}`
    * **Method:** GET
    * **Description:** Retrieve a single story by ID

3. **Fetch all stories**
    * **Endpoint:** `/stories`
    * **Method:** GET
    * **Description:** Retrieve all stories

4. **Fetch all stories of all theme rooms**
    * **Endpoint:** `/stories/theme-rooms`
    * **Method:** GET
    * **Description:** Retrieve all stories associated with all theme rooms

5. **Fetch all stories of a single theme room**
    * **Endpoint:** `/stories/theme-rooms/{themeRoomId}`
    * **Method:** GET
    * **Description:** Retrieve all stories of a specific theme room

6. **Fetch all stories written by a particular author**
    * **Endpoint:** `/stories/authors/{authorId}`
    * **Method:** GET
    * **Description:** Retrieve all stories written by a particular author

7. **Fetch all favorite stories of the user**
    * **Endpoint:** `/stories/users/{userId}/favorites`
    * **Method:** GET
    * **Description:** Retrieve all stories marked as favorites by the user

8. **Delete a story**
    * **Endpoint:** `/stories/{storyId}`
    * **Method:** DELETE
    * **Description:** Delete a story

9. **Update a story**
    * **Endpoint:** `/stories/{storyId}`
    * **Method:** PUT / PATCH
    * **Description:** Edit or update a story

10. **Add a story to user's favorite story list**
    * **Endpoint:** `/stories/{storyId}/favorite`
    * **Method:** POST
    * **Description:** Add a story to the user's favorite story list

11. **Remove a story from user's favorite story list**
    * **Endpoint:** `/stories/{storyId}/favorite`
    * **Method:** DELETE
    * **Description:** Remove a story from the user's favorite story list

## Theme Rooms Endpoints

1. **Create a theme room**
    * **Endpoint:** `/theme-rooms`
    * **Method:** POST
    * **Description:** Create a new theme room

2. **Fetch all theme rooms**
    * **Endpoint:** `/theme-rooms`
    * **Method:** GET
    * **Description:** Retrieve all theme rooms

3. **Fetch a single theme room**
    * **Endpoint:** `/theme-rooms/{themeRoomId}`
    * **Method:** GET
    * **Description:** Retrieve a single theme room by its ID

4. **Fetch favorite theme rooms of a user**
    * **Endpoint:** `/theme-rooms/users/{userId}/favorites`
    * **Method:** GET
    * **Description:** Retrieve all favorite theme rooms of a specified user

5. **Update a theme room**
    * **Endpoint:** `/theme-rooms/{themeRoomId}`
    * **Method:** PUT / PATCH
    * **Description:** Update an existing theme room

6. **Delete a theme room**
    * **Endpoint:** `/theme-rooms/{themeRoomId}`
    * **Method:** DELETE
    * **Description:** Delete a specific theme room

7. **Add a theme room to user's favorites**
    * **Endpoint:** `/theme-rooms/{themeRoomId}/favorite`
    * **Method:** POST
    * **Description:** Add a theme room to the current user's favorites

8. **Remove a theme room from user's favorites**
    * **Endpoint:** `/theme-rooms/{themeRoomId}/favorite`
    * **Method:** DELETE
    * **Description:** Remove a theme room from the current user's favorites

9. **Search theme rooms**
    * **Endpoint:** `/theme-rooms/search`
    * **Method:** GET
    * **Description:** Search for theme rooms based on various criteria


## User Endpoints

1. **Create a user**
    * **Endpoint:** `/users`
    * **Method:** POST
    * **Description:** Create a new user

2. **Fetch all users**
    * **Endpoint:** `/users`
    * **Method:** GET
    * **Description:** Retrieve all users

3. **Fetch a single user**
    * **Endpoint:** `/users/{userId}`
    * **Method:** GET
    * **Description:** Retrieve a single user by their ID

4. **Update a user**
    * **Endpoint:** `/users/{userId}`
    * **Method:** PUT / PATCH
    * **Description:** Update an existing user's information

5. **Delete a user**
    * **Endpoint:** `/users/{userId}`
    * **Method:** DELETE
    * **Description:** Delete a specific user

6. **User login**
    * **Endpoint:** `/users/login`
    * **Method:** POST
    * **Description:** Authenticate a user and return a token

7. **User logout**
    * **Endpoint:** `/users/logout`
    * **Method:** POST
    * **Description:** Log out the current user (invalidate token)

8. **Get user's stories**
    * **Endpoint:** `/users/{userId}/stories`
    * **Method:** GET
    * **Description:** Retrieve all stories written by a specific user

9. **Get user's favorite stories**
    * **Endpoint:** `/users/{userId}/favorite-stories`
    * **Method:** GET
    * **Description:** Retrieve all stories favorited by a specific user

10. **Get user's favorite theme rooms**
    * **Endpoint:** `/users/{userId}/favorite-theme-rooms`
    * **Method:** GET
    * **Description:** Retrieve all theme rooms favorited by a specific user