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
    "Reduce pool admissions to $2, free children's swimming lessons.",
    "Convert old office buildings into apartments.",
    "Double security cameras, targeting hotspots.",
    "Bulk-buy renewable electricity (MPower), emissions reduction plan.",
    "Ban on hire e-scooters.",
    "Policy not yet released, possible conflict with running mate who has opposed bike lanes",
    "Install designer decorative lighting in 20 laneways."  
  ],
  "Arron Wood (Independent)": [
    "No commitment to real-time donation disclosure this time.",
    "Freeze rates for one year, review waste charge, freeze recreation centre fees until 2026.",
    "No policies announced yet.",
    "Expand designated graffiti sites, stricter penalties for graffiti.",
    "No policies announced yet.",
    "Require operators to install cameras and reduce speeds.",
    "No policies announced yet.",
    "Annual Christmas parade, European-inspired markets, Gingerbread Village return."
  ],
  "Roxane Ingleton (Greens)": [
    "Discloses campaign donations in real time.",
    "Focus on cheaper sustainable energy. Rate freezes not seen as beneficial to most residents.",
    "Mandate more public and affordable housing; 30% of new developments for affordable housing.",
    "Criticises effectiveness of CCTV, prefers other safety measures.",
    "Expand Power Melbourne, rehabilitate Moonee Ponds Creek, more green spaces.",
    "Review the decision to ban, explore better regulatory measures.",
    "Expand protected bike lanes network.",
    "No policies announced yet."
  ],
  "Jamal Hakim (Independent)": [
    "Discloses donations in real time; no donations from property developers, gambling, or weapons companies.",
    "No policies announced.",
    "Redevelop public housing towers with transparency.",
    "No policies announced.",
    "More greening of Melbourne’s laneways.",
    "Opposes the ban, focuses on behavioural change.",
    "Supports bike lanes but calls for design improvements.",
    "$10 million pledge for Diwali, Eid, and Hanukkah celebrations."
  ],
  "Anthony Koutoufides (Independent)": [
    "Self-funded campaign.",
    "Freeze rates for two years, advocate reducing land tax.",
    "More affordable housing and quicker planning permits.",
    "Increased police patrols.",
    "No policies announced yet.",
    "Allow hire e-scooters with appropriate measures.",
    "Review and possibly remove some bike lanes to improve traffic.",
    "No policies announced yet."
  ],
  "Phil Reed (Labor)": [
    "Capping donations at $4000 over four years; restoring fairness in voting system.",
    "Focus on maintaining essential council services like libraries, health, and sports facilities, ensuring they remain publicly managed to prevent price-gouging.",
    "Work with state government on diverse, affordable housing; audit council land use.",
    "Better lighting and safe zones in pedestrian corridors.",
    "Focus on connected green spaces, divert resources from major projects like the Greenline.",
    "No plans to reintroduce hire e-scooters after the ban.",
    "Work with safety agencies, traders, and residents to ensure objectives are met.",
    "Develop incentive programs to showcase and support local businesses."
  ],
  "Gary Morgan (Independent)": [
    "Self-funding his campaign, running for lord mayor for the seventh time.",
    "No specific policies announced yet.",
    "Advocates for demolishing high-rise public housing towers and replacing them with 'decent houses.'",
    "Criticises current city safety as inadequate, advocates for more protective safety officers instead of new parking officers.",
    "Supports the creation of more parks and the expansion of renewable and solar power across the city.",
    "Supports the ban on hire e-scooters, considering the previous trial a public policy failure.",
    "Believes Collins Street bike lanes are dangerous and need overhauling; supports better mobility planning like the bike lanes on Exhibition and William Streets.",
    "Advocates for more Australian artists performing in Melbourne, and fewer international artists such as Taylor Swift."
  ],
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

    return Object.entries(totalScores).sort(([, a], [, b]) => b - a);
  }, [scores, priorities]);

  return (
    <div className="container">
      <h1>🗳️ Help Me Vote: Melbourne Mayoral Candidates 2024 ✔️</h1>
      <div className="how-to-use">
        <h2>❓ How to Use</h2>
        <ul>
          <li>1. Set a Priority Score (0-10) for each policy area based on its importance to you.</li>
          <li>2. Rate each candidate's policy (0-10) based on how well it aligns with your views.</li>
          <li>3. Click on a policy area to view detailed candidate policies.</li>
          <li>4. The tool will calculate a total score for each candidate based on your inputs.</li>
        </ul>
      </div>

      <div className="expand-all-container">
        <h2>📝 Policies</h2>
        <button onClick={toggleAllPolicies} className="expand-collapse-btn">
          {allExpanded ? "Collapse All" : "Expand All"}
        </button>
      </div>

      <div className="table-container">
        <div className="policy-header">
          <div className="policy-name">Policy Area</div>
          <div className="priority-score">Priority Score</div>
          {Object.keys(candidates).map((candidate) => (
            <div key={candidate} className="candidate-name">{candidate}</div>
          ))}
        </div>
        {policyAreas.map((policyArea, policyIndex) => (
          <div key={policyArea} className="policy-row">
            <div className="policy-name" onClick={() => togglePolicy(policyIndex)}>
              {expandedPolicies[policyIndex] ? `- ${policyArea}` : `+ ${policyArea}`}
            </div>
            <div className="priority-score">
              <label className="mobile-only">Priority Score</label>
              <input
                type="number"
                value={priorities[policyIndex] !== undefined ? priorities[policyIndex] : ''}
                onChange={(e) => handlePriorityChange(policyIndex, e.target.value)}
                className={priorities[policyIndex] === undefined ? 'error' : ''}
              />
            </div>
            {Object.keys(candidates).map((candidate, candidateIndex) => (
              <div key={candidateIndex} className="candidate-score">
                <label className="mobile-only">{candidate}</label>
                <input
                  type="number"
                  value={scores[policyIndex][candidateIndex] !== undefined ? scores[policyIndex][candidateIndex] : ''}
                  onChange={(e) => handleScoreChange(policyIndex, candidateIndex, e.target.value)}
                  className={scores[policyIndex][candidateIndex] === undefined ? 'error' : ''}
                />
              </div>
            ))}
            {expandedPolicies[policyIndex] && (
              <div className="expanded-policy">
                <ul>
                  {Object.keys(candidates).map((candidate, index) => (
                    <li key={index}>
                      <strong>{candidate}:</strong> {policyDetails[candidate as keyof typeof candidates][policyIndex]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="results">
        <h2>🏆 Results</h2>
        <table className="results-table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {calculateTotalScores.map(([candidate, score], index) => (
              <tr key={index}>
                <td>{index + 1}. {candidate}</td>
                <td>{score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  

      <br />
      <div className="source">
        <h2>📰 Source</h2>
        <a href="https://www.theage.com.au/national/victoria/from-bike-lanes-to-business-help-what-the-lord-mayor-candidates-promise-for-melbourne-20240821-p5k41u.html" 
           target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          The Age: What the lord mayor candidates promise for Melbourne
        </a>
      </div>
      <br />
      <div className="made-by">
        <h2>👨🏽‍💻 Creator</h2>
        <p> Dan Masters </p>
        • <a href="https://ohmdee.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Blog</a>
        <p> • <a href="https://twitter.com/OhMDee" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Twitter</a> </p> 
        <p> • <a href="https://github.com/change-agent/help-me-vote" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub Project</a> </p>
      </div>
    </div>
  );
};

export default MelbourneMayoralCalculator;