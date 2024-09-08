import React, { useState, useMemo } from 'react';
import './styles.css';

const candidates = {
  "Nick Reece (Independent)": [],
  "Arron Wood (Independent)": [],
  "Roxane Ingleton (Greens)": [],
  "Jamal Hakim (Independent)": [],
  "Anthony Koutoufides (Independent)": [],
  "Phil Reed (Labor)": [],
  "Gary Morgan (Independent)": []
};

const policyDetails: Record<keyof typeof candidates, string[]> = {
  "Nick Reece (Independent)": [
    "Will reveal donors 40 days after election. No donations from tobacco, gambling, or local developers.",
    "Advocates for rent control and affordable housing.",
    "Supports increased police presence in high-crime areas.",
    "Proposes a new urban park to enhance green spaces.",
    "Opposes the use of e-scooters on footpaths.",
    "Advocates for expanding bike lanes across the city.",
    "Plans to create more community events to boost local culture."
  ],
  "Arron Wood (Independent)": [
    "No commitment to real-time donation disclosure this time.",
    "Proposes subsidies for first-time home buyers.",
    "Supports community-based crime prevention programs.",
    "Focuses on sustainability and renewable energy projects.",
    "Supports e-scooters but with stricter regulations.",
    "Opposes the removal of car lanes for bike lanes.",
    "Plans to introduce new city-wide cultural festivals."
  ],
  "Roxane Ingleton (Greens)": [
    "Discloses campaign donations in real-time.",
    "Strong advocate for social housing and renter rights.",
    "Opposes increased police funding, supports community solutions.",
    "Champions aggressive climate action and urban greening.",
    "Proposes to ban e-scooters from pedestrian areas.",
    "Proposes a comprehensive bike lane network.",
    "Plans to expand events promoting environmental awareness."
  ],
  "Jamal Hakim (Independent)": [
    "Discloses donations in real-time; no donations from property developers, gambling, or weapons companies.",
    "Supports public housing projects and tenant protections.",
    "Focuses on reducing crime through social programs.",
    "Advocates for green spaces and environmental sustainability.",
    "Proposes dedicated e-scooter lanes to reduce accidents.",
    "Supports bike lane expansion and pedestrian-friendly initiatives.",
    "Wants to increase funding for local arts and music events."
  ],
  "Anthony Koutoufides (Independent)": [
    "Self-funded campaign.",
    "Supports incentives for new home constructions.",
    "Supports tougher penalties for violent crimes.",
    "Proposes more green spaces and cleaner streets.",
    "Opposes e-scooter expansion, citing safety concerns.",
    "Supports bike lanes but wants more car parking options.",
    "Wants to create more sports-related events."
  ],
  "Phil Reed (Labor)": [
    "Capping donations at $4000 over four years, restoring fairness in voting system.",
    "Plans to build 10,000 affordable homes.",
    "Supports funding for police to ensure community safety.",
    "Focuses on renewable energy projects.",
    "Supports e-scooter usage with proper safety regulations.",
    "Proposes a balanced approach to bike lanes and car traffic.",
    "Plans to host international events to attract tourism."
  ],
  "Gary Morgan (Independent)": [
    "Self-funding his campaign, running for lord mayor for the seventh time.",
    "Supports market-driven housing solutions.",
    "Wants to introduce curfews in high-crime areas.",
    "Advocates for tree-planting initiatives in urban areas.",
    "Proposes limited e-scooter access in the CBD.",
    "Opposes bike lanes that reduce car lanes.",
    "Plans to increase business-oriented events."
  ]
};

const policyAreas = [
  "Integrity",
  "Cost of Living",
  "Housing",
  "Crime and Safety",
  "Environment",
  "E-scooters",
  "Bike Lanes",
  "Events"
];

type CandidateNames = keyof typeof candidates;

