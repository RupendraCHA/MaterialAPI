// Define the URL and credentials
const url = "http://52.38.202.58:8080/sap/opu/odata/VSHANEYA/ZMATERIAL_SRV/MaterialSet?$format=json";
const username = "NikhilA";
const password = "Nikhil@12345";

// Create a function to fetch data
async function fetchData() {
    // Encode the credentials in base64 for Basic Authentication
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

    try {
        // Make the request to the OData service
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });

        // Check if the response is okay
        if (response.ok) {
            const data = await response.json();
            console.log(data.d.results); // Handle the data, perhaps display it on the frontend
        } else {
            console.error('Failed to fetch data', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function to fetch data
fetchData();