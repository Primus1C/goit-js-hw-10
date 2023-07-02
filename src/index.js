import SlimSelect from 'slim-select';

const select = document.getElementById('slim');
console.log(1, select); 

new SlimSelect({
  select: 'slim',
  //data: [{ text: 'Value 1', value: 'value1' }],
  //onChange: onBreedSelected,
});
