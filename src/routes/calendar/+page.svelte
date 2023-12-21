<script>
	import { getUserId } from '../../utils/auth';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { IsLoggedIn } from '../../utils/stores.js';

	let userId = getUserId;
	let mealPlans=[];
	const userData = {
		userId
	};

	onMount(() => {
		getCalendar();
	});

	// FUNCTIONS

	// Get user records
	async function getCalendar() {
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/calendar/fetch', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		});

		const res = await resp.json();
		mealPlans=res;
		console.log(mealPlans)
		
	}

	// Get week range for Header
	function getWeekRange(d) {
		let start = d.getDate() - d.getDay() + 1;
		let end = start + 6;
		let weekStart = new Date(d.getFullYear(), d.getMonth(), start);
		let weekEnd = new Date(d.getFullYear(), d.getMonth(), end);
		let weekMonth = weekStart.toLocaleString('default', { month: 'long' });
		return `${weekStart.getDate()} - ${weekEnd.getDate()} ${weekMonth}`;
	}

	// Adding days to a date
	function addDays(date, days) {
		var result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}

	// Get dates between two dates
	function getDates(startDate, stopDate) {
		var dateArray = new Array();
		var currentDate = startDate;
		while (currentDate <= stopDate) {
			dateArray.push(new Date(currentDate));
			currentDate = addDays(currentDate, 1);
		}
		return dateArray;
	}

	// Finding Monday of  corresponding date

	function getMonday(d) {
		d = new Date(d);
		var day = d.getDay(),
			diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
		return new Date(d.setDate(diff));
	}

	// Moving to previous week

	function previousWeek() {
		date.setDate(date.getDate() - 7);
		week = getWeekRange(date);
		for (let i = 0; i < dateArray.length; i++) {
			dateArray[i] = addDays(dateArray[i], -7);
		}
	}

	// Moving to next week

	function nextWeek() {
		date.setDate(date.getDate() + 7);
		week = getWeekRange(date);
		for (let i = 0; i < dateArray.length; i++) {
			dateArray[i] = addDays(dateArray[i], 7);
		}
	}

	// DATA

	let date = new Date();
	let week = getWeekRange(date);

	let showDate = [];
	let todayDate = new Date();
	let currentMonday = getMonday(todayDate);
	let currentWeekend = addDays(currentMonday, 6);
	let dateArray = getDates(currentMonday, currentWeekend); // Creating an array for the dates of the week
	let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	// just for demo purposes lol
	// let mealPlans = 
	// [
	// 	{
	// 		date: '20/12/2023',
	// 		meal: 'Lunch',
	// 		name: 'Pasta',
	// 		kcal: 240,
	// 		image:
	// 			'https://www.foodandwine.com/thmb/c-MBu_vMHq3EcoN_KPxwg-oZjKo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Pasta-Aglio-E-Olio-2-FT-RECIPE0123-38cd2045646a4635a80e8166f085fc7e.jpg'
	// 	},
	// 	{
	// 		date: '18/12/2023',
	// 		meal: 'Breakfast',
	// 		name: 'Bowl',
	// 		kcal: 520,
	// 		image:
	// 			'https://www.foodandwine.com/thmb/c-MBu_vMHq3EcoN_KPxwg-oZjKo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Pasta-Aglio-E-Olio-2-FT-RECIPE0123-38cd2045646a4635a80e8166f085fc7e.jpg'
	// 	}
	// ];

	// Converting Date
	$: for (let i = 0; i < dateArray.length; i++) {
		showDate[i] = dateArray[i].toLocaleDateString('en-GB');
	}
</script>


{#if $IsLoggedIn == true}

<div>
	<div class="header">
		<h1>Meal Prep</h1>
		<div class="week-navigation">
			<button on:click={previousWeek}>&lt;</button>
			<h3>{week}</h3>
			<button on:click={nextWeek}>&gt;</button>
		</div>
	</div>

	<div class="week-controls">
		<div class="days">
			{#each showDate as date, i}
				<div class="day-card">
					<h4>{days[i]}</h4>
					<h4>{date}</h4>
					{#each ['Breakfast', 'Lunch', 'Dinner'] as meal}
						<div class="nomeal-card">
							{#each mealPlans as mealP}
								{#if mealP.date === date}
									{#if mealP.meal === meal}
										<div class="meal-card">
											<img src={mealP.image} alt="Breakfast" />
											<h5>{mealP.name}</h5>
											<p>{mealP.kcal} kcal</p>
										</div>
									{/if}
								{/if}
							{/each}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>
{:else}
 <h1> YOU ARE NOT LOGGED IN </h1>
	
{/if}

<style>

  
  .week-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .days {
    display: flex;
    flex-grow: 1;
    gap: 0;
    justify-content: center;
    margin-bottom: 50px;
  }

  .day-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0;
    align-items: center;
    font-size: 1em;
    margin-left: 0px; 
    margin-right: 0px;  
  }

  .meal-card {
    background-color: rgb(255, 255, 255);
    border: 1px solid #ebebeb;
    border-radius: 0.125rem;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    padding: 0px; 
    margin-top: 0px; 
    margin-left: 0; 
    margin-right: 0; 
    width: 150px; 
    height: 200px; 
    display: flex;
    flex-direction: column;
    align-items: center;
  }


	.nomeal-card {
		background-color: rgb(203, 203, 203);
		border: 1px solid #ccc;
		box-shadow:
			0 2px 4px 0 rgba(0, 0, 0, 0.2),
			0 3px 10px 0 rgba(0, 0, 0, 0.19);
		padding: 0px;
		margin-top: 5px;
		margin-left: 0;
		margin-right: 0;
		width: 150px;
		height: 200px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

  .meal-card img {
    display: block;
    margin: auto;
    width: 60%; 
    height: 40%; 
    object-fit: cover;
  }

  h1 {
    font-size: 2.5em; 
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 5px; 
    padding-left: 60px;
    justify-content: center;
    align-items: center; 
  }

  h1,  h3 {
    margin: 0;
    font-weight: 600;
  }

  h1 {
    font-size: 2.5em; 
  }

  

  h3 {
    font-size: 1.2em; 
  }



  .meal-card p {
    font-size: 0.6em;
  }

  .week-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 50px;
  }
</style>

