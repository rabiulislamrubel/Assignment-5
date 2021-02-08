const foodMenu = document.getElementById('innerFood');
document.getElementById('search-btn').addEventListener('click', function(){
    let inputValue = document.getElementById('input-value').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`)
    .then(res => res.json())
    .then(data => mealItem(data.meals));
});

const mealItem = foodItem => {
      for(let i = 0; i < foodItem.length; i++){
        const newDiv = document.createElement('div');
        const mealSingleItem = `
        <div class="meal-item" onclick = "displayMealName('${foodItem[i].strMeal}')">
          <div class="img-box">
            <img src="${foodItem[i].strMealThumb}" />
          </div>
          <div class="meal-name">
            <h2>${foodItem[i].strMeal}</h2>
          </div>
        </div>
        `;
        newDiv.innerHTML = mealSingleItem;
        foodMenu.appendChild(newDiv);
        console.log(foodItem[i]);
}};

const displayMealName = name => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  fetch(url)
  .then(res => res.json())
  .then(data => mealInfo(data.meals[0]));
};

const mealInfo = details => {
  const foodSection = document.getElementById('food-section');
  foodSection.style.display = 'none';
  const mealInfoDiv = document.getElementById('meal-info');
  mealInfoDiv.innerHTML = `
  <div class="meal-info-item"">
    <div class="img-info-box">
      <img src="${details.strMealThumb}" />
    </div>
    <div class="single-meal-name">
      <h2>${details.strMeal}</h2>
    </div>
    <div class="ingredient">
      <h3>Ingredients</h3>
      <p>${details.strIngredient1}</p>
      <p>${details.strIngredient2}</p>
      <p>${details.strIngredient3}</p>
      <p>${details.strIngredient4}</p>
      <p>${details.strIngredient5}</p>
      <p>${details.strIngredient6}</p>
    </div>
  </div>
  `;
  mealInfoDiv.style.display = 'flex';
};
