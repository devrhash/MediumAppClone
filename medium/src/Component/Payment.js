import React from 'react';
import './Payment.css';

const Payment = () => {
    const plans = [
        { title: '1 Post per Day', amount: '$5/week' },
        { title: '3 Posts per Day', amount: '$10/week' },
        { title: '5 Posts per Day', amount: '$15/week' }
    ];

    return (
        <div className="payment-container">
            <div className="payment-details">
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
            <div className='card-pay'>
            {plans.map((plan, index) => (
                <div className="payment-card" key={index}>
                    <h2 className="payment-card-title">{plan.title}</h2>
                    <p className="payment-amount">{plan.amount}</p>
                    <button className="pay-button">Pay Now</button>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Payment;
