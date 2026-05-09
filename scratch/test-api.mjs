async function test() {
  const res = await fetch("http://localhost:3000/api/paintings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imageSrc: "https://res.cloudinary.com/dufyqm2f2/image/upload/v1778322568/artist_portfolio/uavsz1cjea7nrojmpbht.png",
      title: "Test API Painting",
      slug: "test-api-painting",
      medium: "Oil",
      category: "Oil",
      year: 2024,
      dimensions: "10x10",
      description: "Testing API",
      isFeatured: true
    })
  });
  console.log("Status:", res.status);
  const json = await res.json();
  console.log("Response:", json);
}
test();
