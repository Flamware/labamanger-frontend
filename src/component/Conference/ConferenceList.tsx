import React, { JSX } from 'react';
import { ConferenceData } from "../model/ConferenceData";

/**
 * A component that displays a list of conferences, grouped by year.
 * @param {object} props - The component props.
 * @param {ConferenceData[]} props.conferences - An array of conference data objects.
 * @returns {JSX.Element} The rendered list of conferences.
 */
function ConferenceList({ conferences }: { conferences: ConferenceData[] }) {

  // A variable to track the last year rendered to avoid repeating headers.
  let previousYear = 0;

  // Pre-process the data:
  // 1. Sort the years within each conference entry to ensure the latest year is first.
  conferences.forEach(conference => {
    if (conference.year.length > 1) {
      conference.year.sort().reverse();
    }
  });

  // 2. Sort all conferences by their primary year in descending order.
  conferences.sort((a, b) => (a.year[0] > b.year[0] ? -1 : 1));

  const toShow: JSX.Element[] = [];

  // Build the array of JSX elements to render.
  conferences.forEach((conference, index) => {
    // If the year is different from the previous one, add a year heading.
    if (conference.year[0] !== previousYear) {
      previousYear = conference.year[0];
      toShow.push(
          <h2 key={`year-${previousYear}`} className="text-3xl font-bold mt-8 mb-4 border-b border-gray-700 pb-2">
            {conference.year[0]}
          </h2>
      );
    }

    // Add the list item for the conference.
    toShow.push(
        <li key={`${conference.acronym}-${index}`} className="mb-3 leading-relaxed">
          <a
              href={conference.conferenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline font-semibold"
          >
            {conference.acronym}
          </a>
          <span className="text-gray-300">: {conference.name}</span>
        </li>
    );
  });

  return (
      <div>
        <ul className="list-disc list-inside">
          {toShow}
        </ul>
      </div>
  );
}

export default ConferenceList;
