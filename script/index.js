// Load categories
const loadCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};
// Load videos
const loadVideos = () => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
};
// Display categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  for (const cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    categoryContainer.appendChild(categoryDiv);
  }
};
// Display video
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videoContainer");
    for (const vid of videos) {
        console.log(vid);
        const videoCard = document.createElement("div");
        videoCard.innerHTML=`
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
        <h2 class="font-semibold text-sm">Hello world</h2>
        <p class="text-sm text-gray-400 flex gap-2 justify-between items-center">${vid.authors[0].profile_name} <span><img class="w-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""></span></p> 
        <p class="text-sm text-gray-400">${vid.others.views} views</p>
      </div>
    </div>
  </div>
        `;
        videoContainer.appendChild(videoCard);
    }
}
loadCategories();
loadVideos();
