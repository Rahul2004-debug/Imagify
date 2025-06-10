import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

function BuyCredit() {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } = useContext(AppContext)

  const navigate = useNavigate()
  const initPay = async (order) => {
    try {
      if (!window.Razorpay) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }

      // Debug log to verify key
      console.log('Razorpay Key:', import.meta.env.VITE_RAZORPAY_KEY_ID);
      console.log('Order Details:', order);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'Credits Payments',
        order_id: order.id,
        receipt: order.receipt,
        handler: async (response) => {
          try {
            console.log('Payment Response:', response);
            const verifyData = await axios.post(
              backendUrl +'/api/user/verify-payment',
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              },
              { headers: { token } }
            );

            if (verifyData.data.success) {
              toast.success('Payment successful!');
              loadCreditsData();
              navigate('/')
              toast.success("credits added") 
            } else {
              toast.error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error(error.message);
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email
        },
        theme: {
          color: '#000000'
        },
        modal: {
          ondismiss: function () {
            toast.info('Payment cancelled');
          }
        },
        config: {
          display: {
            blocks: {
              banks: {
                name: "Pay using UPI",
                instruments: [
                  {
                    method: "upi"
                  }
                ]
              }
            },
            sequence: ["block.banks"],
            preferences: {
              show_default_blocks: true
            }
          }
        }
      };

      console.log('Razorpay Options:', options);
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast.error('Failed to initialize payment');
    }
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }
      console.log('Initiating payment for plan:', planId);
      const response = await axios.post(backendUrl + '/api/user/pay-razor', { planId }, { headers: { token } });
      console.log('Complete response data:', response.data);

      if (response.data.success) {
        const order = response.data.order;
        console.log('Order details:', order);

        if (!order || !order.id || !order.amount) {
          console.error('Invalid order object:', order);
          toast.error('Invalid order details received');
          return;
        }
        initPay({
          id: order.id,
          amount: order.amount,
          currency: order.currency,
          receipt: order.receipt
        });
      } else {
        console.error('Payment initiation failed:', response.data);
        toast.error(response.data.message || 'Failed to create payment order');
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error(error.message);
    }
  };
  return (
    <motion.div className='min-h-[80vh] text-center mb-10 pt-15 '
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>
        Our plans
      </button>
      <h1 className='text-center  text-3xl font-medium mb-6 sm:mb-10'>
        Choose the Plan
      </h1>
      <div className='flex flex-wrap  justify-center gap-6  text-left'>
        {plans.map((item, index) => (
          <div className='bg-white shadow-md   rounded-lg py-12 px-8 text-gray-600 hover:scale-110 transition-all transform duration-500' key={index}>
            <img width={40} src={assets.logo_icon} alt="" />
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm '>{item.desc}</p>
            <p className='mt-6 '>
              <span className='text-3xl font-medium'>${item.price} </span> / {item.credits}  credits
            </p>
            <button onClick={() => {
              paymentRazorpay(item.id)
            }} className='bg-gray-900 w-full text-white mt-8 text-sm rounded-md py-2.5 min-w-52 '> {user ? 'purchase' : 'Get Started'}</button>
          </div>
        ))}
      </div>
      <div>

      </div>
    </motion.div>
  )
}

export default BuyCredit;