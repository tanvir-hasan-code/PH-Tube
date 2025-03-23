// All  Button Load from API
function loadBtn() {
	fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
		.then((res) => res.json())
	.then((data) =>displayCategories(data.categories))
}

function displayCategories(categories) {
	const btnContainer = document.getElementById("btnContainer");
	
	for (const categorie of categories) {
		const createDiv = document.createElement("div");
		createDiv.innerHTML = `
		<button onclick=clickBtn(this) class="btn btn-sm  hover:font-bold  click-btn">${categorie.category}</button>
		`
		btnContainer.appendChild(createDiv);
	}
}
loadBtn()

// Button Focus after clicked

function clickBtn(clickBtn) {
	document.querySelectorAll(".click-btn").forEach((button) => {
		button.classList.remove("btn-focus")
	});
	clickBtn.classList.add("btn-focus");
}

// Load videos section

function loadVideo() {
	fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
		.then((res)=>res.json())
		.then((data)=>displayVideo(data.videos))
}

function displayVideo(videos) {
	const videoContainer = document.getElementById("videoContainer");

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
				  		<p class="text-gray-500 flex gap-2">${video["authors"][0]["profile_name"]}<img class="w-5 object-cover" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="verified"></p>
						<p class="text-gray-500">${video["others"]["views"]} views</p>
					</div>
				</div>
			  </div>
		
		`
		videoContainer.appendChild(div)
	})
}






loadVideo()






// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }