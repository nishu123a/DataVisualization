import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { Dropdown } from 'react-bootstrap';

import axios from 'axios';

const API = process.env.REACT_APP_BACKEND;

const Filters = ({ setMainData }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topics, setTopics] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedRelevance, setSelectedRelevance] = useState(null);
  const [relevances, setRelevances] = useState([]);
  const [selectedIntensity, setSelectedIntensity] = useState(null);
  const [intensities, setIntensities] = useState([]);
  const [selectedLikelihood, setSelectedLikelihood] = useState(null);
  const [likelihoods, setLikelihoods] = useState([]);


  useEffect(() => {
    // Fetch the list of topics when the component mounts
    fetchCountries();
    fetchTopics();
    fetchRelevances();
    fetchIntensities();
    fetchLikelihoods();
  }, []);

  const fetchLikelihoods = async () => {
    try {
      const response = await axios.get(`${API}/data/likelihoods`);
      console.log('API Response for Likelihoods:', response.data);
  
      const fetchedLikelihoods = response.data.data.filter(likelihood => likelihood !== '');
  
      setLikelihoods(fetchedLikelihoods);
    } catch (e) {
      console.log(e);
    }
  };
  

  const fetchIntensities = async () => {
    try {
      const response = await axios.get(`${API}/data/intensity`);
      console.log('API Response for Intensities:', response.data);
  
      const fetchedIntensities = response.data.data.filter(intensity => intensity !== '');
  
      setIntensities(fetchedIntensities);
    } catch (e) {
      console.log(e);
    }
  };
  
  const fetchRelevances = async () => {
    try {
      const response = await axios.get(`${API}/data/relevances`);
      console.log('API Response for Relevances:', response.data);

      const fetchedRelevances = response.data.data.filter(relevance => relevance !== '');

      setRelevances(fetchedRelevances);
    } catch (e) {
      console.log(e);
    }
  };


  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${API}/data/countries`);
      console.log('API Response for Countries:', response.data);

      const fetchedCountries = response.data.data.filter(country => country !== '');

      setCountries(fetchedCountries);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTopics = async () => {
    try {
      const response = await axios.get(`${API}/data/topics`);
      console.log('API Response for Topics:', response.data);

      // Filter out empty string from the topics array
      const fetchedTopics = response.data.data.filter(topic => topic !== '');

      setTopics(fetchedTopics);
    } catch (e) {
      console.log(e);
    }
  };

  
  const handleCountrySelect = (selectedOption) => {
    if (selectedOption) {
      const selectedCountryValue = selectedOption.value;
      setSelectedCountry(selectedCountryValue);
      getDataFromDB(selectedYear, selectedTopic, selectedCountryValue, selectedRelevance, selectedIntensity);
    }
  };

  const handleYearSelect = (eventKey, event) => {
    const year = event.target.innerText;
    setSelectedYear(year);
    getDataFromDB(year, selectedTopic, selectedCountry, selectedRelevance, selectedIntensity);
  };

  const handleTopicSelect = (selectedOption) => {
    const topic = selectedOption.value;
    setSelectedTopic(topic);
    getDataFromDB(selectedYear, topic, selectedCountry, selectedRelevance, selectedIntensity);
  };

  const handleRelevanceSelect = (selectedOption) => {
    const relevance = selectedOption ? selectedOption.value : null;
    setSelectedRelevance(relevance);
    getDataFromDB(selectedYear, selectedTopic, selectedCountry, relevance, selectedIntensity);
  };

  const handleIntensitySelect = (selectedOption) => {
    const intensity = selectedOption ? selectedOption.value : null;
    setSelectedIntensity(intensity);
    getDataFromDB(selectedYear, selectedTopic, selectedCountry, selectedRelevance, intensity);
  };

  const getDataFromDB = async (year, topic, country, relevance, intensity) => {
    try {
      let apiUrl = `${API}/data/all`;

      if (year) {
        apiUrl = `${API}/data/year/${year}`;
      }

      if (topic) {
        apiUrl += `?topic=${encodeURIComponent(topic)}`;
      }

      if (country) {
        apiUrl += `&country=${encodeURIComponent(country)}`;
      }

      if (relevance) {
        apiUrl += `&relevance=${encodeURIComponent(relevance)}`;
      }

      if (intensity) {
        apiUrl += `&intensity=${encodeURIComponent(intensity)}`;
      }

      const response = await axios.get(apiUrl);
      setMainData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLikelihoodSelect = (selectedOption) => {
    const likelihood = selectedOption ? selectedOption.value : null;
    setSelectedLikelihood(likelihood);
    getDataFromDB(selectedYear, selectedTopic, selectedCountry, selectedRelevance, selectedIntensity, likelihood);
  };
  

  const handleReset = async () => {
    try {
      const response = await axios.get(`${API}/data/all`);
      setMainData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };



  return (
    <div className='tabsClass' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
      <Dropdown onSelect={handleYearSelect}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Filter By Year
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="1">2014</Dropdown.Item>
          <Dropdown.Item eventKey="2" >2015</Dropdown.Item>
          <Dropdown.Item eventKey="3" >2016</Dropdown.Item>
          <Dropdown.Item eventKey="4" >2017</Dropdown.Item>
          <Dropdown.Item eventKey="5" >2018</Dropdown.Item>
          <Dropdown.Item eventKey="6" >2019</Dropdown.Item>
          <Dropdown.Item eventKey="7" >2020</Dropdown.Item>
          <Dropdown.Item eventKey="7" >2027</Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>

      <Select
        options={topics.map(topic => ({ label: topic, value: topic }))}
        onChange={handleTopicSelect}
        placeholder="Filter By Topic"
      />

      <Select
        options={countries.map(country => ({ label: country, value: country }))}
        onChange={handleCountrySelect}
        value={{ label: selectedCountry, value: selectedCountry }}
        placeholder="Filter By Country"
      />

      <Select
        options={relevances.map(relevance => ({ label: relevance, value: relevance }))}
        onChange={handleRelevanceSelect}
        placeholder="Filter By Relevance"
      />

<Select
  options={likelihoods.map(likelihood => ({ label: likelihood, value: likelihood }))}
  onChange={handleLikelihoodSelect}
  value={{ label: selectedLikelihood, value: selectedLikelihood }}
  placeholder="Filter By Likelihood"
/>


<Select
        options={intensities.map(intensity => ({ label: intensity, value: intensity }))}
        onChange={handleIntensitySelect}
        placeholder="Filter By Intensity"
      />
   





    </div>
  );
};

export default Filters;
