# Boozer With Auth!

Today, we'll be practicing with authentication and authorization. Fork and clone, this repo, then fork and clone the Boozer API from a previous lab.

Follow the steps below to implement user authentication and authorization.

1. On the API side, create a User model with a username and password_digest. Use bcrypt and `has_secure_password`. Create one user using the rails console.
2. On the client side, we should have some state on our App to store whether or not a user is logged in and some info about the loggedInUser.
3. When the `App` component mounts, we should check to see if we are storing the user_id in our localStorage. If we are, we should make a request to fetch info about the current user and update our state.
4. Create a login form component. When this form is submitted, we should update the `App` state so that the user is logged in and that we have the current user info.
5. In our `CocktailsPageContainer`, we should check to see if we have the `user_id` in localStorage. If not, we should redirect to login.

Those are basic requirements. Do your best to get it working by following along with the patterns that you learned in lecture. This will be hard, but you guys are good programmers and can do it!
