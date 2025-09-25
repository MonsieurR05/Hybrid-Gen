"use client"

import { useState } from "react"
import "./App.css"
import PolarGraphics from "./components/PolarGraphics"
import CPPNHybridGenerator from "./components/CPPNHybridGenerator"

function App() {
  const [activeTab, setActiveTab] = useState("polar")

  const [polarParams, setPolarParams] = useState({
    formula: "rose",
    radius: 150,
    frequency: 3,
    rotation: 0,
    color: "#ffffff",
    lineWidth: 2,
    animate: false,
    animationSpeed: 1,
  })

  const [cppnParams, setCppnParams] = useState({
    pattern: "hybrid1",
    frequency: 5,
    colorMode: "rainbow",
    animate: false,
    animationSpeed: 1,
  })

  // Polar graphics handlers
  const handlePolarFormulaChange = (e) => {
    setPolarParams({ ...polarParams, formula: e.target.value })
  }

  const handlePolarFrequencyChange = (e) => {
    setPolarParams({ ...polarParams, frequency: Number(e.target.value) })
  }

  const handlePolarRotationChange = (e) => {
    setPolarParams({ ...polarParams, rotation: (Number(e.target.value) * Math.PI) / 180 })
  }

  const handlePolarColorChange = (e) => {
    setPolarParams({ ...polarParams, color: e.target.value })
  }

  const handlePolarLineWidthChange = (e) => {
    setPolarParams({ ...polarParams, lineWidth: Number(e.target.value) })
  }

  const handlePolarAnimationToggle = () => {
    setPolarParams({ ...polarParams, animate: !polarParams.animate })
  }

  const handlePolarAnimationSpeedChange = (e) => {
    setPolarParams({ ...polarParams, animationSpeed: Number(e.target.value) })
  }

  // CPPN handlers
  const handleCppnPatternChange = (e) => {
    setCppnParams({ ...cppnParams, pattern: e.target.value })
  }

  const handleCppnFrequencyChange = (e) => {
    setCppnParams({ ...cppnParams, frequency: Number(e.target.value) })
  }

  const handleCppnColorModeChange = (e) => {
    setCppnParams({ ...cppnParams, colorMode: e.target.value })
  }

  const handleCppnAnimationToggle = () => {
    setCppnParams({ ...cppnParams, animate: !cppnParams.animate })
  }

  const handleCppnAnimationSpeedChange = (e) => {
    setCppnParams({ ...cppnParams, animationSpeed: Number(e.target.value) })
  }

  // Simple function to explain the current formula
  const getPolarFormulaExplanation = () => {
    switch (polarParams.formula) {
      case "rose":
        return "Rose curve: r = a × cos(k × θ) - Creates petal patterns based on frequency"
      case "spiral":
        return "Spiral: r = a × θ - Creates an expanding spiral pattern"
      case "cardioid":
        return "Cardioid: r = a × (1 + cos(θ)) - Creates a heart-shaped curve"
      default:
        return ""
    }
  }

  // Explanation for CPPN patterns
  const getCppnPatternExplanation = () => {
    switch (cppnParams.pattern) {
      case "hybrid1":
        return "Combines Cartesian sine waves with polar distance"
      case "hybrid2":
        return "Combines polar angle with Cartesian position"
      case "hybrid3":
        return "Complex hybrid using both coordinate systems"
      default:
        return ""
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Coordinate Systems Visualization</h1>
        <p>Exploring mathematical patterns with different coordinate systems</p>
      </header>

      <div className="tab-navigation">
        <button
          className={activeTab === "polar" ? "tab-button active" : "tab-button"}
          onClick={() => setActiveTab("polar")}
        >
          Polar Graphics
        </button>
        <button
          className={activeTab === "cppn" ? "tab-button active" : "tab-button"}
          onClick={() => setActiveTab("cppn")}
        >
          CPPN Hybrid
        </button>
      </div>

      <main className="app-content">
        <div className="canvas-section">
          {activeTab === "polar" ? <PolarGraphics params={polarParams} /> : <CPPNHybridGenerator params={cppnParams} />}
        </div>

        <div className="controls-section">
          {activeTab === "polar" ? (
            <div className="control-panel">
              <h3>Polar Graphics Controls</h3>

              <div className="control-group">
                <label>Formula:</label>
                <select value={polarParams.formula} onChange={handlePolarFormulaChange}>
                  <option value="rose">Rose Curve</option>
                  <option value="spiral">Spiral</option>
                  <option value="cardioid">Cardioid</option>
                </select>
                <p className="formula-explanation">{getPolarFormulaExplanation()}</p>
              </div>

              <div className="control-group">
                <label>Frequency: {polarParams.frequency}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={polarParams.frequency}
                  onChange={handlePolarFrequencyChange}
                />
              </div>

              <div className="control-group">
                <label>Rotation (degrees): {Math.round((polarParams.rotation * 180) / Math.PI)}</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="15"
                  value={Math.round((polarParams.rotation * 180) / Math.PI)}
                  onChange={handlePolarRotationChange}
                />
              </div>

              <div className="control-group">
                <label>Line Width: {polarParams.lineWidth}</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={polarParams.lineWidth}
                  onChange={handlePolarLineWidthChange}
                />
              </div>

              <div className="control-group">
                <label>Color:</label>
                <div className="color-picker-container">
                  <input type="color" value={polarParams.color} onChange={handlePolarColorChange} />
                  <span className="color-value">{polarParams.color}</span>
                </div>
              </div>

              <div className="control-group animation-controls">
                <label className="checkbox-label">
                  <input type="checkbox" checked={polarParams.animate} onChange={handlePolarAnimationToggle} />
                  Animate
                </label>

                {polarParams.animate && (
                  <div className="animation-speed">
                    <label>Speed: {polarParams.animationSpeed.toFixed(1)}</label>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={polarParams.animationSpeed}
                      onChange={handlePolarAnimationSpeedChange}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="control-panel">
              <h3>CPPN Hybrid Controls</h3>

              <div className="control-group">
                <label>Pattern:</label>
                <select value={cppnParams.pattern} onChange={handleCppnPatternChange}>
                  <option value="hybrid1">Hybrid 1</option>
                  <option value="hybrid2">Hybrid 2</option>
                  <option value="hybrid3">Hybrid 3</option>
                </select>
                <p className="formula-explanation">{getCppnPatternExplanation()}</p>
              </div>

              <div className="control-group">
                <label>Frequency: {cppnParams.frequency.toFixed(1)}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={cppnParams.frequency}
                  onChange={handleCppnFrequencyChange}
                />
              </div>

              <div className="control-group">
                <label>Color Mode:</label>
                <select value={cppnParams.colorMode} onChange={handleCppnColorModeChange}>
                  <option value="grayscale">Grayscale</option>
                  <option value="rainbow">Rainbow</option>
                  <option value="rgb">RGB</option>
                </select>
              </div>

              <div className="control-group animation-controls">
                <label className="checkbox-label">
                  <input type="checkbox" checked={cppnParams.animate} onChange={handleCppnAnimationToggle} />
                  Animate
                </label>

                {cppnParams.animate && (
                  <div className="animation-speed">
                    <label>Speed: {cppnParams.animationSpeed.toFixed(1)}</label>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={cppnParams.animationSpeed}
                      onChange={handleCppnAnimationSpeedChange}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="info-panel">
            <h3>About Coordinate Systems</h3>
            <p>This project explores two coordinate systems:</p>
            <ul>
              <li>
                <strong>Polar coordinates</strong> represent points using a distance from the origin (r) and an angle
                (θ).
              </li>
              <li>
                <strong>Cartesian coordinates</strong> represent points using horizontal (x) and vertical (y) distances.
              </li>
            </ul>
            <p>
              The CPPN Hybrid tab demonstrates how these coordinate systems can be combined to create complex patterns.
            </p>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Linear Algebra Mini-Project - Coordinate Systems</p>
      </footer>
    </div>
  )
}

export default App
