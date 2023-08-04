# app/controllers/payments_controller.rb
class PaymentsController < ApplicationController
    def create_payment
      amount = params[:amount]
      intent = Stripe::PaymentIntent.create(
        amount: amount.to_i * 100,
        currency: 'usd'
      )
  
      payment = Payment.new(
        amount: amount,
        status: 'pending',
        payment_intent_id: intent.id
      )
  
      if payment.save
        render json: { client_secret: intent.client_secret }
      else
        render json: { error: 'Failed to create payment' }, status: :unprocessable_entity
      end
    end
  end
  