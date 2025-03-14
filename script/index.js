// Remove active class
const removeActiveClass = () => {
  const activeButtons = document.getElementsByClassName("active");
  for (const abtn of activeButtons) {
    abtn.classList.remove("active");
  }
};

// Load categories
const loadCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`)
    .then((res) => res.json())
    .then((data) => {
      displayCategories(data.categories);
    });
};
// Load videos
const loadVideos = (input = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${input}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("allButton").classList.add("active");
      displayVideos(data.videos);
    });
};
// Load category videos
const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const clickedButton = document.getElementById(`btn-${id}`);
      // console.log(clickedButton);
      removeActiveClass();
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
};
// Load video details
const loadVideoDetails = (vidId) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${vidId}`)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));
};

// Display categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  for (const cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button id='btn-${cat.category_id}' onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    categoryContainer.appendChild(categoryDiv);
  }
};
// Display video
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videoContainer");
  videoContainer.innerHTML = ``;
  if (videos.length == 0) {
    videoContainer.innerHTML = `
     <div class="col-span-full text-center flex flex-col justify-center items-center py-20">
      <img class="w-[120px]" src="Icon.png" alt="">
      <h2 class="text-2xl font-bold">Oops!! Sorry there is no content here.</h2>
    </div>
    `;
    return;
  }
  for (const vid of videos) {
    const videoCard = document.createElement("div");

    videoCard.innerHTML = `
        <div class="card bg-base-100  shadow-sm">
       <figure class="relative">
         <img
         class="object-cover w-full h-[160px]"
          src="${vid.thumbnail}"
          alt="Shoes" />
         <span class="absolute bottom-5 right-5 bg-black text-white rounded-md px-2 py-1 text-xs">3h 56 min ago</span>
          </figure>
    <div class="flex gap-3 px-0 py-4">
      <div class="profile">
        <div class="avatar">
          <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
            <img  src="${vid.authors[0].profile_picture}" />
          </div>
        </div>
      </div>
      <div class="intro">
        <h2 class="font-semibold text-sm">${vid.title}</h2>
        <p class="text-sm text-gray-400 flex gap-2  items-center">${vid.authors[0].profile_name} <span>${vid.authors[0].verified == true ?'<img class="w-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""></img>' :''}</span></p> 
        <p class="text-sm text-gray-400">${vid.others.views} views</p>
      </div>
    </div>
    <button onclick=loadVideoDetails("${vid.video_id}") class="btn btn-block">Show details</button>
  </div>
        `;
    videoContainer.appendChild(videoCard);
  }
};
// show verified badge
const showVerifiedBadge = (state) => {
  if (state == true) {
    return '';
  }
};

// Display video details
const displayVideoDetails = (video) => {
  console.log(video.description);
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("detailsContainer");
  detailsContainer.innerHTML = `
  <div class="card bg-base-100 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="video" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    
  </div>
</div>
  `;
};

document.getElementById("searchInput").addEventListener("keyup", (e)=>{
  loadVideos(e.target.value);
})

loadCategories();
