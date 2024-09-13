import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { initGA, logPageView } from './analytics';
import { ReactComponent as VoteSmartLogo } from './assets/VoteSmartLogo.svg';
import './styles.css';

const candidates = {
  "Nick Reece (Independent)": [],
  "Arron Wood (Independent)": [],
  "Roxane Ingleton (Greens)": [],
  "Jamal Hakim (Independent)": [],
  "Anthony Koutoufides (Independent)": [],
  "Phil Reed (Labor)": [],
  "Gary Morgan (Independent)": [],
  "Mariam Riza (Liberal)": [],
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
    "Sell Regent Theatre to fund 'City Solstice Winter Festival'; install designer decorative lighting in 20 laneways."
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
    "Freeze rates for two years, advocate reducing land tax. Advocate to force CBD-based employees back into the office for four days/week. Free coffee for CBD workers on Mondays for a month. One-off grants of ≤$5000 to ≤1000 businesses that sign a new CBD lease next year.",
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
  "Mariam Riza (Liberal)": [
    "No policies announced yet.",
    "No policies announced yet.",
    "No policies announced yet.",
    "No policies announced yet.",
    "No policies announced yet.",
    "No policies announced yet.",
    "Scrap bike lines as they cause traffic bottlenecks. Would consult on whether to replace with parking or traffic lanes.",
    "No policies announced yet.",
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

const candidateNames = Object.keys(candidates);

const MelbourneMayoralCalculator: React.FC = () => {
  const [priorities, setPriorities] = useState<(number | null)[]>(() => {
    const savedPriorities = localStorage.getItem('priorities');
    return savedPriorities ? JSON.parse(savedPriorities) : Array(policyAreas.length).fill(null);
  });

  const [scores, setScores] = useState<(number | null)[][]>(() => {
    const savedScores = localStorage.getItem('scores');
    return savedScores ? JSON.parse(savedScores) : Array(policyAreas.length).fill(null).map(() => Array(candidateNames.length).fill(null));
  });

  const [expandedPolicies, setExpandedPolicies] = useState<boolean[]>(Array(policyAreas.length).fill(false));
  const [allExpanded, setAllExpanded] = useState<boolean>(false);

  useEffect(() => {
    initGA(logPageView);
  }, []); // This effect runs once on mount

  useEffect(() => {
    initGA(logPageView);
  }, []);

  const saveData = useCallback(() => {
    localStorage.setItem('priorities', JSON.stringify(priorities));
    localStorage.setItem('scores', JSON.stringify(scores));
  }, [priorities, scores]);

  useEffect(() => {
    const intervalId = setInterval(saveData, 5000);
    return () => clearInterval(intervalId);
  }, [saveData]);

  // Save data immediately when priorities or scores change
  useEffect(() => {
    saveData();
  }, [priorities, scores, saveData]);

  const handlePriorityChange = useCallback((index: number, newValue: string) => {
    const parsedValue = parseInt(newValue);
    setPriorities(prev => {
      const newPriorities = [...prev];
      newPriorities[index] = isNaN(parsedValue) ? null : parsedValue;
      return newPriorities;
    });
  }, []);

  const handleScoreChange = useCallback((policyIndex: number, candidateIndex: number, newScore: string) => {
    const parsedScore = parseInt(newScore);
    setScores(prev => {
      const newScores = prev.map(row => [...row]);
      newScores[policyIndex][candidateIndex] = isNaN(parsedScore) ? null : parsedScore;
      return newScores;
    });
  }, []);

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

  const resetData = useCallback(() => {
    const newPriorities = Array(policyAreas.length).fill(null);
    const newScores = Array(policyAreas.length).fill(null).map(() => Array(candidateNames.length).fill(null));
    
    localStorage.removeItem('priorities');
    localStorage.removeItem('scores');
    
    setPriorities(newPriorities);
    setScores(newScores);
    setExpandedPolicies(Array(policyAreas.length).fill(false));
    setAllExpanded(false);
    
    // Force re-render
    setTimeout(() => {
      setPriorities([...newPriorities]);
      setScores([...newScores]);
    }, 0);
  }, []);

  const calculateTotalScores = useMemo(() => {
    const totalScores: Record<string, number> = Object.fromEntries(
      candidateNames.map(candidate => [candidate, 0])
    );

    scores.forEach((policyScores, policyIndex) => {
      policyScores.forEach((score, candidateIndex) => {
        if (score !== null && priorities[policyIndex] !== null) {
          totalScores[candidateNames[candidateIndex]] += score * priorities[policyIndex]!;
        }
      });
    });

    return Object.entries(totalScores).sort(([, a], [, b]) => b - a);
  }, [scores, priorities]);

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  document.addEventListener("DOMContentLoaded", function() {
    function updateSvgAspectRatio() {
        const svgElement = document.querySelector('.header-svg');

        // Null check to prevent TypeScript error
        if (svgElement !== null) {
            if (window.innerWidth <= 768) {
                svgElement.setAttribute("preserveAspectRatio", "xMidYMid slice");
            } else {
                svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
            }
        }
    }

    // Initial check
    updateSvgAspectRatio();

    // Update on resize
    window.addEventListener("resize", updateSvgAspectRatio);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="container">
      <header className="site-header">
        <VoteSmartLogo className="header-svg" />
      </header>
      <h1>
        <span role="img" aria-label="Ballot box">🗳️</span> 2024 Melbourne Mayoral Election Voting Guide
      </h1>
      <div className="how-to-use">
        <h2><span role="img" aria-label="Question mark">❓</span> How to Use</h2>
        <ol>
            <li><strong>Prioritise Issues</strong>: Assign importance scores (0-10) to policy areas.
                <ul>
                    <li>0 = Unimportant</li>
                    <li>10 = Most important</li>
                </ul>
            </li>
            <li><strong>Explore Details</strong>: Learn each candidate's stances in-depth.</li>
            <li><strong>Rate Policies</strong>: Score candidates' specific policies (0-10) on how they align with your views.
                <ul>
                    <li>0 = Least aligned</li>
                    <li>10 = Most aligned</li>
                </ul>
            </li>
            <li><strong>Get Your Best Match</strong>: The tool ranks candidates based on your choices.</li>
        </ol>
      </div>

      <div className="expand-all-container">
        <h2><span role="img" aria-label="Memo">📝</span> Policies</h2>
        <button onClick={toggleAllPolicies} className="expand-collapse-btn">
          {allExpanded ? "Collapse All Info" : "Expand All Info"}
        </button>
      </div>

      <div className="table-container">
        <div className="policy-header">
          <div>POLICY AREA</div>
          <div>Priority Score</div>
          {candidateNames.map((candidate) => (
            <div key={candidate}>{candidate}</div>
          ))}
        </div>
        {policyAreas.map((policyArea, policyIndex) => (
          <div key={policyArea} className="policy-row">
            <div className="policy-name" onClick={() => togglePolicy(policyIndex)}>
              {expandedPolicies[policyIndex] ? `▲ ${policyArea}` : `▼ ${policyArea}`}
            </div>
            <div className="priority-score">
              <label htmlFor={`priority-${policyIndex}`} className="mobile-only">Priority Score</label>
              <input
                id={`priority-${policyIndex}`}
                name={`priority-${policyIndex}`}
                type="number"
                value={priorities[policyIndex] !== null ? priorities[policyIndex] : ''}
                onChange={(e) => handlePriorityChange(policyIndex, e.target.value)}
                className={priorities[policyIndex] === null ? 'error' : ''}
              />
            </div>
            {Object.keys(candidates).map((candidate, candidateIndex) => (
              <div key={candidateIndex} className="candidate-score">
                <label htmlFor={`score-${policyIndex}-${candidateIndex}`}  className="mobile-only">{candidate}</label>
                <input
                  id={`score-${policyIndex}-${candidateIndex}`}
                  name={`score-${policyIndex}-${candidateIndex}`}
                  type="number"
                  value={scores[policyIndex][candidateIndex] !== null ? scores[policyIndex][candidateIndex] : ''}
                  onChange={(e) => handleScoreChange(policyIndex, candidateIndex, e.target.value)}
                  className={scores[policyIndex][candidateIndex] === null ? 'error' : ''}
                />
              </div>
            ))}
            {expandedPolicies[policyIndex] && (
              <div className="expanded-policy">
                <ul>
                  {Object.keys(candidates).map((candidate, index) => (
                    <li key={index}>
                      <strong>{candidate}:</strong> {policyDetails[candidate as keyof typeof policyDetails][policyIndex]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        ))}
      </div>

      {showScrollButton && (
          <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>
      )}

      <div className="clear-all-container">
          <button onClick={resetData} className="clear-all-btn">Reset Scores</button>
      </div>

      <div className="results">
        <h2><span role="img" aria-label="Trophy">🏆</span> Results</h2>
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
      <div className="dates">
        <h2><span role="img" aria-label="Calendar">🗓️</span> Dates</h2>
        <ul> 
          <li> <strong> Tuesday 17 September </strong>: Nominations to be a Council election candidate close at 12 noon. </li>
          <li> <strong> Monday 7 October - Thursday 10 October </strong>: Victorian Electoral Commission will post your ballot for you to vote. </li>
          <li> <strong> Friday 25 October </strong>: Last day to return your completed ballot papers in the pre-paid envelope before 6pm. </li>
          <li> <strong> Saturday 26 October </strong>: Elections day. There will be no voting on elections day, as it is a postal vote only. Counting the votes will begin on this day. </li>
        </ul>
      </div>

      <div className="source">
        <h2><span role="img" aria-label="Newspaper">📰</span> Sources</h2>
        <ul>
          <li> <a href="https://www.theage.com.au/national/victoria/from-bike-lanes-to-business-help-what-the-lord-mayor-candidates-promise-for-melbourne-20240821-p5k41u.html"
           target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline"> The Age: What the lord mayor candidates promise for Melbourne </a> </li> 
          <li> <a href="https://www.theage.com.au/politics/victoria/voting-donations-reform-will-make-for-better-council-elections-20240829-p5k6ba.html" 
           target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline"> The Age: Voting, donations reform will make for better council elections </a> </li>
           <li> <a href="https://www.theage.com.au/culture/theatre/the-idea-that-selling-off-the-regent-will-help-the-arts-is-laughable-20240909-p5k8yp.html" 
           target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline"> The Age: The idea that selling off the Regent will help the arts is laughable </a> </li>
            <li> <a href="https://elections.melbourne.vic.gov.au/about-the-elections/key-dates-for-enrolment-and-voting/" 
           target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline"> City of Melbourne: Key dates for the Melbourne City Council 2024 elections </a> </li>
        </ul>
      </div>
      <div className="about">
        <h2><span role="img" aria-label="Information">ℹ️</span> About </h2>
        <p> A few fellow residents asked me for voting advice, but I realised it's possible we have different ideas on various issues. Instead of just telling them who to vote for, I created this tool to help them make their own decisions.</p>
      </div>
      <div className="made-by">
        <h2><span role="img" aria-label="Man technologist">👨🏽‍💻</span> Creator</h2>
        <p> Follow Dan Masters here: </p>
      <ul>
        <li> <a href="https://ohmdee.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline"> Blog </a> </li>
        <li> <a href="https://twitter.com/OhMDee" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline"> Twitter </a> </li>
        <li> <a href="https://github.com/change-agent/help-me-vote" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline"> GitHub Project </a> </li>
    </ul>
      </div>
    </div>
  );
};

export default MelbourneMayoralCalculator;