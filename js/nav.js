"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navSubmit.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $navSubmit.text('Submit').show();
  $navFavorites.text('Favorites').show();
  $navMyStories.text('My Stories').show();
}

/** Show submitform on click on "submit" */

function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}

$navSubmit.on("click", navSubmitClick);


function navFavoritesClick() {
  $favoriteStoriesList.empty();
  const favorites = currentUser.favorites;

  // loop through all of our favorite stories and generate HTML for them
  for (let favorite of favorites) {
    const $favStory = generateStoryMarkup(favorite);
    $favoriteStoriesList.append($favStory);
  }

  hidePageComponents();
  $favoriteStoriesList.show();


}

$navFavorites.on("click", navFavoritesClick);

function navMyStoriesClick() {
  $myStoriesList.empty();
  const ownStories = currentUser.ownStories;

  // loop through all of our favorite stories and generate HTML for them
  for (let story of ownStories) {
    const $myStory = generateStoryMarkup(story);
    $myStoriesList.append($myStory);
  }

  hidePageComponents();
  $myStoriesList.show();


}

$navMyStories.on("click", navMyStoriesClick);