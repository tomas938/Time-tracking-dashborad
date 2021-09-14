const daily = document.querySelector("#daily");
const weekly = document.querySelector("#weekly");
const monthly = document.querySelector("#monthly");
const person = document.querySelector(".person");
getData();
async function getData() {
	const res = await fetch("data.json");
	const data = await res.json();
	displayData(data);
}
function displayData(data) {
	data.forEach((item, index) => {
		const main = document.querySelector("main");
		const statistic = document.createElement("div");
		statistic.classList.add("statistics");
		function renderMarkup(item, hrs, week) {
			statistic.innerHTML = `<div class="statistics__item statistics__item-${index}">
					<div class="top"></div>
					<div class="bottom">
						<div class="dashboard-class">
							<h3>${item.title}</h3>
							<svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
									fill="#BBC0FF"
									fill-rule="evenodd"
								/>
							</svg>
						</div>
						<div class="dashboard-stats">
							<span>${hrs}hrs</span>
							<p>Last Week - ${week}hrs</p>
						</div>
					</div>
					</div>`;
		}
		renderMarkup(
			item,
			item.timeframes.weekly.current,
			item.timeframes.weekly.previous
		);
		main.appendChild(statistic);
		gsap.to(".statistics", {
			opacity: 1,
			x: 0,
			duration: 0.5,
			stagger: 0.25,
		}),
			daily.addEventListener("click", () => {
				renderMarkup(
					item,
					item.timeframes.daily.current,
					item.timeframes.daily.previous
				);
			});
		weekly.addEventListener("click", () => {
			renderMarkup(
				item,
				item.timeframes.weekly.current,
				item.timeframes.weekly.previous
			);
		});
		monthly.addEventListener("click", () => {
			renderMarkup(
				item,
				item.timeframes.monthly.current,
				item.timeframes.monthly.previous
			);
		});
	});
}

// GSAP //
setTimeout(() => {
	gsap.to(".person", { opacity: 1, y: 0, duration: 1 });
}, 500);
