import React from 'react';
import './Payment.css';
import { loadScript } from './Utils';
const Payment = () => {


    const initializeRazorpay = async (planAmount) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Failed to load Razorpay. Please check your internet connection.');
      return;
    }
    
    const options = {
      key: 'rzp_test_TyMlIksISvdnnn', 
      amount: planAmount * 100,
      currency: 'USD',
      name: 'Payment gateWay',
      description: 'Payment for subscription',
      prefill: {
        name: 'dev',
        email: 'devr51066@gmail.com',
        contact: '8085263894'
      },
      notes: {
        address: 'Razorpay Corporate office'
      },
      theme: {
        color: '#3399cc'
      }
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
    const plans = [
        { title: '1 Post per Day', amount: 5 },
        { title: '3 Posts per Day', amount: 10 },
        { title: '5 Posts per Day', amount:15 }
    ];
 



    return (
        <div className="postBody">
            <div className="postContainer">
            
               <div style={{display:'flex',flexDirection:'column'}}>
                <p>Get unlimited access to everything on Medium</p>
                <p>Plans starting at less than $1/week. Cancel anytime.</p>
                <ul>
                    <li><i class="bi bi-check"></i> No ads</li>
                    <li> <i class="bi bi-check"></i>Listen to any story</li>
                    <li><i class="bi bi-check"></i>Support quality writing</li>
                    <li><i class="bi bi-check"></i>Access on any device</li>
                    <li><i class="bi bi-check"></i>Read offline with the Medium app</li>
                    <li><i class="bi bi-check"></i>Create your own publications</li>
                    <li><i class="bi bi-check"></i>Mastodon account</li>
                </ul>
                </div>
            
            {plans.map((plan, index) => (
                <div className='card'>
                <div className="card_body" key={index}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <h2 className="payment-card-title">{plan.title}</h2>
                    <p className="payment-amount">{plan.amount}/Week</p>
                    <button className="pay-button" onClick={() => initializeRazorpay(plan.amount)}>Pay Now</button>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Payment;
