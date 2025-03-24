// All  Button Load from API
function loadBtn() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
  const btnContainer = document.getElementById("btnContainer");

  for (const categorie of categories) {
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `
		<button onclick="clickBtn(this),loadCategories(${categorie["category_id"]})" class="btn btn-sm  hover:font-bold  click-btn">${categorie.category}</button>
		`;
    btnContainer.appendChild(createDiv);
  }
}
loadBtn();

// Button Focus after clicked

function clickBtn(clickBtn) {
  document.querySelectorAll(".click-btn").forEach((button) => {
    button.classList.remove("btn-focus");
  });
  clickBtn.classList.add("btn-focus");
}

// Load videos section

function loadVideo() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideo(data.videos));
}

function displayVideo(videos) {
  const videoContainer = document.getElementById("videoContainer");
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.innerHTML = `
		<div class="md:w-11/12 mx-auto grid justify-center md:col-span-4 py-16">
			<img class="mx-auto" src="assets/Icon.png" alt="Oops-Icon">
			<h3 class="text-center  mt-3 text-2xl font-bold">Oops!! Sorry, There is no <br> content here</h3>
		 </div>
		`;
    return;
  }
  videos.forEach((video) => {
    const div = document.createElement("div");
    div.innerHTML = `
		<div class="card bg-base-200">
				<figure class="relative ">
				  <img class="w-full h-52 object-cover"
					src="${video["thumbnail"]}"
					alt="Thumbnail"/>
					<span class="absolute bg-gray-600 text-white px-2 rounded-lg bottom-2 right-2">3hrs 56 min ago</span>
				</figure>
				<div class="py-4 px-2 flex  gap-3">
					<div class="avatar w-10 items-start">
						<div class="ring-primary ring-offset-base-100  rounded-full ring ring-offset-2">
						  <img src="${video["authors"][0]["profile_picture"]}" />
						</div>
					  </div>
					<div>
						<h2 class="font-semibold text-2xl md:text-2xl">${video.title}</h2>
				  		<p class="text-gray-500 flex gap-2">${video["authors"][0]["profile_name"]}${
      video["authors"][0]["verified"] === true
        ? '<img class="w-5 object-cover" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="verified">'
        : ""
    }</p>
						<p class="text-gray-500">${video["others"]["views"]} views</p>
					</div>
				</div>
				<button onclick="loadVideoId('${
          video.video_id
        }')" class="btn btn-soft details-btn">Details</button>
			  </div>
		
		`;
    videoContainer.appendChild(div);
  });
}
loadVideo();

// others categories load function

function loadCategories(id) {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayVideo(data.category));
}

// Video Details section

const loadVideoId = (id) => {
  console.log(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));
};

const displayVideoDetails = (video) => {
  document.getElementById("video_modal").showModal();
  const videoDetails = document.getElementById("videoDetailsCard");
  videoDetails.innerHTML = `
	<div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src='${video.thumbnail}'
      alt="Thumbnail" />
  </figure>
  <div class="card-body">
  <div class="avatar flex gap-5 items-center">
  <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
    <img src="${video["authors"][0]["profile_picture"]}" />
	</div>
	<h2 class="font-semibold text-xl text-yellow-500 flex ">${video["authors"][0]["profile_name"]}${video["authors"][0]["verified"]=== true? '<div class="w-6 p-1"><img class="flex items-center" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="verified"></div>':""}</h2>
	</div>
    <h2 class="card-title text-2xl">${video.title}</h2>
    <p>${video.description}</p>
	<p> ${video["others"]["views"]} view    * ${video["others"]["posted_date"]} day ago</p>
  </div>
</div>
	
	`;
};

// search input by short 

function shortVideo(search = "") {
	fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`)
		.then(res => res.json())
		.then(data => {
		displayVideo(data.videos)
	})

}

document.getElementById("search-input").addEventListener('keyup', (e) => {
	const input = e.target.value;
	shortVideo(input)
})