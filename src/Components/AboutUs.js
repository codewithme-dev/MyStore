import React from "react";
import "./AboutUs.css";

export default function AboutUs({ title, description, team }) {
  return (
    <div className="about-container">

    
      <h1>{title}</h1>

      <p className="desc">{description}</p>

      <h2>Our Team</h2>

      <div className="team">
        {team && team.length > 0 ? (
          team.map((member, index) => (
            <div className="card" key={index}>
              <h3>{member.name}</h3>
              <h5>{member.role}</h5>
              <p>{member.responsibility}</p>
            </div>
          ))
        ) : (
          <p>No team members found</p>
        )}
      </div>

    </div>
  );
}