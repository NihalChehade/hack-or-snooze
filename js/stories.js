"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  console.log("storyList is", storyList);
  $storiesLoadingMsg.remove();
  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  const $markup = $(`
 <li id="${story.storyId}">
 
   <span id="starSpan" class="star hidden">
      <i class="fa-regular fa-star"></i>
   </span>
   <span class="mainSpan"><a href="${story.url}" target="a_blank" class="story-link">
     ${story.title}
   </a>
   <small class="story-hostname">(${hostName})</small>
   <div class="story-author">by ${story.author}</div>
   <div class="story-user">posted by ${story.username}</div></span>
   <hr>
 </li>
`);

  return $markup;
}



/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);

    changeStarOnFav($story, story);
    $allStoriesList.append($story);
  }


  // generateFavoriteStarOnLogin();
  $allStoriesList.show();
}

async function saveAndDisplayStory(evt) {
  console.debug("submit", evt);
  evt.preventDefault();

  // grab the author, title and url from the form
  const author = $("#submit-author").val();
  const title = $("#submit-title").val();
  const url = $('#submit-url').val();


  let story = await StoryList.addStory(currentUser, { title, author, url });
  storyList.stories.unshift(story);
  currentUser.ownStories.unshift(story);
  $submitForm.trigger("reset");
  putStoriesOnPage();
  $submitForm.hide();
}

$submitForm.on("submit", saveAndDisplayStory);


function changeStarOnFav(storyMarkup, story) {

  if (currentUser) {
    console.log("inside changestaronfav");
    for (let favStory of currentUser.favorites) {
      if (favStory.storyId === story.storyId) {
        storyMarkup.find("i").removeClass("fa-regular").addClass("fa-solid");

      }
    }
    const $favoriteSpan = $('.star');
    $favoriteSpan.removeClass('hidden');

  }
}
