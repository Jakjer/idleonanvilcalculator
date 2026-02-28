import { useState } from 'react'
import './App.css'


interface ICalculator {
  speedPerHour: number,
  hammerMultiplier: number,
  calculatedCapacity: number,
  selectedProductionValue: number,
}

const Items = [
  { item: "Thread", productionPerCraft: 100 },
  { item: "Trusty Nails", productionPerCraft: 200 },
  { item: "Boring Brick", productionPerCraft: 350 },
  { item: "Chain Link", productionPerCraft: 700 },
  { item: "Leather Hide", productionPerCraft: 1200 },
  { item: "Pinion Spur", productionPerCraft: 2000 },
  { item: "Lugi Bracket", productionPerCraft: 3000 },
  { item: "Purple Screw", productionPerCraft: 4000 },
  { item: "Thingymabob", productionPerCraft: 6000 },
  { item: "Tangled Cords", productionPerCraft: 8500 },
  { item: "PVC Pipe", productionPerCraft: 12000 }
]

function App() {

  const FULL_DAY_CAPACITY_HOURS = 24;
  const [calculatorInput, setCalculatorInput] = useState<ICalculator>({
    speedPerHour: 0,
    hammerMultiplier: 1,
    calculatedCapacity: 100,
    selectedProductionValue: 100,
  });

  const multiplierValues = [1,2,3];

  const calculatedCapacity = ((calculatorInput.speedPerHour / calculatorInput.selectedProductionValue) * calculatorInput.hammerMultiplier * FULL_DAY_CAPACITY_HOURS).toFixed(2);

  function handleCalculatorInput(e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    const {id, value} = (e.target as HTMLInputElement);
    setCalculatorInput(prev => ({...prev, [id]: Number(value)}));
  }

  return (
 <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <img src="/trimmed-anvil.png" />
      <h1>Idle-On Anvil Calculator</h1>
    </div>
      <div>
        <div>
          <label>Speed (Millions/hr): </label>
          <input id={'speedPerHour'} onInput={e => handleCalculatorInput(e)} value={calculatorInput.speedPerHour}/>
        </div>

      </div>

      <div className="card">
        <div>
          <label>Number of Hammers: </label>
          <select id={'hammerMultiplier'} onChange={e => handleCalculatorInput(e)}>
            {multiplierValues.map((mult, multIndex) => {
              return (
                <option value={mult}>{multIndex + 1}</option>
              );
            })}
          </select>
        </div>

        <div>
          <label>Target Item: </label>
          <select id={'selectedProductionValue'} onChange={e => handleCalculatorInput(e)}>
            {Items.map(item => {
              return (
                <option value={item.productionPerCraft}>{item.item}</option>
              );
            })}
          </select>
        </div>
      </div>

      <div>
        <div>
          <label>24 Hour Capacity (Millions): </label>
          <label>{calculatedCapacity}</label>
        </div>
      </div>
    </div>
  )
}
// (Speed/hr / Item Points) * # Hammers * 24
export default App