const MelbourneMayoralCalculator: React.FC = () => {
  const [priorities, setPriorities] = useState<(number | undefined)[]>(Array(policyAreas.length).fill(undefined));
  const [scores, setScores] = useState<(number | undefined)[][]>(Array(policyAreas.length).fill(undefined).map(() => Array(Object.keys(candidates).length).fill(undefined)));
  const [expandedPolicies, setExpandedPolicies] = useState<boolean[]>(Array(policyAreas.length).fill(false));
  const [allExpanded, setAllExpanded] = useState<boolean>(false);

  const handlePriorityChange = (index: number, newValue: string) => {
    const parsedValue = parseInt(newValue);
    const newPriorities = [...priorities];
    newPriorities[index] = isNaN(parsedValue) ? undefined : parsedValue;
    setPriorities(newPriorities);
  };

  const handleScoreChange = (policyIndex: number, candidateIndex: number, newScore: string) => {
    const parsedScore = parseInt(newScore);
    const newScores = [...scores];
    newScores[policyIndex][candidateIndex] = isNaN(parsedScore) ? undefined : parsedScore;
    setScores(newScores);
  };

    const togglePolicy = (index: number) => {
    const newExpandedPolicies = [...expandedPolicies];
    newExpandedPolicies[index] = !newExpandedPolicies[index];
    setExpandedPolicies(newExpandedPolicies);
  };

  const toggleAllPolicies = () => {
    const newExpandedPolicies = Array(policyAreas.length).fill(!allExpanded);
    setExpandedPolicies(newExpandedPolicies);
    setAllExpanded(!allExpanded);
  };

  const calculateTotalScores = useMemo(() => {
    const totalScores: Record<CandidateNames, number> = {
      "Nick Reece (Independent)": 0,
      "Arron Wood (Independent)": 0,
      "Roxane Ingleton (Greens)": 0,
      "Jamal Hakim (Independent)": 0,
      "Anthony Koutoufides (Independent)": 0,
      "Phil Reed (Labor)": 0,
      "Gary Morgan (Independent)": 0
    };

    scores.forEach((policyScores, policyIndex) => {
      policyScores.forEach((score, candidateIndex) => {
        if (score !== undefined && priorities[policyIndex] !== undefined) {
          const candidateName = Object.keys(candidates)[candidateIndex] as CandidateNames;
          totalScores[candidateName] += score * priorities[policyIndex];
        }
      });
    });

    return totalScores;
  }, [scores, priorities]);

  return (
    <div className="container">
      <h1>Help Me Vote: Melbourne Mayoral Candidates 2024</h1>
      <h2>How to Use This Tool</h2>
      <ul>
        <li>1. Set a Priority Score (0-10) for each policy area based on its importance to you.</li>
        <li>2. Rate each candidate's policy (0-10) based on how well it aligns with your views.</li>
        <li>3. Click on a policy area to view detailed candidate policies.</li>
        <li>4. The tool will calculate a total score for each candidate based on your inputs.</li>
      </ul>
      <button onClick={toggleAllPolicies}>{allExpanded ? "Collapse All" : "Expand All"}</button>
      <table>
        <thead>
          <tr>
            <th>Policy Area</th>
            <th>Priority Score</th>
            {Object.keys(candidates).map((candidate, index) => (
              <th key={index}>{candidate}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {policyAreas.map((policyArea, policyIndex) => (
            <React.Fragment key={policyArea}>
              <tr>
                <td onClick={() => togglePolicy(policyIndex)} style={{ cursor: 'pointer' }}>
                  {expandedPolicies[policyIndex] ? `- ${policyArea}` : `+ ${policyArea}`}
                </td>
                <td>
                  <input
                    type="number"
                    value={priorities[policyIndex] !== undefined ? priorities[policyIndex] : ''}
                    onChange={(e) => handlePriorityChange(policyIndex, e.target.value)}
                    className={priorities[policyIndex] === undefined ? 'error' : ''}
                  />
                </td>
                {Object.keys(candidates).map((candidate, candidateIndex) => (
                  <td key={candidateIndex}>
                    <input
                      type="number"
                      value={scores[policyIndex][candidateIndex] !== undefined ? scores[policyIndex][candidateIndex] : ''}
                      onChange={(e) => handleScoreChange(policyIndex, candidateIndex, e.target.value)}
                      className={scores[policyIndex][candidateIndex] === undefined ? 'error' : ''}
                    />
                  </td>
                ))}
              </tr>
              {expandedPolicies[policyIndex] && (
                <tr>
                  <td colSpan={Object.keys(candidates).length + 2}>
                    <div className="expanded-policy">
                      <ul>
                        {Object.keys

(candidates).map((candidate, index) => (
                          <li key={index}>
                            <strong>{candidate}:</strong> {policyDetails[candidate as CandidateNames][policyIndex]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="results">
              <h2>Results</h2>
        <ul>
          {Object.entries(calculateTotalScores).map(([candidate, score], index) => (
            <li key={index}>
              {index + 1}. {candidate} - Score: {score}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MelbourneMayoralCalculator;