fetch('http://localhost:4321/blog')
  .then(r => r.text())
  .then(t => {
    const chunk = t.split('id="ssr-debug"')[1] || '';
    const res = chunk.split('</div>')[0] || '';
    console.log("DEBUG DIV CONTENT:", res.trim());
  })
  .catch(console.error);
