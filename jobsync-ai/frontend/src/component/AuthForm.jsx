import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    navigate('/upload');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setIsSignup(false);
  };

  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="card-switch">
          <label className="switch">
            <input
              type="checkbox"
              className="toggle"
              checked={isSignup}
              onChange={toggleForm}
            />
            <span className="slider" />
            <span className="card-side" />
            <div className={`flip-card__inner ${isSignup ? 'flipped' : ''}`}>
              <div className="flip-card__front">
                <div className="title">Log in</div>
                <form className="flip-card__form" onSubmit={handleLoginSubmit}>
                  <input
                    className="flip-card__input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    required
                  />
                  <input
                    className="flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                  />
                  <button className="flip-card__btn" type="submit">
                    Let`s go!
                  </button>
                </form>
              </div>
              <div className="flip-card__back">
                <div className="title">Sign up</div>
                <form className="flip-card__form" onSubmit={handleSignupSubmit}>
                  <input
                    className="flip-card__input"
                    placeholder="Name"
                    type="text"
                    name="name"
                    required
                  />
                  <input
                    className="flip-card__input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    required
                  />
                  <input
                    className="flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                  />
                  <button className="flip-card__btn" type="submit">
                    Confirm!
                  </button>
                </form>
              </div>
            </div>
          </label>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* REMOVED background-color so global pattern shows */

  .wrapper {
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --bg-color-alt: #666;
    --main-color: #323232;
  }

  .switch {
    position: relative;
    width: 300px;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .toggle {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }

  .slider {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 30px;
    background-color: var(--main-color);
    border-radius: 15px;
    cursor: pointer;
  }

  .slider::before {
    content: '';
    position: absolute;
    width: 28px;
    height: 28px;
    left: 2px;
    bottom: 1px;
    background-color: var(--bg-color);
    border-radius: 50%;
    transition: 0.3s;
  }

  .toggle:checked + .slider::before {
    transform: translateX(30px);
  }

  .flip-card__inner {
    width: 300px;
    height: 350px;
    position: relative;
    background-color: transparent;
    perspective: 1000px;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card__inner.flipped {
    transform: rotateY(180deg);
  }

  .flip-card__front,
  .flip-card__back {
    padding: 20px;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    backface-visibility: hidden;
    background: lightgrey;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
  }

  .flip-card__back {
    transform: rotateY(180deg);
  }

  .flip-card__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .title {
    font-size: 25px;
    font-weight: 900;
    color: var(--main-color);
  }

  .flip-card__input {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .flip-card__input::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }

  .flip-card__input:focus {
    border: 2px solid var(--input-focus);
  }

  .flip-card__btn {
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
    margin-top: 10px;
  }

  .flip-card__btn:active {
    box-shadow: 0 0 var(--main-color);
    transform: translate(3px, 3px);
  }
`;

export default AuthForm;
