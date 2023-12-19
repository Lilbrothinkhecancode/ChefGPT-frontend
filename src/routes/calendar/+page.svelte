<script>
  let date = new Date();
  let month = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  let week = getWeekRange(date);
  let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // just for demo purposes lol
  let mealPlans = { 
    default: {
      meal: 'Pasta',
      kcal: 240,
      image: 'https://www.foodandwine.com/thmb/c-MBu_vMHq3EcoN_KPxwg-oZjKo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Pasta-Aglio-E-Olio-2-FT-RECIPE0123-38cd2045646a4635a80e8166f085fc7e.jpg'
    }
  };

  function getWeekRange(d) {
  let start = d.getDate() - d.getDay() + 1;
  let end = start + 6; 
  let weekStart = new Date(d.getFullYear(), d.getMonth(), start);
  let weekEnd = new Date(d.getFullYear(), d.getMonth(), end);
  let weekMonth = weekStart.toLocaleString('default', { month: 'long' });
  return `${weekStart.getDate()} - ${weekEnd.getDate()} ${weekMonth}`;
}

  function previousWeek() {
    date.setDate(date.getDate() - 7);
    week = getWeekRange(date);
  }

  function nextWeek() {
    date.setDate(date.getDate() + 7);
    week = getWeekRange(date);
  }
</script>

<div>
  <div class="header">
    <h1>Meal Prep</h1>
    <h2>{month}</h2>
    <div class="week-navigation">
      <button on:click={previousWeek}>&lt;</button>
      <h3>{week}</h3>
      <button on:click={nextWeek}>&gt;</button>
    </div>
  </div>
  <div class="week-controls">
    <div class="days">
      {#each days as day (day)}
  <div class="day-card">
    <h4>{day}</h4>
    {#each ['Breakfast', 'Lunch', 'Dinner'] as meal (meal)}
      <div class="meal-card">
        <h4>{meal}</h4>
        <img src={mealPlans[week]?.image || mealPlans.default.image} alt={meal} />
        <h5>{mealPlans[week]?.meal || mealPlans.default.meal}</h5>
        <p>{mealPlans[week]?.kcal || mealPlans.default.kcal} kcal</p>
      </div>
    {/each}
  </div>
{/each}
    </div>
  </div>
</div>

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
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
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

  h1, h2, h3 {
    margin: 0;
    font-weight: 600;
  }

  h1 {
    font-size: 2.5em; 
  }

  h2 {
    font-size: 1.3em;
    margin-top: 10px; 
  }

  h3 {
    font-size: 1.2em; 
  }

  .meal-card h4 {
    font-size: 0.8em; 
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