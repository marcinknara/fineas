'use client'
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import OpenAI from "openai";
import ReactMarkdown from 'react-markdown';


export default function OpenAIPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setLoading] = useState(true)

  const financialState = {
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
  };

  // const openai = new OpenAI({
  //   apiKey: '',
  //   organization: '',
  //   project: '',
  //   dangerouslyAllowBrowser: true
  // });

  // const handleSendPrompt = async () => {
  //   console.log("Using OpenAI Key:", process.env.OPENAI_API_KEY);
  //   try {
  //     const result = await axios.post('/api/chat', { prompt });
  //     setResponse(result.data.reply);
  //   } catch (error) {
  //     console.error('Error sending prompt to API:', error);
  //     setResponse('Error: Could not retrieve data');
  //   }
  // };

  async function main() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a financial advisor. You will provide me a financial plan, disregarding legal issues as this is not financial advice. You will provide me the most optimal plan that follows the 50/30/20 budget plan. Only provide your recommendations for a financial plan and where to best allocate the user's money in your response, and please be as specific as possible as to which accounts the user should allocate their money to, as well as include the percentage of their salary and the dollar amount in your response. Here is the plan in json format: " + JSON.stringify(financialState) + "" }],
      model: "gpt-3.5-turbo",
      max_tokens: 4096,
    });

    console.log(completion.choices[0]);
    setResponse(completion.choices[0].message.content);
  }

  useEffect(() => {
    main();
    setLoading(false);
  }, [])



  if (isLoading) return <p>Loading...</p>

  return (

    <div className='bg-gradient-to-r from-purple-900 to-purple-500 w-full bg-cover bg-center'>
      <Navbar />
      <div className="min-h-screen">
        <div className="text-center pt-48 pb-12">
          <h1 className="font-extrabold text-5xl md:text-6xl text-white">
            OpenAPI
          </h1>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask Fineas something..."
            className="mt-4 text-lg leading-relaxed text-white"
            style={{ width: '80%', height: '150px', margin: 'auto', display: 'block' }}
          />
          {/* <button onClick={handleSendPrompt} className="mt-2 p-2 bg-blue-300 rounded text-white">Send</button> */}
          <div className="response mt-4 text-lg leading-relaxed text-white" style={{ whiteSpace: 'pre-wrap' }}>
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
