//API works (also) trough glitch.me proxy:
//https://wind-bow.glitch.me/twitch-api/
//See example @ https://codepen.io/_dev_noise/pen/rjKxpj/

//https://medium.freecodecamp.org/building-a-twitchtv-app-project-8824d61fe7a5

const channelDiv = document.getElementById('channelDiv');

const url = 'https://wind-bow.glitch.me/twitch-api/';
const users = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

function callToTwitchChannelsApi(url) {
  fetch(url)
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {
    // Here you get the data to modify as you please
    let channelName = data["_links"]["channel"].substr("https://api.twitch.tv/kraken/channels/".length);
    let channelUrl = "https://www.twitch.tv/" + channelName;
    let isStreaming = data["stream"] !== null;
    let channelCssClass = "channel";

    let status = "The channel is offline.";
    if(isStreaming){
      status = `${data["stream"]["game"]}: ${data["stream"]["channel"]["status"]}`;
      channelCssClass = "channel streaming";
    }

    channelDiv.innerHTML += `<div class="${channelCssClass}">
                      <div class="name"><a href="${channelUrl}" target="blank">${channelName}</a></div>
                      <div class="status"><p>${status}</p></div>
                    </div>`;
    })
  .catch(function(error) {
    // If there is any error you will catch them here
    console.log(error);
  });
}

users.forEach(function(item) {
  let userUrl = url + `streams/${item}`;
  callToTwitchChannelsApi(userUrl);
})