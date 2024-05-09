'use client'
import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import YesNoSwitch from "../components/YesNoSwitch";
import ButtonSwitch from "../components/ButtonSwitch";


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
        weeklySalary: 1000,
        weeklyIncome: 1000
      },
      retirementAccounts: {
        rothIRA: {
          hasAccount: true,
          currentAccountBalance: 3000,
          yearlyContributionLimit: 6000,
          currentOneYearReturns: 0.065,
          weeklyContributionPercentageOfWeeklySalary: .00
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
      <div className="items-start content-start flex min-h-screen flex-col p-12">
        <h1 className="text-5xl font-bold mb-2 text-center text-white">Financial Information Form</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md align-start">

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
                <div className="mb-4 content-start">
                  <h3 className="text-xl font-bold text-white">Income</h3>
                  <ButtonSwitch
                    label="Are you salaried?"
                    value={financialState.assets.income.isSalaried}
                    onChange={(val) => handleChange('assets.income.isSalaried', val)}
                  />
                  {financialState.assets.income.isSalaried === 'Y' ?
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2" htmlFor="yearlySalary">Yearly Salary</label>
                      <input
                        type="number"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="yearlySalary"
                        placeholder="Enter yearly salary"
                        value={financialState.assets.income.yearlySalary}
                        onChange={e => handleChange('assets.income.yearlySalary', parseFloat(e.target.value))}
                      />
                    </div>
                    :
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2" htmlFor="weeklyIncome">Weekly Income</label>
                      <input
                        type="number"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="weeklyIncome"
                        placeholder="Enter weekly salary"
                        value={financialState.assets.income.weeklyIncome}
                        onChange={e => handleChange('assets.income.weeklyIncome', parseFloat(e.target.value))}
                      />
                    </div>
                  }
                  <h3 className="text-xl font-bold text-white">Retirement Accounts</h3>
                  <ButtonSwitch
                    label="Do you have a Roth IRA?"
                    value={financialState.assets.retirementAccounts.rothIRA.hasAccount}
                    onChange={(val) => handleChange('assets.retirementAccounts.rothIRA.hasAccount', val)}
                  />
                  {financialState.assets.retirementAccounts.rothIRA.hasAccount === 'Y' ?
                    <>
                      <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="rothIRABalance">Current Roth IRA Account Balance</label>
                        <input
                          type="number"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="rothIRABalance"
                          placeholder="Enter your current Roth IRA balance"
                          value={financialState.assets.retirementAccounts.rothIRA.currentAccountBalance}
                          onChange={e => handleChange('assets.retirementAccounts.rothIRA.currentAccountBalance', parseFloat(e.target.value))}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="rothIRACurrentOneYearReturns">What is your estimated 1 year returns percentage?</label>
                        <input
                          type="number"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="rothIRACurrentOneYearReturns"
                          placeholder="Enter your estimated 1 year returns percentage"
                          value={financialState.assets.retirementAccounts.rothIRA.currentOneYearReturns}
                          onChange={e => handleChange('assets.retirementAccounts.rothIRA.currentOneYearReturns', parseFloat(e.target.value))}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="rothIRABalance">Current Roth IRA Account Balance</label>
                        <input
                          type="number"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="rothIRABalance"
                          placeholder="Enter your current Roth IRA balance"
                          value={financialState.assets.retirementAccounts.rothIRA.currentAccountBalance}
                          onChange={e => handleChange('assets.retirementAccounts.rothIRA.currentAccountBalance', parseFloat(e.target.value))}
                        />
                      </div>
                    </>

                    :
                    null
                  }
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