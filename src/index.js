import SlimSelect from 'slim-select';

const select = document.getElementById('slim');
console.log(select); 

new SlimSelect({
  select: 'slim-select',
  //data: [{ text: 'Value 1', value: 'value1' }],
  //onChange: onBreedSelected,
});
