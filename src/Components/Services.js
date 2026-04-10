import React, { useEffect, useState } from "react";
import "./Services.css";

export default function Services({ title, services }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // simulate loading data (like API)
    setData(services);
  }, [services]);

  return (
    <div className="services-container">

      <h1>{title}</h1>

      <div className="services-grid">
        {data.map((service, index) => (
          <div className="service-card" key={index}>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
}