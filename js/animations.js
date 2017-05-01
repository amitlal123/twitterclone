$(document).ready(function(){

  var list = [];
  //localStorage.clear();
  var listStr = localStorage.getItem("tweets");
  if(listStr && listStr !== "[]"){
    list = JSON.parse(listStr);
    list.forEach(function(each){
      $('#stream').prepend(each);
    });
  }

  $('#tweet-controls').hide();
  $('.tweet-actions').hide();
  $('.stats').hide();
  $('.reply').hide();
   $('time.timeago').timeago();
  // It needs entire bootstrap js. Just tooltip js doesn't work
  $('[data-toggle="tooltip"]').tooltip();
  // Initialize it on body to make it work on dynamic content
  //  $('body').tooltip({
  //    'avatar' : '[data-toggle="tooltip"]'
  //  });

  function tweetCompose() {
    var maxCharCount = 140;
    var tweetInputLength = $(this).val().length;
    maxCharCount = maxCharCount - tweetInputLength;
    $('#char-count').text(maxCharCount);
    if(maxCharCount <= 10) {
      $('#char-count').css('color', 'red');
    } else{
      $('#char-count').css('color', '#999');
    }
    if(maxCharCount < 0) {
      $('#tweet-submit').prop('disabled', true);
    } else if(maxCharCount >= 0) {
        $('#tweet-submit').prop('disabled', false);
    }
  }

  function prepareTweet() {
    var imgSource = './' + $('#profile-summary .content .avatar').attr('src');
    var profile = $('#profile-summary');
    var fullName = $('#profile-summary .content p').text();
    var tweetText = $('.tweet-compose').val();
    var dateStamp = new Date();
    var dateAgo = $.timeago(dateStamp);
    console.log(imgSource);
    console.log(fullName);
    console.log(dateStamp);
    console.log(dateAgo);
    var tweetHTML = `<div class="tweet">
      <div class="content">
        <img class="avatar" src="${imgSource}" data-toggle="tooltip" data-placement = "right" title="Hello!"/>
        <strong class="fullname">${fullName}</strong>
        <span class="username">@user</span>

        <p class="tweet-text">${tweetText}.</p>

        <div class="tweet-actions">
          <ul>
            <li><span class="icon action-reply"></span> Reply</li>
            <li><span class="icon action-retweet"></span> Retweet</li>
            <li><span class="icon action-favorite"></span> Favorite</li>
            <li><span class="icon action-more"></span> More</li>
          </ul>
        </div>

        <div class="stats">
          <div class="retweets">
            <p class="num-retweets">30</p>
            <p>RETWEETS</p>
          </div>
          <div class="favorites">
            <p class="num-favorites">6</p>
            <p>FAVORITES</p>
          </div>
          <div class="users-interact">
            <div>

              <img src="img/alagoon.jpg" />
              <img src="img/vklimenko.jpg" />
            </div>
          </div>

          <div class="time">
            <time class="timeago" datetime="${dateStamp}">
            	${dateAgo}
            </time>
          </div>
        </div>
        <div class="reply">
          <img class="avatar" src="img/alagoon.jpg" />
          <textarea class="tweet-compose" placeholder="Reply to @mybff"/></textarea>
        </div>
      </div>
    </div>`;
    return tweetHTML;
  }

  $('.tweet-compose').on('focus',function(){
    $(this).css('height','5em');
    $('#tweet-controls').show();
    $(this).on('keyup',tweetCompose);
  });

// Tweet submit event
  $('#tweet-submit').on('click',function(){
    var tweetHTML = prepareTweet();
    $('#stream').prepend(tweetHTML);
    $('time.timeago').timeago();
    $('#stream > .tweet').find('.tweet-actions').hide();
    $('#stream > .tweet').find('.stats').hide();
    $('#stream > .tweet').find('.reply').hide();
    $('[data-toggle="tooltip"]').tooltip();
    list.push(tweetHTML);
    localStorage.setItem("tweets", JSON.stringify(list));
  });

//For events to work on dynamic content, delegated event handling to be used from closest static parent
  $('#stream').on('mouseenter', '.tweet', function(){
    $(this).find('.tweet-actions').show();
  });

  $('#stream').on('mouseleave', '.tweet', function(){
    $(this).find('.tweet-actions').hide();
  });

  $('#stream').on('click', '.tweet', function(){
    $(this).find('.stats').show();
    $(this).find('.reply').show();
  });

});
