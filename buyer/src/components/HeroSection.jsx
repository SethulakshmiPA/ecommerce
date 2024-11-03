import React from 'react';

const HeroSection = () => {
  return (
    <section style={styles.hero}>
      <h2 style={styles.heading}>ECOMMERCE</h2>
      <p style={styles.subheading}>Shop the latest trends and styles</p>
    </section>
  );
};

const styles = {
  hero: {
    height: '50vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'url("https://via.placeholder.com/800x400") center/cover',
    color: '#fff',
  },
  heading: { fontSize: '2.5rem', marginBottom: '1rem' },
  subheading: { fontSize: '1.2rem' },
};

export default HeroSection;
