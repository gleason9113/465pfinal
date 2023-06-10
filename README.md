# Air Quality Dashboard

This project represents an air quality monitoring system that tracks various pollutants in different countries. The main interface provides a list of pollutants, detailed information about a selected pollutant, a list of top countries, and a world map.

## Main Components
### Main View

MainView.js is the main file that brings all the components together. It fetches and displays data about various pollutants from different countries. You can also search for a specific city's pollutant data in the search bar.

### Detailed View

DetailedView.js is the second file that brings all the components together for detailed pollutant data. It fetches and displays data about various pollutants from a searched location using the getLocationData function.The data, once fetched, is displayed in a NewDetailedChart.js. A Pollutant List and Pollutant Details are displayed alongside a detailed chart of pollutant levels in the selected location.

### Historical View

HistoricalView.js is similar to DetailedView.js, but instead focuses on displaying historical data of pollutant levels from a selected location. It uses a HistoricalForm for users to input the desired data range. The data, once fetched, is displayed in a NewHistoricalChart.js.

## Key Components

### Pollutant List

PollutantList.js displays a list of pollutants. Clicking on a pollutant updates the selectedPollutant state in all views.

### Pollutant Details

PollutantDetails.js displays detailed information about the selected pollutant.

### Top Countries

TopCountries.js displays the countries with the best pollutant values.

### World Map

WorldMap.js displays a world map indicating the amount of pollutants in each country.

### Detailed Chart and Historical Chart

NewDetailedChart.js and NewHistoricalChart.js both components visualize the fetched pollutant data in a chart format.

### Historical Form

HistoricalForm.js creates a form used in the historical view to input the desired data range.

## CSS

### MainView.css

This file contains the styles for all views, including the navbar, search box, map container, and pollutant list.

### PollutantList.css

This file contains the styles for the list of pollutants.

### PollutantDetails.css

This file contains the styles for the detailed information about the selected pollutant.

### TopCountries.css

This file contains the styles for the countries with the best pollutant values.u

### HistoricalForm.css

This file contains the styles for the form used in the historical view to input the desired data range.

## API

The application uses the [OpenAQ API](https://docs.openaq.org/) to fetch air quality data across the globe, assisted by the positionstack API (https://positionstack.com/documentation) for forward geocoding.
An API key is required for the geocoding API. This should be placed in /src/config.js and exported as AN_API_KEY.

### OpenAQ API endpoints:

1. /latest - provides measurement data using latitude and longitude.
   Parameters: latitude, longitude, range (required), pollutant (optional)
2. /countries - provides information about countries represented in the dataset.
   Parameters: country name (optional)

### PositionStack API endpoint:

- /forward - provides forward geocoding data
   Parameters: location name (required)

### Note: The positionstack API calls take place over http due to API account limits.

The application interacts with the OpenAQ API via multiple functions, each one serving a distinct purpose:

- getCountries(): Fetches the latest available air quality data for all countries.
- getCityData(city): Fetches the air quality data for a specified city.
- getCountryData(country): Fetches the air quality data for a specified country.
- getCurrentData(): Fetches the current air quality data.
- getAllCities(): Fetches data for all the cities in the database.
- getAllPollutants(): Fetches all pollutants data.
- getCountryCode(country): Fetches the air quality data for a specific parameter and geographical location between two dates.

## React Hooks

The application uses the useState and useEffect hooks for state management and side-effects respectively.

## Dependencies

This project utilizes the following outside libraries:

- React Router: Used for setting up navigation between different components in the application.
- React Router Dom: It is used to handle routing and navigation in the application.
- Axios: Used for handling HTTP requests to the API.
- React Google Charts: Used for rendering the map and charts based on pollutant data.

### Tutorials and Resources

- [React documentation](https://legacy.reactjs.org/docs/getting-started.html): For understanding the fundamentals of React and its hook system.
- [React Router Documentation](https://reactrouter.com/en/main): For implementing routing in the application.
- [Using Axios with React](https://www.digitalocean.com/community/tutorials/react-axios-react): For fetching data from APIs.
- [React Google Charts Documentation](https://www.react-google-charts.com/): For rendering the map and charts.

## Installation

1. Clone this repository.
2. Run npm install to install all the dependencies.
3. Run npm start to start the application.

## Other Related Tutorials and Resources
- [React Google Charts Calendar, Gantt, Geo, Wordtree](https://www.youtube.com/watch?v=oX7Wqavzoc0&t=680s)
