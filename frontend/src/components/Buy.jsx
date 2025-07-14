import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast'
import axios from 'axios';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';


function Buy() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [course, setCourse] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  console.log(token)


  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");

  useEffect(() => {
    const fetchBuyCoursedata = async () => {
      if (!token) {
        setError("Please login to buy the course");
        navigate("/login")
        console.log(token)
        return;
      }
      try {
        // setLoading(true);
        const response = await axios.post(`http://localhost:4001/api/v1/course/buy/${courseId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        });
        console.log(response.data)
        setCourse(response.data.course)
        setClientSecret(response.data.clientSecret);
        setLoading(false)
      } catch (error) {
        setLoading(false);
        if (error?.response?.status === 400) {
          setError("You have already purchased this course")
          setTimeout(() => {
            navigate('/purchases');
          }, 1000); // Delay of 1 second       
        }
        else {
          setError(error?.response?.data?.errors)
        }
      }
    }
    fetchBuyCoursedata(); // Calling the function to fetch course data
  }, [courseId])

  const handlePurchase = async () => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("Script or Elements are not found")
      return;
    }

    setLoading(false);
    const card = elements.getElement(CardElement);

    if (card == null) {
      console.log("Card Element not found");
      setLoading(false);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('Stripe Payment Method Error', error);
      setLoading(false);
      setCardError(error.message);
    } else {
      console.log('Payment method Created', paymentMethod);
    }

    if (!clientSecret) {
      console.log("No client Secret Found");
      setLoading(false);
      return;
    }
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.user?.firstName,
            email: user?.user?.email,
          },
        },
      },
    );

    if (confirmError) {
      setCardError(confirmError.message);
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment Successful", paymentIntent);
      setCardError("Your Payment Id", paymentIntent.id);

      const paymentInfo = {
        email: user?.user?.email,
        userId: user.user._id,
        courseId: courseId,
        paymentId: paymentIntent.id,
        amount: paymentIntent.amount,
        status: paymentIntent.status
      }
      console.log("Payment info",paymentInfo);
    }
  }


return (
  <div className='flex h-screen items-center justify-center'>
    <button className='bg-blue-500 rounded-md py-2 px-4 hover:bg-blue-800 duration-300' onClick={handlePurchase} disabled={loading}>{loading ? "Processing.." : "Buy Now"}</button>
  </div>

)
}
export default Buy;