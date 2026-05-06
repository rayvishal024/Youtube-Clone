# YouTube Videos Listing
This project is a React application that lists YouTube videos with pagination. It fetches video data from an API and displays it in a card format. Users can navigate through pages of videos using "Previous" and "Next" buttons.

## Features
- Fetches video data from an API endpoint.
- Displays video thumbnails, titles, channel names, and durations.
- Implements pagination with "Previous" and "Next" buttons.
- Smooth scroll to top when navigating between pages.

## Components
- `App.jsx`: The main component that manages state, fetches data, and renders the video listing and pagination controls.
- `VideoCard.jsx`: A component that displays individual video details in a card format.

## Usage
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development server using `npm start`.
4. The application will be available at `http://localhost:3000`. 
5. Use the pagination buttons to navigate through the video listings.

## API Endpoint
The application fetches video data from the following API endpoint:

```
http://localhost:8080/api/videos?page={page}

```
Replace `{page}` with the desired page number to retrieve the corresponding set of videos.     

## Note
- Ensure that the backend API is running and accessible at the specified endpoint for the application to function correctly.
- The application assumes that the API returns data in a specific format, including video details and pagination information. Adjust the API response handling in `App.jsx` if your API structure differs.   

# License
This project is licensed under the MIT License. See the LICENSE file for details.