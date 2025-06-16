import { JSX } from "react";
import { ConferenceData } from "../model/ConferenceData";

function ConferenceList({ conferences }: { conferences: ConferenceData[] }) {

  let previousYear = 0;

  // sort year table in decreasing order
  conferences.forEach(conference => {
    if (conference.year.length > 1) {
      conference.year.sort().reverse()
    }
  }
  )
  // sort confenreces in decreasing order
  conferences.sort((a, b) => a.year > b.year ? -1 : 1)
  let toShow: JSX.Element[] = [];

  conferences.forEach(conference => {
    if (conference.year[0] != previousYear) {
      previousYear = conference.year[0]
      toShow.push(<h3>{conference.year[0]}<br /></h3>)
    }
    toShow.push(<li>

      <a href={conference.conferenceUrl}>{conference.acronym}</a> : {conference.name}<br />
    </li>)

  })

  return <div>
    <ul>{toShow}</ul>;
  </div>


}

export default ConferenceList;