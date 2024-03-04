function fetchData(url) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `Network response was not ok: ${response.status}`,
                );
            }
            return response.json();
        })
        .then((data) => {
            window.data = data;
            console.log('Data successfully fetched and saved:', data);
            startPage();
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}
const realUrl = 'https://cd-static.bamgrid.com/dp-117731241344/home.json';
const apiUrl = realUrl;
fetchData(apiUrl);
