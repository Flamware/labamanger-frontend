import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { ProfileData } from '../component/model/PersonData';
import ORCIDProfile from '../component/Person/ORCIDProfile';
import Project from '../component/Person/Projet';
import { useParams } from 'react-router-dom';
import SupervisionsContent from '../component/Person/Supervision';
import JuryContent from '../component/Person/Jury';
import Invitation from '../component/Person/Invitation';
import Teaching from '../component/Person/Teaching';
import Publication from '../component/Person/Publication';

const Person: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [activeTab, setActiveTab] = useState('bio');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:8080/LabManager/api/v4/persons/card?id=' + id);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!profileData) {
    return <div className="text-gray-800">Loading...</div>;
  }

return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-6xl m-6">
      <div className="p-8">
        <div className="text-gray-800">
          <h1 className="text-2xl font-bold">{profileData.firstName} {profileData.lastName}</h1>
          <div className="flex gap-4 my-4">
            <p className="flex items-center gap-2">
              <FaEnvelope /> {profileData.email || 'No email available'}
            </p>
            <p className="flex items-center gap-2">
              <FaPhone /> +{profileData.officePhone?.prefix} ({profileData.officePhone?.country}) {profileData.officePhone?.localNumber}
            </p>
          </div>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt /> Université de Technologie de Belfort Montbéliard, 13 rue Ernest Thierry-Mieg 90010 Belfort
          </p>
          <p>Room: {profileData.room || 'No room available'}</p>
          <div className="flex gap-4 my-4">
            <p className="mt-2">Ranking: H-Index (WoS): {profileData.ranking?.wosHindex || 'N/A'}</p>
            <p className="mt-2">H-Index (Scopus): {profileData.ranking?.scopusHindex || 'N/A'}</p>
            <p className="mt-2">H-Index (Google Scholar): {profileData.ranking?.googleScholarHindex || 'N/A'}</p>
          </div>
          <p>Lien :</p>
          <div className="flex gap-4 my-4">
            <a href={profileData.links?.orcidURL || '#'} className="text-blue-500 hover:underline">ORCID</a>
            <a href={profileData.links?.gravatarURL || '#'} className="text-blue-500 hover:underline">Gravatar</a>
            <a href={profileData.links?.halURL || '#'} className="text-blue-500 hover:underline">HAL</a>
            <a href={profileData.links?.facebookURL || '#'} className="text-blue-500 hover:underline">Facebook</a>
            <a href={profileData.links?.googleScholarURL || '#'} className="text-blue-500 hover:underline">Google Scholar</a>
            <a href={profileData.links?.academiaURL || '#'} className="text-blue-500 hover:underline">Academia.edu</a>
            <a href={profileData.links?.researcherIdURL || '#'} className="text-blue-500 hover:underline">ResearcherID</a>
          </div>
          <div className="flex gap-4 my-4">
            <a href={profileData.links?.cordisURL || '#'} className="text-blue-500 hover:underline">CORDIS</a>
            <a href={profileData.links?.researchGateURL || '#'} className="text-blue-500 hover:underline">ResearchGate</a>
            <a href={profileData.links?.dblpURL || '#'} className="text-blue-500 hover:underline">DBLP</a>
            <a href={profileData.links?.linkedInURL || '#'} className="text-blue-500 hover:underline">LinkedIn</a>
            <a href={profileData.links?.adScientificIndexURL || '#'} className="text-blue-500 hover:underline">AD Scientific Index</a>
            <a href={profileData.links?.githubURL || '#'} className="text-blue-500 hover:underline">GitHub</a>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <img className="w-32 h-32 rounded-full" src={profileData.photo || 'default-profile.png'} alt="Profile" />
        </div>
        <div className="flex justify-around border-gray-200">
          <button className={`py-2 px-4 ${activeTab === 'bio' ? 'border-b-2 border-cyan-300-500 text-gray-200 bg-gray-700' : 'text-gray-500 bg-gray-100'}`} onClick={() => setActiveTab('bio')}>Bio</button>
          <button className={`py-2 px-4 ${activeTab === 'publications' ? 'border-b-2 border-cyan-300-500 text-gray-200 bg-gray-700' : 'text-gray-500 bg-gray-100'}`} onClick={() => setActiveTab('publications')}>Publications & Talks</button>
          <button className={`py-2 px-4 ${activeTab === 'projects' ? 'border-b-2 border-cyan-300-500 text-gray-200 bg-gray-700' : 'text-gray-500 bg-gray-100'}`} onClick={() => setActiveTab('projects')}>Projects</button>
          <button className={`py-2 px-4 ${activeTab === 'supervisions' ? 'border-b-2 border-cyan-300-500 text-gray-200 bg-gray-700' : 'text-gray-500 bg-gray-100'}`} onClick={() => setActiveTab('supervisions')}>Supervisions</button>
          <button className={`py-2 px-4 ${activeTab === 'jury' ? 'border-b-2 border-cyan-300-500 text-gray-200 bg-gray-700' : 'text-gray-500 bg-gray-100'}`} onClick={() => setActiveTab('jury')}>Jurys</button>
          <button className={`py-2 px-4 ${activeTab === 'invitations' ? 'border-b-2 border-cyan-300-500 text-gray-200 bg-gray-700' : 'text-gray-500 bg-gray-100'}`} onClick={() => setActiveTab('invitations')}>Invitations</button>
          <button className={`py-2 px-4 ${activeTab === 'teaching' ? 'border-b-2 border-cyan-300-500 text-gray-200 bg-gray-700' : 'text-gray-500 bg-gray-100'}`} onClick={() => setActiveTab('teaching')}>Teaching</button>
        </div>
        <br />
        <hr />
        <div className="mt-4 text-justify text-black">
          {activeTab === 'bio' && <ORCIDProfile lien={profileData.links.orcidURL || ''}/>}
          {activeTab === 'publications' && <Publication userId={Number(id)} />}
          {activeTab === 'projects' && id && <Project userId={Number(id)}/>}
          {activeTab === 'supervisions' && id && <SupervisionsContent userId={Number(id)}/>}
          {activeTab === 'jury' && <JuryContent userId={Number(id)}/>}
          {activeTab === 'invitations' && <Invitation userId={Number(id)}/>}
          {activeTab === 'teaching' && <Teaching userId={Number(id)} />}
        </div>
      </div>
    </div>
  );
};

export default Person;
