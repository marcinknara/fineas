// import Navbar from "../components/Navbar";
// import { useState, useEffect, useRef, useCallback } from 'react'


// export default function Visual() {

//   // Keep track of the classification result and the model loading status.
//   const [result, setResult] = useState(null);
//   const [ready, setReady] = useState(null);

//   // Create a reference to the worker object.
//   const worker = useRef(null);

//   // We use the `useEffect` hook to set up the worker as soon as the `App` component is mounted.
//   useEffect(() => {
//     if (!worker.current) {
//       // Create the worker if it does not yet exist.
//       worker.current = new Worker(new URL('../worker.js', import.meta.url), {
//         type: 'module'
//       });
//     }

//     // Create a callback function for messages from the worker thread.
//     const onMessageReceived = (e) => {
//       switch (e.data.status) {
//         case 'initiate':
//           setReady(false);
//           break;
//         case 'ready':
//           setReady(true);
//           break;
//         case 'complete':
//           setResult(e.data.output[0])
//           break;
//       }
//     };

//     // Attach the callback function as an event listener.
//     worker.current.addEventListener('message', onMessageReceived);

//     // Define a cleanup function for when the component is unmounted.
//     return () => worker.current.removeEventListener('message', onMessageReceived);
//   });

//   const classify = useCallback((text) => {
//     if (worker.current) {
//       worker.current.postMessage({ text });
//     }
//   }, []);


//   return (
//     <main className='bg-gradient-to-r from-purple-900 to-purple-500 w-full bg-cover bg-center'>
//       <Navbar />
//       <div className="flex min-h-screen flex-col p-12">
//         <h1 className="text-5xl font-bold mb-2 text-center text-white">Current Financial State</h1>
//         <h2 className="text-2xl mb-4 text-center text-white">Read through the questionaire and fill out as much information as you can.</h2>
//         {/* <input
//           type="text"
//           className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
//           placeholder="Enter text here"
//           onInput={e => {
//             classify(e.target.value);
//           }}
//         /> */}
//         <div className="flex">
//           <h2 className="text-xl mb-4 pr-4 text-white">Weekly income:</h2>
//           <input
//             type="text"
//             className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
//             placeholder="Enter text here"
//             onInput={e => {
//               doSomething(e.target.value);
//             }}
//           />
//         </div>
//         <div className="flex">
//           <h2 className="text-xl mb-4 pr-4 text-white">Read through the questionaire and fill out as much information as you can.</h2>
//           <input
//             type="text"
//             className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
//             placeholder="Enter text here"
//             onInput={e => {
//               doSomething(e.target.value);
//             }}
//           />
//         </div>
//         <div className="flex">
//           <h2 className="text-xl mb-4 pr-4 text-white">Read through the questionaire and fill out as much information as you can.</h2>
//           <input
//             type="text"
//             className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
//             placeholder="Enter text here"
//             onInput={e => {
//               doSomething(e.target.value);
//             }}
//           />
//         </div>
//         <div className="flex">
//           <h2 className="text-xl mb-4 pr-4 text-white">Read through the questionaire and fill out as much information as you can.</h2>
//           <input
//             type="text"
//             className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
//             placeholder="Enter text here"
//             onInput={e => {
//               doSomething(e.target.value);
//             }}
//           />
//         </div>
//         {ready !== null && (
//           <pre className="bg-gray-100 p-2 rounded">
//             {
//               (!ready || !result) ? 'Loading...' : JSON.stringify(result, null, 2)}
//           </pre>
//         )}
//       </div>
//     </main >
//   );
// }
'use client'
import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import YesNoSwitch from "../components/YesNoSwitch";


