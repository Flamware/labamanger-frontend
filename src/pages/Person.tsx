import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './ProfileCard.css';
import { ProfileData } from '../component/model/PersonData';

const ProfileCard: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:8080/LabManager/api/v4/persons/card?id=1');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ProfileData = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h1>{profileData.firstName} {profileData.lastName}, Prof.Dr.</h1>
        <h2>Director of CIAD</h2>
        <h3>Full Professor</h3>
        <div className="profile-contact">
          <p><FaEnvelope /> {profileData.email}</p>
          <p><FaPhone /> +{profileData.officePhone.prefix} ({profileData.officePhone.country}) {profileData.officePhone.localNumber}</p>
        </div>
        <p><FaMapMarkerAlt /> Université de Technologie de Belfort Montbéliard, 13 rue Ernest Thierry-Mieg 90010 Belfort</p>
      </div>
      <div className="profile-image">
        <img src={profileData.photo} alt="Profile" />
      </div>
      <div className="profile-links">
        <a href="#bio">Bio</a>
        <a href="#publications">Publications & Talks</a>
        <a href="#projects">Projects</a>
        <a href="#supervisions">Supervisions</a>
        <a href="#jury">Jurys</a>
        <a href="#invitations">Invitations</a>
        <a href="#teaching">Teaching</a>
      </div>
      <div className="profile-bio">
        <p>Prof. Dr. MSc. Stéphane Galland is the Director (and Executive Director) of the research laboratory on Distributed Knowledge and Distributed Artificial Intelligence...</p>
      </div>
    </div>
  );
};

export default ProfileCard;
