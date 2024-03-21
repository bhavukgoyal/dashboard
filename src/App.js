import React, { useState } from 'react';
import './my.css'

const YourComponent = () => {
  const [sector, setSector] = useState('');
  const [topics, setTopics] = useState([]);
  const [date, setDate] = useState([]);
  const [ftopic,selectedftopic]=useState("");
  const [fdate,selectedfdate]=useState("");
  const [final,setFinal]=useState([])
  var se='';


  const handleChange = async (selectedSector) => {
    setSector(selectedSector);
se=selectedSector;
    try {
      const response = await fetch('https://dashboardbackend-zmtc.onrender.com/sector', {
        method: 'POST',
       
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sector: selectedSector })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the fetched data for debugging
        setTopics(data);
      } else {
        console.error('Failed to fetch topics');
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const handleChange2 = async (selectedtopic) => {
    selectedftopic(selectedtopic);

    try {
      const response2 = await fetch('https://dashboardbackend-zmtc.onrender.com/topic', {
        method: 'POST',
       
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sector: se, topic :selectedtopic })
      });

      if (response2.ok) {
        const data2 = await response2.json();
        console.log(data2); // Log the fetched data for debugging
        setDate(data2);
      } else {
        console.error('Failed to fetch dates');
      }
    } catch (error) {
      console.error('Error fetching dates:', error);
    }
  };

  const handleChange3 = async (selecteddate) => {
    selectedfdate(selecteddate);

    try {
      const response3 = await fetch('https://dashboardbackend-zmtc.onrender.com/final', {
        method: 'POST',
       
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sector: se, topic :ftopic,end_year:fdate })
      });

      if (response3.ok) {
        const data3 = await response3.json();
        console.log(data3); // Log the fetched data for debugging
        setFinal(data3);
      } else {
        console.error('Failed to fetch dates');
      }
    } catch (error) {
      console.error('Error fetching dates:', error);
    }
  };

  return (
    <div className="container">
      <select className="select-box" value={sector} onChange={(e) => handleChange(e.target.value)}>
  <option value="">Select a Sector</option>
  <option value="Aerospace & defence">Aerospace & Defence</option>
  <option value="Automotive">Automotive</option>
  <option value="Construction">Construction</option>
  <option value="Energy">Energy</option>
  <option value="Environment">Environment</option>
  <option value="Financial services">Financial Services</option>
  <option value="Food & agriculture">Food & Agriculture</option>
  <option value="Government">Government</option>
  <option value="Healthcare">Healthcare</option>
  <option value="Information Technology">Information Technology</option>
  <option value="Manufacturing">Manufacturing</option>
  <option value="Retail">Retail</option>
  <option value="Support services">Support Services</option>
  <option value="Tourism & hospitality">Tourism & Hospitality</option>
</select>
      
      <select className="select-box" value={ftopic} onChange={(e) => handleChange2(e.target.value)}>
        <option value="">Select a Topic</option>
        {topics.map((topic, index) => (
          <option key={index} value={topic}>{topic}</option>
        ))}
      </select>

      <select className="select-box" value={fdate} onChange={(e) => handleChange3(e.target.value)}>
        <option value="">Select a Date</option>
        {date.map((date, index) => (
          <option key={index} value={date}>{date}</option>
        ))}
      </select>

      <div className="final-results" style={{marginTop:'20'}}>
      {final.map((fi, index) => (
          <div className="result-item" key={index} value={fi}>{fi.title}</div>
        ))}

      </div>

    </div>
  );
};

export default YourComponent;