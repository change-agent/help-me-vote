# Melbourne Mayoral Election Voting Guide

## About

This interactive web application helps Melbourne residents make informed decisions for the 2024 Melbourne Mayoral Election. Instead of telling users who to vote for, this tool empowers them to evaluate candidates based on their own priorities and values.

## Features

- Interactive policy evaluation system
- Real-time candidate ranking based on user input
- Detailed policy information for each candidate
- Fully responsive design
- Data persistence using local storage
- Google Analytics integration for usage tracking
- Hosted on GitHub Pages and deployed via gh-pages branch

## How It Works

1. **Prioritise Issues**: Users assign importance scores (0-10) to various policy areas.
2. **Explore Details**: Users can expand each policy area to learn about candidates' stances.
3. **Rate Policies**: Users score each candidate's policies (0-10) based on personal alignment.
4. **Get Results**: The tool automatically ranks candidates based on the user's inputs.

## Technical Achievements

- Built with React and TypeScript for a robust, type-safe application
- Utilises React hooks (useState, useEffect, useMemo, useCallback) for efficient state management and performance optimisation
- Implements local storage for data persistence, allowing users to return to their previous inputs
- Incorporates Google Analytics 4 for user engagement tracking
- Features a responsive design that adapts to various screen sizes
- Includes accessibility features such as ARIA labels and semantic HTML

## Data Sources

The candidate policy information is sourced from reputable news articles, including:

- The Age: [What the lord mayor candidates promise for Melbourne](https://www.theage.com.au/national/victoria/from-bike-lanes-to-business-help-what-the-lord-mayor-candidates-promise-for-melbourne-20240821-p5k41u.html)
- The Age: [Voting, donations reform will make for better council elections](https://www.theage.com.au/politics/victoria/voting-donations-reform-will-make-for-better-council-elections-20240829-p5k6ba.html)
- The Age: [The idea that selling off the Regent will help the arts is laughable](https://www.theage.com.au/culture/theatre/the-idea-that-selling-off-the-regent-will-help-the-arts-is-laughable-20240909-p5k8yp.html)

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm start`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Creator

This project was created by Dan Masters. You can follow him here:

- Blog: [https://ohmdee.com](https://ohmdee.com)
- Twitter: [@OhMDee](https://twitter.com/OhMDee)

## License

This project is open source and available under the [MIT License](LICENSE).
