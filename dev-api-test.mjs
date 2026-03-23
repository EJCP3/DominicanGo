fetch('http://localhost:3000/api/blogs')
  .then(r => r.json())
  .then(j => console.log('Total blogs:', j.data.length, 'Data:', JSON.stringify(j.data)))
  .catch(console.error);
