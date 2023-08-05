# app/controllers/payments_controller.rb
class PaymentsController < ApplicationController
  # def create_payment
  #   amount = params[:amount].to_i * 100
  #   token = params[:token]

  
  #   # Use the Stripe Ruby gem to create a payment intent
  #   begin
  #     intent = Stripe::PaymentIntent.create({
  #       amount: amount,
  #       currency: 'usd',
  #       payment_method_types: ['card'],
  #       # description: 'Payment for Order',
  #       confirm: true,
  #       payment_method_data: {
  #         type: 'card',
  #         card: {
  #           token: token
  #         }
  #       }
  #     })

  #     # The payment was successful
  #     if intent.status == 'succeeded'
  #       render json: { client_secret: intent.client_secret }, status: :ok
  #     else
  #       render json: { success: false }, status: :unprocessable_entity
  #     end
  #     rescue Stripe::CardError => e
  #       # The payment failed
  #       render json: { error: e.message }, status: :unprocessable_entity
  #     end
  #   end


  #   def verify_payment
  #     payment_intent_id = params[:payment_intent_id]

  #     begin
  #       payment_intent = Stripe::PaymentIntent.retrieve(payment_intent_id)

  #       if payment_intent.status == 'succeeded'
  #         # Payment was successful, you can update the payment status in your database
  #         payment = Payment.find_by(payment_intent_id: payment_intent_id)
  #         payment.update(status: 'completed')

  #         render json: { message: 'Payment successful' }
  #       else
  #         # Payment failed or needs action, handle as per your requirement
  #         render json: { error: 'Payment failed' }, status: :unprocessable_entity
  #       end
  #     rescue Stripe::StripeError => e
  #       render json: { error: e.message }, status: :unprocessable_entity
  #     end
  #   end 

  #   def index
      
  #   end
  # end

  def create_payment
    amount = params[:amount].to_i

    # Create a new Checkout Session with the Stripe gem
    session = Stripe::Checkout::Session.create(
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: amount,
          product_data: {
            name: 'Medium Subscription', # Replace with your product name
          },
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://google.com', # Replace with your success URL
      cancel_url: 'https://google.com', # Replace with your cancel URL
    )

    payment = Payment.create(amount: amount, payment_session_id: session.id, status: 'pending')

    render json: { sessionId: session.id }

  end

  def check_payment_status
    session_id = params[:session_id]

    # Retrieve the Session object from Stripe using the Session ID
    session = Stripe::Checkout::Session.retrieve(session_id)

    # Return the status of the payment as JSON to the client
    render json: { status: session.payment_status }
    rescue Stripe::StripeError => e
      render json: { error: e.message }, status: 500
  end
end
  