export default function Visual() {
  const [financialState, setFinancialState] = useState({
    personalInfo: {
      name: "John Doe",
      currentDate: "2024-05-01"
    },
    assets: {
      income: {
        isSalaried: "Y",
        yearlySalary: 52000,
        weeklySalary: 1000
      },
      retirementAccounts: {
        rothIRA: {
          hasAccount: true,
          currentContributionAmount: 3000,
          yearlyContributionLimit: 6000,
          currentOneYearReturns: 0.065,
          weeklyContributionPercentageOfWeeklySalary: ''
        },
        "401k": {
          hasAccount: true,
          balance: 15000,
          currentOneYearReturns: 0.07,
          weeklyContributionPercentageOfWeeklySalary: '',
          employerMatchPercentage: 3
        }
      },
      investmentAccounts: {
        stocksAndBonds: {
          totalInvestmentValue: 10000,
          weeklyContributionPercentageOfWeeklySalary: '',
          currentOneYearReturns: 0.08
        },
        otherInvestments: {
          description: "Real estate, crypto, etc.",
          totalInvestmentValue: 20000,
          currentOneYearReturns: 0.1,
          weeklyContributionPercentageOfWeeklySalary: ''
        }
      },
      savingsAccounts: {
        emergencyFund: {
          totalAmount: 8000,
          interestRate: 0.01
        },
        otherSavings: {
          description: "Vacation, renovation funds, etc.",
          totalAmount: 5000,
          weeklyContributionPercentageOfWeeklySalary: ''
        }
      }
    },
    liabilities: {
      loans: {
        studentLoans: {
          totalDebt: 2000,
          interestRate: 0.04,
          minimumMonthlyPayment: 50,
          monthlyPayment: ''
        },
        mortgage: {
          totalDebt: 150000,
          interestRate: 0.035,
          monthlyPayment: 1000
        },
        carLoan: {
          totalDebt: 10000,
          interestRate: 0.05,
          monthlyPayment: 300
        }
      },
      creditCards: {
        totalCreditCardDebt: 5000,
        averageInterestRate: 0.2,
        monthlyPayment: 150
      }
    }
  });

  const [showAssets, setShowAssets] = useState(false);
  const [showLiabilities, setShowLiabilities] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);

  const handleChange = (path, value) => {
    setFinancialState(prev => {
      const newState = { ...prev };
      const keys = path.split('.');
      let current = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(financialState); // Here you can replace with logic to save/send data
  };

  return (
    <main className='bg-gradient-to-r from-purple-900 to-purple-500 w-full bg-cover bg-center'>
      <Navbar />
      <div className="flex min-h-screen flex-col p-12">
        <h1 className="text-5xl font-bold mb-2 text-center text-white">Financial Information Form</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-3xl m-auto">

          {/* Personal Info Section */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white cursor-pointer" onClick={() => setShowPersonalInfo(!showPersonalInfo)}>Personal Info</h2>
            {showPersonalInfo && (
              <>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Name"
                    value={financialState.personalInfo.name}
                    onChange={e => handleChange('personalInfo.name', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">Current Date</label>
                  <input
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={financialState.personalInfo.currentDate}
                    onChange={e => handleChange('personalInfo.currentDate', e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          {/* Assets Section */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white cursor-pointer" onClick={() => setShowAssets(!showAssets)}>Assets</h2>
            {showAssets && (
              <>
                {/* Income Section */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white">Income</h3>
                  {/* Using YesNoSwitch for isSalaried */}
                  <YesNoSwitch
                    label="Is Salaried"
                    path="assets.income.isSalaried"
                    financialState={financialState}
                    setFinancialState={setFinancialState}
                  />
                  <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="weeklySalary">Weekly Salary</label>
                    <input
                      type="number"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="weeklySalary"
                      placeholder="Enter weekly salary"
                      value={financialState.assets.income.weeklySalary}
                      onChange={e => handleChange('assets.income.weeklySalary', parseFloat(e.target.value))}
                    />
                    <h2>{financialState.assets.income.isSalaried}</h2>
                    <h2>{financialState.assets.income.weeklySalary}</h2>
                    <h2>{financialState.assets.income.isSalaried}</h2>
                  </div>
                </div>

                {/* Add other asset sections here similar to the pattern above */}
              </>
            )}
          </div>

          {/* Liabilities Section */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white cursor-pointer" onClick={() => setShowLiabilities(!showLiabilities)}>Liabilities</h2>
            {showLiabilities && (
              <>
                {/* Loans Section */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white">Loans</h3>
                  {/* Student Loans */}
                  <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">Student Loan Debt</label>
                    <input
                      type="number"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={financialState.liabilities.loans.studentLoans.totalDebt}
                      onChange={e => handleChange('liabilities.loans.studentLoans.totalDebt', parseFloat(e.target.value))}
                    />
                  </div>
                </div>

                {/* Add other liability sections here similar to the pattern above */}
              </>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}