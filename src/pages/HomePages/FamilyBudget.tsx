import React from 'react'

function FamilyBudget() {
  return (
    <div className='familybudget h-80 w-32'>
        <div className="amount bg-primary-dark text-white h-[30%]">
            <p>Remaining Family Budget for November</p>
            <p>$470.34</p>
        </div>
        <div className="calculationsData h-[60%]"></div>
    </div>
  )
}

export default FamilyBudget